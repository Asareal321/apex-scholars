# Northline Tutors

A Next.js marketing, booking, and checkout site for a Seattle tutoring studio. Families can browse subjects, meet tutors, buy lesson packages, and hold a 50-minute slot.

The app is built to run locally with **no third-party credentials**. Stripe, Calendly, and Supabase are optional. When those env vars are missing, working mock fallbacks stay in place.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- Stripe Checkout for package purchases (mock checkout if keys are absent)
- Calendly embed for scheduling (studio request form if no URL is set)
- Supabase for packages, bookings, and payment records (in-memory fallback if unset)
- Deployable to Vercel with zero Vercel credentials required for local `npm run dev`

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4327](http://127.0.0.1:4327). The dev server binds to port **4327** on purpose.

Copy `.env.example` to `.env.local` only if you want live Stripe, Calendly, or Supabase. Leave it alone to use the fallbacks.

## Environment variables

| Variable | Required | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | For Stripe / Vercel | Public origin used in Checkout success and cancel URLs. Local default: `http://127.0.0.1:4327`. On Vercel, set this to `https://your-domain.vercel.app`. |
| `STRIPE_SECRET_KEY` | No | Enables Stripe Checkout. Without it, `/api/checkout` sends buyers to `/checkout/mock`. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No | Not used by this slice (Checkout Sessions are created on the server). Safe to set for future client work. |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Full Calendly event URL, e.g. `https://calendly.com/your-studio/diagnostic`. Without it, `/book` shows the in-app request form. |
| `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL` | No | Supabase project URL. Without it, packages come from `src/lib/catalog.ts` and bookings/payments stay in server memory. |
| `SUPABASE_SERVICE_ROLE_KEY` | No (preferred on the server) | Server-side writes for `bookings` and `payments`. Never expose this as `NEXT_PUBLIC_*`. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `SUPABASE_ANON_KEY` | No | Used only if the service role key is absent. Pair with the RLS policies in `supabase/schema.sql`. |

### Stripe

1. Create a Stripe account and copy the test-mode secret key (`sk_test_...`).
2. Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_SITE_URL`.
3. Buy a pack — the app creates a Checkout Session with `price_data` (no Dashboard products required).
4. Without the secret key, the mock page still collects a name, email, and dummy card and writes a `MOCK-...` confirmation.

### Calendly

1. Create an event type (50 minutes is the studio default).
2. Set `NEXT_PUBLIC_CALENDLY_URL` to that event’s public URL.
3. `/book` embeds the calendar. If the iframe fails, the request form is shown as a backup.

### Supabase

1. Create a project.
2. Run `supabase/schema.sql` in the SQL editor (creates `packages`, `bookings`, `payments`, RLS, and seed packs).
3. Set the URL plus `SUPABASE_SERVICE_ROLE_KEY` (or the anon key).
4. Restart the Next.js server.

If those vars are missing, nothing blocks: packages render from the local catalog, booking holds live in memory until the process restarts, and mock/Stripe confirmations do the same.

## Deploy on Vercel

You do **not** need Vercel credentials to run the site on your machine.

1. Push this repo to GitHub/GitLab/Bitbucket, or import the folder in the Vercel dashboard.
2. Vercel detects Next.js automatically. `vercel.json` pins `framework: "nextjs"`.
3. Add environment variables in **Project → Settings → Environment Variables** (Production + Preview):

   - `NEXT_PUBLIC_SITE_URL` = `https://<your-project>.vercel.app` (or the custom domain)
   - `STRIPE_SECRET_KEY` (test or live)
   - `NEXT_PUBLIC_CALENDLY_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

   Every one of these except `NEXT_PUBLIC_SITE_URL` is optional. The production site will use the same mocks if you skip them.

4. Deploy. Stripe success/cancel URLs are built from `NEXT_PUBLIC_SITE_URL`, so set that before testing live Checkout.

CLI option, if you already use Vercel:

```bash
npx vercel
```

Follow the prompts; do not commit `.vercel/` or `.env*.local`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server on `127.0.0.1:4327` |
| `npm run build` | Production build |
| `npm run start` | Serve the production build on 4327 |
| `npm run lint` | ESLint |

## What is in this slice

- Marketing homepage, subjects, tutors, packages
- Stripe Checkout or mock pay
- Calendly embed or fallback booking UI (empty, loading, and error states included)
- Supabase persistence for packages/bookings/payments, with memory fallback
- No login, no extra database product, no auth provider
