import { TodoistApi } from "./fetchTasks";
import { TodoistTask } from "./shared";

/**
 * {
        timeStartFormattedDate,
        timeStartFormattedTime,
        timeEndFormattedDate,
        timeEndFormattedTime,
    }
 */
export type TimeFrames = {
    timeStartFormattedDate: string;
    timeStartFormattedTime: string;
    timeEndFormattedDate: string;
    timeEndFormattedTime: string;
}

export function buildRenderText(task: TodoistTask, project: TodoistApi.GetAllTasks.CompletedTaskProject): string {
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

export const buildRenderText2: (task: TodoistTask, project: TodoistApi.GetAllTasks.CompletedTaskProject) => string =
    (task: TodoistTask, project: TodoistApi.GetAllTasks.CompletedTaskProject)  => {
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

