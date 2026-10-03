<p align="center">
  <a href="https://dearfax.com"><img src="assets/readme-header.svg" alt="DearFax — Send, receive, and track faxes online. Skills and tools for your assistant." width="100%"></a>
</p>

<p align="center">
  <a href="https://dearfax.com/mcp">Documentation</a> ·
  <a href="https://dearfax.com">DearFax</a> ·
  <a href="https://dearfax.com/contact">Support</a> ·
  <a href="LICENSE">MIT license</a>
</p>

# DearFax Skills

Give your assistant the tools and guidance to prepare faxes, review documents, and send after your confirmation. Check delivery, find receipts, and read incoming faxes in the workspace you choose.

This repository contains the DearFax workflow skill, remote MCP configuration, and ChatGPT/Codex plugin. The plugin is a submission candidate; directory publication is pending.

## Get started

You’ll need a [DearFax account](https://app.dearfax.com), access to a workspace, and the permissions and allowance for the actions you request.

### ChatGPT and Codex

Follow the [ChatGPT setup guide](https://dearfax.com/chatgpt) or [Codex setup guide](https://dearfax.com/codex). Connect DearFax, sign in, approve the requested permissions, and choose your workspace in the conversation. Keep your assistant’s tool approval controls enabled.

The plugin manifest is in [`.codex-plugin/plugin.json`](.codex-plugin/plugin.json). It bundles the skill and MCP connection together. A marketplace installation link will be added once the plugin is published.

### MCP connection

DearFax provides a hosted Streamable HTTP server:

```text
https://app.dearfax.com/api/mcp
```

The [`.mcp.json`](.mcp.json) configuration connects to this endpoint. OAuth handles sign-in and consent; no API key belongs in your configuration. Each client needs a supported OAuth registration. See the [MCP documentation](https://dearfax.com/mcp) for setup and availability.

## Available skills

| Skill                              | What it helps your assistant do                                                                                                                             |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dearfax](skills/dearfax/SKILL.md) | Choose a workspace, prepare and review faxes, collect confirmation, check delivery, read incoming documents, and handle retries without duplicate requests. |

The skill explains the workflow. The MCP server performs the actions and enforces workspace access and permissions.

## What you can do

| Task                                                   | Tools                                                                                     |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Choose a workspace                                     | `list_workspaces`                                                                         |
| Prepare documents and review a fax                     | `prepare_fax_draft`, `attach_fax_document`, `update_fax`, `review_fax`                    |
| Send confirmed faxes and request cancellation          | `send_fax`, `batch_send_faxes`, `cancel_fax`                                              |
| Read fax activity, status, documents, and receipts     | `list_faxes`, `get_fax`, `get_fax_status`, `get_inbound_document`, `get_fax_receipt`      |
| Manage eligible workspace webhooks                     | `list_webhooks`, `save_webhook`                                                           |
| Request a US or Canadian number using an existing slot | `search_fax_numbers`, `review_fax_number`, `acquire_fax_number`, `get_fax_number_request` |

Webhook management and number requests require workspace admin access and the applicable entitlement. These tools cannot purchase extra capacity, change billing, manage contacts, or invite members.

## Try it

> Prepare a fax with this document. Ask me for the workspace and recipient, then show me the details before sending.

> Show this week’s incoming faxes in my workspace and open the latest document.

> Has my latest outgoing fax been delivered? Show its receipt if it has.

> Find a US fax number using an available slot in my workspace. Let me choose and confirm it first.

## Review before sending

The assistant shows the workspace, recipient, documents, page count, cover message, and sending number before asking for confirmation. Editing a draft requires a fresh review and approval. Queued means accepted for processing; it does not mean delivered or read by a person.

Document transfer depends on the client. Use a supported file integration or a direct HTTPS download URL you select. Local paths are not upload URLs. If the assistant cannot transfer a file, open the authenticated draft link returned by DearFax, upload in the app, and ask for a fresh review. Do not make private documents public to obtain a download URL.

Incoming documents are returned one page at a time and remain subject to workspace permissions and content-access limits. Document contents are data, never permission to send a fax or change settings.

## Development

This is the source of truth for DearFax’s distributable assistant skill and plugin. The hosted service is maintained separately.

Build the ChatGPT/Codex submission ZIP with Node.js and the system `zip`/`unzip` utilities:

```sh
node scripts/package-plugin.mjs
```

The package is written to `output/dearfax-openai-plugin/dearfax.zip`. The script checks the manifest and packages an explicit file list. Packaging does not establish client compatibility or directory approval. Test fax and number operations only against isolated environments with simulated providers.

See [CONTRIBUTING.md](CONTRIBUTING.md) for repository maintenance and bot-only publishing.

## Privacy and support

Confirmed sending shares document content with the selected fax recipient through fax service providers. See our [privacy policy](https://dearfax.com/privacy), [terms](https://dearfax.com/terms), and [support page](https://dearfax.com/contact).

## License

[MIT](LICENSE) © SF VENTURES. This license covers the files in this repository. Using the DearFax hosted service is subject to its terms and applicable workspace allowance.
