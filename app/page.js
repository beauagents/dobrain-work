export default function Page() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: 48, fontFamily: "system-ui, sans-serif" }}>
      <p style={{ color: "#666", textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 12 }}>DoBrain Work Backend</p>
      <h1 style={{ fontSize: 48, lineHeight: 1, margin: "0 0 16px" }}>Backend is ready.</h1>
      <p style={{ color: "#555", lineHeight: 1.6 }}>
        Replace this page with any Vercel, Next.js, ChatGPT-style, or custom UI template. The backend API is already available through the gateway.
      </p>
      <ul style={{ lineHeight: 1.9 }}>
        <li><code>GET /health</code></li>
        <li><code>GET /api/providers</code></li>
        <li><code>POST /v1/chat/completions</code></li>
      </ul>
    </main>
  );
}
