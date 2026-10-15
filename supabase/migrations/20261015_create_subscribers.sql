create extension if not exists pgcrypto;

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  pet_type text not null check (pet_type in ('dog', 'cat', 'both', 'other')),
  discovery_source text not null check (
    discovery_source in ('instagram', 'tiktok', 'facebook', 'google', 'recommendation', 'event', 'other')
  ),
  signals_found smallint not null default 0 check (signals_found between 0 and 5),
  reward_unlocked boolean not null default false,
  marketing_consent boolean not null default false,
  consented_at timestamptz,
  consent_version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

comment on table public.subscribers is
  'Waitlist registrations. Access is restricted to the server-side service role.';
