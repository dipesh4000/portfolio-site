# FRAME — independent portfolio template

A red, silver, and carbon-black portfolio inspired by the supplied editorial poster: giant italic lettering, a layered armored figure, angular panels, technical labels, stripes, and a red contact section. Dipesh Kumar's content is the included demo.

This folder is a complete standalone project. It does not import anything from the parent portfolio and can be moved into its own repository. HTML, CSS, and browser JavaScript; no framework or third-party runtime dependencies.

## Run

Install Node.js 20 or newer, open a terminal in this folder, and run:

```sh
npm run dev
```

Open http://localhost:4173. No `npm install` is needed. Use a web server rather than opening index.html directly; ES modules require HTTP. Set `PORT` to use another port.

## Customize for a buyer

1. Edit `content.js`: identity, projects, skills, experience, education, social URLs, email, résumé, and accent color.
2. Replace `assets/dipesh.jpg` with the buyer's portrait and update `portrait`. Set `heroImage` to another transparent cutout to change the central artwork.
3. Set any `sections` flag to `false` to hide that section and its navigation link.
4. Edit the favicon and artwork as appropriate for the buyer's brand. Change the small editorial labels in `app.js` if needed. Layout and responsive rules live in `styles.css`.
5. Run `npm run check` and `npm run build`. Deploy the contents of `dist/` to a static host. The build updates the page title, description, image preload, and no-JavaScript contact fallback from the buyer configuration.

`npm start` runs the same local preview server. Its default binding is localhost; use a production static host for public delivery.

## Optional API

`metricsEndpoint: null` uses the configured static metrics. To connect a service, set it to your own public read endpoint returning:

```json
{
  "metrics": [
    { "value": "42", "label": "Repositories" },
    { "value": "350", "label": "Problems solved" }
  ]
}
```

Responses are validated and limited to four metrics. Failed requests time out after five seconds and retain the demo values. Cross-origin endpoints must allow your site through CORS. The configuration is public: keep provider secrets on your server in environment variables, and expose only the display data. No API credentials are copied from the original portfolio.

Contact uses a working email link and copy button; no form backend is required. Project category filters and external links work without integrations.

## Design and assets

- `assets/hero-cutout.png`: original AI-generated armored figure, used in the hero.
- `assets/dipesh.jpg`: demo portrait copied from the existing portfolio; replace for buyers.
- `ASSET-NOTES.md`: artwork prompt and generation details.
- Project illustrations are abstract CSS concept visuals, labeled as such, rather than project screenshots.
- Display type uses a bundled open-font fallback plus installed Impact when available. Body and technical labels use system fonts.
- Mobile layout, keyboard focus states, reduced-motion support, and screen-reader status messages are included.

Before handing this to a buyer, replace Dipesh's personal content and links. This initial template includes no customer-specific CMS, hosting account, paid service, or commercial license terms.
