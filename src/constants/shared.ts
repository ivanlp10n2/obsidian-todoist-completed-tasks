export const FETCH_STRATEGIES: any = {
    today: "today",
    lastNHours: "lastNHours",
    fromFile: "fromFile",
};

export interface RawTodoistTask {
    readonly taskId: string;
    readonly parentId: string | null;
    readonly content: string;
    readonly dateCompleted: string | null;
    readonly projectId: string;
}