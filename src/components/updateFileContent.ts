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

const createFoldersAndFiles = (renderedText: string) => {
    const activeFile = app.workspace.getActiveFile();
    const directoryPath = activeFile.parent.path;
    const fileName = "completed-tasks.md";
    const filePath = `${directoryPath}/${fileName}`;

    app.vault.create(filePath, renderedText).then(() => {
        new Notice("Completed tasks file created.");
    }).catch(err => {
        new Notice("Error creating file: " + err.message);
    });
}

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

    if (fetchResults.tasksResults.length === 0) {
        new Notice("No completed tasks found for the given timeframe");
        return;
    }


    let formattedTasks = prepareTasksForRendering(fetchResults.tasksResults);
    let renderedText = renderTasksAsText(
        formattedTasks,
        fetchResults.projectsResults,
        settings
    );

    let rangeStart = fileContent.indexOf(settings.keywordSegmentStart);
    let rangeEnd = fileContent.indexOf(settings.keywordSegmentEnd);

    if (fetchStrategy === FETCH_STRATEGIES.fromFile) {
        rangeStart = fileContent.indexOf(timeFrames.startString);
        rangeEnd = fileContent.indexOf(timeFrames.endString);
        renderedText = `${timeFrames.startString}${renderedText}`;
    } else {
        renderedText = `${settings.keywordSegmentStart}${renderedText}`;
    }
    editor.replaceRange(
        renderedText,
        editor.offsetToPos(rangeStart),
        editor.offsetToPos(rangeEnd)
    );

    // createFoldersAndFiles(filePath);

    // createFoldersAndFiles(renderedText);
    new Notice("Completed tasks loaded.");
}
