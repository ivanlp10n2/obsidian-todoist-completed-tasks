import { Notice } from "obsidian";

import { RawTodoistTask } from "../constants/shared";
import { ObsidianApi, Codecs } from "../constants/fetchTasks";
import { Domain } from "../constants/fetchTasks";
import { fold } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

// function decode(jsonResponse: unknown): ObsidianApi.GetTask.SingleTaskResponse | ObsidianApi.GetAllTasks.CompletedTasksResponse {
//   const singleTaskResponseDecoded = ObsidianApi.GetTask.SingleTaskResponseCodec.decode(jsonResponse);
//   const completedTasksResponseDecoded = ObsidianApi.GetAllTasks.CompletedTasksResponseCodec.decode(jsonResponse);

//   if (singleTaskResponseDecoded._tag === 'Right') {
//     return singleTaskResponseDecoded.right;
//   } else if (completedTasksResponseDecoded._tag === 'Right') {
//     return completedTasksResponseDecoded.right;
//   } else {
//     throw new Error("Invalid response type");
//   }
// }
async function debugWrapper(url: string, options: RequestInit): Promise<any> {
    const jsonResponse: any = await fetch(url, options).then((res) => res.json());
    // const converted: ObsidianApi.GetTask.SingleTaskResponse | ObsidianApi.GetAllTasks.CompletedTasksResponse = jsonResponse;
    
    return jsonResponse;
}
export async function fetchSingleTask(
    authToken: string,
    taskId: string,
    // fetchJsonResponse: (url: string, options: RequestInit) => Promise<ObsidianGetTaskApi.ObsidianItemApi> = debugWrapper
    fetchJsonResponse: (url: string, options: RequestInit) => Promise<any> = debugWrapper
): Promise<RawTodoistTask> {
    try {
        const url = ObsidianApi.GetTask.UrlGetItem(taskId);
        let task = await fetchJsonResponse(url,
            { headers: { Authorization: `Bearer ${authToken}` }, })
            .then((res: any) => { return Codecs.ConvertToRawDomain(res, true); });
        return task;
    } catch (e: any) {
        let errorMsg = ObsidianApi.FetchErrors.HandleErrorMsg(e);
        console.error(errorMsg, e);
        new Notice(errorMsg);
        throw e;
    }
}

export async function fetchCompletedTasks(
    authToken: string,
    timeFrames: any,
    // fetchJsonResponse: (url: string, options: RequestInit) => Promise<ObsidianCompletedTaskApi.CompletedTasksApiResponse> = debugWrapper
    fetchJsonResponse: (url: string, options: RequestInit) => Promise<any> = debugWrapper
): Promise<any> {
    const {
        timeStartFormattedDate,
        timeStartFormattedTime,
        timeEndFormattedDate,
        timeEndFormattedTime,
    } = timeFrames;

    // const limit = renderSubtasks ? 30 : 200;
    const limit = ObsidianApi.GetAllTasks.Limit;
    const url = ObsidianApi.GetAllTasks.UrlGetAllItems({
        timeStartFormattedDate: timeStartFormattedDate,
        timeStartFormattedTime: timeStartFormattedTime,
        timeEndFormattedDate: timeEndFormattedDate,
        timeEndFormattedTime: timeEndFormattedTime,
        limit: limit
    })
    let mappedResults: any[] = [];

    try {
        const completedTasksMetadata: ObsidianApi.GetAllTasks.CompletedTasksResponse = await fetchJsonResponse(url, {
            headers: { Authorization: `Bearer ${authToken}`, },
        })
        // If there are no completed tasks, return an empty array
        if (completedTasksMetadata.items.length === 0) {
            return mappedResults;
        }

        const projectsMetadata = completedTasksMetadata.projects;

        new Notice(
            completedTasksMetadata.items.length +
            " completed tasks found. Processing..."
        );

        const completedTasksPromises: Promise<RawTodoistTask>[] = completedTasksMetadata.items.map(
            async (task: ObsidianApi.GetAllTasks.CompletedTask) => {
                return fetchSingleTask(
                    authToken,
                    task.task_id,
                    fetchJsonResponse
                );
            }
        );
        mappedResults = await Promise.all(completedTasksPromises);

        let childTasks = mappedResults.filter(
            (task: RawTodoistTask) => task.parentId !== null
        );

        let queuedParentTasks = [] as string[];
        childTasks.forEach((task: any) => {
            const parentTask = mappedResults.find(
                (t: RawTodoistTask) => t.taskId === task.parentId
            );
            if (!parentTask && !queuedParentTasks.includes(task.parentId)) {
                // console.log("parent task is missed for ", task)
                let missedParentTask = fetchSingleTask(
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
        mappedResults.forEach((task: any) => {
            const taskMetadata = completedTasksMetadata.items.find(
                (t: any) => t.task_id === task.taskId
            );
            if (!taskMetadata) {
                task.completedAt = null;
            } else {
                task.completedAt = taskMetadata.completed_at;
            }
        });
        const result = {
            tasksResults: mappedResults as RawTodoistTask[],
            projectsResults: projectsMetadata as ObsidianApi.GetAllTasks.CompletedProjectsMap,
        } as Domain.GetAllCompletedTasks;

        console.log("output for fetchTasks: ", result)

        return result;
    } catch (e) {
        let errorMsg = ObsidianApi.FetchErrors.HandleErrorMsg(e);
        console.error(errorMsg, e);
        new Notice(errorMsg);
        throw e;
    }
}

