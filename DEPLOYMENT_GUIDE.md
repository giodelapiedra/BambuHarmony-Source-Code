# Bambu Harmony Living — Frontend Deployment Guide

**Avietho Digital** · How to deploy the website, set up Google Analytics, and configure Viber lead notifications.

Live site: https://www.bambuharmony.ph

---

## 1. Requirements

- **Node.js 18 or newer** — https://nodejs.org
- **Git**
- Access to this GitHub repository

Check that they are installed:

```bash
node -v
npm -v
git --version
```

---

## 2. Set up and build the project

### 2.1 Get the source code

```bash
git clone https://github.com/giodelapiedra/BambuHarmony-Source-Code.git
cd BambuHarmony-Source-Code
npm install
```

### 2.2 Set the API URL

The website sends inquiries / leads to the backend API. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Contents of `.env`:

```env
VITE_API_URL=https://bambuharmonyapi.aviethodigital.com/api
```

> If `VITE_API_URL` is not set, it falls back to `http://localhost:5000/api` (see `src/services/api.js`). On the live site this **must be set**, otherwise leads will not be received.

### 2.3 Run locally (for testing)

```bash
npm run dev
```

Open http://localhost:5173

### 2.4 Build for production

```bash
npm run build
```

The output goes to the **`dist/`** folder. This is what you upload to any hosting provider.

`npm run build` runs two steps:
1. `vite build` — builds the website files
2. `node scripts/seo-postbuild.mjs` — writes a separate `index.html` for each page (`/about`, `/care-options`, `/location`, `/contact`) with its own title and description for Google, plus a `sitemap.xml`

---

## 3. Google Analytics / Google Tag Manager

### 3.1 Where it lives in the source code

**File: `index.html`** (in the project root, not in `src/`)

There is a marker comment inside `<head>`:

```html
<!--
  ===== GOOGLE ANALYTICS / TAG MANAGER =====
  ...
-->
```

Below it are the scripts:

| What | Where in `index.html` | Current ID |
|---|---|---|
| Google Tag Manager | `<head>`, the `<!-- Google Tag Manager -->` block | `GTM-NP3BQMJ6` |
| Google Analytics 4 (gtag.js) | `<head>`, the `<!-- Google tag (gtag.js) -->` block | `G-YK4RD62DQ6` |
| Google Tag Manager (noscript) | first element inside `<body>` | `GTM-NP3BQMJ6` |

You do not need to touch any file in `src/`. Because `seo-postbuild.mjs` copies `index.html` for every page, **all pages get analytics automatically**.

### 3.2 How to add or change Google Analytics

1. Go to https://analytics.google.com → **Admin** → **Data streams** → select the web stream (or create one for the domain).
2. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`).
3. Open `index.html` and replace the ID in **both places** inside the gtag block:

   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());

     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

4. Build and deploy again (Section 4).

### 3.3 How to change Google Tag Manager

1. In https://tagmanager.google.com, copy the **Container ID** (`GTM-XXXXXXX`).
2. In `index.html`, replace the ID in:
   - `<head>` — at the end of the GTM script: `...'dataLayer','GTM-XXXXXXX');`
   - `<body>` — in the noscript iframe: `ns.html?id=GTM-XXXXXXX`
3. Build and deploy again.

### 3.4 Warning: double counting

If the **same GA4 ID** (`G-...`) is also configured as a tag **inside the GTM container**, pageviews will be counted twice. Pick only one:
- **Option A:** GA4 directly in `index.html` (current setup) — do not add a GA4 tag in GTM.
- **Option B:** GA4 through GTM only — remove the whole `<!-- Google tag (gtag.js) -->` block from `index.html`.

### 3.5 How to verify it works

1. Open the live site.
2. In Google Analytics → **Reports** → **Realtime**, your own visit should appear within 1–2 minutes.
3. Or use **Tag Assistant** (https://tagassistant.google.com) and connect it to the site.

---

## 4. Deploying to Hosting

### 4.1 Vercel (recommended — used by the live site)

**Option A — Connect to GitHub (automatic deploy on every push)**

1. Log in to https://vercel.com
2. **Add New… → Project** → select the `BambuHarmony-Source-Code` repo → **Import**
3. Settings:

   | Setting | Value |
   |---|---|
   | Framework Preset | **Vite** |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

4. **Environment Variables** → add:
   - `VITE_API_URL` = `https://bambuharmonyapi.aviethodigital.com/api`
5. Click **Deploy**.

After this, every `git push` to `main` deploys automatically.

**Option B — Using the Vercel CLI**

```bash
npx vercel login
npx vercel          # preview deploy
npx vercel --prod   # production deploy
```

**Custom domain (e.g. `www.bambuharmony.ph`)**

1. Vercel → Project → **Settings → Domains** → add the domain.
2. At the domain's DNS provider, add the records Vercel shows you:
   - `A` record for `@` → `76.76.21.21`
   - `CNAME` for `www` → `cname.vercel-dns.com`
3. Wait for SSL (automatic, a few minutes to a few hours).

The `vercel.json` in the repo is already set up so page URLs (`/about`, `/contact`, etc.) work — do not delete it.

### 4.2 Netlify

1. https://app.netlify.com → **Add new site → Import an existing project** → GitHub → select the repo.
2. Build command: `npm run build` · Publish directory: `dist`
3. **Site settings → Environment variables** → `VITE_API_URL`
4. So page URLs work, create a file `public/_redirects` containing:

   ```
   /*    /index.html   200
   ```

### 4.3 cPanel / Hostinger / any shared hosting

1. On your computer: set up `.env` (Section 2.2), then run `npm run build`.
2. Open the hosting **File Manager** → go to `public_html/`.
3. Upload the **contents** of the `dist/` folder (not the `dist` folder itself).
4. Create an `.htaccess` file in `public_html/` so page URLs work:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteCond %{REQUEST_FILENAME} -f [OR]
     RewriteCond %{REQUEST_FILENAME} -d
     RewriteRule ^ - [L]
     RewriteRule ^ index.html [L]
   </IfModule>
   ```

### 4.4 VPS with Nginx

1. Run `npm run build`, then upload the contents of `dist/` to the server (e.g. `/var/www/bambuharmony-frontend`).
2. Nginx config:

   ```nginx
   server {
     listen 80;
     server_name www.bambuharmony.ph bambuharmony.ph;
     root /var/www/bambuharmony-frontend;
     index index.html;

     location / {
       try_files $uri $uri/ $uri/index.html /index.html;
     }
   }
   ```

3. `sudo nginx -t && sudo systemctl reload nginx`
4. SSL: `sudo certbot --nginx -d bambuharmony.ph -d www.bambuharmony.ph`

### 4.5 Post-deploy checklist

- [ ] Homepage and all pages open (`/about`, `/care-options`, `/location`, `/contact`)
- [ ] Refreshing a page does not return a 404
- [ ] The contact form submits (the lead shows up in the admin dashboard)
- [ ] Your visit appears in Google Analytics Realtime
- [ ] A Viber notification arrives for the new lead (Section 6)

---

## 5. Connecting the Contact Form to Your Own Dashboard

The contact form on `/contact` sends every inquiry to a backend API. By default this is the Bambu Harmony API and admin dashboard. This section explains what to change to send leads to **your own** backend, dashboard or CRM.

### 5.1 Where the form code lives

| File | What it does | Change it when |
|---|---|---|
| `.env` → `VITE_API_URL` | Base URL of the backend that receives leads | You use a different server / domain |
| `src/services/api.js` | Creates the HTTP client using `VITE_API_URL` | You need extra headers (e.g. an API key) |
| `src/services/contactService.js` | `submitInquiry()` — builds the lead data and sends `POST {VITE_API_URL}/leads` | Your endpoint path or field names are different |
| `src/pages/Contact.jsx` | The form itself; calls `submitInquiry()` on submit | You add, remove or rename form fields |

The form shows a success screen when the server responds with any **2xx** status, and shows *"Something went wrong. Please try again later."* on any error.

### 5.2 Option A — Keep the Bambu Harmony backend and admin dashboard

1. Set `VITE_API_URL` to the API URL (Section 2.2), in `.env` and in your hosting's environment variables.
2. On the **API server's** `.env`, add your website domain to `CLIENT_URL` so the browser is allowed to call the API (CORS). Multiple domains are comma-separated:

   ```env
   CLIENT_URL=https://www.bambuharmony.ph,https://your-new-domain.com
   ```

   `www` and non-`www` versions are accepted automatically. Restart the API after changing it.
3. Leads appear in the admin dashboard under **Leads**.

> If the form works locally but fails on the live site, the domain is almost always missing from `CLIENT_URL`. Open the browser DevTools → **Console** and look for a CORS error.

### 5.3 Option B — Your own backend / dashboard

Your server must provide:

1. An endpoint **`POST {VITE_API_URL}/leads`** that accepts JSON (`Content-Type: application/json`).
2. A **2xx** response on success (e.g. `201 Created`).
3. **CORS** enabled for your website domain.

Then set `VITE_API_URL` to your server, e.g. `https://api.yourdomain.com/api`.

If your endpoint is at a different path (e.g. `/inquiries`), change this line in `src/services/contactService.js`:

```js
const response = await api.post('/leads', {
```

**Fields sent by the form:**

| Field | Type | Notes |
|---|---|---|
| `name` | string | **Always sent.** Full name |
| `firstName`, `lastName` | string | |
| `email`, `phone` | string | |
| `contactPreference` | string | Preferred contact method |
| `relationship` | string | Relationship to the future resident |
| `residentAge` | string | |
| `residentLocation`, `residentCity`, `residentCountry`, `residentCityAbroad` | string | Where the resident currently lives |
| `citizenship`, `citizenshipOther`, `seniorId` | string | |
| `timeline`, `budget`, `preferredAction` | string | |
| `adlAssistance`, `eatingIndependence`, `mobility`, `continence`, `cognition`, `communication`, `behavior` | string | Care needs answers |
| `assessment` | object | Raw care assessment answers (Step 4). The Bambu Harmony API scores these on the server |
| `datePreference1` | string | Preferred visit date |
| `message` | string | Free-text message |
| `source` | string | Where the lead came from, e.g. `contact-form` |
| `utmSource`, `utmMedium`, `utmCampaign` | string | Only sent when the visitor arrived with UTM parameters |

Fields the visitor left empty are not sent.

**Example request body:**

```json
{
  "name": "Juan Dela Cruz",
  "firstName": "Juan",
  "lastName": "Dela Cruz",
  "email": "juan@example.com",
  "phone": "09171234567",
  "relationship": "Son",
  "residentAge": "78",
  "timeline": "Within 1 month",
  "preferredAction": "Book a facility visit",
  "datePreference1": "2026-10-05",
  "message": "We'd like to visit this weekend.",
  "source": "contact-form",
  "utmSource": "facebook"
}
```

### 5.4 Option C — Google Sheets, Zapier, Make, GoHighLevel or any webhook

If your dashboard/CRM gives you a **webhook URL**, send the lead there instead. Replace the request in `src/services/contactService.js`:

```js
// Before
const response = await api.post('/leads', { ...fields });

// After
const response = await fetch(import.meta.env.VITE_LEADS_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...fields }),
});
if (!response.ok) throw new Error('Lead submission failed');
```

Here `{ ...fields }` is the same object that is currently passed to `api.post` (name, email, phone, etc.). Keep it as is.

Then add the webhook URL to `.env` and to your hosting's environment variables:

```env
VITE_LEADS_WEBHOOK_URL=https://hooks.example.com/your-webhook-id
```

In the `return` at the bottom of `submitInquiry()`, replace `...response.data` with nothing (or `...(await response.json())` if your webhook returns JSON).

> **Note:** Anything in a `VITE_` variable is visible in the browser. Only use webhook URLs that are meant to be public. Never put passwords, secret API keys or database credentials in the frontend.

### 5.5 Test the connection

1. Run `npm run dev` (or open the deployed site).
2. Fill out the form on `/contact` and submit.
3. Confirm the success screen appears.
4. Confirm the lead shows up in your dashboard / CRM / sheet.
5. If it fails: open DevTools → **Network**, click the `leads` (or webhook) request, and check the status code and response.

| Problem | Likely cause |
|---|---|
| CORS error in Console | Your domain is not allowed on the server (`CLIENT_URL` in Option A) |
| 404 Not Found | Wrong `VITE_API_URL` or endpoint path |
| 400 / 422 | The server rejected a field (check its validation rules) |
| 429 Too Many Requests | Rate limit on the server — wait and try again |
| Works locally, not live | Environment variable not set in the hosting dashboard, or the site was not rebuilt after setting it |

> After changing any `VITE_` variable you must **rebuild and redeploy**. The value is baked in at build time.

---

## 6. Viber Lead Notifications

Every new website inquiry automatically posts a message to a **Viber Channel**.

> **Important:** Viber notifications run in the **backend API**, not in this frontend. No frontend code changes are needed — as long as `VITE_API_URL` is correct, the API handles sending.

### 6.1 How it works

```
Website form  →  Backend API (new lead)  →  Viber Channels Post API  →  Viber Channel
```

A Viber **Channel** is used instead of a regular group chat, because bots cannot post to ordinary group chats.

### 6.2 Create a Viber Channel and get the token

1. In the Viber app: **Chats → New → Create Channel** (e.g. "BHLI LEADS NOTIFICATIONS").
2. Open the channel → **Channel info → Developer Tools** (or **Edit channel → Developer tools**).
3. Copy the **Authentication Token**. **Never share it or commit it to GitHub.**
4. Add the people who should receive notifications. The account that posts must be a **superadmin** of the channel.

### 6.3 Set the webhook (required before posting)

Without a webhook, every post returns `webhookNotSet`. Set it once:

```bash
curl -X POST https://chatapi.viber.com/pa/set_webhook \
  -H "X-Viber-Auth-Token: <VIBER_AUTH_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://postman-echo.com/post"}'
```

The response should contain `"status":0`.

### 6.4 Get the Sender ID

```bash
curl -X POST https://chatapi.viber.com/pa/get_account_info \
  -H "X-Viber-Auth-Token: <VIBER_AUTH_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

In the response, find the member under `members` with `"role": "superadmin"` and copy their `id`. This is the **`VIBER_SENDER_ID`**.

> Each channel has its own token **and** its own member IDs. If you create a new channel, get both again.

### 6.5 Add them to the backend API

In the backend API server's `.env` (not the frontend):

```env
VIBER_AUTH_TOKEN=<token from Developer Tools>
VIBER_SENDER_ID=<superadmin id from get_account_info>
```

Then restart the API. If either value is empty, Viber notifications are silently skipped (no error on the website).

### 6.6 Test

Send a test post directly:

```bash
curl -X POST https://chatapi.viber.com/pa/post \
  -H "X-Viber-Auth-Token: <VIBER_AUTH_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"from":"<VIBER_SENDER_ID>","type":"text","text":"Test notification"}'
```

`"status":0` means success. Then submit a test inquiry on the website — a message starting with **BAMBUHARMONY NEW LEADS** should arrive.

### 6.7 Troubleshooting

| Error | Meaning | Fix |
|---|---|---|
| `webhookNotSet` (status 10) | No webhook set | Do Section 6.3 |
| Invalid sender / not a member | Wrong `VIBER_SENDER_ID`, or not a superadmin | Redo Section 6.4 |
| Invalid auth token | Wrong or outdated token | Copy it again from Developer Tools |
| Nothing arrives, no error | Missing env values in the API | Check the API `.env` and restart |

---

## 7. Updating the website

```bash
git pull
# make your changes
npm run build          # confirm there are no errors
git add -A
git commit -m "Describe the change"
git push
```

If Vercel is connected to GitHub (Section 4.1 Option A), it deploys automatically after the push. On other hosting, upload the contents of `dist/` again.

---

*Avietho Digital — Bambu Harmony Living*
