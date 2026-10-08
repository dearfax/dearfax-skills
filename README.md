# DearFax Skills

Skills for AI agents to prepare, send, receive, and track faxes with DearFax. Packaged for ChatGPT, Codex, and clients that support [Agent Plugins](https://agent-plugins.org). Includes an MCP server for tool access.

## Install

```sh
npx skills add dearfax/dearfax-skills
```

Select the DearFax skill when prompted. This command installs the skill; connect the MCP server in your client to use its tools.

## Available skills

| Skill                              | Description                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [dearfax](skills/dearfax/SKILL.md) | Choose a workspace, prepare and review faxes, send after confirmation, check delivery, and read incoming documents. |

| [setup](skills/setup/SKILL.md) | Check the connection and select a workspace and time zone for the conversation. |

## MCP server

DearFax’s hosted [MCP server](https://dearfax.com/mcp) connects over Streamable HTTP at:

```text
https://app.dearfax.com/api/mcp
```

It gives agents tool access to fax drafts, sending, delivery status, incoming documents, workspace webhooks, and eligible fax number requests. It authenticates via OAuth. Supported clients walk you through sign-in on first connection, so no API key or header configuration is needed. Client OAuth registration is required.

## Plugins

This repository follows the [Agent Plugins](https://agent-plugins.org) open standard: [`plugin.json`](plugin.json) and [`mcp.json`](mcp.json) at the root, with skills in [`skills/`](skills/). Any conformant client can load the package; connecting to DearFax also requires supported OAuth registration.

ChatGPT and Codex use the same files, with OpenAI-specific metadata in `plugin.json` under `extensions.com.openai`.

## Prerequisites

A DearFax account with access to a workspace and the permissions and allowance for the actions you request. [Sign up for an account](https://app.dearfax.com/sign-up).

## License

[MIT](LICENSE)

## Version 0.5.0 preparation

The setup skill selects a workspace for the current conversation. Native inbox and review panels require the matching DearFax MCP server release and a compatible host. Text workflows remain available in other clients. Deploy and verify that server release before submitting this package; this branch does not change the version currently under review.
