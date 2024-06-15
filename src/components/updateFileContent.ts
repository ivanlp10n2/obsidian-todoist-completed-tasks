import moment from "moment";
import { App, MarkdownView, Notice } from "obsidian";
import { TodoistSettings } from "../constants/DefaultSettings";
import { renderMarkdown } from "../constants/formatTasks";
import { FETCH_STRATEGIES, TodoistTask } from "../constants/shared";
import { fetchCompletedTasks } from "./fetchTasks";
import { prepareTasksForRendering } from "./formatTasks";
import {
    getTimeFromKeySegments,
    getTimeframesForLastNHours,
    getTimeframesForUsersToday,
    segmentsCheck,
    settingsCheck,
} from "./utils";

const createFile = (filePath: string, renderedText: string) => {
    app.vault.create(filePath, renderedText).then(() => {
        new Notice(`Tasks file ${filePath} created.`);
    }).catch(err => {
        const errorMsg = `Error creating file ${filePath}: ${err.message}`
        console.error(errorMsg, err)
        new Notice(errorMsg);
    });
}
//get division by { completed-tasks/yyyy/mm/dd/taskid-taskTitle }
function getOrCreateFolder(folderPath: string) {
    const folder = app.vault.getAbstractFileByPath(folderPath)
    if (!folder) { createNewFolder(folderPath) }
}

async function createNewFolder(folderPath: string) {
    try {
        await app.vault.createFolder(folderPath);
        new Notice('Folder created successfully.');
    } catch (error) {
        const errorMsg = 'Error creating folder: ' + error.message
        console.error(errorMsg, error)
        new Notice(errorMsg);
    }
}

export async function updateFileFromServer(
    settings: TodoistSettings,
    app: App,
    time: number,
    fetchStrategy: string
): Promise<void> {
    const editor = app.workspace.getActiveViewOfType(MarkdownView).editor;
    const fileContent = editor.getValue();

    if (
        !settingsCheck(settings) ||
        !segmentsCheck(fileContent, settings, fetchStrategy)
    ) { return; }

    let timeFrames: any = getTimeFrames(fetchStrategy, time, fileContent);
    const fetchResults: any = await fetchCompletedTasks(settings.authToken, timeFrames);

    let formattedTasks: TodoistTask[] = prepareTasksForRendering(fetchResults.tasksResults, fetchResults.projectsResults);
    let groupedTasks: GroupedTasks = groupTasksByDate(formattedTasks);
    const filteredGroupedTasks: GroupedTasks = filterInvalidTasks(groupedTasks);

    const currentPath = app.workspace.getActiveFile().parent.path;
    Object.entries(filteredGroupedTasks).forEach(([date, tasks]) => {
        const [year, month, day] = date.split("-");
        const folderPath = `${currentPath}/completed-tasks/${year}/${month}/${year}-${month}-${day}`;
        getOrCreateFolder(folderPath);

        const encodeFilename = (str: string) => str.replace(/[\\/:*?""<>|]/g, '_')
        deleteFileTasks(tasks, folderPath, encodeFilename)
        createFileTasks(tasks, fetchResults.projectsResults, folderPath, encodeFilename);
    });

    new Notice("Completed tasks loaded.");

}

const deleteFileTasks = (tasks: TodoistTask[], folderPath: string, encodeFilename: (str: string) => string): void => {
    tasks.forEach((task) => {
        const fileName = `${folderPath}/${task.taskId}-${encodeFilename(task.title)}.md`
        const file = app.vault.getAbstractFileByPath(fileName)
        if (file) {
            app.vault.delete(file);
            new Notice(`File ${fileName} override.`);
        }
    });
}

function createFileTasks(tasks: TodoistTask[], projectsMetadata: any, folderPath: string, encodeFilename: (str: string) => string): void {
    tasks.forEach((task) => {
        let markdownContent: string = renderMarkdown(task, projectsMetadata[task.projectId])
        const fileName = `${folderPath}/${task.taskId}-${encodeFilename(task.title)}.md`
        createFile(fileName, markdownContent);
    });
}

const getTimeFrames = (fetchStrategy: string, time: number, fileContent: string) => {
    let timeFrames: any = null;

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
    return timeFrames;
}

type GroupedTasks = {
    //yyyy-mm-dd -> ([taskid] -> task)
    [key: string]: TodoistTask[];
}
const groupTasksByDate = (tasks: TodoistTask[]): GroupedTasks => {
    const map = new Map<string, TodoistTask[]>();
    const dateCriteria: (task: TodoistTask) => string = (task: TodoistTask) => {
        return task.completedAt ? task.completedAt
            : task.dueAt ? task.dueAt
                : task.createdAt;
    }
    tasks.forEach((task: TodoistTask) => {
        //utc
        const date = moment(dateCriteria(task)).utc().format("YYYY-MM-DD");
        if (!map.get(date)) {
            map.set(date, []);
        }
        map.get(date).push(task);
    });
    const groupedTasks: GroupedTasks = Object.fromEntries(map.entries());
    return groupedTasks;
}

const filterInvalidTasks: (groupedTasks: GroupedTasks) => GroupedTasks = (groupedTasks: GroupedTasks) => Object.fromEntries(
    Object.entries(groupedTasks)
        .filter(([key, _]) => key !== 'Invalid date')
        .sort(([a, _], [b, __]) => a.localeCompare(b))
);