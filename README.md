# dobrain-work

A lightweight Cloudflare Workers starter for a polyrepo deployment model where multiple repositories can be managed as separate services under one GitHub project umbrella.

## What this repo includes
- A minimal Cloudflare Worker entry point
- Wrangler configuration for local development and deployment
- GitHub issue and pull request templates
- A deployment workflow for Cloudflare Workers via GitHub Actions

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
  - OPENCODE_API_KEY
- Configure the following GitHub repository variables:
  - OPENCODE_MODEL (for example: deepseek-v4-flash)
  - OPENCODE_BASE_URL (for example: https://api.opencode.ai)
- Push to the main branch to trigger deployment.

## CI/CD automation
- CI workflow runs on pushes and pull requests to validate the worker and maintenance script.
- Deployment workflow publishes the Worker to Cloudflare on pushes to main.
- Maintenance workflow runs weekly and can be triggered manually for scheduled upkeep.

## Polyrepo note
This repository is intentionally lightweight so it can act as one service in a larger multi-repo project. Each repository can keep its own deployment workflow while sharing the same project-level governance and issue tracking conventions.
