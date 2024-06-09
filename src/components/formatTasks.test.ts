import exp from 'constants';
import { prepareTasksForRendering, renderTasksAsText } from './formatTasks';
import { TodoistSettings } from 'src/constants/DefaultSettings';


describe("formatTasks", () => {
    describe("prepareTasksForRendering", () => {
    it("should format tasks for rendering", () => {
        const renderedTasks = prepareTasksForRendering(input);
        expect(renderedTasks).toEqual(expectedPrepareTaskForRenderingOutput);
    })
    const input = [
        {
            "taskId": "6920071239",
            "parentId": null,
            "content": "Lavar la ropa del gym para mañana",
            "dateCompleted": "2023-05-30T00:49:16.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6919294025",
            "parentId": null,
            "content": "Sacar la basura",
            "dateCompleted": "2023-05-29T23:33:57.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6917841350",
            "parentId": null,
            "content": "documentar info sobre AWS codewhispered",
            "dateCompleted": "2023-05-29T22:47:51.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6920094789",
            "parentId": null,
            "content": "Resolver el tema del candado",
            "dateCompleted": "2023-05-29T19:14:13.000000Z",
            "projectId": "1777918547"
        },
        {
            "taskId": "6841124029",
            "parentId": null,
            "content": "Recordarle al facu dar de baja el linkedin",
            "dateCompleted": "2023-05-29T13:23:06.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6841119029",
            "parentId": "6841115479",
            "content": "Check tasks 4 week",
            "dateCompleted": "2023-05-29T01:56:57.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6868152840",
            "parentId": null,
            "content": "Mandarlr msj a toto para juntarnos los 3",
            "dateCompleted": "2023-05-29T01:52:39.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6844551059",
            "parentId": null,
            "content": "Juntarme con vampi",
            "dateCompleted": "2023-05-29T01:52:33.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6898082561",
            "parentId": "6841105886",
            "content": "Complete _May month",
            "dateCompleted": "2023-05-29T01:49:48.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6898058993",
            "parentId": "6876083667",
            "content": "Check more habits you can add",
            "dateCompleted": "2023-05-29T01:46:58.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6917765156",
            "parentId": null,
            "content": "Lavar ropa para mañana el gym",
            "dateCompleted": "2023-05-29T01:01:03.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6915250355",
            "parentId": null,
            "content": "Ir a la casa de la madrina",
            "dateCompleted": "2023-05-28T17:47:12.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6898140280",
            "parentId": null,
            "content": "mandarle msj al toto a ver si va a estar el domingo",
            "dateCompleted": "2023-05-27T15:21:54.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6914319149",
            "parentId": null,
            "content": "Ir a visitar a vampi",
            "dateCompleted": "2023-05-27T15:20:32.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6885360249",
            "parentId": null,
            "content": "averiguar por una fonoaudiologa",
            "dateCompleted": "2023-05-27T15:14:05.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6898104425",
            "parentId": null,
            "content": "Agregar habitos a los que ya tengo de todoist si hacen falta",
            "dateCompleted": "2023-05-27T06:33:54.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6898103720",
            "parentId": null,
            "content": "Agregar gastos de Mayo que me quedan pendientes",
            "dateCompleted": "2023-05-25T16:05:59.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6909912829",
            "parentId": null,
            "content": "Llevarle la ropa a vieja y al lavadero",
            "dateCompleted": "2023-05-25T15:46:12.000000Z",
            "projectId": "2308886649"
        },
        {
            "taskId": "6841115479",
            "parentId": null,
            "content": "Organize and schedule well organized goals",
            "dateCompleted": null,
            "projectId": "2308886649"
        },
        {
            "taskId": "6841105886",
            "parentId": null,
            "content": "learn about finance tools",
            "dateCompleted": null,
            "projectId": "2308886649"
        },
        {
            "taskId": "6876083667",
            "parentId": null,
            "content": "Find a way to encourage habits instead of goals",
            "dateCompleted": null,
            "projectId": "2308886649"
        }
    ]

    })

    describe("renderTasksAsText", () => {
        it("should format tasks for rendering", () => {
            const renderedTasks: string = renderTasksAsText(expectedPrepareTaskForRenderingOutput, inputProjects, inputSettings);
            const completelyRemoveExtraSpaces = (str: string) => str.trim().replace(/\n/g, "").replace(/\s+/g, " ")
            const result = completelyRemoveExtraSpaces(renderedTasks)
            const expected = completelyRemoveExtraSpaces(output)
            expect(result).toEqual(expected);
        })
        const inputSettings : TodoistSettings = {
            "settingsVersion": 5,
            "keywordSegmentStart": "%% COMPLETED_TODOIST_TASKS_START %%",
            "keywordSegmentEnd": "%% COMPLETED_TODOIST_TASKS_END %%",
            "authToken": "my-auth-token",
            "taskPrefix": "*",
            "taskPostfix": "",
            "renderSubtasks": true,
            "renderProjectsHeaders": true
        }
        const inputProjects ={
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

        // const input = 
        const output = `* Inbox
        * Resolver el tema del candado 
    * May 2023
        * Find a way to encourage habits instead of goals 
            * Check more habits you can add 
        * learn about finance tools 
            * Complete _May month 
        * Organize and schedule well organized goals 
            * Check tasks 4 week 
        * Llevarle la ropa a vieja y al lavadero 
        * Agregar gastos de Mayo que me quedan pendientes 
        * Agregar habitos a los que ya tengo de todoist si hacen falta 
        * averiguar por una fonoaudiologa 
        * Ir a visitar a vampi 
        * mandarle msj al toto a ver si va a estar el domingo 
        * Ir a la casa de la madrina 
        * Lavar ropa para mañana el gym 
        * Juntarme con vampi 
        * Mandarlr msj a toto para juntarnos los 3 
        * Recordarle al facu dar de baja el linkedin 
        * documentar info sobre AWS codewhispered 
        * Sacar la basura 
        * Lavar la ropa del gym para mañana`
    })
    const expectedPrepareTaskForRenderingOutput = [
        {
            "taskId": "6920071239",
            "content": "Lavar la ropa del gym para mañana",
            "dateCompleted": new Date("2023-05-30T00:49:16.000Z"),
            "projectId": "2308886649",
            "childTasks": [] as any[]
        },
        {
            "taskId": "6919294025",
            "content": "Sacar la basura",
            "dateCompleted": new Date("2023-05-29T23:33:57.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6917841350",
            "content": "documentar info sobre AWS codewhispered",
            "dateCompleted": new Date("2023-05-29T22:47:51.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6920094789",
            "content": "Resolver el tema del candado",
            "dateCompleted": new Date("2023-05-29T19:14:13.000Z"),
            "projectId": "1777918547",
            "childTasks": []
        },
        {
            "taskId": "6841124029",
            "content": "Recordarle al facu dar de baja el linkedin",
            "dateCompleted": new Date("2023-05-29T13:23:06.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6868152840",
            "content": "Mandarlr msj a toto para juntarnos los 3",
            "dateCompleted": new Date("2023-05-29T01:52:39.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6844551059",
            "content": "Juntarme con vampi",
            "dateCompleted": new Date("2023-05-29T01:52:33.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6917765156",
            "content": "Lavar ropa para mañana el gym",
            "dateCompleted": new Date("2023-05-29T01:01:03.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6915250355",
            "content": "Ir a la casa de la madrina",
            "dateCompleted": new Date("2023-05-28T17:47:12.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6898140280",
            "content": "mandarle msj al toto a ver si va a estar el domingo",
            "dateCompleted": new Date("2023-05-27T15:21:54.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6914319149",
            "content": "Ir a visitar a vampi",
            "dateCompleted": new Date("2023-05-27T15:20:32.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6885360249",
            "content": "averiguar por una fonoaudiologa",
            "dateCompleted": new Date("2023-05-27T15:14:05.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6898104425",
            "content": "Agregar habitos a los que ya tengo de todoist si hacen falta",
            "dateCompleted": new Date("2023-05-27T06:33:54.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6898103720",
            "content": "Agregar gastos de Mayo que me quedan pendientes",
            "dateCompleted": new Date("2023-05-25T16:05:59.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6909912829",
            "content": "Llevarle la ropa a vieja y al lavadero",
            "dateCompleted": new Date("2023-05-25T15:46:12.000Z"),
            "projectId": "2308886649",
            "childTasks": []
        },
        {
            "taskId": "6841115479",
            "content": "Organize and schedule well organized goals",
            "dateCompleted": null as string | null,
            "projectId": "2308886649",
            "childTasks": [
                {
                    "taskId": "6841119029",
                    "content": "Check tasks 4 week",
                    "dateCompleted": new Date("2023-05-29T01:56:57.000Z"),
                    "projectId": "2308886649",
                    "childTasks": [] as any[]
                }
            ]
        },
        {
            "taskId": "6841105886",
            "content": "learn about finance tools",
            "dateCompleted": null as string | null,
            "projectId": "2308886649",
            "childTasks": [
                {
                    "taskId": "6898082561",
                    "content": "Complete _May month",
                    "dateCompleted": new Date("2023-05-29T01:49:48.000Z"),
                    "projectId": "2308886649",
                    "childTasks": []
                }
            ]
        },
        {
            "taskId": "6876083667",
            "content": "Find a way to encourage habits instead of goals",
            "dateCompleted": null as string,
            "projectId": "2308886649",
            "childTasks": [
                {
                    "taskId": "6898058993",
                    "content": "Check more habits you can add",
                    "dateCompleted": new Date("2023-05-29T01:46:58.000Z"),
                    "projectId": "2308886649",
                    "childTasks": [] as any[]
                }
            ]
        }
    ]

})

