import { moment, Notice } from "obsidian";
import { TodoistSettings } from "../constants/DefaultSettings";
import { RawTodoistTask } from "../constants/shared";
import { TodoistTask } from "src/constants/shared";
import { TodoistApi } from "src/constants/fetchTasks";

const neverUpdated = "1970-01-01T00:00:00Z";

type neededToRender = {
    taskId: string;
    content: string;
    dueAt?: string | null;
    isRecurring?: boolean;
    labels: string[];
    createdAt: string;
    updatedAt: string;
    projectId?: string;
    parentId?: string;
    completedAt?: string | null;
    description?: null
}
function buildRenderText(task: neededToRender, project: TodoistApi.GetAllTasks.CompletedTaskProject, indentLevel: number = 2): string {
    // const indent = '\t'.repeat(indentLevel);
    const metaTag = `---`
    const newRender: string =
        `${metaTag}` +
        `\n` +
        `date: ${task.completedAt ?? task.createdAt}` + `\n` +
        `todoist_is_completed: ${task.completedAt ? 'true' : 'false'}` + `\n` +
        `todoist_task_id: ${task.taskId}` + `\n` +
        `todoist_created_at: ${task.createdAt}` + `\n` +
        `todoist_updated_at: ${task.updatedAt ?? 'null'}` + `\n` +
        `todoist_project_name: ${project.name ?? 'null'}` + `\n` +
        `todoist_completed_at: ${task.completedAt ?? 'null'}` + `\n` +
        `todoist_project_id: ${task.projectId ?? 'null'}` + `\n` +
        `todoist_parent_id: ${task.parentId ?? 'null'}` + `\n` +
        `todoist_status: ${task.completedAt ? 'done' : 'inprogress'}` + `\n` +
        `todoist_is_recurring: ${task.isRecurring ?? 'false'}` + `\n` +
        `todoist_lables: ${task.labels}` + `\n` +
        `todosit_status: ${task.completedAt ? 'done' : 'inprogress'}` + `\n` +
        `tags: [todoist, ${project.name ?? 'null'}, ${task.completedAt ? 'done' : 'inprogress'}]` + `\n` +
        `${metaTag}` +
        `\n` +
        `## ${task.content}\n` +
        `### Overview\n` +
        `${task.description}\n` +
        `### Subtasks\n`
        ;


    return newRender;
}
function prepareTasksForRendering(tasks: RawTodoistTask[]): TodoistTask[] {
    // console.log("prepare tasks for rendering", tasks);
    let childTasks: RawTodoistTask[] = tasks.filter(
        (task: RawTodoistTask) => task.parentId !== null
    );

    let renderedTasks: TodoistTask[] = [];

    tasks.forEach((task: RawTodoistTask) => {
        if (task.parentId === null) {
            renderedTasks.push({
                taskId: task.taskId,
                content: task.content,
                completedAt: task.completedAt,
                projectId: task.projectId,
                projectName: task.projectId, // todo: get project name from projectId
                parentId: task.parentId,
                childTasks: [],
                createdAt: task.createdAt,
                updatedAt: task.updatedAt == neverUpdated ? null : task.updatedAt,
                dueAt: task.dueAt,
                isRecurring: task.isRecurring,
                labels: task.labels
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
            completedAt: task.completedAt,
            projectId: task.projectId,
            projectName: task.projectName,
            parentId: task.parentId,
            childTasks: [],
            createdAt: task.createdAt,
            updatedAt: task.updatedAt == neverUpdated ? null : task.updatedAt,
            dueAt: task.dueAt,
            isRecurring: task.isRecurring,
            labels: task.labels
        });
    });

    // console.log("prepare tasks for rendering results", renderedTasks);
    return renderedTasks;
}

function renderTasksAsText(
    tasks: TodoistTask[],
    projectsMetadata: any,
    settings: TodoistSettings
): string[] {
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

        function renderTaskText(tasks: TodoistTask[], settings: TodoistSettings) {
            const metaTag = `---`;
            const newLine = `\n`;
            const indent = `\t`;
            return tasks.reverse().map((t: any, index: number) => {
                let returnString = "";
                const project: TodoistApi.GetAllTasks.CompletedTaskProject = projectsMetadata[t.projectId];
                returnString = buildRenderText(t, project);
                return returnString;
            });
        }

        // if (settings.renderProjectsHeaders) {
        //     for (const [key, project] of Object.entries(projectsMetadata)) {
        //         let projectTasks: TodoistTask[] = tasks.filter(
        //             (task: TodoistTask) => task.projectId === key
        //         );
        //         allTasks += renderProjectHeader(project);

        //         let formattedTasks: string[] = renderTaskText(projectTasks, settings);

        //         allTasks += formattedTasks.join("\n");
        //     }

        //     allTasks = allTasks + `\n`;

        //     return allTasks;
        // } else {
            let formattedTasks: string[] = renderTaskText(tasks, settings);
            // formattedTasks = formattedTasks.join("\n");
            // formattedTasks = `\n` + formattedTasks + `\n`;
            return formattedTasks;
        // }
    } catch (error) {
        console.error(error);
        new Notice(
            "There was a problem formatting your tasks. Check the console for more details.",
            10000
        );
        return [];
    }
}

export { renderTasksAsText, prepareTasksForRendering };
