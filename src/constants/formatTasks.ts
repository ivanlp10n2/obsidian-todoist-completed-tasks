export interface TodoistTask {
    taskId: number;
    content: string;
    completedAt: Date | null;
    childTasks: TodoistTask[];
    projectId?: string | null;
}