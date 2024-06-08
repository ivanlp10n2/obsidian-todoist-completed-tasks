
import { RawTodoistTask } from "./shared";

const TodoistApi = "https://api.todoist.com/sync/v9";

export const UrlGetItem = (todoistId: string): string => {
    return `${TodoistApi}/items/get?item_id=${todoistId}`;
};

export type CompletedObsidianTask = {
    completed_at: string;
    content: string;
    id: string;
    item_object: null;
    meta_data: null;
    note_count: number;
    notes: [];
    project_id: string;
    section_id: string;
    task_id: string;
    user_id: string;
}

export type CompletedProjectsMap = {
    [key: string]: CompletedTaskApiObsidianProject;
}
export type CompletedTaskApiObsidianProject = {
    name: string;
    id: string;
    parent_id: string;
    is_archived: boolean;
    is_deleted: boolean;
    is_favorite: boolean;
    created_at: string;
    updated_at: string;
    view_style: string;
}

export type CompletedSectionsMap = {
    [key: string]: CompletedTaskApiObsidianSection;
}

export type CompletedTaskApiObsidianSection = {
    added_at: string;
    archived_at: string | null;
    collapsed: boolean;
    id: string;
    is_archived: boolean;
    is_deleted: boolean;
    name: string;
    project_id: string;
    section_order: number;
    user_id: string;
}


export type UrlGetAllItemsFilter = { 
    timeStartFormattedDate: string; /* 2022-01-01 */
    timeStartFormattedTime: string; /* 00:00:00 */
    timeEndFormattedDate: string; /* 2022-01-01 */
    timeEndFormattedTime: string; /* 23:59:59 */
    limit: number; /* 100 */
}
export const DefaultParams: UrlGetAllItemsFilter = {
    timeStartFormattedDate: "2022-01-01",
    timeStartFormattedTime: "00:00:00",
    timeEndFormattedDate: "2022-02-01",
    timeEndFormattedTime: "00:00:00",
    limit: 100,
}
export const UrlGetAllItems: (params: UrlGetAllItemsFilter) => string = 
(params: UrlGetAllItemsFilter) => {
    return `${TodoistApi}/completed/get_all` 
        + `?since=` + params.timeStartFormattedDate + `T` + params.timeStartFormattedTime
        + `&until=` + params.timeEndFormattedDate + `T` + params.timeEndFormattedTime
        + `&limit=${params.limit}`
    ;
};

export type TopStructureCompletedTasksApiResponse = {
    items: CompletedObsidianTask[],
    projects: CompletedProjectsMap,
    sections: CompletedSectionsMap
}

export const NetworkErrorMsg = "There was a problem pulling data from Todoist. Is your internet connection working?"
export const UnauthenticatedErrorMsg = "Authentication with todoist server failed. Check that " + 
    "your API token is set correctly in the settings.";
export const DefaultErrorMsg = (e: Error) => {
    return `There was a problem pulling data from Todoist. ${e.message}`
}

export function HandleErrorMsg(e: any): string {
    switch (e.httpStatusCode) {
        case undefined:
            return NetworkErrorMsg;
        case 403:
            return UnauthenticatedErrorMsg;
        default:
            return DefaultErrorMsg(e);
    }
}

export function ConvertToRawDomain(
    task: any,
    isRenderingSubtask: boolean
): RawTodoistTask {
    if (isRenderingSubtask) {
        return { //fetch - single-api
            taskId: task.item.id,
            parentId: task.item.parent_id,
            content: task.item.content,
            dateCompleted: task.item.completed_at,
            projectId: task.project.id,
        };
    } else {
        return { //fetch - get-all-api.items
            taskId: task.task_id,
            parentId: null as null,
            content: task.content,
            dateCompleted: task.completed_at,
            projectId: task.project_id,
        };
    }

}


