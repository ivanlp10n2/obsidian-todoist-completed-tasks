original definition. updated definition is the code -> currently don't have it

#### what info do I need from them


#### what info do I need to save


#### some tag/template definition
```
title           = task_title : string
date            = task_date : date
tags            = [task_tags] : string[]
last_edited     = task_last_edited : date
last_sync       = task_last_sync : date
is_recurrent    = task_is_recurrent : boolean
description     = task_description : string
section         = task_section : string
parent_ref      = task_parent_ref : string
children_ref    = task_children_ref : string
comment_action  = comment_action : 'added' | 'edited' | 'deleted'
comment_content = comment_content : string
comment_owner   = comment_owner : string
comment_date    = comment_date : date
```

#### how to do it
```

---
title: {{title}}
date: {{date}}
tags: [{{tags}}]
is_recurrent: {{is_recurrent}}
last_edited: {{last_edited}}
last_sync: {{last_sync}}
---

{{title}}

#### description
{{description}}

#### section
{{section}}
{{if parent_ref}} parent: {{parent_ref}} {{/if}}
{{if children_ref}} children: {{children_ref}} {{/if}}

#### comments
{{comment_action}}: {{comment_content}} - {{comment_owner}} - {{comment_date}}

---

#### History of changes

```