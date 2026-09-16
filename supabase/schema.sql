-- Northline Tutors: run this in the Supabase SQL editor.
-- The site keeps working from local catalog + memory if these tables are missing.

create table if not exists packages (
  id text primary key,
  name text not null,
  sessions int not null,
  minutes int not null,
  price_cents int not null,
  per_session_cents int not null,
  headline text not null,
  description text not null,
  includes text[] not null default '{}',
  best_for text not null,
  featured boolean not null default false,
  sort_order int not null default 0
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  confirmation text unique not null,
  name text not null,
  email text not null,
  subject_id text not null,
  tutor_id text not null,
  slot_id text not null,
  slot_label text not null,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  confirmation text unique not null,
  package_id text not null,
  package_name text not null,
  amount_cents int not null,
  email text not null,
  name text not null,
  mode text not null check (mode in ('stripe', 'mock')),
  status text not null check (status in ('paid', 'checkout_created')),
  stripe_session_id text unique,
  created_at timestamptz not null default now()
);

create index if not exists bookings_slot_id_idx on bookings (slot_id);

alter table packages enable row level security;
alter table bookings enable row level security;
alter table payments enable row level security;

-- Server routes use the service role key (bypasses RLS). These policies
-- cover the anon key if you prefer not to use the service role locally.
drop policy if exists "public read packages" on packages;
create policy "public read packages"
  on packages for select
  to anon, authenticated
  using (true);

drop policy if exists "server insert bookings" on bookings;
create policy "server insert bookings"
  on bookings for insert
  to anon, authenticated
  with check (true);

drop policy if exists "server insert payments" on payments;
create policy "server insert payments"
  on payments for insert
  to anon, authenticated
  with check (true);

drop policy if exists "server update payments" on payments;
create policy "server update payments"
  on payments for update
  to anon, authenticated
  using (true)
  with check (true);

insert into packages (
  id, name, sessions, minutes, price_cents, per_session_cents,
  headline, description, includes, best_for, featured, sort_order
) values
  (
    'diagnostic',
    'Diagnostic hour',
    1, 50, 8500, 8500,
    'Find the actual hole before you buy a pack.',
    'A 50-minute working session plus a written plan. We watch the student solve, name the gaps, and recommend a package — or tell you tutoring is not the next move.',
    array[
      '50-minute Zoom or in-studio session',
      'One-page written plan sent within 24 hours',
      'Package recommendation with a realistic timeline',
      'Credit the $85 toward a Four-week sprint or larger pack within 14 days'
    ],
    'Families who are not sure whether the issue is content, timing, or the class itself.',
    false, 1
  ),
  (
    'sprint',
    'Four-week sprint',
    4, 50, 36000, 9000,
    'A unit test, a SAT date, or four weeks to stabilize.',
    'Four 50-minute sessions over about a month. Tight homework, a shared error log, and a last-session recap you can hand to a parent or counselor.',
    array[
      'Four 50-minute sessions with the same tutor',
      'Targeted homework between meetings (20–30 minutes)',
      'Shared error log in a simple Google Doc',
      'End-of-sprint recap with next-step options'
    ],
    'A coming unit exam, a SAT 3–5 weeks out, or a student who just transferred into AP.',
    false, 2
  ),
  (
    'foundation',
    'Foundation pack',
    8, 50, 68000, 8500,
    'Weekly rhythm — the pack most families stay on.',
    'Eight sessions, usually weekly. Mid-pack we send a short parent note so nobody is guessing about progress. This is the default for a full AP unit or a two-month SAT runway.',
    array[
      'Eight 50-minute sessions',
      'Weekly homework and a living error log',
      'Mid-pack parent note (email, ~150 words)',
      'Score or quiz check-in using school or official practice material'
    ],
    'A semester of AP Calc or Chem, or SAT prep that needs more than a crash course.',
    true, 3
  ),
  (
    'semester',
    'Semester mentor',
    16, 50, 192000, 12000,
    'A tutor of record for the whole term.',
    'Sixteen sessions plus two 20-minute parent conferences. We stay on the syllabus, catch slides early, and keep one adult in the loop without turning tutoring into a second homework police.',
    array[
      'Sixteen 50-minute sessions across the term',
      'Two 20-minute parent conferences',
      'Syllabus-aligned plan updated monthly',
      'Priority booking for the same weekly slot',
      'Exam-week extra materials (FRQ sets or SAT modules)'
    ],
    'A full AP course, a junior-year SAT season, or a student who needs a steady adult besides the classroom teacher.',
    false, 4
  )
on conflict (id) do update set
  name = excluded.name,
  sessions = excluded.sessions,
  minutes = excluded.minutes,
  price_cents = excluded.price_cents,
  per_session_cents = excluded.per_session_cents,
  headline = excluded.headline,
  description = excluded.description,
  includes = excluded.includes,
  best_for = excluded.best_for,
  featured = excluded.featured,
  sort_order = excluded.sort_order;
