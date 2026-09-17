-- Apex Scholars: run this in the Supabase SQL editor.
-- The site keeps working from the local catalog + memory if these tables are missing.

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
  group_size text,
  sort_order int not null default 0
);

alter table packages add column if not exists group_size text;

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

delete from packages where id in ('diagnostic', 'sprint', 'foundation', 'semester');

insert into packages (
  id, name, sessions, minutes, price_cents, per_session_cents,
  headline, description, includes, best_for, featured, group_size, sort_order
) values
  (
    'one-on-one-60',
    '1-on-1 · 60 minutes',
    1, 60, 4000, 4000,
    '$40/hr on Zoom.',
    'A 60-minute 1-on-1 Zoom session. Pay by Interac e-Transfer before the session. Cancel at least 24 hours ahead.',
    array[
      '60 minutes, 1-on-1',
      'Zoom only',
      'Interac e-Transfer before the session',
      '24-hour cancellation policy'
    ],
    'Weekly 1-on-1 in one of the six Western courses Apex tutors.',
    true, null, 1
  ),
  (
    'one-on-one-30',
    '1-on-1 · 30 minutes',
    1, 30, 2000, 4000,
    'Same $40/hr rate, shorter slot.',
    'An optional 30-minute 1-on-1 Zoom session at the same hourly rate. Pay by Interac e-Transfer before the session. Cancel at least 24 hours ahead.',
    array[
      '30 minutes, 1-on-1',
      'Same $40/hr rate as the 60-minute session',
      'Zoom only',
      'Interac e-Transfer before the session',
      '24-hour cancellation policy'
    ],
    'A shorter weekly check-in when a full hour is more than you need.',
    false, null, 2
  ),
  (
    'small-group',
    'Small group · 3–5 students',
    1, 60, 2000, 2000,
    '$20 per student.',
    'A small group of 3 to 5 students on Zoom. Assume 60 minutes. Pay by Interac e-Transfer before the session. Cancel at least 24 hours ahead.',
    array[
      '3 to 5 students',
      '$20 per student',
      'Zoom only',
      'Interac e-Transfer before the session',
      '24-hour cancellation policy'
    ],
    'Classmates who want a weekly group hour in the same Western course.',
    false, '3–5', 3
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
  group_size = excluded.group_size,
  sort_order = excluded.sort_order;
