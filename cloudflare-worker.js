const UPSTREAM = "https://ibja-api.vercel.app";
const ALLOWED_ORIGINS = new Set([
  "https://websitescript.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000"
]);
const ALLOWED_PATHS = new Set([
  "/latest",
  "/silver/latest",
  "/history",
  "/silver",
  "/platinum/latest"
]);

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://websitescript.github.io",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "GET") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return new Response(JSON.stringify({ error: "Origin not allowed" }), {
        status: 403,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }

    // Only allow the specific IBJA API routes used by this dashboard.
    const upstreamPath = url.pathname.replace(/^\/api(?=\/|$)/, "") || "/";
    if (!ALLOWED_PATHS.has(upstreamPath)) {
      return new Response(JSON.stringify({ error: "Endpoint not allowed", path: upstreamPath }), {
        status: 404,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }

    const target = new URL(UPSTREAM + upstreamPath);
    target.search = url.search;

    try {
      const upstream = await fetch(target.toString(), {
        method: "GET",
        headers: { "Accept": "application/json" }
      });

      const headers = new Headers(cors);
      headers.set("Content-Type", upstream.headers.get("Content-Type") || "application/json");
      headers.set("Cache-Control", "no-store");
      return new Response(upstream.body, {
        status: upstream.status,
        headers
      });
    } catch (error) {
      return new Response(JSON.stringify({
        error: "Unable to fetch IBJA API",
        message: error instanceof Error ? error.message : "Unknown upstream error"
      }), {
        status: 502,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }
  }
};
