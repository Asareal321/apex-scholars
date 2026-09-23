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

drop table if exists payments;

create index if not exists bookings_slot_id_idx on bookings (slot_id);

alter table packages enable row level security;
alter table bookings enable row level security;

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

delete from packages where id in ('diagnostic', 'sprint', 'foundation', 'semester');

insert into packages (
  id, name, sessions, minutes, price_cents, per_session_cents,
  headline, description, includes, best_for, featured, group_size, sort_order
) values
  (
    'one-on-one-60',
    '1-on-1 · 60 minutes',
    1, 60, 4000, 4000,
    '$40/hr over Google Meet.',
    'A 60-minute 1-on-1 Google Meet session. Send an Interac e-Transfer to asanichols07@gmail.com before the session. Cancel at least 24 hours ahead.',
    array[
      '60 minutes, 1-on-1',
      'Online over Google Meet',
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
    'An optional 30-minute 1-on-1 Google Meet session at the same hourly rate. Send an Interac e-Transfer to asanichols07@gmail.com before the session. Cancel at least 24 hours ahead.',
    array[
      '30 minutes, 1-on-1',
      'Same $40/hr rate as the 60-minute session',
      'Online over Google Meet',
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
    'A small group of 3 to 5 students over Google Meet. Send an Interac e-Transfer to asanichols07@gmail.com before the session. Cancel at least 24 hours ahead.',
    array[
      '3 to 5 students',
      '$20 per student',
      'Online over Google Meet',
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
