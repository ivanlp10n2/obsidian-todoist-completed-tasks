import exp from 'constants';
import { prepareTasksForRendering, renderTasksAsText } from './formatTasks';
import { TodoistSettings } from 'src/constants/DefaultSettings';
import { RawTodoistTask } from 'src/constants/shared';


describe("formatTasks", () => {
	describe("prepareTasksForRendering", () => {
		it("should format tasks for rendering", () => {
			const renderedTasks = prepareTasksForRendering(input);
			expect(renderedTasks).toEqual(expectedPrepareTaskForRenderingOutput);
		})
		const input: RawTodoistTask[] = [
			{
				"taskId": "6920071239",
				"parentId": null as null,
				"content": "Lavar la ropa del gym para mañana",
				"completedAt": "2023-05-30T00:49:16.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6919294025",
				"parentId": null as null,
				"content": "Sacar la basura",
				"completedAt": "2023-05-29T23:33:57.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6917841350",
				"parentId": null as null,
				"content": "documentar info sobre AWS codewhispered",
				"completedAt": "2023-05-29T22:47:51.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6920094789",
				"parentId": null as null,
				"content": "Resolver el tema del candado",
				"completedAt": "2023-05-29T19:14:13.000000Z",
				"projectId": "1777918547",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6841124029",
				"parentId": null as null,
				"content": "Recordarle al facu dar de baja el linkedin",
				"completedAt": "2023-05-29T13:23:06.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6841119029",
				"parentId": "6841115479",
				"content": "Check tasks 4 week",
				"completedAt": "2023-05-29T01:56:57.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6868152840",
				"parentId": null as null,
				"content": "Mandarlr msj a toto para juntarnos los 3",
				"completedAt": "2023-05-29T01:52:39.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6844551059",
				"parentId": null as null,
				"content": "Juntarme con vampi",
				"completedAt": "2023-05-29T01:52:33.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6898082561",
				"parentId": "6841105886",
				"content": "Complete _May month",
				"completedAt": "2023-05-29T01:49:48.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6898058993",
				"parentId": "6876083667",
				"content": "Check more habits you can add",
				"completedAt": "2023-05-29T01:46:58.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6917765156",
				"parentId": null as null,
				"content": "Lavar ropa para mañana el gym",
				"completedAt": "2023-05-29T01:01:03.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6915250355",
				"parentId": null,
				"content": "Ir a la casa de la madrina",
				"completedAt": "2023-05-28T17:47:12.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6898140280",
				"parentId": null,
				"content": "mandarle msj al toto a ver si va a estar el domingo",
				"completedAt": "2023-05-27T15:21:54.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6914319149",
				"parentId": null,
				"content": "Ir a visitar a vampi",
				"completedAt": "2023-05-27T15:20:32.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6885360249",
				"parentId": null,
				"content": "averiguar por una fonoaudiologa",
				"completedAt": "2023-05-27T15:14:05.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6898104425",
				"parentId": null,
				"content": "Agregar habitos a los que ya tengo de todoist si hacen falta",
				"completedAt": "2023-05-27T06:33:54.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6898103720",
				"parentId": null,
				"content": "Agregar gastos de Mayo que me quedan pendientes",
				"completedAt": "2023-05-25T16:05:59.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6909912829",
				"parentId": null,
				"content": "Llevarle la ropa a vieja y al lavadero",
				"completedAt": "2023-05-25T15:46:12.000000Z",
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6841115479",
				"parentId": null,
				"content": "Organize and schedule well organized goals",
				"completedAt": null,
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6841105886",
				"parentId": null,
				"content": "learn about finance tools",
				"completedAt": null,
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			},
			{
				"taskId": "6876083667",
				"parentId": null,
				"content": "Find a way to encourage habits instead of goals",
				"completedAt": null,
				"projectId": "2308886649",
				"createdAt": "2023-05-30T00:49:16.000000Z",
				"updatedAt": "2023-05-30T00:49:16.000000Z"
			}
		]

	})

	describe("renderTasksAsText", () => {
		it("should format tasks for rendering", () => {
			const result = renderTasksAsText(expectedPrepareTaskForRenderingOutput, inputProjects, inputSettings)
			expect(result).toEqual(renderOutput);
		})

		const inputSettings: TodoistSettings = {
			"settingsVersion": 5,
			"keywordSegmentStart": "%% COMPLETED_TODOIST_TASKS_START %%",
			"keywordSegmentEnd": "%% COMPLETED_TODOIST_TASKS_END %%",
			"authToken": "my-auth-token",
			"taskPrefix": "*",
			"taskPostfix": "",
			"renderSubtasks": true,
			"renderProjectsHeaders": true
		}
		const inputProjects = {
			"1777918547": {
				"can_assign_tasks": false,
				"child_order": 0,
				"collapsed": false,
				"color": "grey",
				"created_at": "2023-07-13T11:03:38Z",
				"id": "1777918547",
				"inbox_project": true,
				"is_archived": false,
				"is_deleted": false,
				"is_favorite": false,
				"name": "Inbox",
				"parent_id": null as any,
				"shared": false,
				"sync_id": null as any,
				"updated_at": "1970-01-01T00:00:00Z",
				"v2_id": "6Crf7xx7cQpXpr73",
				"v2_parent_id": null as any,
				"view_style": "list"
			},
			"2308886649": {
				"can_assign_tasks": false,
				"child_order": 0,
				"collapsed": false,
				"color": "lime_green",
				"created_at": "2023-07-13T10:32:14Z",
				"id": "2308886649",
				"is_archived": true,
				"is_deleted": false,
				"is_favorite": false,
				"name": "May 2023",
				"parent_id": null as any,
				"shared": false,
				"sync_id": null as any,
				"updated_at": "2024-03-29T14:22:21Z",
				"v2_id": "6P5Q7826rC9pGfmG",
				"v2_parent_id": null as any,
				"view_style": "board"
			}
		}

	})

	const expectedPrepareTaskForRenderingOutput = [
		{
			"taskId": "6920071239",
			"content": "Lavar la ropa del gym para mañana",
			"completedAt": "2023-05-30T00:49:16.000000Z",
			"projectId": "2308886649",
			"childTasks": [] as any[],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
		},
		{
			"taskId": "6919294025",
			"content": "Sacar la basura",
			"completedAt": "2023-05-29T23:33:57.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6917841350",
			"content": "documentar info sobre AWS codewhispered",
			"completedAt": "2023-05-29T22:47:51.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6920094789",
			"content": "Resolver el tema del candado",
			"completedAt": "2023-05-29T19:14:13.000000Z",
			"projectId": "1777918547",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6841124029",
			"content": "Recordarle al facu dar de baja el linkedin",
			"completedAt": "2023-05-29T13:23:06.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6868152840",
			"content": "Mandarlr msj a toto para juntarnos los 3",
			"completedAt": "2023-05-29T01:52:39.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6844551059",
			"content": "Juntarme con vampi",
			"completedAt": "2023-05-29T01:52:33.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6917765156",
			"content": "Lavar ropa para mañana el gym",
			"completedAt": "2023-05-29T01:01:03.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6915250355",
			"content": "Ir a la casa de la madrina",
			"completedAt": "2023-05-28T17:47:12.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6898140280",
			"content": "mandarle msj al toto a ver si va a estar el domingo",
			"completedAt": "2023-05-27T15:21:54.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6914319149",
			"content": "Ir a visitar a vampi",
			"completedAt": "2023-05-27T15:20:32.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6885360249",
			"content": "averiguar por una fonoaudiologa",
			"completedAt": "2023-05-27T15:14:05.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6898104425",
			"content": "Agregar habitos a los que ya tengo de todoist si hacen falta",
			"completedAt": "2023-05-27T06:33:54.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6898103720",
			"content": "Agregar gastos de Mayo que me quedan pendientes",
			"completedAt": "2023-05-25T16:05:59.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6909912829",
			"content": "Llevarle la ropa a vieja y al lavadero",
			"completedAt": "2023-05-25T15:46:12.000000Z",
			"projectId": "2308886649",
			"childTasks": [],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6841115479",
			"content": "Organize and schedule well organized goals",
			"completedAt": null as string | null,
			"projectId": "2308886649",
			"childTasks": [
				{
					"taskId": "6841119029",
					"content": "Check tasks 4 week",
					"completedAt": "2023-05-29T01:56:57.000000Z",
					"projectId": "2308886649",
					"childTasks": [] as any[],
					"createdAt": "2023-05-30T00:49:16.000000Z",
					"updatedAt": "2023-05-30T00:49:16.000000Z"
				}
			],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6841105886",
			"content": "learn about finance tools",
			"completedAt": null as string | null,
			"projectId": "2308886649",
			"childTasks": [
				{
					"taskId": "6898082561",
					"content": "Complete _May month",
					"completedAt": "2023-05-29T01:49:48.000000Z",
					"projectId": "2308886649",
					"childTasks": [] as any[],
					"createdAt": "2023-05-30T00:49:16.000000Z",
					"updatedAt": "2023-05-30T00:49:16.000000Z"
				}
			],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		},
		{
			"taskId": "6876083667",
			"content": "Find a way to encourage habits instead of goals",
			"completedAt": null as string,
			"projectId": "2308886649",
			"childTasks": [
				{
					"taskId": "6898058993",
					"content": "Check more habits you can add",
					"completedAt": "2023-05-29T01:46:58.000000Z",
					"projectId": "2308886649",
					"childTasks": [] as any[],
					"createdAt": "2023-05-30T00:49:16.000000Z",
					"updatedAt": "2023-05-30T00:49:16.000000Z"
				}
			],
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z"
		}
	]


	const renderOutput = `
* Inbox
	* Resolver el tema del candado 
		- taskId: 6920094789
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
* May 2023
	* Find a way to encourage habits instead of goals 
		- taskId: 6876083667
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
		* Check more habits you can add 
			- taskId: 6898058993
			- createdAt: 2023-05-30T00:49:16.000000Z
			- updatedAt: 2023-05-30T00:49:16.000000Z
	* learn about finance tools 
		- taskId: 6841105886
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
		* Complete _May month 
			- taskId: 6898082561
			- createdAt: 2023-05-30T00:49:16.000000Z
			- updatedAt: 2023-05-30T00:49:16.000000Z
	* Organize and schedule well organized goals 
		- taskId: 6841115479
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
		* Check tasks 4 week 
			- taskId: 6841119029
			- createdAt: 2023-05-30T00:49:16.000000Z
			- updatedAt: 2023-05-30T00:49:16.000000Z
	* Llevarle la ropa a vieja y al lavadero 
		- taskId: 6909912829
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* Agregar gastos de Mayo que me quedan pendientes 
		- taskId: 6898103720
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* Agregar habitos a los que ya tengo de todoist si hacen falta 
		- taskId: 6898104425
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* averiguar por una fonoaudiologa 
		- taskId: 6885360249
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* Ir a visitar a vampi 
		- taskId: 6914319149
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* mandarle msj al toto a ver si va a estar el domingo 
		- taskId: 6898140280
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* Ir a la casa de la madrina 
		- taskId: 6915250355
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* Lavar ropa para mañana el gym 
		- taskId: 6917765156
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* Juntarme con vampi 
		- taskId: 6844551059
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* Mandarlr msj a toto para juntarnos los 3 
		- taskId: 6868152840
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* Recordarle al facu dar de baja el linkedin 
		- taskId: 6841124029
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* documentar info sobre AWS codewhispered 
		- taskId: 6917841350
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* Sacar la basura 
		- taskId: 6919294025
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
	* Lavar la ropa del gym para mañana 
		- taskId: 6920071239
		- createdAt: 2023-05-30T00:49:16.000000Z
		- updatedAt: 2023-05-30T00:49:16.000000Z
`
})

