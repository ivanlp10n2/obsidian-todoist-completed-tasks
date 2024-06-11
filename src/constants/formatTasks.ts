export interface TodoistTask {
    taskId: number;
    content: string;
    completedAt: Date | null;
    childTasks: TodoistTask[];
    projectId?: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    dueAt: Date | null;
    isRecurring: boolean;
    labels: string[];
}

