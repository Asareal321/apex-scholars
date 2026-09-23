# Apex Scholars

Next.js site for Apex Scholars: weekly Zoom tutoring for six Western University courses. Independent service. Not affiliated with Western University.

Production: [https://apex-scholars-bay.vercel.app](https://apex-scholars-bay.vercel.app)

Payment is **Interac e-Transfer to asanichols07@gmail.com before the session** (24-hour cancellation). The site does not take payments online. The in-app booking form holds a Zoom slot without any third-party credentials.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- In-app Zoom booking form
- Optional Supabase for rates and bookings (local catalog + in-memory fallback if unset)
- Deployable to Vercel; no Vercel credentials needed for local `npm run dev`

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4327](http://127.0.0.1:4327). The dev server binds to port **4327**.

Copy `.env.example` to `.env.local` only if you want Supabase (or later Calendly). Leave it alone to use in-memory fallbacks.

## Environment variables

All are optional.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL` | Supabase project URL. Without it, rates come from `src/lib/catalog.ts` and bookings stay in server memory. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side writes (preferred). Never expose as `NEXT_PUBLIC_*`. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `SUPABASE_ANON_KEY` | Used only if the service role key is absent. |
| `NEXT_PUBLIC_CALENDLY_URL` | Not used by the public UI yet. Booking is the in-app form until Calendly exists. Do not invent a URL. |

### Supabase

1. Create a project.
2. Run `supabase/schema.sql` in the SQL editor (creates `packages` and `bookings`).
3. Set the URL plus `SUPABASE_SERVICE_ROLE_KEY` (or the anon key).
4. Restart the Next.js server.

### Interac e-Transfer

Copy on the site: send an Interac e-Transfer to asanichols07@gmail.com before the session; 24-hour cancellation. The same address is the contact email in the footer. Change it in one place: `CONTACT_EMAIL` in `src/lib/catalog.ts` (and the package descriptions in `supabase/schema.sql` if you use Supabase).

## Deploy on Vercel

The production site is [https://apex-scholars-bay.vercel.app](https://apex-scholars-bay.vercel.app).

1. Import the repo in the Vercel dashboard.
2. `vercel.json` pins `framework: "nextjs"`.
3. Optional: set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` under **Project → Settings → Environment Variables**, and later `NEXT_PUBLIC_CALENDLY_URL`.

Do not commit `.vercel/` or `.env*.local`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server on `127.0.0.1:4327` |
| `npm run build` | Production build |
| `npm run start` | Serve the production build on 4327 |
| `npm run lint` | ESLint |
