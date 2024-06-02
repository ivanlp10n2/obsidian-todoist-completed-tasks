import { fetchSingleTask } from './fetchTasks';

describe('fetchSingleTask', () => {
 it('should fetch a single task successfully', async () => {
    const authToken = 'your-auth-token';
    const parentId = 'task-id';
    const data = JSON.parse(apiResponse)
    const mockResponse = (data: any) => jest.fn().mockResolvedValueOnce(data)

    const fetchMock: (str: string, options: RequestInit) => Promise<Response> = jest.fn().mockResolvedValueOnce({
      json: mockResponse(data),
    });

    const result = await fetchSingleTask(authToken, parentId, fetchMock);

    expect(fetchMock).toHaveBeenCalledWith( `https://api.todoist.com/sync/v9/items/get?item_id=${parentId}`,
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    expect(result).toEqual(expectedSingleTask);
  });

  it('should handle authentication error', async () => {
    const authToken = 'invalid-auth-token';
    const parentId = 'task-id';
    const errorResponse = {
      httpStatusCode: 403,
      responseData: 'Authentication failed',
    };

    const fetchMock = jest.fn().mockRejectedValueOnce(errorResponse);

    await expect(fetchSingleTask(authToken, parentId, fetchMock)).rejects.toEqual(
      errorResponse
    );
    expect(fetchMock).toHaveBeenCalled();
  });

});
const expectedSingleTask = { 
  taskId: '6587712824', 
  parentId: null as null, 
  content: 'Tomar pastilla x dia en ayuno', 
  dateCompleted: '2024-01-24T10:08:14.000000Z', 
  projectId: '2308886728'
}
const apiResponse = `
{
  "ancestors": [],
  "item": {
      "added_at": "2023-02-04T17:14:00.844612Z",
      "added_by_uid": "7429672",
      "assigned_by_uid": null,
      "checked": true,
      "child_order": 7,
      "collapsed": false,
      "completed_at": "2024-01-24T10:08:14.000000Z",
      "content": "Tomar pastilla x dia en ayuno",
      "description": "",
      "due": {
          "date": "2024-01-24T06:00:00",
          "is_recurring": true,
          "lang": "en",
          "string": "every day 06:00",
          "timezone": null
      },
      "duration": null,
      "id": "6587712824",
      "is_deleted": false,
      "labels": [
          "health"
      ],
      "parent_id": null,
      "priority": 4,
      "project_id": "2308886728",
      "responsible_uid": null,
      "section_id": "117184083",
      "sync_id": null,
      "updated_at": "2024-01-24T10:08:14Z",
      "user_id": "7429672",
      "v2_id": "69WPp6Xvg7Vq6h9m",
      "v2_parent_id": null,
      "v2_project_id": "6P5Q7R8v5r4Ggppm",
      "v2_section_id": "6853GjRhqcH4FCFm"
  },
  "notes": [],
  "project": {
      "can_assign_tasks": false,
      "child_order": 0,
      "collapsed": false,
      "color": "light_blue",
      "created_at": "2023-07-13T10:15:55Z",
      "id": "2308886728",
      "is_archived": true,
      "is_deleted": false,
      "is_favorite": true,
      "name": "September 2023",
      "parent_id": null,
      "shared": false,
      "sync_id": null,
      "updated_at": "2024-03-29T14:22:37Z",
      "v2_id": "6P5Q7R8v5r4Ggppm",
      "v2_parent_id": null,
      "view_style": "board"
  },
  "section": {
      "added_at": "2023-03-02T01:50:29.134206Z",
      "archived_at": null,
      "collapsed": false,
      "id": "117184083",
      "is_archived": false,
      "is_deleted": false,
      "name": "health tasks",
      "project_id": "2308886728",
      "section_order": 4,
      "sync_id": null,
      "user_id": "7429672",
      "v2_id": "6853GjRhqcH4FCFm",
      "v2_project_id": "6P5Q7R8v5r4Ggppm"
  }
}`