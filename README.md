## Parked maintenance

Workflow automation cleanup is complete. 

**LLM Automation**  
All LLM-powered features (PR reviews, suggestions, etc.) are now handled exclusively by the installed **Codex GitHub App** (using your ChatGPT subscription). No additional workflow files are required.

- Redundant `llm-*.yml` workflows have been removed (completes PR #3 cleanup).  
- This eliminates auth issues, prompt fragility, CLI dependencies, and maintenance overhead.

**Deployment**  
- Configure GitHub repository secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.  
- Push to `main` to trigger deployment via existing CI/CD workflows.  
- (Optional) Remove unused secrets like `OPENAI_OAUTH_TOKEN` and `OPENAI_REFRESH_TOKEN`.

The repository stays lightweight and focused on the gateway appliance + polyrepo root.
