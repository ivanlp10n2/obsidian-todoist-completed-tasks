export interface TodoistTask {
    taskId: number;
    content: string;
    dateCompleted: Date | null;
    childTasks: TodoistTask[];
    projectId?: string | null;
}