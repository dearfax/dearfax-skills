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

## MCP server

DearFax’s hosted [MCP server](https://dearfax.com/mcp) connects over Streamable HTTP at:

```text
https://app.dearfax.com/api/mcp
```

It gives agents tool access to fax drafts, sending, delivery status, incoming documents, workspace webhooks, and eligible fax number requests. It authenticates via OAuth. Supported clients walk you through sign-in on first connection, so no API key or header configuration is needed. Client OAuth registration is required.

## Plugins

This repository follows the [Agent Plugins](https://agent-plugins.org) open standard: [`plugin.json`](plugin.json) and [`mcp.json`](mcp.json) at the root, with skills in [`skills/`](skills/). Any conformant client can load the package; connecting to DearFax also requires supported OAuth registration.

Platform-specific manifests are also included:

- **ChatGPT and Codex** — [`.codex-plugin/plugin.json`](.codex-plugin/plugin.json), with [`.mcp.json`](.mcp.json).

ChatGPT/Codex directory publication is pending.

## Prerequisites

A DearFax account with access to a workspace and the permissions and allowance for the actions you request. [Sign up for an account](https://app.dearfax.com/sign-up).

## License

[MIT](LICENSE)
