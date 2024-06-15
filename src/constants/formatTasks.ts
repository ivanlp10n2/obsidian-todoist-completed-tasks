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

export const renderMarkdown: (task: TodoistTask, project: TodoistApi.GetAllTasks.CompletedTaskProject) => string =
    (task: TodoistTask, project: TodoistApi.GetAllTasks.CompletedTaskProject) => {
        const buildTags = (task: TodoistTask, project: TodoistApi.GetAllTasks.CompletedTaskProject) => {
            const tags = ['todoist']
            const completedStatus = task.completedAt ? 'done' : 'inprogress'
            const projectName = project.name.replace(' ', '-') ?? 'null'
            tags.push(`todoist-project-${projectName}`)
            tags.push(`todoist-status-${completedStatus}`)
            const renderTags = tags.join(', ')
            return renderTags
        }
        const buildMetadata = (task: TodoistTask, project: TodoistApi.GetAllTasks.CompletedTaskProject) => {
            const metaTag = `---`
            return `${metaTag}` +
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
                `todoist_labels: ${task.labels}` + `\n` +
                `todosit_status: ${task.completedAt ? 'done' : 'inprogress'}` + `\n` +
                `tags: [${buildTags(task, project)}]` + `\n` +
                `${metaTag}` +
                `\n`
        }

        const buildHref = (task: TodoistTask) => {
            const replaceSpacesWithHyphen = (text: string) => text.replace(/ /g, '-')
            const hrefTitle = replaceSpacesWithHyphen(task.title)
            const hrefApp = `https://app.todoist.com/app/task/${hrefTitle}-${task.taskId}`
            const hrefApi = `https://api.todoist.com/sync/v9/items/get?item_id=${task.taskId}`
            const hrefHeader = `### Href`
            return `${hrefHeader}` +
                `\nApp: ${hrefApp}` +
                `\nApi: ${hrefApi}`
        }

        const newRender: string =
            buildMetadata(task, project) +
            `\n## ${task.title}` +
            `\n### Description` +
            `\n${task.description ? task.description : ''}` +
            `\n### Subtasks` +
            `\n${task.childTasks ? task.childTasks : ''}` +
            `\n${buildHref(task)}`
            ;


        return newRender;

    }