import { App, Notice, MarkdownView } from "obsidian";
import { TodoistSettings } from "../constants/DefaultSettings";
import { fetchCompletedTasks } from "./fetchTasks";
import { renderTasksAsText, prepareTasksForRendering } from "./formatTasks";
import { FETCH_STRATEGIES } from "../constants/shared";
import {
    getTimeframesForUsersToday,
    getTimeframesForLastNHours,
    getTimeFromKeySegments,
    settingsCheck,
    segmentsCheck,
} from "./utils";
import { TodoistTask } from "../constants/shared";
import moment from "moment";

const createFile = (filePath: string, renderedText: string) => {
    app.vault.create(filePath, renderedText).then(() => {
        new Notice(`Tasks file ${filePath} created.`);
    }).catch(err => {
        new Notice(`Error creating file ${filePath}: ${err.message}`);
    });
}
//get division by { completed-tasks/yyyy/mm/dd/taskid-taskTitle }
function getOrCreateFolder(folderPath: string) {
    const folder = app.vault.getAbstractFileByPath(folderPath);
    if (!folder) {
        createNewFolder(folderPath);
    }
}

async function createNewFolder(folderPath: string) {
    try {
        await app.vault.createFolder(folderPath);
        new Notice('Folder created successfully.');
    } catch (error) {
        new Notice('Error creating folder: ' + error.message);
    }
}

export async function updateFileFromServer(
    settings: TodoistSettings,
    app: App,
    time: number,
    fetchStrategy: string
) {
    const editor = app.workspace.getActiveViewOfType(MarkdownView).editor;
    const fileContent = editor.getValue();

    if (
        !settingsCheck(settings) ||
        !segmentsCheck(fileContent, settings, fetchStrategy)
    ) {
        return;
    }

    let timeFrames = null;

    if (fetchStrategy === FETCH_STRATEGIES.today) {
        timeFrames = getTimeframesForUsersToday();
    }
    if (fetchStrategy === FETCH_STRATEGIES.lastNHours) {
        timeFrames = getTimeframesForLastNHours(time);
    }
    if (fetchStrategy === FETCH_STRATEGIES.fromFile) {
        timeFrames = getTimeFromKeySegments(fileContent);
    }

    if (timeFrames === null) {
        new Notice("Invalid time frame.", 10000);
        return;
    }
    const fetchResults = await fetchCompletedTasks(
        settings.authToken,
        timeFrames
    );

    console.log("fetchResults", fetchResults);

    if (fetchResults.tasksResults.length === 0) {
        new Notice("No completed tasks found for the given timeframe");
        return;
    }


    const createFoldersIfNotExists: (groupedTasks: GroupedTasks) => void = (groupedTasks: GroupedTasks) => {
        Object.keys(groupedTasks).forEach((date) => {
            const [year, month, day] = date.split("-");
            const folderPath = `${currentPath}/completed-tasks/${year}/${month}/${year}-${month}-${day}`;
            getOrCreateFolder(folderPath);
            groupedTasks[date].forEach((task) => {
                let renderedText = renderTasksAsText(
                    [task],
                    fetchResults.projectsResults,
                    settings
                );
                createFile(`${folderPath}/${task.taskId}-${task.content}.md`, renderedText);
            });
        });
    }

    const filterInvalidTasks: (groupedTasks: GroupedTasks) => GroupedTasks = (groupedTasks: GroupedTasks) => Object.fromEntries(
        Object.entries(groupedTasks)
            .filter(([key, _]) => key !== 'Invalid date')
            .sort(([a, _], [b, __]) => a.localeCompare(b))
    );

    let formattedTasks: TodoistTask[] = prepareTasksForRendering(fetchResults.tasksResults);

    const currentPath = app.workspace.getActiveFile().parent.path;

    let groupedTasks: GroupedTasks = groupTasksByDate(formattedTasks);
        
    const filteredGroupedTasks = filterInvalidTasks(groupedTasks);
    console.log("filteredGroupedTasks", filteredGroupedTasks);
    createFoldersIfNotExists(filteredGroupedTasks);

    // let renderedText = renderTasksAsText(
    //     formattedTasks,
    //     fetchResults.projectsResults,
    //     settings
    // );

    let rangeStart = fileContent.indexOf(settings.keywordSegmentStart);
    let rangeEnd = fileContent.indexOf(settings.keywordSegmentEnd);

    if (fetchStrategy === FETCH_STRATEGIES.fromFile) {
        rangeStart = fileContent.indexOf(timeFrames.startString);
        rangeEnd = fileContent.indexOf(timeFrames.endString);
        // renderedText = `${timeFrames.startString}${renderedText}`;
    } else {
        // renderedText = `${settings.keywordSegmentStart}${renderedText}`;
    }
    // editor.replaceRange(
    //     "",
    //     editor.offsetToPos(rangeStart),
    //     editor.offsetToPos(rangeEnd)
    // );


    new Notice("Completed tasks loaded.");
}
// type GroupedDate = {
//     [key: string]: GroupedTasks;
// }
type GroupedTasks = {
    //yyyy-mm-dd -> ([taskid] -> task)
    [key: string]: TodoistTask[];
}
const groupTasksByDate = (tasks: TodoistTask[]): GroupedTasks => {
    const map = new Map<string, TodoistTask[]>();
    tasks.forEach((task: TodoistTask) => {
        //utc
        const date = moment(task.completedAt).utc().format("YYYY-MM-DD");
        if (!map.get(date)) {
            map.set(date, []);
        }
        map.get(date).push(task);
    });
    const groupedTasks: GroupedTasks = Object.fromEntries(map.entries());
    return groupedTasks;
}
