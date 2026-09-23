# Apex Scholars

Next.js site for Apex Scholars: weekly Google Meet tutoring for six Western University courses. Independent service. Not affiliated with Western University.

Production: [https://apex-scholars-bay.vercel.app](https://apex-scholars-bay.vercel.app)

Payment is **Interac e-Transfer to asanichols07@gmail.com before the session** (24-hour cancellation). The site does not take payments online. Bookings go through Calendly when `NEXT_PUBLIC_CALENDLY_URL` (or a per-type link) is set; otherwise the in-app booking form holds a Google Meet slot without any third-party credentials.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- Calendly inline embed for booking (in-app Google Meet booking form as fallback)
- Optional Supabase for rates and bookings (local catalog + in-memory fallback if unset)
- Deployable to Vercel; no Vercel credentials needed for local `npm run dev`

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4327](http://127.0.0.1:4327). The dev server binds to port **4327**.

Copy `.env.example` to `.env.local` only if you want Calendly or Supabase. Leave it alone to use in-memory fallbacks.

## Environment variables

All are optional.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL` | Supabase project URL. Without it, rates come from `src/lib/catalog.ts` and bookings stay in server memory. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side writes (preferred). Never expose as `NEXT_PUBLIC_*`. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `SUPABASE_ANON_KEY` | Used only if the service role key is absent. |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly profile page (`https://calendly.com/you`, student picks the event type) or a single event link. When set, `/book` shows the Calendly embed instead of the in-app form. |
| `NEXT_PUBLIC_CALENDLY_URL_60` | Event link for 1-on-1, 60 min. |
| `NEXT_PUBLIC_CALENDLY_URL_30` | Event link for 1-on-1, 30 min. |
| `NEXT_PUBLIC_CALENDLY_URL_GROUP` | Event link for the small group. |

If any of the three per-type links is set, `/book` shows a session-type picker above the embed and rate cards deep-link to it (`/book?type=60`, `?type=30`, `?type=group`). With only the per-type links set, the first configured type is selected by default; with `NEXT_PUBLIC_CALENDLY_URL` also set, it is shown until the student picks a type. With no Calendly variable set, `/book` uses the in-app form. If Calendly does not load within 15 seconds, the in-app form appears as a fallback.

`NEXT_PUBLIC_*` values are baked in at build time, so redeploy on Vercel after changing them.

### Calendly setup

1. Create three event types:
   - **1-on-1 · 60 min** (One-on-One)
   - **1-on-1 · 30 min** (One-on-One)
   - **Small group · 60 min** (Group, max 5 invitees)
2. In Calendly, connect **Google Calendar** (Integrations → Google Calendar), then set each event's **Location** to **Google Meet**. Calendly creates the Meet link and adds it to the calendar invite.
3. Under **Invitee questions**, add **Which course?** as the *first* custom question (options: ECON 1021, ECON 1022, MATH 1229, CALC 1000, MOS 1023, BUS 1220). The site prefills it via `a1=<course code>` when the student arrives from a course link (`/book?subject=econ-1021`). If the question is missing, Calendly ignores the parameter.
4. Under **Notifications and cancellation policy** / **Confirmation page**, add: "Send an Interac e-Transfer to asanichols07@gmail.com before the session. 24-hour cancellation policy." Add the same line to the confirmation email.
5. Copy your profile link into `NEXT_PUBLIC_CALENDLY_URL` and/or each event link into the per-type variables.

The embed uses the site's navy/gold colours (`background_color=111d30`, `text_color=f7f2e3`, `primary_color=dbb155`, from `--card`, `--foreground` and `--primary` in `src/app/globals.css`). Custom colours need a paid Calendly plan; on the free plan Calendly shows its default colours.

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
3. Optional: set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` under **Project → Settings → Environment Variables**, and the Calendly variables (`NEXT_PUBLIC_CALENDLY_URL`, `NEXT_PUBLIC_CALENDLY_URL_60`, `NEXT_PUBLIC_CALENDLY_URL_30`, `NEXT_PUBLIC_CALENDLY_URL_GROUP`), then redeploy.

Do not commit `.vercel/` or `.env*.local`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server on `127.0.0.1:4327` |
| `npm run build` | Production build |
| `npm run start` | Serve the production build on 4327 |
| `npm run lint` | ESLint |
