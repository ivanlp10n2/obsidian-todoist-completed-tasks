import { TodoistTask } from "./shared";

export type TimeFrames = {
    timeStartFormattedDate: string;
    timeStartFormattedTime: string;
    timeEndFormattedDate: string;
    timeEndFormattedTime: string;
}

export const renderMarkdown: (task: TodoistTask) => string =
    (task: TodoistTask) => {
        const buildTags = (task: TodoistTask) => {
            const tags = ['todoist']
            const completedStatus = task.completedAt ? 'done' : 'inprogress'
            const projectName = task.projectName.replace(' ', '-') ?? 'null'
            const sectionName = task.sectionName.replace(' ', '-') ?? 'null'
            tags.push(`todoist-project-${projectName}`)
            tags.push(`todoist-section-${sectionName}`)
            tags.push(`todoist-status-${completedStatus}`)
            const renderTags = tags.join(', ')
            return renderTags
        }
        const buildMetadata = (
            task: TodoistTask
        ) => {
            const metaTag = `---`
            const completedStatus = task.completedAt ? 'done' : 'inprogress'
            return `${metaTag}` +
                `\n` + `date: ${task.dueAt}` + 
                `\n` + `todoist_is_completed: ${task.completedAt ? 'true' : 'false'}` + 
                `\n` + `todoist_is_recurring: ${task.isRecurring ?? 'false'}` + 
                `\n` + `todoist_created_at: ${task.createdAt}` + 
                `\n` + `todoist_updated_at: ${task.updatedAt ?? 'null'}` + 
                `\n` + `todoist_task_id: ${task.taskId}` + 
                `\n` + `todoist_priority: ${task.priority ?? 'null'}` + 
                `\n` + `todoist_project_id: ${task.projectId ?? 'null'}` + 
                `\n` + `todoist_section_id: ${task.sectionId ?? 'null'}` + 
                `\n` + `todoist_project_name: ${task.projectName ?? 'null'}` + 
                `\n` + `todoist_section_name: ${task.sectionName ?? 'null'}` + 
                `\n` + `todoist_completed_at: ${task.completedAt ?? 'null'}` + 
                `\n` + `todoist_parent_id: ${task.parentId ?? 'null'}` + 
                `\n` + `todoist_labels: ${task.labels ?? 'null'}` + 
                `\n` + `todoist_status: ${completedStatus}` + 
                `\n` + `tags: [${buildTags(task)}]` + 
                `\n` + `${metaTag}`
        }

        const buildSubTitle = (task: TodoistTask) => {
            return `\n## ${task.title}`
        }
        const buildDescription = (task: TodoistTask) => {
            const descriptionHeader = '### Description'
            const description = task.description ? task.description : ''
            return `\n${descriptionHeader}` +
                `\n${description}`
        }

        const buildSubtasks = (task: TodoistTask) => {
            const subtaskHeader = '### Subtasks'
            const subtasks = task.childTasks ? task.childTasks : ''
            return `\n${subtaskHeader}` +
                `\n${subtasks}`
        }

        const buildHref = (task: TodoistTask) => {
            const replaceSpacesWithHyphen = (text: string) => text.replace(/ /g, '-')
            const hrefTitle = replaceSpacesWithHyphen(task.title)
            const hrefApp = `https://app.todoist.com/app/task/${hrefTitle}-${task.taskId}`
            const hrefApi = `https://api.todoist.com/sync/v9/items/get?item_id=${task.taskId}`
            const hrefHeader = `### Href`
            return `\n${hrefHeader}` +
                `\nApp: ${hrefApp}` +
                `\nApi: ${hrefApi}`
        }

        const newRender: string =
            buildMetadata(task) +
            `\n` +
            `${buildSubTitle(task)}` +
            `${buildDescription(task)}` +
            `${buildSubtasks(task)}` +
            `${buildHref(task)}`
            ;


        return newRender;

    }