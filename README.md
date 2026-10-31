# Metalmark — IBJA Gold & Silver Dashboard

A responsive, static website for tracking IBJA precious-metal reference rates.

## Run locally
1. Extract the ZIP.
2. Open a terminal in the project folder.
3. Run `python -m http.server 8000`.
4. Visit http://localhost:8000.

You can also deploy the folder to GitHub Pages, Netlify, or Vercel as a static site.

## API integration
The app calls these public endpoints:
- `GET https://ibja-api.vercel.app/latest`
- `GET https://ibja-api.vercel.app/silver/latest`
- `GET https://ibja-api.vercel.app/history`
- `GET https://ibja-api.vercel.app/silver`
- `GET https://ibja-api.vercel.app/platinum/latest`

The API root lists additional endpoints such as `/chart`, `/changes`, `/changes/weekly`, and `/convert`.
See https://ibja-api.vercel.app/api-docs for the provider's documentation.

## Important integration note
The API root was reachable during preparation and advertised the endpoint names, but the detailed endpoint schemas could not be inspected from this environment. `app.js` therefore uses defensive response parsing and supports common JSON shapes. If the API returns different field names or nested structures, update `extractLatest()` and `rowsFrom()` in `app.js` to match the documented schema. Browser access also depends on the API allowing cross-origin requests (CORS).

Rates are indicative reference data, not a retail quote. GST, making charges, local taxes, dealer margins, and purity differences may apply.
