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
- Push to the main branch to trigger deployment.

## Polyrepo note
This repository is intentionally lightweight so it can act as one service in a larger multi-repo project. Each repository can keep its own deployment workflow while sharing the same project-level governance and issue tracking conventions.
