# Bambu Harmony Living — Frontend

Website for **Bambu Harmony Living**, a wellness-centered senior living estate in Tanauan City, Batangas, Philippines.

Live site: https://www.bambuharmony.ph

Developed by **Avietho Digital**.

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- React Router DOM
- Axios
- Socket.IO client (live chat)

## Getting Started

Requires **Node.js 18+**.

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173

## Scripts

| Command           | Description                                                        |
|-------------------|--------------------------------------------------------------------|
| `npm run dev`     | Start the local development server                                 |
| `npm run build`   | Production build to `dist/`, plus per-page SEO HTML and sitemap    |
| `npm run preview` | Preview the production build locally                               |

## Environment Variables

| Variable       | Description          | Default                     |
|----------------|----------------------|-----------------------------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

Production value: `https://bambuharmonyapi.aviethodigital.com/api`

## Project Structure

```
index.html         # Page shell — Google Analytics / Tag Manager live here
public/            # Static files (favicon, og-image, robots.txt)
scripts/
  seo-postbuild.mjs  # Writes per-route index.html + sitemap.xml after build
src/
  assets/          # Images, icons and partner logos
  components/
    cards/         # Card components
    common/        # Reusable UI primitives (Button, Seo, Reveal, ...)
    contact/       # Contact form care assessment steps
    layout/        # Navbar, Footer, PageLayout
    sections/      # Home page sections
    support/       # Live chat widget and lead capture popup
  data/            # Static page content and SEO metadata
  hooks/           # Custom React hooks (UTM tracking, scroll header, ...)
  pages/           # Route-level pages
  router/          # App routing
  services/        # API integration
  styles/          # Global styles
  utils/           # Constants, animations, care assessment scoring
vercel.json        # Rewrites so page URLs work on Vercel
```

## Routes

| Path            | Page         |
|-----------------|--------------|
| `/`             | Home         |
| `/about`        | About        |
| `/care-options` | Care Options |
| `/location`     | Location     |
| `/contact`      | Contact      |
| `*`             | Not Found    |

## Backend Integration

API calls live in `src/services/`. Components and pages should not hardcode backend URLs.

- `src/services/api.js` — Axios instance using `VITE_API_URL`
- `src/services/contactService.js` — submits contact form inquiries

New inquiries are saved by the backend API, which also sends the Viber lead notification.

## Google Analytics

Google Tag Manager and Google Analytics 4 are installed in **`index.html`** (marked with a `GOOGLE ANALYTICS / TAG MANAGER` comment). See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md#3-google-analytics--google-tag-manager) for how to change the IDs.

## Deployment

Build with `npm run build` and upload the `dist/` folder to any static host. Full step-by-step instructions for Vercel, Netlify, cPanel/Hostinger and Nginx, plus Google Analytics and Viber setup, are in **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**.

---

© Bambu Harmony Living · Avietho Digital
