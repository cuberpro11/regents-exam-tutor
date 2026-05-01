# Regents Exam Tutor (Next.js)

Next.js 16 app: marketing site, course player, **Stripe Checkout**, Bunny.net signed HLS, and account system with **bcrypt** passwords and **Netlify Blobs** storage in production.

## Local setup

```bash
cd regents-exam-tutor-next
npm install
```

Optional: copy sample users so you have a writable `data/users.json`:

```bash
cp data/users.sample.json data/users.json
```

Create `.env.local` from `.env.example`:

| Variable | Purpose |
|----------|---------|
| `SESSION_SECRET` | **Required in production** (min 16 characters). JWT signing for the httpOnly session cookie. In local dev, a built-in fallback is used if unset. |
| `STRIPE_SECRET_KEY` | Stripe secret key. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional; not required for redirect Checkout. |
| `STRIPE_PRICE_ID_ALGEBRA` | Price ID for **Algebra 1 Regents**. |
| `STRIPE_PRICE_ID_GEOMETRY` | Price ID for **Geometry Regents**. |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for `POST /api/webhooks/stripe`. |
| `BUNNY_SECURITY_KEY` | Bunny token signing key (same as legacy Flask `BUNNY_SECURITY_KEY`). |
| `URL` or `NEXT_PUBLIC_SITE_URL` | Canonical site origin (e.g. `https://your-site.netlify.app`) for Stripe success/cancel URLs. |

### Test login (local)

From `data/users.sample.json` (password is bcrypt for the string `test`):

- **Email:** `test@example.com`  
- **Password:** `test`

If `data/users.json` exists, that file is used instead of the sample.

### Data storage

| Environment | Users | Purchases |
|-------------|-------|-----------|
| Local dev | `data/users.json` (or read-only sample) | `data/purchases.local.json` (gitignored) |
| Netlify (`NETLIFY=true`) | **Netlify Blobs** store `regents-users` | **Netlify Blobs** store `regents-purchases` |

Sign up is **enabled** on Netlify; new accounts are written to the users blob store. Set a strong `SESSION_SECRET` in the Netlify UI.

Passwords are stored as **bcrypt** hashes. Plaintext passwords in an old `users.json` still work once and are **re-hashed** on that login.

### Stripe webhook

1. Endpoint: `https://<your-domain>/api/webhooks/stripe` — event **`checkout.session.completed`**.  
2. Users must be **logged in** before checkout so `metadata.userId` is set; the webhook grants the course via `addPurchaseIfNew`.

## Run locally

```bash
npm run dev
```

Open http://localhost:3000 (set `URL=http://localhost:3000` in `.env.local` for Stripe return URLs).

```bash
npm run build && npm start
```

Use a real `SESSION_SECRET` when testing production mode (`next start`).

## Netlify

- Config: [`netlify.toml`](netlify.toml) with `@netlify/plugin-nextjs`.
- Set **all** env vars above in the site settings, especially **`SESSION_SECRET`** and **`NETLIFY`** (Netlify usually sets `NETLIFY` automatically; if not, add `NETLIFY=true`).
- Connect the Stripe webhook to the production URL.

## Regenerate `data/videos.json`

From the legacy SQLite DB (requires `sqlite3` CLI):

```bash
sqlite3 /path/to/regents_prep_course/database.db ".mode json" ".output data/videos.json" \
  "SELECT course_name, test_number as test_number, question_number as question_number, video_id, video_title, video_url FROM videos ORDER BY course_name, test_number, question_number;"
```

Ensure the output is one valid JSON array if your tooling emits line-delimited JSON.
