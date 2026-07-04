const HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>DoBrain Work Gateway</title>
  <style>
    :root { color-scheme: dark; --bg:#10100f; --panel:#1b1b19; --line:#37352f; --text:#f4efe7; --muted:#b8afa3; --gold:#d6a66f; --terra:#c8765d; --ok:#7bd88f; --bad:#ff8a8a; }
    * { box-sizing:border-box; }
    body { margin:0; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: radial-gradient(circle at top right, rgba(200,118,93,.16), transparent 35%), var(--bg); color:var(--text); }
    main { max-width:980px; margin:0 auto; padding:48px 20px 80px; }
    .hero { display:grid; gap:14px; margin-bottom:28px; }
    .eyebrow { color:var(--gold); letter-spacing:.18em; text-transform:uppercase; font-size:12px; }
    h1 { font-size: clamp(34px, 7vw, 74px); line-height:.95; margin:0; letter-spacing:-.05em; }
    h1 em { color:var(--terra); font-style:italic; }
    p { color:var(--muted); line-height:1.65; }
    .grid { display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:16px; }
    .card { background: color-mix(in srgb, var(--panel), transparent 6%); border:1px solid var(--line); border-radius:18px; padding:18px; box-shadow: 0 20px 50px rgba(0,0,0,.18); }
    label { display:block; color:var(--gold); font-size:12px; letter-spacing:.12em; text-transform:uppercase; margin:12px 0 6px; }
    input, select, textarea, button { width:100%; border:1px solid var(--line); border-radius:12px; padding:12px 13px; background:#11110f; color:var(--text); font:inherit; }
    textarea { min-height:110px; resize:vertical; }
    button { cursor:pointer; background:linear-gradient(135deg, var(--terra), var(--gold)); color:#17120e; border:0; font-weight:700; margin-top:12px; }
    button.secondary { background:#25231f; color:var(--text); border:1px solid var(--line); }
    code, pre { white-space:pre-wrap; overflow-wrap:anywhere; }
    pre { background:#0c0c0b; border:1px solid var(--line); border-radius:14px; padding:14px; min-height:120px; color:#e9dfd0; }
    .status { font-size:13px; color:var(--muted); }
    .footnote { border-top:1px solid var(--line); margin-top:14px; padding-top:12px; font-size:12px; color:var(--muted); }
    .pill { display:inline-flex; border:1px solid var(--line); border-radius:999px; padding:6px 10px; color:var(--muted); font-size:12px; margin-right:6px; }
    @media (max-width:800px){ .grid{grid-template-columns:1fr;} }
  </style>
  <script defer src="https://cdn.vercel-insights.com/v1/script.js"></script>
</head>
<body>
<main>
  <section class="hero">
    <div class="eyebrow">DoBrain Work Gateway</div>
    <h1>Install. Add a model. Set the <em>default endpoint.</em></h1>
    <p>This is the light static control surface. Backend stacks can change. Users should not need to care. They configure one route, test one message, and continue.</p>
    <div><span class="pill">Auto</span><span class="pill">Auto-Free</span><span class="pill">OpenAI-compatible</span><span class="pill">PKCE later</span></div>
  </section>
  <section class="grid">
    <div class="card">
      <h2>Setup</h2>
      <label>Router API key</label>
      <input id="routerKey" type="password" placeholder="Your router key" />
      <label>Default endpoint</label>
      <input id="endpoint" placeholder="https://openrouter.ai/api/v1" />
      <label>Provider API key</label>
      <input id="providerKey" type="password" placeholder="Provider key or leave blank if server env is configured" />
      <label>Default model</label>
      <input id="model" placeholder="openai/gpt-4o-mini or provider model id" />
      <button onclick="saveSettings()">Save locally</button>
      <button class="secondary" onclick="checkHealth()">Check gateway</button>
      <p id="setupStatus" class="status">Settings stay in this browser unless server-side config is added later.</p>
    </div>
    <div class="card">
      <h2>Test message</h2>
      <label>Route</label>
      <select id="route">
        <option value="auto">Auto</option>
        <option value="auto-free">Auto-Free</option>
      </select>
      <label>Message</label>
      <textarea id="message">Say hello from DoBrain Work. Keep it short.</textarea>
      <button onclick="sendChat()">Send test</button>
      <div class="footnote" id="footnote">Generated route details appear after a response.</div>
    </div>
  </section>
  <section class="card" style="margin-top:16px">
    <h2>Response</h2>
    <pre id="output">No response yet.</pre>
  </section>
</main>
<script>
const $ = (id) => document.getElementById(id);
const fields = ["routerKey", "endpoint", "providerKey", "model", "route"];
for (const id of fields) $(id).value = localStorage.getItem("dobrain:" + id) || "";
if (!$('route').value) $('route').value = 'auto';

function saveSettings(){
  for (const id of fields) localStorage.setItem("dobrain:" + id, $(id).value);
  $('setupStatus').textContent = 'Saved locally. Next: send a test message.';
}
async function checkHealth(){
  const res = await fetch('/health');
  $('output').textContent = JSON.stringify(await res.json(), null, 2);
}
async function sendChat(){
  saveSettings();
  $('output').textContent = 'Sending...';
  const res = await fetch('/v1/chat/completions', {
    method:'POST',
    headers:{
      'content-type':'application/json',
      'authorization':'Bearer ' + $('routerKey').value,
      'x-dobrain-endpoint': $('endpoint').value,
      'x-dobrain-provider-key': $('providerKey').value,
      'x-dobrain-route': $('route').value
    },
    body: JSON.stringify({
      model: $('model').value || undefined,
      messages:[{role:'user', content:$('message').value}],
      stream:false
    })
  });
  const text = await res.text();
  try { $('output').textContent = JSON.stringify(JSON.parse(text), null, 2); }
  catch { $('output').textContent = text; }
  $('footnote').textContent = res.headers.get('x-dobrain-footnote') || 'Generated through DoBrain routing. Provider logging and retention depend on the configured route.';
}
</script>
</body>
</html>`;

function json(data, init = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers || {})
    }
  });
}

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "authorization,content-type,x-api-key,x-router-api-key,x-dobrain-endpoint,x-dobrain-provider-key,x-dobrain-route"
  };
}

function readRouterKey(request) {
  const auth = request.headers.get("authorization") || "";
  if (auth.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  return request.headers.get("x-api-key") || request.headers.get("x-router-api-key") || "";
}

function authorized(request, env) {
  if (!env.ROUTER_API_KEY) return true;
  return readRouterKey(request) === env.ROUTER_API_KEY;
}

function normalizeBase(base) {
  return String(base || "").replace(/\/+$/, "");
}

function targetUrl(request, env, path) {
  const endpoint = request.headers.get("x-dobrain-endpoint") || env.DEFAULT_PROVIDER_BASE_URL || "";
  const base = normalizeBase(endpoint);
  if (!base) return null;
  const suffix = path.startsWith("/v1/") ? path.slice(3) : path;
  return base + suffix;
}

function footnote(route, model) {
  if (route === "auto-free") {
    return `Generated using Auto-Free routing${model ? ` (${model})` : ""}. Free or low-cost providers may log prompts and outputs according to their own policies. DoBrain cannot control provider-side privacy settings.`;
  }
  return `Generated using Auto routing${model ? ` (${model})` : ""}. DoBrain selected a configured route. Provider processing and retention depend on the selected provider and workspace settings.`;
}

async function proxy(request, env) {
  if (!authorized(request, env)) return json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders() });

  const url = new URL(request.url);
  const upstreamUrl = targetUrl(request, env, url.pathname);
  if (!upstreamUrl) return json({ error: "Missing provider endpoint", hint: "Set DEFAULT_PROVIDER_BASE_URL or send x-dobrain-endpoint." }, { status: 400, headers: corsHeaders() });

  const bodyText = request.method === "GET" || request.method === "HEAD" ? undefined : await request.text();
  let model = "";
  try { model = bodyText ? (JSON.parse(bodyText).model || "") : ""; } catch {}

  const providerKey = request.headers.get("x-dobrain-provider-key") || env.DEFAULT_PROVIDER_API_KEY || "";
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("x-dobrain-endpoint");
  headers.delete("x-dobrain-provider-key");
  headers.delete("x-dobrain-route");
  if (providerKey) headers.set("authorization", `Bearer ${providerKey}`);

  const upstream = await fetch(upstreamUrl + new URL(request.url).search, {
    method: request.method,
    headers,
    body: bodyText
  });

  const responseHeaders = new Headers(upstream.headers);
  for (const [k, v] of Object.entries(corsHeaders())) responseHeaders.set(k, v);
  responseHeaders.set("x-dobrain-route", request.headers.get("x-dobrain-route") || "auto");
  responseHeaders.set("x-dobrain-footnote", footnote(request.headers.get("x-dobrain-route") || "auto", model));

  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders() });

    if (url.pathname === "/" || url.pathname === "/setup") {
      return new Response(HTML, { headers: { "content-type": "text/html; charset=utf-8" } });
    }

    if (url.pathname === "/health") {
      return json({ ok: true, service: env.PROJECT_NAME || "dobrain-work", mode: "light-gateway", setup: "/setup" }, { headers: corsHeaders() });
    }

    if (url.pathname === "/api/providers") {
      if (!authorized(request, env)) return json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders() });
      return json({ providers: [{ name: "default", configured: Boolean(env.DEFAULT_PROVIDER_BASE_URL), baseUrl: env.DEFAULT_PROVIDER_BASE_URL ? "configured" : "not configured", routes: ["auto", "auto-free"] }] }, { headers: corsHeaders() });
    }

    if (url.pathname === "/v1/models" || url.pathname.startsWith("/v1/") || url.pathname === "/responses") {
      return proxy(request, env);
    }

    return json({ message: "DoBrain Work Gateway", setup: "/setup", health: "/health" }, { headers: corsHeaders() });
  }
};
