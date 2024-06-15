export const FETCH_STRATEGIES: any = {
    today: "today",
    lastNHours: "lastNHours",
    fromFile: "fromFile",
};

export interface RawTodoistTask {
    readonly taskId: string;
    readonly parentId: string | null;
    readonly content: string;
    readonly completedAt: string | null;
    readonly projectId: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly dueAt: string | null;
    readonly isRecurring: boolean;
    readonly labels: string[];
    readonly priority: number | null;
}
export interface TodoistTask {
    // regarding dates: don't want to spend time parsing dates with timezones. 
    // filter will be done in obsidian with `tags` and format ISO-8601 is sortable alphabetically too
    taskId: string;
    title: string;
    completedAt: string | null;
    childTasks: string[];
    projectId?: string | null;
    projectName?: string | null;
    parentId?: string | null;
    createdAt: string; 
    updatedAt: string | null;
    dueAt: string | null;
    isRecurring: boolean;
    labels: string[];
    description?: string | null;
    priority: number | null;
}