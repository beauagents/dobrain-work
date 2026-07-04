# Deployment

This repository deploys the current gateway appliance through the existing GitHub Actions workflow at `.github/workflows/deploy.yml`.

Required repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The workflow runs on pushes to `main` and executes:

```bash
npm ci
npx wrangler deploy
```

The deployed Worker name is configured in `wrangler.toml`.
