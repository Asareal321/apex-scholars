# Apex Scholars

Next.js site for Apex Scholars: weekly Zoom tutoring for six Western University courses. Independent service. Not affiliated with Western University.

The public offer is **Interac e-Transfer before the session** (24-hour cancellation). The in-app booking form and a local request-confirmation page keep preview working without third-party credentials.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- In-app Zoom booking form
- Local request confirmation (does not move money; Interac is the stated payment method)
- Optional Supabase for packages, bookings, and payment records (in-memory fallback if unset)
- Deployable to Vercel without Vercel credentials for local `npm run dev`

Stripe Checkout and Calendly env vars are documented below for later setup. They are **not** how the site presents booking or payment.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4327](http://127.0.0.1:4327). The dev server binds to port **4327**.

Copy `.env.example` to `.env.local` only if you want Supabase (or later Calendly). Leave it alone to use in-memory fallbacks.

## Environment variables

| Variable | Required | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | For Vercel | Public origin. Local default: `http://127.0.0.1:4327`. |
| `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL` | No | Supabase project URL. Without it, rates come from `src/lib/catalog.ts` and bookings stay in server memory. |
| `SUPABASE_SERVICE_ROLE_KEY` | No (preferred on the server) | Server-side writes. Never expose as `NEXT_PUBLIC_*`. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `SUPABASE_ANON_KEY` | No | Used only if the service role key is absent. |
| `STRIPE_SECRET_KEY` | No | Not used by the public UI. Public payment copy is Interac e-Transfer. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No | Not used by this slice. |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Not used by the public UI. Booking is the in-app form until Calendly exists. Do not invent a URL. |

### Supabase

1. Create a project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Set the URL plus `SUPABASE_SERVICE_ROLE_KEY` (or the anon key).
4. Restart the Next.js server.

### Interac (product payment)

Copy on the site: pay by Interac e-Transfer before the session; 24-hour cancellation. Contact details for sending e-Transfer are not on the site yet.

## Deploy on Vercel

You do **not** need Vercel credentials to run locally.

1. Import the repo in the Vercel dashboard.
2. `vercel.json` pins `framework: "nextjs"`.
3. Set **Project → Settings → Environment Variables**:

   - `NEXT_PUBLIC_SITE_URL` = `https://<your-project>.vercel.app`
   - Optional: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   - Optional later: `NEXT_PUBLIC_CALENDLY_URL`, `STRIPE_SECRET_KEY` (not shown as the customer payment method)

```bash
npx vercel
```

Do not commit `.vercel/` or `.env*.local`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server on `127.0.0.1:4327` |
| `npm run build` | Production build |
| `npm run start` | Serve the production build on 4327 |
| `npm run lint` | ESLint |
