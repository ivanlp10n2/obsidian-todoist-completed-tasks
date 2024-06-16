import { TodoistApi } from "./fetchTasks";
import { TodoistTask } from "./shared";

export type TimeFrames = {
    timeStartFormattedDate: string;
    timeStartFormattedTime: string;
    timeEndFormattedDate: string;
    timeEndFormattedTime: string;
}

export const renderMarkdown: (task: TodoistTask, project: TodoistApi.GetAllTasks.CompletedTaskProject, section: TodoistApi.GetAllTasks.CompletedTaskSection) => string =
    (task: TodoistTask, project: TodoistApi.GetAllTasks.CompletedTaskProject, section: TodoistApi.GetAllTasks.CompletedTaskSection) => {
        const buildTags = (task: TodoistTask, project: TodoistApi.GetAllTasks.CompletedTaskProject, section: TodoistApi.GetAllTasks.CompletedTaskSection) => {
            const tags = ['todoist']
            const completedStatus = task.completedAt ? 'done' : 'inprogress'
            const projectName = project.name.replace(' ', '-') ?? 'null'
            const sectionName = section.name.replace(' ', '-') ?? 'null'
            tags.push(`todoist-project-${projectName}`)
            tags.push(`todoist-section-${sectionName}`)
            tags.push(`todoist-status-${completedStatus}`)
            const renderTags = tags.join(', ')
            return renderTags
        }
        const buildMetadata = (
            task: TodoistTask,
            project: TodoistApi.GetAllTasks.CompletedTaskProject,
            section: TodoistApi.GetAllTasks.CompletedTaskSection
        ) => {
            const metaTag = `---`
            const completedStatus = task.completedAt ? 'done' : 'inprogress'
            return `${metaTag}` +
                `\n` + `date: ${task.completedAt ?? task.createdAt}` + 
                `\n` + `todoist_task_id: ${task.taskId}` + 
                `\n` + `todoist_is_completed: ${task.completedAt ? 'true' : 'false'}` + 
                `\n` + `todoist_priority: ${task.priority ?? 'null'}` + 
                `\n` + `todoist_project_id: ${task.projectId ?? 'null'}` + 
                `\n` + `todoist_section_id: ${task.sectionId ?? 'null'}` + 
                `\n` + `todoist_created_at: ${task.createdAt}` + 
                `\n` + `todoist_updated_at: ${task.updatedAt ?? 'null'}` + 
                `\n` + `todoist_project_name: ${project.name ?? 'null'}` + 
                `\n` + `todoist_section_name: ${section.name ?? 'null'}` + 
                `\n` + `todoist_completed_at: ${task.completedAt ?? 'null'}` + 
                `\n` + `todoist_parent_id: ${task.parentId ?? 'null'}` + 
                `\n` + `todoist_is_recurring: ${task.isRecurring ?? 'false'}` + 
                `\n` + `todoist_labels: ${task.labels ?? 'null'}` + 
                `\n` + `todoist_status: ${completedStatus}` + 
                `\n` + `tags: [${buildTags(task, project, section)}]` + 
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
            buildMetadata(task, project, section) +
            `\n` +
            `${buildSubTitle(task)}` +
            `${buildDescription(task)}` +
            `${buildSubtasks(task)}` +
            `${buildHref(task)}`
            ;


        return newRender;

    }