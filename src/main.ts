import { Notice, Plugin } from "obsidian";
import { updateFileFromServer } from "./components/updateFileContent";
import { DEFAULT_SETTINGS, TodoistSettings } from "./constants/DefaultSettings";
import { migrateSettings } from "./components/settingsMigrations";
import { ExampleModal } from "./components/modal";
import { getTimeframesForLastNHoursWithoutOffset } from "./components/utils";
import { TodoistPluginSettingTab } from "./components/settingsTabs";
import { FETCH_STRATEGIES } from "./constants/shared";

export default class TodoistCompletedTasks extends Plugin {
    settings: TodoistSettings;

    async onload() {
        await this.loadSettings();

        this.addRibbonIcon(
            "sync",
            "Fetch today's completed tasks",
            (evt: MouseEvent) => {
                new Notice("Fetching completed tasks..");
                updateFileFromServer(
                    this.settings,
                    this.app,
                    0,
                    FETCH_STRATEGIES.today
                );
            }
        );

        this.addCommand({
            id: "todoist-fetch-completed-tasks",
            name: "Fetch today's completed tasks",
            callback: async () => {
                new Notice("Fetching completed tasks..");
                updateFileFromServer(
                    this.settings,
                    this.app,
                    0,
                    FETCH_STRATEGIES.today
                );
            },
        });

        this.addCommand({
            id: "todoist-fetch-completed-tasks",
            name: "Fetch completed tasks using dates in segments",
            callback: async () => {
                new Notice("Fetching completed tasks..");
                updateFileFromServer(
                    this.settings,
                    this.app,
                    0,
                    FETCH_STRATEGIES.fromFile
                );
            },
        });

        this.addCommand({
            id: "todoist-fetch-completed-tasks-for-last-n-hours",
            name: "Fetch completed tasks for last N hours",
            callback: async () => {
                new ExampleModal(this.app, (result) => {
                    if (
                        result == null ||
                        result == "" ||
                        isNaN(Number(result)) ||
                        Number(result) < 0
                    ) {
                        new Notice("Please enter a valid number of hours");
                        return;
                    }

                    let times = getTimeframesForLastNHoursWithoutOffset(
                        Number(result)
                    );
                    const {
                        timeStartFormattedDate,
                        timeStartFormattedTime,
                        timeEndFormattedDate,
                        timeEndFormattedTime,
                    } = times;

                    if (this.settings.renderSubtasks) {
                        new Notice(
                            `You are fetching completed tasks with "Render subtasks" enabled. ` +
                                `\nThis will limit the number of tasks fetched to 30.` +
                                `\nMessage will be removed after 30 sec.`,
                            30000
                        );
                    }

                    new Notice(
                        `Fetching completed tasks for last ${result} hours.. ` +
                            `\nTimerange, from: \n${timeStartFormattedDate} ${timeStartFormattedTime} ` +
                            `\nto: ` +
                            `\n${timeEndFormattedDate} ${timeEndFormattedTime}. ` +
                            `\nMessage will be removed after 30 sec.`,
                        30000
                    );
                    updateFileFromServer(
                        this.settings,
                        this.app,
                        Number(result),
                        FETCH_STRATEGIES.lastNHours
                    );
                }).open();
            },
        });

        this.addSettingTab(new TodoistPluginSettingTab(this.app, this));
    }

    async loadSettings() {
        let storedSettings = (await this.loadData()) ?? DEFAULT_SETTINGS;
        this.settings = migrateSettings(storedSettings);
        await this.saveSettings();
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
