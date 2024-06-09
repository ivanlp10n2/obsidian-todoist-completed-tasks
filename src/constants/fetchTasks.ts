
import { RawTodoistTask } from "./shared";

const TodoistApi = "https://api.todoist.com/sync/v9";

export const UrlGetItem = (todoistId: string): string => {
    return `${TodoistApi}/items/get?item_id=${todoistId}`;
};

export type ObsidianTaskApi = {
    ancestors: [],
    item: ObsidianGetTaskApi.ObsidianItemApi,
    project: ObsidianGetTaskApi.ObsidianProjectApi,
    section: ObsidianGetTaskApi.ObsidianSectionApi,
}

export module ObsidianCompletedTaskApi {
    /**
     * example json:
     * {
    "items": [
        {
            "completed_at": "2023-06-17T13:26:46.000000Z",
            "content": "What it takes - Stephen Schwarzman",
            "id": "6405499044",
            "item_object": null,
            "meta_data": null,
            "note_count": 0,
            "notes": [],
            "project_id": "2308886701",
            "section_id": "117184017",
            "task_id": "6973917578",
            "user_id": "7429672
        },
        {
            "completed_at": "2023-06-17T13:23:53.000000Z",
            "content": "Resolver el numero de telefono",
            "id": "6405494055",
            "item_object": null,
            "meta_data": null,
            "note_count": 0,
            "notes": [],
            "project_id": "2308886701",
            "section_id": "117184024",
            "task_id": "6965182658",
            "user_id": "7429672
        }
    ],
    "projects": {
        "2308886701": {
            "can_assign_tasks": false,
            "child_order": 0,
            "collapsed": false,
            "color": "lavender",
            "created_at": "2023-07-13T11:05:04Z",
            "id": "2308886701",
            "is_archived": true,
            "is_deleted": false,
            "is_favorite": false,
            "name": "June 2023",
            "parent_id": null,
            "shared": false,
            "sync_id": null,
            "updated_at": "2024-03-29T14:22:25Z",
            "v2_id": "6P5Q7J4hfJC67c6m",
            "v2_parent_id": null,
            "view_style": "board"
        }
    },
    "sections": {
        "117184017": {
            "added_at": "2023-03-02T01:49:42.278867Z",
            "archived_at": null,
            "collapsed": false,
            "id": "117184017",
            "is_archived": false,
            "is_deleted": false,
            "name": "Better me",
            "project_id": "2308886701",
            "section_order": 1,
            "sync_id": null,
            "user_id": "7429672,
            "v2_id": "68539cm5GCpXCHQm",
            "v2_project_id": "6P5Q7J4hfJC67c6m"
        },
        "117184024": {
            "added_at": "2023-03-02T01:49:42.955631Z",
            "archived_at": null,
            "collapsed": false,
            "id": "117184024",
            "is_archived": false,
            "is_deleted": false,
            "name": "material tasks",
            "project_id": "2308886701",
            "section_order": 12,
            "sync_id": null,
            "user_id": "7429672,
            "v2_id": "6853xVmrVpWhXWqF",
            "v2_project_id": "6P5Q7J4hfJC67c6m"
        }
    }
}
     */

    export type TopStructureCompletedTasksApiResponse = {
        items: CompletedObsidianTask[],
        projects: CompletedProjectsMap,
        sections: CompletedSectionsMap
    }

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


export type GetAllCompletedTasks = {
    taskResults: [],
    projectsResults: any
}

export module FetchErrors {
    export const NetworkErrorMsg = "There was a problem pulling data from Todoist. Is your internet connection working?"
    export const UnauthenticatedErrorMsg = "Authentication with todoist server failed. Check that " +
        "your API token is set correctly in the settings.";
    export const DefaultErrorMsg = (e: Error) => {
        return `There was a problem pulling data from Todoist. ${e.message}`
    }
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


export module ObsidianGetTaskApi {
    /** * Example json: 
     * * {
     * "ancestors": [],
     * "item": {
         "added_at": "2023-06-17T13:25:07.453000Z",
         "added_by_uid": "7429672",
         "assigned_by_uid": null,
         "checked": false,
         "child_order": 8,
         "collapsed": false,
         "completed_at": null,
         "content": "Escuchar 3 audiolibros",
         "description": "",
         "due": null,
         "duration": null,
         "id": "6973914935",
         "is_deleted": false,
         "labels": [
             "✅",
             "🟩🟩🟩🟩🟩"
         ],
         "parent_id": null,
         "priority": 1,
         "project_id": "2308886701",
         "responsible_uid": null,
         "section_id": "117184028",
         "sync_id": null,
         "updated_at": "2023-07-10T03:14:40Z",
         "user_id": "7429672",
         "v2_id": "68r8PcHJ28F8Xm4m",
         "v2_parent_id": null,
         "v2_project_id": "6P5Q7J4hfJC67c6m",
         "v2_section_id": "68539cm5GCpXCHQm"
     },
     "notes": [],
     "project": {
         "can_assign_tasks": false,
         "child_order": 0,
         "collapsed": false,
         "color": "lavender",
         "created_at": "2023-07-13T11:05:04Z",
         "id": "2308886701",
         "is_archived": true,
         "is_deleted": false,
         "is_favorite": false,
         "name": "June 2023",
         "parent_id": null,
         "shared": false,
         "sync_id": null,
         "updated_at": "2024-03-29T14:22:25Z",
         "v2_id": "6P5Q7J4hfJC67c6m",
         "v2_parent_id": null,
         "view_style": "board"
     },
     "section": {
         "added_at": "2023-03-02T01:49:42.278867Z",
         "archived_at": null,
         "collapsed": false,
         "id": "117184028",
         "is_archived": false,
         "is_deleted": false,
         "name": "Better me",
         "project_id": "2308886701",
         "section_order": 1,
         "sync_id": null,
         "user_id": "7429672",
         "v2_id": "68539cm5GCpXCHQm",
         "v2_project_id": "6P5Q7J4hfJC67c6m"
     }
 }
  */

    /**
     * "item": {
            "added_at": "2023-06-17T13:25:07.453000Z",
            "added_by_uid": "7429672",
            "assigned_by_uid": null,
            "checked": false,
            "child_order": 8,
            "collapsed": false,
            "completed_at": null,
            "content": "Escuchar 3 audiolibros",
            "description": "",
            "due": null,
            "duration": null,
            "id": "6973914935",
            "is_deleted": false,
            "labels": [
                "✅",
                "🟩🟩🟩🟩🟩"
            ],
            "parent_id": null,
            "priority": 1,
            "project_id": "2308886701",
            "responsible_uid": null,
            "section_id": "117184028",
            "sync_id": null,
            "updated_at": "2023-07-10T03:14:40Z",
            "user_id": "7429672",
            "v2_id": "68r8PcHJ28F8Xm4m",
            "v2_parent_id": null,
            "v2_project_id": "6P5Q7J4hfJC67c6m",
            "v2_section_id": "68539cm5GCpXCHQm"
        }
     */
    export type ObsidianItemApi = {
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
    // /**
    //  * example json:
    //  *     "project": {
    //         "can_assign_tasks": false,
    //         "child_order": 0,
    //         "collapsed": false,
    //         "color": "lavender",
    //         "created_at": "2023-07-13T11:05:04Z",
    //         "id": "2308886701",
    //         "is_archived": true,
    //         "is_deleted": false,
    //         "is_favorite": false,
    //         "name": "June 2023",
    //         "parent_id": null,
    //         "shared": false,
    //         "sync_id": null,
    //         "updated_at": "2024-03-29T14:22:25Z",
    //         "v2_id": "6P5Q7J4hfJC67c6m",
    //         "v2_parent_id": null,
    //         "view_style": "board"
    //     }
    //  */
    export type ObsidianProjectApi = {
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
    // /**
    //  * example json:
    //  * "section": {
    //         "added_at": "2023-03-02T01:49:42.278867Z",
    //         "archived_at": null,
    //         "collapsed": false,
    //         "id": "117184028",
    //         "is_archived": false,
    //         "is_deleted": false,
    //         "name": "Better me",
    //         "project_id": "2308886701",
    //         "section_order": 1,
    //         "sync_id": null,
    //         "user_id": "7429672",
    //         "v2_id": "68539cm5GCpXCHQm",
    //         "v2_project_id": "6P5Q7J4hfJC67c6m"
    //     }
    //  */
    export type ObsidianSectionApi = {
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
