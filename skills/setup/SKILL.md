---
name: setup
description: Set up DearFax for this conversation by checking the connection and asking the user to select a workspace and time zone.
---

# Set up DearFax

1. Call `list_workspaces` and ask which workspace the user wants to use. Follow pagination if needed. Never silently choose the first workspace.
2. Ask for the user’s time zone if it is unknown and they want date-based activity such as “this week.” Confirm whether their week starts Monday or Sunday.
3. Confirm the selected workspace and explain that they can send an attached document, read incoming faxes, or check delivery. Remember the selection only for this conversation; do not claim that a permanent preference was saved.
4. If the user wants an inbox and `open_fax_inbox` is available, open it. The panel asks the user to select their workspace. If the client cannot display it, use `list_faxes` and describe the results in the conversation.

Do not create a draft, send a fax, allocate a number, change billing, or save a webhook as part of setup. Follow the DearFax skill for these tasks and their separate confirmation steps. If authentication or workspace access fails, explain the returned limitation without claiming setup succeeded.
