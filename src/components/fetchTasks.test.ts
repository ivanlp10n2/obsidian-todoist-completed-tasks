import { fetchSingleTask, fetchCompletedTasks } from './fetchTasks';
import { ObsidianApi, Domain, Codecs } from '../constants/fetchTasks';
import { RawTodoistTask } from '../constants/shared';

describe('fetchTasks component', () => {
  const authToken = 'your-auth-token';
  const taskId = 'task-id';
  jest.spyOn(console, 'error').mockImplementation(() => { }); // disable console.error
  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('fetchSingleTask', () => {
    it('should fetch and decode successfully', async () => {
      const fetchSingleTaskFn = jest.fn().mockResolvedValueOnce(getSingleTaskAPI)

      const result: RawTodoistTask = await fetchSingleTask(authToken, taskId, fetchSingleTaskFn);

      expect(fetchSingleTaskFn).toHaveBeenCalledWith(ObsidianApi.GetTask.UrlGetItem(taskId),
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      const singleTaskRaw = Codecs.ConvertToRawDomain(getSingleTaskAPI, true)
      expect(result).toEqual(singleTaskRaw);
    });

    it('should handle authentication error', async () => {
      const errorResponse = {
        httpStatusCode: 403,
        responseData: ObsidianApi.FetchErrors.UnauthenticatedErrorMsg
      };
      const fetchResponse = jest.fn().mockRejectedValueOnce(errorResponse);

      await expect(fetchSingleTask(authToken, taskId, fetchResponse)).rejects.toEqual(errorResponse);
      expect(fetchResponse).toHaveBeenCalled();
    });

    it('should handle network error', async () => {
      const errorRespose = {
        httpStatusCode: 500,
        responseData: ObsidianApi.FetchErrors.NetworkErrorMsg
      }
      const fetchResponse = jest.fn().mockRejectedValueOnce(errorRespose);
      const result = async () => fetchSingleTask(authToken, taskId, fetchResponse)

      await expect(result).rejects.toEqual(errorRespose);
      expect(fetchResponse).toHaveBeenCalled();
    });

    it('should handle default error', async () => {
      const errorRespose = {
        httpStatusCode: 500,
        responseData: ObsidianApi.FetchErrors.DefaultErrorMsg
      }
      const fetchResponse = jest.fn().mockRejectedValueOnce(errorRespose);
      const result = async () => fetchSingleTask(authToken, taskId, fetchResponse)

      await expect(result).rejects.toEqual(errorRespose);
      expect(fetchResponse).toHaveBeenCalled();
    });
  });

  describe('fetchAllTasks', () => {
    xit('what\'s the use-case when parent is not in range, it fetches from api and get\'s none again?', () => { })
    xit('it fetches due time and duration but doesn\'t add up the duration to due_time', () => { })
    xit('task_id is what helps you to fetch single tasks', () => { })
    xit('get-single-api.item.id is what you get in get-all-api.items.task_id', () => { })
    xit('actually ancestor attribute and parent task seems to have the same attributes. Only changes on how parent of that task is rendered', () => { })
		xit("only ones that i don't fetch is non-completed and those are parents in my workflow (big tasks managed by label)", () => {})
    it('should fetch-all completed and get parent with fetch-single of those who has', async () => {
      // receives 2023-04-29 02:59 2023-06-29 02:59
      // returns: { projectResults : [project_id -> project], tasksResults : [index -> task]}
      const fetchParentAndChildren: (url: string, options: RequestInit) => Promise<any> =
        jest.fn().mockResolvedValueOnce(Promise.resolve(getAllCompletedTasksAPI))
          .mockResolvedValueOnce(Promise.resolve(getSingleChildrenTaskAPI))
          .mockResolvedValueOnce(Promise.resolve(getSingleTaskAPI))
          .mockResolvedValueOnce(Promise.resolve(getSingleParentTaskAPI))

      const input: ObsidianApi.GetAllTasks.UrlGetAllItemsFilter = {
        timeStartFormattedDate: ObsidianApi.GetAllTasks.DefaultParams.timeStartFormattedDate,
        timeStartFormattedTime: ObsidianApi.GetAllTasks.DefaultParams.timeStartFormattedTime,
        timeEndFormattedDate: ObsidianApi.GetAllTasks.DefaultParams.timeEndFormattedDate,
        timeEndFormattedTime: ObsidianApi.GetAllTasks.DefaultParams.timeEndFormattedTime,
        limit: 20
      }

      const result: Domain.GetAllCompletedTasks = await fetchCompletedTasks(authToken, input, fetchParentAndChildren)

      expect(result).toEqual(expectedResultFetchCompletedTasks)
    })
  })

  // const expectedResultFetchCompletedTasks: Domain.GetAllCompletedTasks = {
  const expectedResultFetchCompletedTasks: any = {
    tasksResults: [
      /**
       * item": {
        "added_at": "2023-06-17T13:26:23.164918Z",
        "added_by_uid": "7429672",
        "assigned_by_uid": null,
        "checked": true,
        "child_order": 1,
        "collapsed": false,
        "completed_at": "2023-06-17T13:26:46.396000000Z",
        "content": "What it takes - Stephen Schwarzman",
        "description": "",
        "due": null,
        "duration": null,
        "id": "6973917578",
        "is_deleted": false,
        "labels": [],
        "parent_id": "6973914935",
        "priority": 1,
        "project_id": "2308886701",
        "responsible_uid": null,
        "section_id": "117184028",
        "sync_id": null,
        "updated_at": "1970-01-01T00:00:00Z",
        "user_id": "7429672",
        "v2_id": "68r8v2qJ8684Hvmm",
        "v2_parent_id": "68r8PcHJ28F8Xm4m",
        "v2_project_id": "6P5Q7J4hfJC67c6m",
        "v2_section_id": "68539cm5GCpXCHQm"
    },
       */
      {
        taskId: '6973917578',
        parentId: '6973914935',
        content: 'What it takes - Stephen Schwarzman',
        completedAt: '2023-06-17T13:26:46.000000Z',
        projectId: '2308886701',
        updatedAt: '1970-01-01T00:00:00Z',
        createdAt: '2023-06-17T13:26:23.164918Z',
        dueAt: undefined,
        isRecurring: false,
        labels: [] as string[],
      },
      /**"item": {
        "added_at": "2023-06-14T11:43:05.493517Z",
        "added_by_uid": "7429672",
        "assigned_by_uid": null,
        "checked": true,
        "child_order": 4,
        "collapsed": false,
        "completed_at": "2023-06-17T13:23:52.663000000Z",
        "content": "Resolver el numero de telefono",
        "description": "",
        "due": {
            "date": "2023-06-17T10:00:00",
            "is_recurring": false,
            "lang": "en",
            "string": "Jun 17 10:00AM",
            "timezone": null
        },
        "duration": null,
        "id": "6965182658",
        "is_deleted": false,
        "labels": [],
        "parent_id": null,
        "priority": 4,
        "project_id": "2308886701",
        "responsible_uid": null,
        "section_id": "117184024",
        "sync_id": null,
        "updated_at": "1970-01-01T00:00:00Z",
        "user_id": "7429672",
        "v2_id": "68qQj3g365G2F3Hm",
        "v2_parent_id": null,
        "v2_project_id": "6P5Q7J4hfJC67c6m",
        "v2_section_id": "6853xVmrVpWhXWqF"
    }, */
      {
        taskId: '6965182658',
        parentId: null as null,
        content: 'Resolver el numero de telefono',
        completedAt: '2023-06-17T13:23:53.000000Z',
        projectId: '2308886701',
        createdAt: '2023-06-14T11:43:05.493517Z',
        updatedAt: '1970-01-01T00:00:00Z',
        dueAt: '2023-06-17T10:00:00',
        isRecurring: false,
        labels: [] as string[],
      },
      /**"item": {
        "added_at": "2023-06-17T13:25:07.453Z",
        "added_by_uid": "7429672",
        "assigned_by_uid": null,
        "checked": false,
        "child_order": 8,
        "collapsed": false,
        "completed_at": null,
        "content": "Escuchar 3 audiolibros",
        "description": "",
        "due": null,
        "duration": null,
        "id": "6973914935",
        "is_deleted": false,
        "labels": [
            "✅",
            "🟩🟩🟩🟩🟩"
        ],
        "parent_id": null,
        "priority": 1,
        "project_id": "2308886701",
        "responsible_uid": null,
        "section_id": "117184028",
        "sync_id": null,
        "updated_at": "2023-07-10T03:14:40Z",
        "user_id": "7429672",
        "v2_id": "68r8PcHJ28F8Xm4m",
        "v2_parent_id": null,
        "v2_project_id": "6P5Q7J4hfJC67c6m",
        "v2_section_id": "68539cm5GCpXCHQm"
    }, */
      {
        taskId: '6973914935',
        parentId: null as null,
        content: 'Escuchar 3 audiolibros',
        completedAt: null as null,
        projectId: '2308886701',
        createdAt: '2023-06-17T13:25:07.453Z',
        updatedAt: '2023-07-10T03:14:40Z',
        dueAt: undefined,
        isRecurring: false,
        labels: [
          '✅',
          '🟩🟩🟩🟩🟩'
        ] as string[],
      }
    ],
        // export type CompletedTaskProject = {
        //     name: string;
        //     id: string;
        //     parent_id: string;
        //     is_archived: boolean;
        //     is_deleted: boolean;
        //     is_favorite: boolean;
        //     created_at: string;
        //     updated_at: string;
        //     view_style: string;
        //     color: string;
        //     child_order: number;
        //     v2_id: string;
        //     v2_parent_id: string | null;
    projectsResults: {
      '2308886701': {
        id: '2308886701',
        created_at: '2023-07-13T11:05:04Z',
        is_archived: true,
        is_deleted: false,
        is_favorite: false,
        name: 'June 2023',
        parent_id: null as null,
        updated_at: '2024-03-29T14:22:25Z',
        shared: false,
        sync_id: null,
        v2_id: '6P5Q7J4hfJC67c6m',
        v2_parent_id: null as null,
        view_style: 'board',
        color: 'lavender',
        child_order: 0,
        collapsed: false,
        can_assign_tasks: false
      }
    }
  }

  const getParentApiResponse: string = `{
    "ancestors": [],
    "item": {
        "added_at": "2023-06-17T13:25:07.453Z",
        "added_by_uid": "7429672",
        "assigned_by_uid": null,
        "checked": false,
        "child_order": 8,
        "collapsed": false,
        "completed_at": null,
        "content": "Escuchar 3 audiolibros",
        "description": "",
        "due": null,
        "duration": null,
        "id": "6973914935",
        "is_deleted": false,
        "labels": [
            "✅",
            "🟩🟩🟩🟩🟩"
        ],
        "parent_id": null,
        "priority": 1,
        "project_id": "2308886701",
        "responsible_uid": null,
        "section_id": "117184028",
        "sync_id": null,
        "updated_at": "2023-07-10T03:14:40Z",
        "user_id": "7429672",
        "v2_id": "68r8PcHJ28F8Xm4m",
        "v2_parent_id": null,
        "v2_project_id": "6P5Q7J4hfJC67c6m",
        "v2_section_id": "68539cm5GCpXCHQm"
    },
    "notes": [],
    "project": {
        "can_assign_tasks": false,
        "child_order": 0,
        "collapsed": false,
        "color": "lavender",
        "created_at": "2023-07-13T11:05:04Z",
        "id": "2308886701",
        "is_archived": true,
        "is_deleted": false,
        "is_favorite": false,
        "name": "June 2023",
        "parent_id": null,
        "shared": false,
        "sync_id": null,
        "updated_at": "2024-03-29T14:22:25Z",
        "v2_id": "6P5Q7J4hfJC67c6m",
        "v2_parent_id": null,
        "view_style": "board"
    },
    "section": {
        "added_at": "2023-03-02T01:49:42.278867Z",
        "archived_at": null,
        "collapsed": false,
        "id": "117184028",
        "is_archived": false,
        "is_deleted": false,
        "name": "Better me",
        "project_id": "2308886701",
        "section_order": 1,
        "sync_id": null,
        "user_id": "7429672",
        "v2_id": "68539cm5GCpXCHQm",
        "v2_project_id": "6P5Q7J4hfJC67c6m"
    }
}
  `
  const getSingleChildrenApiResponse: string = `
  {
    "ancestors": [
        {
            "added_at": "2023-06-17T13:25:07.453Z",
            "added_by_uid": "7429672",
            "assigned_by_uid": null,
            "checked": false,
            "child_order": 8,
            "collapsed": false,
            "completed_at": null,
            "content": "Escuchar 3 audiolibros",
            "description": "",
            "due": null,
            "duration": null,
            "id": "6973914935",
            "is_deleted": false,
            "labels": [
                "✅",
                "🟩🟩🟩🟩🟩"
            ],
            "parent_id": null,
            "priority": 1,
            "project_id": "2308886701",
            "responsible_uid": null,
            "section_id": "117184028",
            "sync_id": null,
            "updated_at": "2023-07-10T03:14:40Z",
            "user_id": "7429672",
            "v2_id": "68r8PcHJ28F8Xm4m",
            "v2_parent_id": null,
            "v2_project_id": "6P5Q7J4hfJC67c6m",
            "v2_section_id": "68539cm5GCpXCHQm"
        }
    ],
    "item": {
        "added_at": "2023-06-17T13:26:23.164918Z",
        "added_by_uid": "7429672",
        "assigned_by_uid": null,
        "checked": true,
        "child_order": 1,
        "collapsed": false,
        "completed_at": "2023-06-17T13:26:46.396000000Z",
        "content": "What it takes - Stephen Schwarzman",
        "description": "",
        "due": null,
        "duration": null,
        "id": "6973917578",
        "is_deleted": false,
        "labels": [],
        "parent_id": "6973914935",
        "priority": 1,
        "project_id": "2308886701",
        "responsible_uid": null,
        "section_id": "117184028",
        "sync_id": null,
        "updated_at": "1970-01-01T00:00:00Z",
        "user_id": "7429672",
        "v2_id": "68r8v2qJ8684Hvmm",
        "v2_parent_id": "68r8PcHJ28F8Xm4m",
        "v2_project_id": "6P5Q7J4hfJC67c6m",
        "v2_section_id": "68539cm5GCpXCHQm"
    },
    "notes": [],
    "project": {
        "can_assign_tasks": false,
        "child_order": 0,
        "collapsed": false,
        "color": "lavender",
        "created_at": "2023-07-13T11:05:04Z",
        "id": "2308886701",
        "is_archived": true,
        "is_deleted": false,
        "is_favorite": false,
        "name": "June 2023",
        "parent_id": null,
        "shared": false,
        "sync_id": null,
        "updated_at": "2024-03-29T14:22:25Z",
        "v2_id": "6P5Q7J4hfJC67c6m",
        "v2_parent_id": null,
        "view_style": "board"
    },
    "section": {
        "added_at": "2023-03-02T01:49:42.278867Z",
        "archived_at": null,
        "collapsed": false,
        "id": "117184028",
        "is_archived": false,
        "is_deleted": false,
        "name": "Better me",
        "project_id": "2308886701",
        "section_order": 1,
        "sync_id": null,
        "user_id": "7429672",
        "v2_id": "68539cm5GCpXCHQm",
        "v2_project_id": "6P5Q7J4hfJC67c6m"
    }
}`

  const getAllCompletedTasksApiResponse: string = `
  {
    "items": [
        {
            "completed_at": "2023-06-17T13:26:46.000000Z",
            "content": "What it takes - Stephen Schwarzman",
            "id": "6405499044",
            "item_object": null,
            "meta_data": null,
            "note_count": 0,
            "notes": [],
            "project_id": "2308886701",
            "section_id": "117184028",
            "task_id": "6973917578",
            "user_id": "7429672"
        },
        {
            "completed_at": "2023-06-17T13:23:53.000000Z",
            "content": "Resolver el numero de telefono",
            "id": "6405494055",
            "item_object": null,
            "meta_data": null,
            "note_count": 0,
            "notes": [],
            "project_id": "2308886701",
            "section_id": "117184024",
            "task_id": "6965182658",
            "user_id": "7429672"
        }
    ],
    "projects": {
        "2308886701": {
            "can_assign_tasks": false,
            "child_order": 0,
            "collapsed": false,
            "color": "lavender",
            "created_at": "2023-07-13T11:05:04Z",
            "id": "2308886701",
            "is_archived": true,
            "is_deleted": false,
            "is_favorite": false,
            "name": "June 2023",
            "parent_id": null,
            "shared": false,
            "sync_id": null,
            "updated_at": "2024-03-29T14:22:25Z",
            "v2_id": "6P5Q7J4hfJC67c6m",
            "v2_parent_id": null,
            "view_style": "board"
        }
    },
    "sections": {
        "117184028": {
            "added_at": "2023-03-02T01:49:42.278867Z",
            "archived_at": null,
            "collapsed": false,
            "id": "117184028",
            "is_archived": false,
            "is_deleted": false,
            "name": "Better me",
            "project_id": "2308886701",
            "section_order": 1,
            "sync_id": null,
            "user_id": "7429672",
            "v2_id": "68539cm5GCpXCHQm",
            "v2_project_id": "6P5Q7J4hfJC67c6m"
        },
        "117184024": {
            "added_at": "2023-03-02T01:49:42.955631Z",
            "archived_at": null,
            "collapsed": false,
            "id": "117184024",
            "is_archived": false,
            "is_deleted": false,
            "name": "material tasks",
            "project_id": "2308886701",
            "section_order": 12,
            "sync_id": null,
            "user_id": "7429672",
            "v2_id": "6853xVmrVpWhXWqF",
            "v2_project_id": "6P5Q7J4hfJC67c6m"
        }
      }
  }`
  const getSingleTaskApiResponse: string = `{
    "ancestors": [],
    "item": {
        "added_at": "2023-06-14T11:43:05.493517Z",
        "added_by_uid": "7429672",
        "assigned_by_uid": null,
        "checked": true,
        "child_order": 4,
        "collapsed": false,
        "completed_at": "2023-06-17T13:23:52.663000000Z",
        "content": "Resolver el numero de telefono",
        "description": "",
        "due": {
            "date": "2023-06-17T10:00:00",
            "is_recurring": false,
            "lang": "en",
            "string": "Jun 17 10:00AM",
            "timezone": null
        },
        "duration": null,
        "id": "6965182658",
        "is_deleted": false,
        "labels": [],
        "parent_id": null,
        "priority": 4,
        "project_id": "2308886701",
        "responsible_uid": null,
        "section_id": "117184024",
        "sync_id": null,
        "updated_at": "1970-01-01T00:00:00Z",
        "user_id": "7429672",
        "v2_id": "68qQj3g365G2F3Hm",
        "v2_parent_id": null,
        "v2_project_id": "6P5Q7J4hfJC67c6m",
        "v2_section_id": "6853xVmrVpWhXWqF"
    },
    "notes": [],
    "project": {
        "can_assign_tasks": false,
        "child_order": 0,
        "collapsed": false,
        "color": "lavender",
        "created_at": "2023-07-13T11:05:04Z",
        "id": "2308886701",
        "is_archived": true,
        "is_deleted": false,
        "is_favorite": false,
        "name": "June 2023",
        "parent_id": null,
        "shared": false,
        "sync_id": null,
        "updated_at": "2024-03-29T14:22:25Z",
        "v2_id": "6P5Q7J4hfJC67c6m",
        "v2_parent_id": null,
        "view_style": "board"
    },
    "section": {
        "added_at": "2023-03-02T01:49:42.955631Z",
        "archived_at": null,
        "collapsed": false,
        "id": "117184024",
        "is_archived": false,
        "is_deleted": false,
        "name": "material tasks",
        "project_id": "2308886701",
        "section_order": 12,
        "sync_id": null,
        "user_id": "7429672",
        "v2_id": "6853xVmrVpWhXWqF",
        "v2_project_id": "6P5Q7J4hfJC67c6m"
    }
}
  `
  const getSingleTaskAPI = JSON.parse(getSingleTaskApiResponse)
  const getSingleChildrenTaskAPI = JSON.parse(getSingleChildrenApiResponse)
  const getSingleParentTaskAPI = JSON.parse(getParentApiResponse)
  const getAllCompletedTasksAPI = JSON.parse(getAllCompletedTasksApiResponse)
})


