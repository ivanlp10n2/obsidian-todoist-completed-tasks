import { TodoistApi } from "src/constants/fetchTasks";
import { RawTodoistTask, TodoistTask, CreateTodoistTask } from "../constants/shared";


export function prepareTasksForRendering(
    tasks: RawTodoistTask[],
    projectsMetadata: TodoistApi.GetAllTasks.CompletedProjectsMap,
    sectionMetadata: TodoistApi.GetAllTasks.CompletedSectionsMap
): TodoistTask[] {
    const renderedTasks: TodoistTask[] = tasks
        .map((task: RawTodoistTask) => 
            CreateTodoistTask(
                task, 
                projectsMetadata[task.projectId].name, 
                sectionMetadata[task.sectionId]?.name
            )
        );

    renderedTasks.forEach((task: TodoistTask) => {
        const parentTaskIndex: number = renderedTasks.findIndex((t: TodoistTask) => t.taskId === task.parentId);
        const isParentTaskFound = parentTaskIndex !== -1;
        if (isParentTaskFound) {
            renderedTasks[parentTaskIndex].childTasks.push(task.taskId);
        }
    });

    return renderedTasks;
}

