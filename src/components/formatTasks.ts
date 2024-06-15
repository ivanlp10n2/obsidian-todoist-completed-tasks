import { Notice } from "obsidian";
import { TodoistApi } from "src/constants/fetchTasks";
import { TodoistTask } from "src/constants/shared";
import { RawTodoistTask } from "../constants/shared";
import { buildRenderText2 } from "../constants/formatTasks";


const neverUpdated = "1970-01-01T00:00:00Z";

function createTodoistTask(task: RawTodoistTask, projectName: string): TodoistTask {
    return {
        taskId: task.taskId,
        title: task.content,
        completedAt: task.completedAt,
        projectId: task.projectId,
        projectName,
        parentId: task.parentId,
        childTasks: [],
        createdAt: task.createdAt,
        updatedAt: task.updatedAt === neverUpdated ? null : task.updatedAt,
        dueAt: task.dueAt,
        isRecurring: task.isRecurring,
        labels: task.labels,
    };
}

function prepareTasksForRendering(
    tasks: RawTodoistTask[],
    projectsMetadata: TodoistApi.GetAllTasks.CompletedProjectsMap
): TodoistTask[] {
    const hasParent = (task: RawTodoistTask) => task.parentId !== null;
    // const tasksWithParentId: RawTodoistTask[] = tasks.filter(hasParent);
    /**
     * it's expected to have parent of all childs
        * what happens when not all childs have parent? maybe task was deleted?
        * shouldn't happen
     * set (parent) -- set (child)
     */

    const renderedTasks: TodoistTask[] = tasks
        .map((task) => createTodoistTask(task, projectsMetadata[task.projectId].name));

    renderedTasks.forEach((task) => {
        const parentTaskIndex: number = renderedTasks.findIndex((t) => t.taskId === task.parentId);
        const isParentTaskFound = parentTaskIndex !== -1;
        if (isParentTaskFound) {
            renderedTasks[parentTaskIndex].childTasks.push(task.taskId);
        }
    });

    return renderedTasks;
}

function renderTaskAsText(
    task: TodoistTask,
    project: TodoistApi.GetAllTasks.CompletedTaskProject,
): string {
    try {
        return buildRenderText2(task, project);
    } catch (error) {
        console.error(error);
        new Notice(
            "There was a problem formatting your tasks. Check the console for more details.",
            10000
        );
        return "";
    }
}

function renderTasksAsText(
    tasks: TodoistTask[],
    projectsMetadata: any,
): string[] {
    try {
        return tasks.reverse().map((t: any, index: number) => {
            let returnString = "";
            const project: TodoistApi.GetAllTasks.CompletedTaskProject = projectsMetadata[t.projectId];
            returnString = buildRenderText2(t, project);
            return returnString;
        });

    } catch (error) {
        console.error(error);
        new Notice(
            "There was a problem formatting your tasks. Check the console for more details.",
            10000
        );
        return [];
    }
}

export { prepareTasksForRendering, renderTaskAsText, renderTasksAsText };

