# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single lightweight **Cloudflare Worker** (`src/index.js`) — the "DoBrain Work Gateway". It serves a static HTML control panel at `/` (and `/setup`), a JSON `/health` endpoint, `/api/providers`, and an OpenAI-compatible proxy under `/v1/*` and `/responses`. There is no build step and no bundler; the Worker is the raw JS file referenced by `wrangler.toml`.

Dependencies (`npm ci`) are already installed by the startup update script. Node 22 is expected (matches CI in `.github/workflows/ci.yml`).

Standard commands (see `package.json`):
- Run dev server: `npm run dev` (i.e. `wrangler dev`). It runs a local `workerd` server, no Cloudflare login or network required. Add `--ip 127.0.0.1 --port 8787` when you need a fixed address for testing.
- Lint/validate: `npm run check` (`node --check src/index.js`).
- Repo health check: `npm run maintenance` (`node scripts/maintenance.js`).

Non-obvious notes:
- `wrangler dev` runs fully locally; the "OpenAI-compatible" proxy features (`/v1/*`) only return real completions if you supply a provider endpoint/key via the `x-dobrain-endpoint` / `x-dobrain-provider-key` request headers or `DEFAULT_PROVIDER_BASE_URL` / `DEFAULT_PROVIDER_API_KEY` vars. Without them the proxy returns a 400 "Missing provider endpoint" — this is expected, not a bug.
- `npm run deploy` (`wrangler deploy`) publishes to Cloudflare and requires `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`; do not run it for local development.
