export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({
        ok: true,
        service: env.PROJECT_NAME || "dobrain-work",
        environment: env.ENVIRONMENT || "development",
        message: "Cloudflare Worker is healthy"
      });
    }

    return new Response(
      JSON.stringify({
        message: "Welcome to dobrain-work",
        docs: "/health"
      }),
      {
        headers: { "content-type": "application/json" }
      }
    );
  }
};
