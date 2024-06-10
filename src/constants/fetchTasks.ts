
import { RawTodoistTask } from "./shared";


export module Domain {
    export type GetAllCompletedTasks = {
        taskResults: RawTodoistTask[],
        projectsResults: ObsidianApi.GetAllTasks.CompletedProjectsMap,
    }
}

export module Codecs {
    export function ConvertToRawDomain(
        task: any,
        isRenderingSubtask: boolean
    ): RawTodoistTask {
        if (isRenderingSubtask) {
            return { //fetch - single-api
                taskId: task.item.id,
                parentId: task.item.parent_id,
                content: task.item.content,
                completedAt: task.item.completed_at,
                projectId: task.project.id,
                createdAt: task.item.added_at,
                updatedAt: task.item.updated_at
            };
        } else {
            return { //fetch - get-all-api.items
                taskId: task.task_id,
                parentId: null as null,
                content: task.content,
                completedAt: task.completed_at,
                projectId: task.project_id,
                createdAt: task.added_at,
                updatedAt: task.updated_at,
            };
        }

    }
}

export module ObsidianApi {
    const TodoistApi = "https://api.todoist.com/sync/v9";
    export module GetTask {
        export const UrlGetItem = (todoistId: string): string => {
            return `${TodoistApi}/items/get?item_id=${todoistId}`;
        };
        export type SingleTaskResponse = {
            ancestors: [],
            item: SingleTaskItem,
            project: SingleTaskProject,
            section: SingleTaskSection,
        }
        export type SingleTaskItem = {
            added_at: string;
            added_by_uid: string;
            assigned_by_uid: string | null;
            checked: boolean;
            child_order: number;
            collapsed: boolean;
            completed_at: string | null;
            content: string;
            description: string;
            due: string | null;
            duration: string | null;
            id: string;
            is_deleted: boolean;
            labels: string[];
            parent_id: string | null;
            priority: number;
            project_id: string;
            responsible_uid: string | null;
            section_id: string;
            sync_id: string | null;
            updated_at: string;
            user_id: string;
            v2_id: string;
            v2_parent_id: string | null;
            v2_project_id: string;
            v2_section_id: string;
        }

        export type SingleTaskProject = {
            can_assign_tasks: boolean;
            child_order: number;
            collapsed: boolean;
            color: string;
            created_at: string;
            id: string;
            is_archived: boolean;
            is_deleted: boolean;
            is_favorite: boolean;
            name: string;
            parent_id: string | null;
            updated_at: string;
            v2_id: string;
            v2_parent_id: string | null;
            view_style: string;
        }

        export type SingleTaskSection = {
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
            v2_id: string;
            v2_project_id: string;
        }



    }
    export module GetAllTasks {
        export const UrlGetAllItems: (params: UrlGetAllItemsFilter) => string =
            (params: UrlGetAllItemsFilter) => {
                return `${TodoistApi}/completed/get_all`
                    + `?since=` + params.timeStartFormattedDate + `T` + params.timeStartFormattedTime
                    + `&until=` + params.timeEndFormattedDate + `T` + params.timeEndFormattedTime
                    + `&limit=${params.limit}`
                    ;
            };

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
        export type CompletedTasksResponse = {
            items: CompletedTask[],
            projects: CompletedProjectsMap,
            sections: CompletedSectionsMap
        }

        export type CompletedTask = {
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
            [key: string]: CompletedTaskProject;
        }
        export type CompletedTaskProject = {
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
            [key: string]: CompletedTaskSection;
        }

        export type CompletedTaskSection = {
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

    }
    export module FetchErrors {
        export const NetworkErrorMsg = "There was a problem pulling data from Todoist. Is your internet connection working?"
        export const UnauthenticatedErrorMsg = "Authentication with todoist server failed. Check that " +
            "your API token is set correctly in the settings.";
        export const DefaultErrorMsg = (e: Error) => {
            return `There was a problem pulling data from Todoist. ${e.message}`
        }

        export function HandleErrorMsg(e: any): string {
            switch (e.httpStatusCode) {
                case undefined:
                    return FetchErrors.NetworkErrorMsg;
                case 403:
                    return FetchErrors.UnauthenticatedErrorMsg;
                default:
                    return FetchErrors.DefaultErrorMsg(e);
            }
        }
    }
}
