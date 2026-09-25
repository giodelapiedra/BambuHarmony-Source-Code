# Bambu Harmony Living — Frontend Deployment Guide

**Avietho Digital** · Guide sa pag-upload ng website, pag-setup ng Google Analytics, at Viber lead notifications.

Live site: https://www.bambuharmony.ph

---

## 1. Requirements

- **Node.js 18 o mas bago** — https://nodejs.org
- **Git**
- Access sa GitHub repo na ito

I-check kung installed na:

```bash
node -v
npm -v
git --version
```

---

## 2. I-setup at i-build ang project

### 2.1 I-download ang source code

```bash
git clone https://github.com/giodelapiedra/BambuHarmony-Source-Code.git
cd BambuHarmony-Source-Code
npm install
```

### 2.2 I-set ang API URL

Ang website ay nagse-send ng inquiries / leads sa backend API. Kopyahin ang `.env.example` at gawing `.env`:

```bash
cp .env.example .env
```

Laman ng `.env`:

```env
VITE_API_URL=https://bambuharmonyapi.aviethodigital.com/api
```

> Kung walang `VITE_API_URL`, ang default ay `http://localhost:5000/api` (makikita sa `src/services/api.js`). Sa live site, **dapat naka-set ito** o hindi papasok ang mga leads.

### 2.3 Patakbuhin sa local (para mag-test)

```bash
npm run dev
```

Buksan ang http://localhost:5173

### 2.4 I-build para sa production

```bash
npm run build
```

Ang output ay nasa folder na **`dist/`**. Ito ang ia-upload sa kahit anong hosting.

Ang `npm run build` ay may dalawang hakbang:
1. `vite build` — ginagawa ang website files
2. `node scripts/seo-postbuild.mjs` — gumagawa ng hiwalay na `index.html` bawat page (`/about`, `/care-options`, `/location`, `/contact`) na may sariling title at description para sa Google, at ng `sitemap.xml`

---

## 3. Google Analytics / Google Tag Manager

### 3.1 Saan nakalagay sa source code

**File: `index.html`** (nasa root ng project, hindi sa `src/`)

May marker comment sa loob ng `<head>`:

```html
<!--
  ===== GOOGLE ANALYTICS / TAG MANAGER =====
  ...
-->
```

Sa ilalim nito ay dalawang script:

| Ano | Saan sa `index.html` | Current ID |
|---|---|---|
| Google Tag Manager | `<head>`, block na `<!-- Google Tag Manager -->` | `GTM-NP3BQMJ6` |
| Google Analytics 4 (gtag.js) | `<head>`, block na `<!-- Google tag (gtag.js) -->` | `G-YK4RD62DQ6` |
| Google Tag Manager (noscript) | unang laman ng `<body>` | `GTM-NP3BQMJ6` |

Hindi kailangang galawin ang kahit anong file sa `src/`. Dahil kinokopya ng `seo-postbuild.mjs` ang `index.html` sa bawat page, **automatic na may analytics ang lahat ng pages**.

### 3.2 Paano palitan o maglagay ng bagong Google Analytics

1. Pumunta sa https://analytics.google.com → **Admin** → **Data streams** → piliin ang web stream (o gumawa ng bago para sa domain).
2. Kopyahin ang **Measurement ID** (itsura: `G-XXXXXXXXXX`).
3. Buksan ang `index.html` at palitan ang ID sa **dalawang lugar** sa loob ng gtag block:

   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());

     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

4. I-build at i-deploy ulit (Section 4).

### 3.3 Paano palitan ang Google Tag Manager

1. Sa https://tagmanager.google.com, kopyahin ang **Container ID** (`GTM-XXXXXXX`).
2. Sa `index.html`, palitan ang ID sa:
   - `<head>` — dulo ng GTM script: `...'dataLayer','GTM-XXXXXXX');`
   - `<body>` — sa noscript iframe: `ns.html?id=GTM-XXXXXXX`
3. I-build at i-deploy ulit.

### 3.4 Babala: double counting

Kung ang **parehong GA4 ID** (`G-...`) ay naka-setup din bilang tag **sa loob ng GTM container**, dodoble ang bilang ng pageviews. Pumili lang ng isa:
- **Option A:** GA4 direkta sa `index.html` (current setup) — huwag nang ilagay ang GA4 tag sa GTM.
- **Option B:** GA4 sa loob ng GTM lang — tanggalin ang buong `<!-- Google tag (gtag.js) -->` block sa `index.html`.

### 3.5 Paano i-check kung gumagana

1. Buksan ang live site.
2. Sa Google Analytics → **Reports** → **Realtime**, dapat makita ang sarili mong visit sa loob ng 1–2 minuto.
3. O i-install ang **Tag Assistant** (https://tagassistant.google.com) at i-connect sa site.

---

## 4. Pag-upload sa Hosting

### 4.1 Vercel (recommended — ito ang gamit ng live site)

**Option A — Connect sa GitHub (automatic deploy tuwing may push)**

1. Mag-login sa https://vercel.com
2. **Add New… → Project** → piliin ang repo na `BambuHarmony-Source-Code` → **Import**
3. Settings:

   | Setting | Value |
   |---|---|
   | Framework Preset | **Vite** |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

4. **Environment Variables** → idagdag:
   - `VITE_API_URL` = `https://bambuharmonyapi.aviethodigital.com/api`
5. I-click ang **Deploy**.

Pagkatapos nito, bawat `git push` sa `main` ay automatic na magde-deploy.

**Option B — Gamit ang Vercel CLI**

```bash
npx vercel login
npx vercel          # preview deploy
npx vercel --prod   # production deploy
```

**Custom domain (hal. `www.bambuharmony.ph`)**

1. Vercel → Project → **Settings → Domains** → idagdag ang domain.
2. Sa DNS provider ng domain, idagdag ang records na ibibigay ng Vercel:
   - `A` record ng `@` → `76.76.21.21`
   - `CNAME` ng `www` → `cname.vercel-dns.com`
3. Hintayin ang SSL (automatic, ilang minuto hanggang ilang oras).

Ang `vercel.json` sa repo ay naka-setup na para gumana ang mga page URL (`/about`, `/contact`, atbp.) — huwag burahin.

### 4.2 Netlify

1. https://app.netlify.com → **Add new site → Import an existing project** → GitHub → piliin ang repo.
2. Build command: `npm run build` · Publish directory: `dist`
3. **Site settings → Environment variables** → `VITE_API_URL`
4. Para gumana ang mga page URL, gumawa ng file na `public/_redirects` na may laman:

   ```
   /*    /index.html   200
   ```

### 4.3 cPanel / Hostinger / kahit anong shared hosting

1. Sa sariling computer: i-set ang `.env` (Section 2.2), tapos `npm run build`.
2. Buksan ang **File Manager** ng hosting → pumunta sa `public_html/`.
3. I-upload ang **laman** ng `dist/` folder (hindi ang `dist` folder mismo).
4. Gumawa ng `.htaccess` sa `public_html/` para gumana ang mga page URL:

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

### 4.4 VPS na may Nginx

1. `npm run build`, tapos i-upload ang laman ng `dist/` sa server (hal. `/var/www/bambuharmony-frontend`).
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

### 4.5 Checklist pagkatapos mag-deploy

- [ ] Bumubukas ang homepage at lahat ng pages (`/about`, `/care-options`, `/location`, `/contact`)
- [ ] Hindi 404 kapag ni-refresh ang isang page
- [ ] Nagse-send ang contact form (makikita ang lead sa admin dashboard)
- [ ] May visit sa Google Analytics Realtime
- [ ] May dumating na Viber notification sa bagong lead (Section 5)

---

## 5. Viber Lead Notifications

Tuwing may bagong inquiry sa website, may automatic na message na pumapasok sa isang **Viber Channel**.

> **Mahalaga:** Ang Viber notification ay tumatakbo sa **backend API**, hindi sa frontend na ito. Walang kailangang baguhin sa frontend code — basta tama ang `VITE_API_URL`, ang API na ang bahala mag-send.

### 5.1 Paano ito gumagana

```
Website form  →  Backend API (bagong lead)  →  Viber Channels Post API  →  Viber Channel
```

Viber **Channel** ang gamit, hindi regular na group chat, dahil hindi pwedeng mag-post ang bot sa ordinaryong group chat.

### 5.2 Gumawa ng Viber Channel at kunin ang token

1. Sa Viber app: **Chats → New → Create Channel** (hal. "BHLI LEADS NOTIFICATIONS").
2. Buksan ang channel → **Channel info → Developer Tools** (o **Edit channel → Developer tools**).
3. Kopyahin ang **Authentication Token**. **Huwag itong i-share o i-commit sa GitHub.**
4. I-add sa channel ang mga taong dapat makatanggap ng notifications. Ang magpo-post ay dapat **superadmin** ng channel.

### 5.3 I-set ang webhook (kailangan bago makapag-post)

Kung walang webhook, lahat ng post ay magre-return ng `webhookNotSet`. I-set ito isang beses lang:

```bash
curl -X POST https://chatapi.viber.com/pa/set_webhook \
  -H "X-Viber-Auth-Token: <VIBER_AUTH_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://postman-echo.com/post"}'
```

Dapat ang sagot ay may `"status":0`.

### 5.4 Kunin ang Sender ID

```bash
curl -X POST https://chatapi.viber.com/pa/get_account_info \
  -H "X-Viber-Auth-Token: <VIBER_AUTH_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Sa sagot, hanapin sa `members` ang taong may `"role": "superadmin"` at kopyahin ang kanyang `id`. Ito ang **`VIBER_SENDER_ID`**.

> Bawat channel ay may sariling token **at** sariling member IDs. Kapag gumawa ng bagong channel, kunin ulit pareho.

### 5.5 Ilagay sa backend API

Sa `.env` ng backend API server (hindi sa frontend):

```env
VIBER_AUTH_TOKEN=<token mula sa Developer Tools>
VIBER_SENDER_ID=<superadmin id mula sa get_account_info>
```

Pagkatapos, i-restart ang API. Kapag walang laman ang dalawang ito, tahimik lang na hindi magse-send ng Viber (walang error sa website).

### 5.6 I-test

Mag-test post direkta:

```bash
curl -X POST https://chatapi.viber.com/pa/post \
  -H "X-Viber-Auth-Token: <VIBER_AUTH_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"from":"<VIBER_SENDER_ID>","type":"text","text":"Test notification"}'
```

`"status":0` = success. Pagkatapos, mag-submit ng test inquiry sa website at dapat may dumating na message na nagsisimula sa **BAMBUHARMONY NEW LEADS**.

### 5.7 Troubleshooting

| Error | Ibig sabihin | Ayos |
|---|---|---|
| `webhookNotSet` (status 10) | Walang webhook | Gawin ang Section 5.3 |
| Invalid sender / not a member | Maling `VIBER_SENDER_ID` o hindi superadmin | Gawin ulit ang Section 5.4 |
| Invalid auth token | Maling o lumang token | Kopyahin ulit mula sa Developer Tools |
| Walang dumarating pero walang error | Kulang ang env sa API | I-check ang `.env` ng API at i-restart |

---

## 6. Pag-update ng website

```bash
git pull
# gawin ang changes
npm run build          # i-test na walang error
git add -A
git commit -m "Describe the change"
git push
```

Kung naka-connect ang Vercel sa GitHub (Section 4.1 Option A), automatic na magde-deploy pagkatapos ng push. Kung iba ang hosting, i-upload ulit ang laman ng `dist/`.

---

*Avietho Digital — Bambu Harmony Living*
