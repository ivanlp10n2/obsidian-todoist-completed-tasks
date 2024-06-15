import { TodoistApi } from 'src/constants/fetchTasks';
import { RawTodoistTask, TodoistTask } from 'src/constants/shared';
import { buildRenderText2 } from "../constants/formatTasks";
import { prepareTasksForRendering, renderTaskAsText } from './formatTasks';
const inputProjects: TodoistApi.GetAllTasks.CompletedProjectsMap = {
	"1777918547": {
		"child_order": 0,
		"color": "grey",
		"created_at": "2023-07-13T11:03:38Z",
		"id": "1777918547",
		"is_archived": false,
		"is_deleted": false,
		"is_favorite": false,
		"name": "Inbox",
		"parent_id": null as any,
		"updated_at": "1970-01-01T00:00:00Z",
		"v2_id": "6Crf7xx7cQpXpr73",
		"v2_parent_id": null as any,
		"view_style": "list"
	},
	"2308886649": {
		"child_order": 0,
		"color": "lime_green",
		"created_at": "2023-07-13T10:32:14Z",
		"id": "2308886649",
		"is_archived": true,
		"is_deleted": false,
		"is_favorite": false,
		"name": "May 2023",
		"parent_id": null as any,
		"updated_at": "2024-03-29T14:22:21Z",
		"v2_id": "6P5Q7826rC9pGfmG",
		"v2_parent_id": null as any,
		"view_style": "board"
	}
}

describe("formatTasks", () => {

	describe("prepareTasksForRendering", () => {
		it("should add parent tasks", () => {
			const renderedTasks: TodoistTask[] = prepareTasksForRendering(input, inputProjects);
			const sorted = (tasks: TodoistTask[]) => tasks.sort((a, b) => a.taskId.localeCompare(b.taskId));
			expect(sorted(renderedTasks)).toEqual(sorted(expectedPrepareTaskForRenderingOutput));
		})

	})


	describe("renderTasksAsText", () => {
		it("should format tasks for rendering", () => {
			// const result = renderTasksAsText(expectedPrepareTaskForRenderingOutput, inputProjects, inputSettings)
			// expect(result).toEqual(renderOutput);
		})

		it("should render for a single task", () => {
			const result = renderTaskAsText(singleInput, inputProjects[singleInput.projectId])
			expect(result).toEqual(singleOutput);
		})

		const singleInput: TodoistTask =
		{
			"taskId": "6960733805",
			"title": "mandar msj para ver a mariel por el diente sensible",
			"completedAt": "2023-06-14T15:02:37.000000Z",
			"projectId": "1777918547",
			"childTasks": [],
			"createdAt": "2023-06-13T02:06:05.175619Z",
			"updatedAt": null,
			"dueAt": "2023-06-14T13:00:00",
			"isRecurring": false,
			"labels": []
		}
		const singleOutput: string = 
			buildRenderText2
			({
				taskId: "6960733805",
				title: "mandar msj para ver a mariel por el diente sensible",
				dueAt: "2023-06-14T13:00:00",
				isRecurring: false,
				labels: [],
				createdAt: "2023-06-13T02:06:05.175619Z",
				updatedAt: null,
				projectName: "Inbox",
				completedAt: "2023-06-14T15:02:37.000000Z",
				projectId: "1777918547",
				parentId: null,
				childTasks: []
			}, inputProjects[singleInput.projectId])
		

	})

	const expectedPrepareTaskForRenderingOutput: TodoistTask[] = [
		{
			taskId: '6920071239',
			title: 'Lavar la ropa del gym para mañana',
			completedAt: '2023-05-30T00:49:16.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: ['gilada']
		},
		{
			taskId: '6919294025',
			title: 'Sacar la basura',
			completedAt: '2023-05-29T23:33:57.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6917841350',
			title: 'documentar info sobre AWS codewhispered',
			completedAt: '2023-05-29T22:47:51.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6920094789',
			title: 'Resolver el tema del candado',
			completedAt: '2023-05-29T19:14:13.000000Z',
			projectId: '1777918547',
			projectName: "Inbox",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6841124029',
			title: 'Recordarle al facu dar de baja el linkedin',
			completedAt: '2023-05-29T13:23:06.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6868152840',
			title: 'Mandarlr msj a toto para juntarnos los 3',
			completedAt: '2023-05-29T01:52:39.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6844551059',
			title: 'Juntarme con vampi',
			completedAt: '2023-05-29T01:52:33.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6917765156',
			title: 'Lavar ropa para mañana el gym',
			completedAt: '2023-05-29T01:01:03.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: ['gilada']
		},
		{
			taskId: '6915250355',
			title: 'Ir a la casa de la madrina',
			completedAt: '2023-05-28T17:47:12.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6898140280',
			title: 'mandarle msj al toto a ver si va a estar el domingo',
			completedAt: '2023-05-27T15:21:54.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6914319149',
			title: 'Ir a visitar a vampi',
			completedAt: '2023-05-27T15:20:32.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6885360249',
			title: 'averiguar por una fonoaudiologa',
			completedAt: '2023-05-27T15:14:05.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6898104425',
			title: 'Agregar habitos a los que ya tengo de todoist si hacen falta',
			completedAt: '2023-05-27T06:33:54.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6898103720',
			title: 'Agregar gastos de Mayo que me quedan pendientes',
			completedAt: '2023-05-25T16:05:59.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6909912829',
			title: 'Llevarle la ropa a vieja y al lavadero',
			completedAt: '2023-05-25T15:46:12.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6841115479',
			title: 'Organize and schedule well organized goals',
			completedAt: null,
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: ['6841119029'],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6841119029',
			title: 'Check tasks 4 week',
			completedAt: '2023-05-29T01:56:57.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: "6841115479",
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6841105886',
			title: 'learn about finance tools',
			completedAt: null,
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: ['6898082561'],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6898082561',
			title: 'Complete _May month',
			completedAt: '2023-05-29T01:49:48.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: "6841105886",
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6876083667',
			title: 'Find a way to encourage habits instead of goals',
			completedAt: null,
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: null,
			childTasks: ['6898058993'],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: '6898058993',
			title: 'Check more habits you can add',
			completedAt: '2023-05-29T01:46:58.000000Z',
			projectId: '2308886649',
			projectName: "May 2023",
			parentId: "6876083667",
			childTasks: [],
			createdAt: '2023-05-30T00:49:16.000000Z',
			updatedAt: '2023-05-30T00:49:16.000000Z',
			dueAt: null,
			isRecurring: false,
			labels: []
		},
	];

	const input : RawTodoistTask[] = [
		{
			taskId: "6920071239",
			parentId: null,
			content: "Lavar la ropa del gym para mañana",
			completedAt: "2023-05-30T00:49:16.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			isRecurring: false,
			labels: ["gilada"],
			dueAt: null
		},
		{
			taskId: "6919294025",
			parentId: null,
			content: "Sacar la basura",
			completedAt: "2023-05-29T23:33:57.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6917841350",
			parentId: null,
			content: "documentar info sobre AWS codewhispered",
			completedAt: "2023-05-29T22:47:51.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6920094789",
			parentId: null,
			content: "Resolver el tema del candado",
			completedAt: "2023-05-29T19:14:13.000000Z",
			projectId: "1777918547",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6841124029",
			parentId: null,
			content: "Recordarle al facu dar de baja el linkedin",
			completedAt: "2023-05-29T13:23:06.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6841119029",
			parentId: "6841115479",
			content: "Check tasks 4 week",
			completedAt: "2023-05-29T01:56:57.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6868152840",
			parentId: null,
			content: "Mandarlr msj a toto para juntarnos los 3",
			completedAt: "2023-05-29T01:52:39.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6844551059",
			parentId: null,
			content: "Juntarme con vampi",
			completedAt: "2023-05-29T01:52:33.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6898082561",
			parentId: "6841105886",
			content: "Complete _May month",
			completedAt: "2023-05-29T01:49:48.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6898058993",
			parentId: "6876083667",
			content: "Check more habits you can add",
			completedAt: "2023-05-29T01:46:58.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6917765156",
			parentId: null,
			content: "Lavar ropa para mañana el gym",
			completedAt: "2023-05-29T01:01:03.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: ["gilada"]
		},
		{
			taskId: "6915250355",
			parentId: null,
			content: "Ir a la casa de la madrina",
			completedAt: "2023-05-28T17:47:12.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6898140280",
			parentId: null,
			content: "mandarle msj al toto a ver si va a estar el domingo",
			completedAt: "2023-05-27T15:21:54.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6914319149",
			parentId: null,
			content: "Ir a visitar a vampi",
			completedAt: "2023-05-27T15:20:32.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6885360249",
			parentId: null,
			content: "averiguar por una fonoaudiologa",
			completedAt: "2023-05-27T15:14:05.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6898104425",
			parentId: null,
			content: "Agregar habitos a los que ya tengo de todoist si hacen falta",
			completedAt: "2023-05-27T06:33:54.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6898103720",
			parentId: null,
			content: "Agregar gastos de Mayo que me quedan pendientes",
			completedAt: "2023-05-25T16:05:59.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6909912829",
			parentId: null,
			content: "Llevarle la ropa a vieja y al lavadero",
			completedAt: "2023-05-25T15:46:12.000000Z",
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6841115479",
			parentId: null,
			content: "Organize and schedule well organized goals",
			completedAt: null,
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6841105886",
			parentId: null,
			content: "learn about finance tools",
			completedAt: null,
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		},
		{
			taskId: "6876083667",
			parentId: null,
			content: "Find a way to encourage habits instead of goals",
			completedAt: null,
			projectId: "2308886649",
			createdAt: "2023-05-30T00:49:16.000000Z",
			updatedAt: "2023-05-30T00:49:16.000000Z",
			dueAt: null,
			isRecurring: false,
			labels: []
		}
	];

	const input_old: RawTodoistTask[] = [
		{
			"taskId": "6920071239",
			"parentId": null as null,
			"content": "Lavar la ropa del gym para mañana",
			"completedAt": "2023-05-30T00:49:16.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"isRecurring": false,
			"labels": ["gilada"],
			"dueAt": null as null
		},
		{
			"taskId": "6919294025",
			"parentId": null as null,
			"content": "Sacar la basura",
			"completedAt": "2023-05-29T23:33:57.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6917841350",
			"parentId": null as null,
			"content": "documentar info sobre AWS codewhispered",
			"completedAt": "2023-05-29T22:47:51.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6920094789",
			"parentId": null as null,
			"content": "Resolver el tema del candado",
			"completedAt": "2023-05-29T19:14:13.000000Z",
			"projectId": "1777918547",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6841124029",
			"parentId": null as null,
			"content": "Recordarle al facu dar de baja el linkedin",
			"completedAt": "2023-05-29T13:23:06.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6841119029",
			"parentId": "6841115479",
			"content": "Check tasks 4 week",
			"completedAt": "2023-05-29T01:56:57.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6868152840",
			"parentId": null as null,
			"content": "Mandarlr msj a toto para juntarnos los 3",
			"completedAt": "2023-05-29T01:52:39.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6844551059",
			"parentId": null as null,
			"content": "Juntarme con vampi",
			"completedAt": "2023-05-29T01:52:33.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6898082561",
			"parentId": "6841105886",
			"content": "Complete _May month",
			"completedAt": "2023-05-29T01:49:48.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6898058993",
			"parentId": "6876083667",
			"content": "Check more habits you can add",
			"completedAt": "2023-05-29T01:46:58.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6917765156",
			"parentId": null as null,
			"content": "Lavar ropa para mañana el gym",
			"completedAt": "2023-05-29T01:01:03.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": ["gilada"]
		},
		{
			"taskId": "6915250355",
			"parentId": null,
			"content": "Ir a la casa de la madrina",
			"completedAt": "2023-05-28T17:47:12.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6898140280",
			"parentId": null,
			"content": "mandarle msj al toto a ver si va a estar el domingo",
			"completedAt": "2023-05-27T15:21:54.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6914319149",
			"parentId": null,
			"content": "Ir a visitar a vampi",
			"completedAt": "2023-05-27T15:20:32.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6885360249",
			"parentId": null,
			"content": "averiguar por una fonoaudiologa",
			"completedAt": "2023-05-27T15:14:05.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6898104425",
			"parentId": null,
			"content": "Agregar habitos a los que ya tengo de todoist si hacen falta",
			"completedAt": "2023-05-27T06:33:54.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6898103720",
			"parentId": null,
			"content": "Agregar gastos de Mayo que me quedan pendientes",
			"completedAt": "2023-05-25T16:05:59.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6909912829",
			"parentId": null,
			"content": "Llevarle la ropa a vieja y al lavadero",
			"completedAt": "2023-05-25T15:46:12.000000Z",
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6841115479",
			"parentId": null,
			"content": "Organize and schedule well organized goals",
			"completedAt": null,
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6841105886",
			"parentId": null,
			"content": "learn about finance tools",
			"completedAt": null,
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		},
		{
			"taskId": "6876083667",
			"parentId": null,
			"content": "Find a way to encourage habits instead of goals",
			"completedAt": null,
			"projectId": "2308886649",
			"createdAt": "2023-05-30T00:49:16.000000Z",
			"updatedAt": "2023-05-30T00:49:16.000000Z",
			"dueAt": null as null,
			"isRecurring": false,
			"labels": [] as string[]
		}
	]

})

