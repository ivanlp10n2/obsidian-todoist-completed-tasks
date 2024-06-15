import { TodoistApi } from "src/constants/fetchTasks";
import { TodoistTask } from "src/constants/shared";
import { RawTodoistTask } from "../constants/shared";


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
        priority: task.priority
    };
}

function prepareTasksForRendering(
    tasks: RawTodoistTask[],
    projectsMetadata: TodoistApi.GetAllTasks.CompletedProjectsMap
): TodoistTask[] {
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

export { prepareTasksForRendering };

