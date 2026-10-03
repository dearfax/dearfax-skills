# Maintaining DearFax Skills

Keep the workflow skill, MCP configuration, and ChatGPT/Codex manifest here. Do not duplicate them in the application repository. Change the hosted MCP implementation in its application repository, then update this package when the public workflow changes.

Use fictional documents and simulated fax and number providers for testing. Preserve explicit confirmation, workspace authorization, and retry safeguards. Never commit credentials, private recording links, reviewer accounts, production documents, or local environment files.

## Bot-only publishing

All repository commits must use the dedicated DearFax GitHub App bot for both author and committer. Authenticate Git pushes with that app's short-lived installation token, not a personal token, SSH key, or user-to-server token. Resolve the bot's numeric ID and noreply email from GitHub before configuring Git; never guess the identity.

Start from this repository's own history. Do not merge, cherry-pick, or import application history that contains personal identities. Do not add personal co-author trailers. Do not use GitHub's browser editor or a merge button under a personal account to create commits.

Before publishing, inspect every outgoing commit's author and committer, inspect the complete staged diff, run the package script, and check the archive's file list. Verify GitHub attributes the published commits to the app bot afterward. Repository rules and local hooks complement this check; they do not replace it.

Increase the plugin version for each released package. Keep publication claims and installation links accurate. Distribution remains pending until the relevant directory approves the plugin.
