# Coding Raz Portfolio (Vite + Tailwind)

This project is a static GitHub Pages-ready migration of `codingraz.xml` into a modular frontend stack:

- Vite for dev/build
- Local Tailwind CSS build (no CDN runtime)
- Vanilla JavaScript modules (`raz-*`)
- No Blogger template tags or XML rendering dependencies

## Project Structure

- `index.html`: main semantic page markup
- `src/css/`: split styling
  - `raz-base.css`, `raz-components.css`, `raz-utilities.css`, `raz-animations.css`
- `src/js/`: modular runtime
  - `raz-main.js`, `raz-cursor.js`, `raz-scroll.js`, `raz-animations.js`, `raz-contact.js`, `raz-telegram.js`
- `src/assets/`: local image/icon/font placeholders
- `public/images`, `public/favicon`: public static asset placeholders

## Run Locally

```bash
npm install
npm run dev
```

Build production bundle:

```bash
npm run build
npm run preview
```

## GitHub Pages Deployment

1. Build the project: `npm run build`
2. Upload `dist/` contents to your Pages branch or deployment target.
3. If deploying under `username.github.io/repo-name`, set base path before build:
   - PowerShell: `$env:VITE_BASE_PATH='/repo-name/'; npm run build`
4. For root domain pages (`username.github.io`), keep default `VITE_BASE_PATH=/`.

## Image Replacement Points

Current external image URLs are preserved. Replace progressively with local assets:

- Move images to `src/assets/images/` (for bundled assets) or `public/images/` (for direct URLs).
- Update logo/profile references in `index.html`.

## Integrations (Contact / Google Sheet / Telegram)

- Google Sheet (Apps Script) endpoint is configured in `src/js/raz-contact.js` via:
  - `VITE_FORM_ENDPOINT_URL` (preferred), fallback to current Apps Script URL.
- Telegram module lives in `src/js/raz-telegram.js` as a secure stub.
  - TODO is included to move Telegram bot dispatch behind a serverless backend.
  - Do not put Telegram tokens/chat IDs in frontend code.
