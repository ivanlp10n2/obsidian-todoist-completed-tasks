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
    readonly sectionId: string | null;
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
    sectionId: string | null;
    sectionName: string | null;
}

export const NeverUpdated = "1970-01-01T00:00:00Z";

const prefixMap = {
    "done": "✅",
    "archived": "🗄️",
    "inprogress": "⚙️",
    "due": "📅",
    "recurring": "♺",
    "waiting": "⏳",
    "important": "❗️",
    "high": "🔼",
    "low": "🔽",
}
const priorityMap = {
    1: "low",
    2: "low",
    3: "high",
    4: "high",
}

export function CreateTodoistTask(
    task: RawTodoistTask, 
    projectName: string, 
    sectionName: string
): TodoistTask {
    // const statusPrefix = task.completedAt ? "done" : "inprogress" ;
    // const duePrefix = task.dueAt ? "due" : "";
    // const recurringPrefix = task.isRecurring ? "recurring" : "";
    // const prefix = [statusPrefix, priorityPrefix, duePrefix, recurringPrefix].join("-");
    return {
        taskId: task.taskId,
        title: task.content,
        completedAt: task.completedAt,
        projectId: task.projectId,
        projectName: projectName,
        parentId: task.parentId,
        childTasks: [],
        createdAt: task.createdAt,
        updatedAt: task.updatedAt === NeverUpdated ? null : task.updatedAt,
        dueAt: task.dueAt,
        isRecurring: task.isRecurring,
        labels: task.labels,
        priority: task.priority,
        sectionId: task.sectionId,
        sectionName: sectionName
    };
}