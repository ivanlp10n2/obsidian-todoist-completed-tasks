import { moment, Notice } from "obsidian";
import { TodoistSettings } from "../constants/DefaultSettings";
import { RawTodoistTask } from "../constants/shared";
import { TodoistTask } from "../constants/formatTasks";


function prepareTasksForRendering(tasks: RawTodoistTask[]): TodoistTask[] {
    let childTasks: RawTodoistTask[] = tasks.filter(
    (task: RawTodoistTask) => task.parentId !== null
    );

    let renderedTasks: TodoistTask[] = [];

    function convertToDateObj(date: string): Date | null {
        if (date === null) return null;
        return new Date(date);
    }

    tasks.forEach((task: any) => {
        if (task.parentId === null) {
            renderedTasks.push({
                taskId: task.taskId,
                content: task.content,
                completedAt: convertToDateObj(task.completedAt),
                projectId: task.projectId,
                childTasks: [],
            });
        }
    });

    childTasks.forEach(async (task: any) => {
        const parentTaskIndex: number = renderedTasks.findIndex(
            (t: TodoistTask) => t.taskId === task.parentId
        );

        renderedTasks[parentTaskIndex].childTasks.push({
            taskId: task.taskId,
            content: task.content,
            completedAt: convertToDateObj(task.completedAt),
            projectId: task.projectId,
            childTasks: [],
        });
    });

    // console.log("prepare tasks for rendering results", renderedTasks);
    return renderedTasks;
}

function renderTasksAsText(
    tasks: any,
    projectsMetadata: any,
    settings: TodoistSettings
) {
    function renderTaskFinishDate(task: any) {
        if (task.completedAt === null) {
            return "N/A";
        }

        if (settings.taskPostfix.includes("{task_finish_date}")) {
            const formattedDate = moment(task.completedAt).format(
                "YYYY-MM-DD"
            );
            return formattedDate;
        }

        if (settings.taskPostfix.includes("{task_finish_datetime}")) {
            const formattedDate = moment(task.completedAt).format(
                "YYYY-MM-DD HH:mm"
            );
            return formattedDate;
        }

        if (settings.taskPostfix.includes("{current_date}")) {
            const formattedDate = moment(task.completedAt).format(
                "YYYY-MM-DD"
            );
            return formattedDate;
        }

        if (settings.taskPostfix.includes("{current_datetime}")) {
            const formattedDate = moment(task.completedAt).format(
                "YYYY-MM-DD HH:mm"
            );
            return formattedDate;
        }
    }

    function renderTaskPostfix(task: any) {
        let regex =
            /{task_finish_date}|{task_finish_datetime}|{current_date}|{current_datetime}/g;
        return settings.taskPostfix.replace(regex, renderTaskFinishDate(task));
    }

    function renderTaskPrefix(task: any, index: number) {
        let regex = /{auto_increment}/g;
        return settings.taskPrefix.replace(regex, `${index + 1}`);
    }

    try {
        let allTasks = "";

        function renderProjectHeader(project: any) {
            if (settings.renderProjectsHeaders) {
                return `\n* ${project.name}\n`;
            }
            return "";
        }

        function renderTaskText(tasks: any, settings: TodoistSettings) {
            return tasks.reverse().map((t: any, index: number) => {
                let formattedParentPrefix = renderTaskPrefix(t, index);
                let formattedParentPostfix = renderTaskPostfix(t);
                let returnString = "";
                if (settings.renderProjectsHeaders) {
                    returnString = `\t${formattedParentPrefix} ${t.content} ${formattedParentPostfix}`;
                } else {
                    returnString = `${formattedParentPrefix} ${t.content} ${formattedParentPostfix}`;
                }

                if (t.childTasks.length > 0) {
                    const childTasks = t.childTasks
                        .reverse()
                        .map((childTask: any, index: number) => {
                            let formattedChildPrefix = renderTaskPrefix(
                                childTask,
                                index
                            );
                            let formattedPostfix = renderTaskPostfix(childTask);

                            if (settings.renderProjectsHeaders) {
                                return `\t\t${formattedChildPrefix} ${childTask.content} ${formattedPostfix}`;
                            } else {
                                return `\t${formattedChildPrefix} ${childTask.content} ${formattedPostfix}`;
                            }
                        });
                    returnString += "\n" + childTasks.join("\n");
                }
                return returnString;

            });
        }

        if (settings.renderProjectsHeaders) {
            for (const [key, project] of Object.entries(projectsMetadata)) {
                let projectTasks: RawTodoistTask[] = tasks.filter(
                    (task: any) => task.projectId === key
                );
                allTasks += renderProjectHeader(project);

                let formattedTasks: string[] = renderTaskText(projectTasks, settings);

                allTasks += formattedTasks.join("\n");
            }

            allTasks = allTasks + `\n`;

            return allTasks;
        } else {
            let formattedTasks = renderTaskText(tasks, settings);
            formattedTasks = formattedTasks.join("\n");
            formattedTasks = `\n` + formattedTasks + `\n`;
            return formattedTasks;
        }
    } catch (error) {
        console.error(error);
        new Notice(
            "There was a problem formatting your tasks. Check the console for more details.",
            10000
        );
        return "";
    }
}

export { renderTasksAsText, prepareTasksForRendering };
