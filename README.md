# Metalmark — IBJA Gold & Silver Dashboard

A fully static Gold & Silver rates dashboard designed for GitHub Pages.

## Files
- `index.html` — website structure
- `styles.css` — responsive dark dashboard styling
- `app.js` — IBJA API requests, chart rendering, historical table, CSV export and converter

## Deploy to GitHub Pages
1. Create or open your GitHub repository.
2. Upload `index.html`, `styles.css`, `app.js`, and this `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for the deployment and open the URL GitHub provides.

The site uses relative asset references, so it works from a project URL such as:
`https://USERNAME.github.io/REPOSITORY/`

No Node.js, backend, build command, or server-side environment variables are required.

## API configuration
The API base URL is configured near the top of `app.js`:
`https://ibja-api.vercel.app`

Current endpoint paths configured:
- `/latest`
- `/silver/latest`
- `/history`
- `/silver`
- `/platinum/latest`

API documentation: https://ibja-api.vercel.app/api-docs

## Important API/CORS note
This project makes browser-side `fetch()` requests directly to the IBJA API. The API must send suitable CORS headers allowing requests from your GitHub Pages origin. GitHub Pages cannot bypass CORS because it only hosts static files.

The API's live response schema could not be retrieved from this coding environment, so the JavaScript uses defensive field discovery for common JSON formats. If a returned field is not recognized, inspect the endpoint's JSON response and update `extractLatest()` / `rowsFrom()` in `app.js` to match the exact documented field names. The site does not fabricate rates or fill missing API data with sample prices.

## Local preview
You can open `index.html` directly for a basic layout preview. For API testing, serve the folder with any static local server, or test after GitHub Pages deployment. A local server is only for preview; it is not required for hosting.

## Rate disclaimer
IBJA reference rates are not guaranteed retail purchase/sale quotes. GST, making charges, local taxes, dealer margins, purity and product type may affect final prices.
