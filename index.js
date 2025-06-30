export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname.startsWith("/img/")) {
            if (request.method !== "GET") {
                return new Response("Method Not Allowed", {
                    status: 405,
                    headers: {
                      Allow: "GET",
                    },
                  });
            }
            const path = url.pathname.replace("/img/", "blog-img/");
            const file = await env.MEDIA.get(path);
            if (!file) return new Response(null, { status: 404 });
            const headers = new Headers();
            file.writeHttpMetadata(headers);
            headers.set("etag", file.httpEtag);
            return new Response(file.body, {
                headers
            });
        }
        return env.ASSETS.fetch(request);
    }
};