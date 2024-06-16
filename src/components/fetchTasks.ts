import { Notice } from "obsidian";

import { RawTodoistTask } from "../constants/shared";
import { TodoistApi, Codecs } from "../constants/fetchTasks";
import { FetchTasksDomain } from "../constants/fetchTasks";

async function debugWrapper(url: string, options: RequestInit): Promise<any> {
    const jsonResponse: any = await fetch(url, options).then((res) => res.json());
    return jsonResponse;
}
export async function fetchSingleTask(
    authToken: string,
    taskId: string,
    fetchJsonResponse: (url: string, options: RequestInit) => Promise<any> = debugWrapper
): Promise<RawTodoistTask> {
    try {
        const url = TodoistApi.GetTask.UrlGetItem(taskId);
        let task: RawTodoistTask = await fetchJsonResponse(url,
            { headers: { Authorization: `Bearer ${authToken}` }, })
            .then((res: any) => { return Codecs.ConvertToRawDomain(res, true); });
        return task;
    } catch (e: any) {
        let errorMsg = TodoistApi.FetchErrors.HandleErrorMsg(e);
        console.error(errorMsg, e);
        new Notice(errorMsg);
        throw e;
    }
}

export async function fetchCompletedTasks(
    authToken: string,
    timeFrames: any,
    fetchJsonResponse: (url: string, options: RequestInit) => Promise<TodoistApi.GetAllTasks.CompletedTasksResponse> = debugWrapper
): Promise<FetchTasksDomain.GetAllCompletedTasks> {
    const {
        timeStartFormattedDate,
        timeStartFormattedTime,
        timeEndFormattedDate,
        timeEndFormattedTime,
    } = timeFrames;

    const limit = TodoistApi.GetAllTasks.Limit;
    const url = TodoistApi.GetAllTasks.UrlGetAllItems({
        timeStartFormattedDate: timeStartFormattedDate,
        timeStartFormattedTime: timeStartFormattedTime,
        timeEndFormattedDate: timeEndFormattedDate,
        timeEndFormattedTime: timeEndFormattedTime,
        limit: limit
    })
    let mappedResults: RawTodoistTask[] = [];

    try {
        const completedTasksResponse: TodoistApi.GetAllTasks.CompletedTasksResponse = await fetchJsonResponse(url, {
            headers: { Authorization: `Bearer ${authToken}`, },
        })

        if (completedTasksResponse.items.length === 0) {
            return {
                tasksResults: mappedResults,
                projectsResults: {},
                sectionsResults: {},
            } as FetchTasksDomain.GetAllCompletedTasks;
        }

        new Notice(
            completedTasksResponse.items.length +
            " completed tasks found. Processing..."
        );

        const getTasks: Promise<RawTodoistTask>[] = completedTasksResponse.items.map(
            async (task: TodoistApi.GetAllTasks.CompletedTask) => {
                return fetchSingleTask(
                    authToken,
                    task.task_id,
                    fetchJsonResponse
                );
            }
        );
        mappedResults = await Promise.all(getTasks);

        let childTasks: RawTodoistTask[] = mappedResults.filter(
            (task: RawTodoistTask) => task.parentId !== null
        );

        let queuedParentTasks: string[] = [];
        childTasks.forEach(async (task: RawTodoistTask) => {
            const parentTask = mappedResults.find(
                (t: RawTodoistTask) => t.taskId === task.parentId
            );
            if (!parentTask && !queuedParentTasks.includes(task.parentId)) {
                let missedParentTask: RawTodoistTask = await fetchSingleTask(
                    authToken,
                    task.parentId,
                    fetchJsonResponse
                );
                mappedResults.push(missedParentTask); //adds the missing parent to 
                queuedParentTasks.push(task.parentId);
            }
        });
        mappedResults = await Promise.all(mappedResults);

        // Merge metadata dates into the task objects
        mappedResults.map((task: RawTodoistTask) => {
            const taskMetadata = completedTasksResponse.items.find(
                (t: any) => t.task_id === task.taskId
            );
            if (!taskMetadata) {
                task = {...task, completedAt: null};
            } else {
                task = {...task, completedAt: taskMetadata.completed_at};
            }
        });
        const result = {
            tasksResults: mappedResults as RawTodoistTask[],
            projectsResults: completedTasksResponse.projects as TodoistApi.GetAllTasks.CompletedProjectsMap,
            sectionsResults: completedTasksResponse.sections as TodoistApi.GetAllTasks.CompletedSectionsMap,
        } as FetchTasksDomain.GetAllCompletedTasks;

        if (result.tasksResults.length === 0) {
            new Notice("No completed tasks found for the given timeframe");
            return;
        }

        return result;
    } catch (e) {
        let errorMsg = TodoistApi.FetchErrors.HandleErrorMsg(e);
        console.error(errorMsg, e);
        new Notice(errorMsg);
        throw e;
    }
}

