# Repository identity policy

This is a public repository. All commits, pushes, pull requests, reviews, and comments must use the `dearfax-bot[bot]` GitHub App identity.

- Commit author and committer: `dearfax-bot[bot] <337366354+dearfax-bot[bot]@users.noreply.github.com>`.
- Git commit attribution alone is insufficient: authenticate remote writes and PR creation with the DearFax bot installation token.
- Never use the developer's personal GitHub login or the default `gh` credentials for repository contributions.
- Never override the repository's empty credential helper with a personal-account helper.
- If bot credentials or required bot permissions are unavailable, stop remote writes and report the missing bot permission. Do not fall back to a personal account.
- Keep private keys and installation tokens out of the repository, command output, and PR bodies.
