# VitaCare Clinic — Website

Modern, chic marketing site for VitaCare Clinic. Plain HTML + Tailwind CDN. No build step.

## Local preview

```bash
cd vitacare-site
python3 -m http.server 8000
# open http://localhost:8000
```

## When the booking link arrives

Open `assets/js/main.js` and replace one line:

```js
const BOOKING_URL = "https://gov.example.ca/booking/vitacare"; // <-- your real link
```

Every "Book appointment" button across all pages updates automatically.

## Deploy to Cloudflare Pages (free, ~5 min)

1. Push this folder to a new GitHub repo (`vitacare-site`).
2. Go to https://dash.cloudflare.com → **Pages** → **Create a project** → **Connect to Git**.
3. Pick your repo. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. Click **Save and deploy**. You'll get a free URL like `vitacare-site.pages.dev` in ~30 seconds.
5. **Custom domain:** Pages project → Custom domains → Add → enter your domain. Cloudflare auto-provisions SSL.

Every `git push` to `main` redeploys automatically. One-click rollbacks from the dashboard.

## Cost

| Item | Cost |
|---|---|
| Hosting (Cloudflare Pages) | $0/mo |
| Bandwidth | Unlimited, free |
| SSL certificate | Free, auto-renewing |
| Build minutes | $0 (no build step) |
| Custom domain SSL | Free |

Only recurring cost is your domain renewal (~$10/yr).

## File map

```
vitacare-site/
├── index.html          Homepage
├── about.html          Philosophy & story
├── services.html       Four service pillars
├── physicians.html     Team grid
├── recruitment.html    Open roles + email apply
├── contact.html        Address, hours, form, map
├── book.html           Booking placeholder (until gov link arrives)
├── assets/
│   ├── css/styles.css  Design tokens, animations
│   └── js/main.js      Booking URL, nav, reveal animations
├── _headers            Cloudflare Pages security headers
├── _redirects          URL redirects
├── robots.txt
├── sitemap.xml
└── README.md
```

## Editing content

All content lives directly in the HTML files — no CMS, no database. Search-and-replace works for any phone number, address, or copy change. Do a `grep -r "780" .` to find every phone number reference when updating contact info.

## Design tokens (if you want to tweak the palette)

Edit `assets/css/styles.css`:

```css
:root {
  --sage: #7A9B7E;       /* primary brand */
  --cream: #F5F1EA;      /* background */
  --charcoal: #1F2937;   /* text */
  --terracotta: #C97B5C; /* CTA accent */
}
```

Tailwind class names also reference these via `tailwind.config` blocks at the top of each HTML file.
