# Apex Scholars

Next.js site for Apex Scholars: weekly Google Meet tutoring for six Western University courses. Independent service. Not affiliated with Western University.

Production: [https://apex-scholars-bay.vercel.app](https://apex-scholars-bay.vercel.app)

Payment is **Interac e-Transfer to asanichols07@gmail.com**; the e-Transfer must arrive at least 24 hours before the session. Cancellations need 12 hours' notice; late cancellations are not refunded. The site does not take payments online. Bookings go through Asa's Calendly (built-in default, overridable with env vars); if Calendly is turned off or fails to load, the in-app booking form holds a Google Meet slot without any third-party credentials.

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

Copy `.env.example` to `.env.local` only if you want to override the Calendly links or add Supabase. Leave it alone to use Asa's Calendly and in-memory fallbacks.

## Environment variables

All are optional.

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL` | Supabase project URL. Without it, rates come from `src/lib/catalog.ts` and bookings stay in server memory. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side writes (preferred). Never expose as `NEXT_PUBLIC_*`. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `SUPABASE_ANON_KEY` | Used only if the service role key is absent. |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly profile page (student picks the event type) or a single event link. **Default: `https://calendly.com/asanichols07`.** |
| `NEXT_PUBLIC_CALENDLY_URL_60` | Event link for 1-on-1, 60 min. **Default: `https://calendly.com/asanichols07/60min`.** |
| `NEXT_PUBLIC_CALENDLY_URL_30` | Event link for 1-on-1, 30 min. **Default: `https://calendly.com/asanichols07/30min`.** |
| `NEXT_PUBLIC_CALENDLY_URL_GROUP` | Event link for the small group. **Default: `https://calendly.com/asanichols07/60min-1`.** |

The Calendly defaults live in `src/lib/env.ts` (`DEFAULT_CALENDLY_URL`, `DEFAULT_CALENDLY_URL_60`, `DEFAULT_CALENDLY_URL_30`, `DEFAULT_CALENDLY_URL_GROUP`), so `/book` shows Asa's Calendly with no env vars set on Vercel. An env var overrides its default; leaving it blank keeps the default; setting it to `off` disables that link. Set all four (`NEXT_PUBLIC_CALENDLY_URL`, `_60`, `_30`, `_GROUP`) to `off` to use the in-app form instead.

`/book` shows a session-type picker (1-on-1 60 min, 1-on-1 30 min, small group) above the embed, and rate cards deep-link to it (`/book?type=60`, `?type=30`, `?type=group`). Each type loads its own event directly; `/book` with no type (or a type whose link is set to `off`) loads the profile page, where the student picks the event. If Calendly does not load within 15 seconds, the in-app form appears as a fallback.

`NEXT_PUBLIC_*` values are baked in at build time, so redeploy on Vercel after changing them.

### Calendly setup

1. Create three event types:
   - **1-on-1 · 60 min** (One-on-One)
   - **1-on-1 · 30 min** (One-on-One)
   - **Small group · 60 min** (Group, max 5 invitees)
2. In Calendly, connect **Google Calendar** (Integrations → Google Calendar), then set each event's **Location** to **Google Meet**. Calendly creates the Meet link and adds it to the calendar invite.
3. Under **Invitee questions**, add **Which course?** as the *first* custom question (options: ECON 1021, ECON 1022, MATH 1229, CALC 1000, MOS 1023, BUS 1220). The site prefills it via `a1=<course code>` when the student arrives from a course link (`/book?subject=econ-1021`). If the question is missing, Calendly ignores the parameter.
4. Under **Notifications and cancellation policy** / **Confirmation page**, add: "Pay by Interac e-Transfer to asanichols07@gmail.com. The e-Transfer must arrive at least 24 hours before the session. Cancel with at least 12 hours' notice. Late cancellations are not refunded." Add the same lines to the confirmation email.
5. The three events are `asanichols07/60min`, `asanichols07/30min` and `asanichols07/60min-1` (group). If you rename one in Calendly, update its env var or the default in `src/lib/env.ts`.

The embed uses the site's navy/gold colours (`background_color=111d30`, `text_color=f7f2e3`, `primary_color=dbb155`, from `--card`, `--foreground` and `--primary` in `src/app/globals.css`). Custom colours need a paid Calendly plan; on the free plan Calendly shows its default colours.

### Supabase

1. Create a project.
2. Run `supabase/schema.sql` in the SQL editor (creates `packages` and `bookings`).
3. Set the URL plus `SUPABASE_SERVICE_ROLE_KEY` (or the anon key).
4. Restart the Next.js server.

### Interac e-Transfer

The payment and cancellation copy lives in `PAYMENT_LINE` and `CANCELLATION_LINE` in `src/lib/catalog.ts`; the e-Transfer address is `CONTACT_EMAIL` in the same file and doubles as the footer contact email. Package cards read from Supabase when it is configured, so keep `supabase/schema.sql` (and the live `packages` rows) in step with `packages` in `catalog.ts`.

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
