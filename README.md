# dobrain-work

A lightweight Cloudflare Workers starter for a polyrepo deployment model where multiple repositories can be managed as separate services under one GitHub project umbrella.

## What this repo includes
- A minimal Cloudflare Worker entry point
- Wrangler configuration for local development and deployment
- GitHub issue and pull request templates
- A deployment workflow for Cloudflare Workers via GitHub Actions
- CI and maintenance automations with OpenAI Codex integration

## Local development
1. Install dependencies:
   npm install
2. Start the worker locally:
   npm run dev
3. Verify the health endpoint:
   curl http://127.0.0.1:8787/health

## Deployment
- Configure the following GitHub repository secrets:
  - CLOUDFLARE_API_TOKEN
  - CLOUDFLARE_ACCOUNT_ID
- Push to the main branch to trigger deployment.

## LLM bots (OpenAI Codex — ChatGPT subscription)
All LLM-powered bots use the OpenAI Codex CLI with your ChatGPT business subscription — no API keys or pay-per-use costs.
- **Code Review** — reviews PR diffs for bugs, security issues, and code quality
- **Issue Triage** — classifies and prioritizes new issues automatically
- **Changelog Writer** — generates changelog entries from commits on push
- **Health Report** — weekly repo health metrics and improvement suggestions
- **Docs Sync** — checks if README stays in sync with code changes in PRs

## CI/CD automation
- CI workflow runs on pushes and pull requests to validate the worker and maintenance script.
- Deployment workflow publishes the Worker to Cloudflare on pushes to main.
- Maintenance workflow runs weekly and can be triggered manually for scheduled upkeep.

## Bots and automations
- **CodeQL** — weekly security scanning for JavaScript vulnerabilities
- **Stale bot** — auto-closes inactive issues and PRs after 30 days
- **Auto-labeler** — labels PRs based on changed files (worker, github, docs, dependencies)
- **PR size labeler** — flags large PRs to encourage smaller changes
- **Dependabot auto-merge** — auto-merges non-major dependabot updates
- **Release drafter** — drafts release notes automatically from merged PRs
- **Welcome bot** — greets first-time contributors on their first issue or PR

## LLM-powered bots (OpenAI Codex — ChatGPT subscription)
- **Code Review** — reviews PR diffs for bugs, security issues, and code quality
- **Issue Triage** — classifies and prioritizes new issues automatically
- **Changelog Writer** — generates changelog entries from commits on push
- **Health Report** — weekly repo health metrics and improvement suggestions
- **Docs Sync** — checks if README stays in sync with code changes in PRs

## Polyrepo note
This repository is intentionally lightweight so it can act as one service in a larger multi-repo project. Each repository can keep its own deployment workflow while sharing the same project-level governance and issue tracking conventions.

## Assigned model task
After this repository is pushed, the assigned model should validate the CI workflow, verify the deployment workflow, run the maintenance workflow, and report back with any follow-up changes needed for the polyrepo deployment setup.
