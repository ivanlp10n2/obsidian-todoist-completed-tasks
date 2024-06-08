import { Notice } from "obsidian";

import { RawTodoistTask } from "../constants/shared";
import { 
    UrlGetItem, UrlGetAllItems, NetworkErrorMsg, UnauthenticatedErrorMsg, DefaultErrorMsg, HandleErrorMsg, ConvertToRawDomain, CompletedObsidianTask, 
    TopStructureCompletedTasksApiResponse } from "../constants/fetchTasks";


async function debugWrapper(url: string, options: RequestInit): Promise<any> {
    const jsonResponse: any = await fetch(url, options).then((res) => res.json());
    // console.log(`task_id [${jsonResponse.item.id}] : `, jsonResponse)
    return jsonResponse;
}
export async function fetchSingleTask(
    authToken: string,
    taskId: string,
    fetchJsonResponse: (url: string, options: RequestInit) => Promise<any> = debugWrapper
): Promise<any> {
    try {
        const url = UrlGetItem(taskId);
        let task = await fetchJsonResponse(url,
            { headers: { Authorization: `Bearer ${authToken}` }, })
            .then((res: any) => { return ConvertToRawDomain(res, true); });
        return task;
    } catch (e: any) {
        let errorMsg = HandleErrorMsg(e);
        console.error(errorMsg, e);
        new Notice(errorMsg);
        throw e;
    }
}

export async function fetchCompletedTasks(
    authToken: string,
    timeFrames: any,
    fetchJsonResponse: (url: string, options: RequestInit) => Promise<any> = debugWrapper
): Promise<any> {
    const {
        timeStartFormattedDate,
        timeStartFormattedTime,
        timeEndFormattedDate,
        timeEndFormattedTime,
    } = timeFrames;
    // console.log("input for fetchTasks: ", timeStartFormattedDate, timeStartFormattedTime, timeEndFormattedDate, timeEndFormattedTime)

    // const limit = renderSubtasks ? 30 : 200;
    const limit = 200; // https://developer.todoist.com/sync/v9/#get-all-completed-items
    const url = UrlGetAllItems({
        timeStartFormattedDate: timeStartFormattedDate,
        timeStartFormattedTime: timeStartFormattedTime,
        timeEndFormattedDate: timeEndFormattedDate,
        timeEndFormattedTime: timeEndFormattedTime,
        limit: limit
    })
    let mappedResults: any[] = [];

    try {
        const completedTasksMetadata: TopStructureCompletedTasksApiResponse = await fetchJsonResponse(url, {
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
            async (task: CompletedObsidianTask) => {
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

        console.log("childTasks", childTasks)

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
                task.dateCompleted = null;
            } else {
                task.dateCompleted = taskMetadata.completed_at;
            }
        });
        const result = {
            tasksResults: mappedResults,
            projectsResults: projectsMetadata,
        }
        // console.log("output for fetchTasks: ", result)
        return result;
    } catch (e) {
        let errorMsg = HandleErrorMsg(e);
        console.error(errorMsg, e);
        new Notice(errorMsg);
        throw e;
    }
}
async function fetchParents(childTasks: any[], mappedResults: any[], authToken: string, fetchJsonResponse: (url: string, options: RequestInit) => Promise<any>) {

}

