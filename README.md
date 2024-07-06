# Todoist Completed Tasks - Obsidian Plugin
#### forked to do my things, donations are for they

---

### 📋 current todolist :
- ✅ res: define what's the best way to handle data for dataview
    - ✅I will have to `upsert` notes for each task
		- source of truth is `todoist` and `obsidian` is used for persistence, **pull-only**. 
        - Obsidian is used for analytics 📈 and monitoring 👀
    - ✅ will create folders for each day 📅
    - ⚙separate `tasks` from `planned-tasks` using section name (tbd in domain encoding)
        - for `tasks` I will use `todoist-sync/YYYY/MM/YYYY-MM-DD/{status-emoji}-task-title.md`
            - ✅ if is completed -> prefix ✅
            - ⚙️ if not completed yet -> prefix ⚙️ 
                - (this should consider I'm fetching `completed-tasks` most of the time but when it's parent)
        - for `planned-tasks` I will use `todoist-sync/YYYY/MM/YYYY-MM-DD/task-title/planned-tasks.md`
        - ✅I would create folders based on `dueAt` -> `completedAt` -> `createdAt` 
    - ✅with metadata:
        - ✅status: inprogress | completed. ✅ update `status` based on `completedAt`
        - ✅section: section-name
        - ✅project: project-name
        - ✅createdAt: YYYY-MM-DD:HH:MM:SS
        - ✅dueAt: YYYY-MM-DD:HH:MM:SS
        - ✅completedAt: YYYY-MM-DD:HH:MM:SS
        - ✅priority: 1 (P1 = 4, P2 = 3, P3 = 2, P4 = 1)
        - ✅tags: #todoist #sync #labels
    - ⚙️ and data structure:
        - ✅description
        - sub-tasks
            - link to `todoist-sync/YYYY/MM/DD/task-title/sub-task-title.md`
            - think how to link and find them. maybe re-think naming
        - comments
            - link to `todoist-sync/YYYY/MM/DD/task-title/comments.md`
            - needs to `comments` api client
        - ✅href
            - link to `todoist-app` and `todoist-api` at the end for easier debug
            - `task-name=task_name_replaced_spaces_with_hyphen(-)`
			- `{task-name}-task-id` lol
- ✅ res: define how can I save it into a particular path
    - ✅ res: how can I create files in there or put at the end if the already exists
-  ✅ tech: add new values to test
-  ✅ implement solution. can be a new serialization impl
    - deserialize
    - save in folder with upsert strategy
    - paste script only (depends on how do we handle data) 
- ✅ test all other important functions to start refactoring
- ✅ convention in code would be: 
    - `startLowerCamelCase` for variable and class names
    - `StartUpperCamelCase` for constants
    - `snake_case` for json and object fields becase todoist also uses it
    - `kebab-case` for filenames and folders

- for obsidian tags I will start with `todoist_` and then the tag name
```yaml
---
date: ${todoist_completed_at}$
todoist_created_at: str
todoist_updated_at: str | null
todoist_completed_at: str | null
todoist_task_id: str | null
todoist_project_name: str | null
todoist_project_id: str | null
todoist_parent_id: str | null
todoist_status: done | inprogress | todo
todoist_is_recurring: boolean
todoist_lables: str[]
tags: [todoist, project_name, status]
---
```

## how to run it as dev
-  `npm install`
-  `npm run build`
    - this should create `main.js` 
- copy `main.js` to `<vault>/plugins/todoist-completed-tasks/main.js`
- `npm run build && cp main.js ~/Obsidian\ Notebook/personal/.obsidian/plugins/todoist-completed-tasks-plugin/main.js`
- disable and enable the plugin to reload it

## how to test it
- add __mocks__ folder to the root of the project
- `npm install --save-dev ts-jest @types/jest`
- `npm test`

---

## Project structure that I'll go for components (side-effect) and functions (pure)
```
src/constants/: stateless - all inside this folder. Should not have side effect with no dependencies. reusable in tests
src/constants/{component_name}.ts: stateless - types and constants of the component for test re-usability
src/constants/shared.ts: shared constants - for now rule is: if types are used in two different files it will be explicit in the imports. candidate for domain boundaries research. 
src/{component_name}.ts: main component with dependencies and business logic
src/{component_name}/{sub_component_name}.ts: sub component if too complex or easier to think in parts
src/{component_name}.test.ts: tests
```

I don't know what the domain is. I'll just go for the components and then see if it's clearer as I move forward.
### how do i think it
- if it's a shared logic between one file:
    - refactor it to a function
    - if it has side-effects or it's stateful -> it goes into the file or class `components/file-name.ts`
    - if is a pure function -> it goes into `constants/file-name.ts`
- if it's a shared logic between two files:
    - refactor it to a function
    - if it has side-effects or is stateful -> it goes into the file or class
    - if is a pure function -> it goes into constants/s.ts

---

This obsidian plugin fetches your completed tasks from Todoist and adds them to your obsidian note.

![demo](https://raw.githubusercontent.com/Ledaryy/obsidian-todoist-completed-tasks/master/static/gif/plugin_preview_v1.2.0.gif)

# Docs

1. [Features plan](https://github.com/Ledaryy/obsidian-todoist-completed-tasks/blob/master/docs/FEATURES.md)
2. [Known Bugs](https://github.com/Ledaryy/obsidian-todoist-completed-tasks/blob/master/docs/KNOWN_BUGS.md)
3. [Advanced usage](https://github.com/Ledaryy/obsidian-todoist-completed-tasks/blob/master/docs/ADVANCED.md)

# Usage

1. Install this plugin (Todoist Completed Tasks) through Obsidian and **enable** it
2. Enter your Todoist API token in the plugin settings.
    - **Security risks** and **API Token Installation guide** available [here](https://github.com/Ledaryy/obsidian-todoist-completed-tasks/blob/master/docs/API_KEY_INSTALLATION.md)
3. Place start segment and end segment in your note
    - **Start segment** is a line with `%% COMPLETED_TODOIST_TASKS_START %%`
    - **End segment** is a line with `%% COMPLETED_TODOIST_TASKS_END %%`
4. Run the plugin
    - By clicking the 🔄 button in the left sidebar
    - By executing `(Ctrl+P > Todoist Completed Tasks: Fetch today's completed tasks)`
5. Done! Also check out the [Advanced usage](https://github.com/Ledaryy/obsidian-todoist-completed-tasks/blob/master/docs/ADVANCED.md) of the plugin. It has many cool features!

## Features

-   Fetch today's completed tasks
-   Fetch completed tasks for the last N hours
-   Fetch completed tasks using dates from segments ([Templater](https://github.com/SilentVoid13/Templater) support)
-   Customizable prefix and postfix for each task ([Obsidian Tasks](https://github.com/obsidian-tasks-group/obsidian-tasks) support)

## Say Thanks 🙏

If you like this plugin and would like to buy me a coffee, you can!

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="BuyMeACoffee" width="100">](https://www.buymeacoffee.com/ledaryy)

## Attribution

This plugin is heavily influenced by the [Todoist Text](https://github.com/wesmoncrief/obsidian-todoist-text) plugin.
