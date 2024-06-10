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
}

