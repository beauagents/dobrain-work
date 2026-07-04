# DoBrain Work

DoBrain Work is the product umbrella, not a single backend.

This repository currently contains the first lightweight component: a setup-first gateway appliance. It should stay small enough that a user can install it, open the static setup screen, add a model or future PKCE OAuth connection, choose a default endpoint, and continue.

The backend stack may change over time. Users should not need to track whether the runtime is Cloudflare, Vercel, local, or another provider. The stable experience is the setup flow.

> Bring your models. We'll handle the rest.

## Current component

**Gateway appliance**

- Static setup GUI at `/` and `/setup`
- Health endpoint at `/health`
- Provider metadata at `/api/providers`
- OpenAI-compatible passthrough for `/v1/*`
- `/responses` passthrough
- Router API-key auth with `Authorization: Bearer`, `x-api-key`, or `x-router-api-key`
- User-provided endpoint and provider key support for quick local setup
- Environment-provided default provider support for hosted installs
- Auto and Auto-Free route labels
- Model/privacy footnotes returned in response headers

## What this repo is allowed to be

This repo can act as the early polyrepo root while the system is still forming.

It may temporarily contain:

- the first gateway appliance
- product docs
- project canon
- deployment notes
- agent instructions
- parked roadmap items

As the system hardens, components can move into their own repositories or folders without changing the public product name.

## What this repo is not

This repo should not pretend the gateway is the whole product.

DoBrain Work is expected to grow into multiple components:

- gateway appliance
- consumer app
- self-host installer
- Mirror
- Rooms
- Wallet
- Signals
- Automations
- optional Discord bridge
- optional Bankr/x402 integration
- deployment profiles for different runtimes

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the worker locally:

   ```bash
   npm run dev
   ```

3. Open the setup GUI:

   ```text
   http://127.0.0.1:8787/setup
   ```

4. Verify the health endpoint:

   ```bash
   curl http://127.0.0.1:8787/health
   ```

## Basic hosted configuration

Set these environment values when you want the gateway to have a default provider without asking the user to paste a provider key in the setup GUI.

```text
ROUTER_API_KEY=your-router-key
DEFAULT_PROVIDER_BASE_URL=https://example-provider.com/api/v1
DEFAULT_PROVIDER_API_KEY=provider-key
PROJECT_NAME=dobrain-work
ENVIRONMENT=production
```

The setup GUI can still accept a temporary endpoint and provider key for quick testing. Production installs should prefer server-side secrets.

## User-facing setup principle

The user should see:

1. Add model credentials or connect through PKCE OAuth later.
2. Choose the default endpoint.
3. Send a test message.
4. Done.

The user should not need to understand the backend stack.

## Privacy footnotes

Every generated response should be able to tell the user what route was used in plain language.

- **Auto**: stronger configured route, provider processing depends on configured provider and workspace settings.
- **Auto-Free**: free or low-cost route, provider may log prompts and outputs according to provider policy.

The implementation returns this as `x-dobrain-footnote` for now. The consumer app can render it under each message later.

## Polyrepo direction

The active direction is:

```text
DoBrain Work = product umbrella
this repo = early root + first gateway appliance
future repos = app, workers, docs, integrations, founder site, community tools
```

Do not hard-code the public identity around one runtime provider.

Do not expose backend churn to users.

Do not make self-hosters learn the full architecture before setup.

## Parked maintenance

Workflow automation cleanup is parked until the MVP path is stable. PR #3 contains useful cleanup but also raised real workflow-auth concerns. It should be revisited after the gateway appliance is verified.
