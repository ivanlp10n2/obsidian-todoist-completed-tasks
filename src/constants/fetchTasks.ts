
const todoistApi = "https://api.todoist.com/sync/v9";

export const apiGetItems = (parentId: string): string => {
    return `${todoistApi}/items/get?item_id=${parentId}`;
};

