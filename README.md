# Todoist Completed Tasks - Obsidian Plugin
#### forked to do my things, donations are for they

### 📋 current todolist :
- [ ] feat: test serialization and document jsons in code
- feat: refactor tested code
- [ ] res: define what's the best way to handle data for dataview
    - I will have to `upsert` notes for each task
    - I will create folders for each day
        - todoist-sync/YYYY/MM/DD/task-title.md
        - I would create folders based on `dueAt`
            - update `status` based on `completedAt`
    - with metadata:
        - status: inprogress | completed
        - section: section-name
        - project: project-name
        - createdAt: YYYY-MM-DD:HH:MM:SS
        - dueAt: YYYY-MM-DD:HH:MM:SS
        - completedAt: YYYY-MM-DD:HH:MM:SS
        - priority: 1
        - tags: #todoist #sync #labels
    - and data structure:
        - description
        - sub-tasks
            - link to `todoist-sync/YYYY/MM/DD/task-title/sub-task-title.md`
        - comments
            - link to `todoist-sync/YYYY/MM/DD/task-title/comments.md`
- [ ] res: define how can I save it into a particular path
    - [ ] res: how can I create files in there or put at the end if the already exists
- [ ] tech: add new values to test
- [ ] implement solution. can be a new serialization impl
    - [ ] deserialize
    - [ ] save in folder with upsert strategy
    - [ ] paste script only (depends on how do we handle data) 
- [ ] test all other important functions to start refactoring
- convention in code would be: 
    - `startLowerCamelCase` for variable and class names
    - `StartUpperCamelCase` for constants
    - `snake_case` for json and object fields becase todoist also uses it
    - `kebab-case` for filenames and folders

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

### 📋 current todolist :
- [ ] feat: test serialization and document jsons in code
- feat: refactor tested code
- [ ] res: define what's the best way to handle data for dataview
    - I will have to `upsert` notes for each task
    - I will create folders for each day
        - todoist-sync/YYYY/MM/DD/task-title.md
        - I would create folders based on `dueAt`
            - update `status` based on `completedAt`
    - with metadata:
        - status: inprogress | completed
        - section: section-name
        - project: project-name
        - createdAt: YYYY-MM-DD:HH:MM:SS
        - dueAt: YYYY-MM-DD:HH:MM:SS
        - completedAt: YYYY-MM-DD:HH:MM:SS
        - priority: 1
        - tags: #todoist #sync #labels
    - and data structure:
        - description
        - sub-tasks
            - link to `todoist-sync/YYYY/MM/DD/task-title/sub-task-title.md`
        - comments
            - link to `todoist-sync/YYYY/MM/DD/task-title/comments.md`
- [ ] res: define how can I save it into a particular path
    - [ ] res: how can I create files in there or put at the end if the already exists
- [ ] tech: add new values to test
- [ ] implement solution. can be a new serialization impl
    - [ ] deserialize
    - [ ] save in folder with upsert strategy
    - [ ] paste script only (depends on how do we handle data) 
- [ ] test all other important functions to start refactoring
- convention in code would be: 
    - `startLowerCamelCase` for variable and class names
    - `StartUpperCamelCase` for constants
    - `snake_case` for json and object fields becase todoist also uses it
    - `kebab-case` for filenames and folders

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
