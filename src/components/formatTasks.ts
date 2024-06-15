import { Notice } from "obsidian";
import { TodoistApi } from "src/constants/fetchTasks";
import { TodoistTask } from "src/constants/shared";
import { RawTodoistTask } from "../constants/shared";

const neverUpdated = "1970-01-01T00:00:00Z";

function buildRenderText(task: TodoistTask, project: TodoistApi.GetAllTasks.CompletedTaskProject, indentLevel: number = 2): string {
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
        `## ${task.title}\n` +
        `### Overview\n` +
        `${task.description}\n` +
        `### Subtasks\n`
        ;


    return newRender;
}
function prepareTasksForRendering(tasks: RawTodoistTask[], projectsMetadata: TodoistApi.GetAllTasks.CompletedProjectsMap): TodoistTask[] {
    // console.log("prepare tasks for rendering", tasks);
    let tasksWithParentId: RawTodoistTask[] = tasks.filter(
        (task: RawTodoistTask) => task.parentId !== null
    );

    let renderedTasks: TodoistTask[] = [];

    tasks.forEach((task: RawTodoistTask) => {
        if (task.parentId === null) {
            renderedTasks.push({
                taskId: task.taskId,
                title: task.content,
                completedAt: task.completedAt,
                projectId: task.projectId,
                projectName: projectsMetadata[task.projectId].name,
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

    tasksWithParentId.forEach(async (task: any) => {
        const parentTaskIndex: number = renderedTasks.findIndex(
            (t: TodoistTask) => t.taskId === task.parentId
        );

        renderedTasks[parentTaskIndex].childTasks.push({
            taskId: task.taskId,
            title: task.content,
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

function renderTaskAsText(
    task: TodoistTask,
    project: TodoistApi.GetAllTasks.CompletedTaskProject,
): string {
    try {
        return buildRenderText(task, project);
    } catch (error) {
        console.error(error);
        new Notice(
            "There was a problem formatting your tasks. Check the console for more details.",
            10000
        );
        return "";
    }
}

function renderTasksAsText(
    tasks: TodoistTask[],
    projectsMetadata: any,
): string[] {
    try {
        return tasks.reverse().map((t: any, index: number) => {
            let returnString = "";
            const project: TodoistApi.GetAllTasks.CompletedTaskProject = projectsMetadata[t.projectId];
            returnString = buildRenderText(t, project);
            return returnString;
        });

    } catch (error) {
        console.error(error);
        new Notice(
            "There was a problem formatting your tasks. Check the console for more details.",
            10000
        );
        return [];
    }
}

export { prepareTasksForRendering, renderTaskAsText, renderTasksAsText };

