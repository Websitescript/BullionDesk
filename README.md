# Metalmark — GitHub Pages (Direct IBJA API)

This is a static website using only HTML, CSS and vanilla JavaScript. It fetches data directly from:

`https://ibja-api.vercel.app`

No GitHub Actions, workflow, backend, proxy, build step, or generated JSON files are included.

## Files
- `index.html`
- `styles.css`
- `app.js`
- `favicon.ico`

## Publish
1. Upload these files to the root of your GitHub repository.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save and open your GitHub Pages URL.

## Important: CORS requirement
The browser makes direct requests from your GitHub Pages website to the IBJA API. This only works if `https://ibja-api.vercel.app` sends an `Access-Control-Allow-Origin` response header that permits your GitHub Pages origin.

The browser console screenshot showed that the IBJA API does **not currently** send that header. This is controlled by the API server, not by GitHub Pages or frontend JavaScript. There is no JavaScript-only workaround that lets a browser read a cross-origin response when the server blocks CORS.

To make this exact direct-API version work, the IBJA API owner must enable CORS for your site origin (or `*` for a public read-only API). Until then, direct browser fetches will continue to fail. Do not use `mode: "no-cors"`; it returns an opaque response that JavaScript cannot read.

## Endpoints used
- `/latest`
- `/silver/latest`
- `/history`
- `/silver`
- `/platinum/latest`

The app does not insert dummy rates if the API request fails.
