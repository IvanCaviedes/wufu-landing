alter table public.subscribers
  add column if not exists subscription_status text,
  add column if not exists confirmation_token_hash text,
  add column if not exists confirmation_expires_at timestamptz,
  add column if not exists confirmed_at timestamptz;

update public.subscribers
set
  subscription_status = 'confirmed',
  confirmed_at = coalesce(confirmed_at, consented_at, created_at)
where subscription_status is null;

alter table public.subscribers
  alter column subscription_status set default 'pending',
  alter column subscription_status set not null;

alter table public.subscribers
  add constraint subscribers_subscription_status_check
  check (subscription_status in ('pending', 'confirmed'));

create unique index subscribers_confirmation_token_hash_idx
  on public.subscribers (confirmation_token_hash)
  where confirmation_token_hash is not null;

create or replace function public.register_pending_subscriber(
  p_email text,
  p_name text,
  p_pet_type text,
  p_discovery_source text,
  p_marketing_consent boolean,
  p_consented_at timestamptz,
  p_consent_version text,
  p_token_hash text,
  p_token_expires_at timestamptz
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  affected integer;
begin
  insert into public.subscribers (
    email,
    name,
    pet_type,
    discovery_source,
    signals_found,
    reward_unlocked,
    marketing_consent,
    consented_at,
    consent_version,
    subscription_status,
    confirmation_token_hash,
    confirmation_expires_at,
    updated_at
  )
  values (
    p_email,
    p_name,
    p_pet_type,
    p_discovery_source,
    0,
    false,
    p_marketing_consent,
    p_consented_at,
    p_consent_version,
    'pending',
    p_token_hash,
    p_token_expires_at,
    now()
  )
  on conflict (email) do update
  set
    name = excluded.name,
    pet_type = excluded.pet_type,
    discovery_source = excluded.discovery_source,
    marketing_consent = excluded.marketing_consent,
    consented_at = excluded.consented_at,
    consent_version = excluded.consent_version,
    confirmation_token_hash = excluded.confirmation_token_hash,
    confirmation_expires_at = excluded.confirmation_expires_at,
    updated_at = now()
  where subscribers.subscription_status = 'pending';

  get diagnostics affected = row_count;
  return affected > 0;
end;
$$;

create or replace function public.confirm_subscriber(p_token_hash text)
returns table (confirmed_email text, confirmed_name text)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  update public.subscribers
  set
    subscription_status = 'confirmed',
    confirmed_at = now(),
    confirmation_token_hash = null,
    confirmation_expires_at = null,
    updated_at = now()
  where confirmation_token_hash = p_token_hash
    and subscription_status = 'pending'
    and confirmation_expires_at > now()
  returning email, name;
end;
$$;

revoke all on function public.register_pending_subscriber(text, text, text, text, boolean, timestamptz, text, text, timestamptz) from public, anon, authenticated;
grant execute on function public.register_pending_subscriber(text, text, text, text, boolean, timestamptz, text, text, timestamptz) to service_role;

revoke all on function public.confirm_subscriber(text) from public, anon, authenticated;
grant execute on function public.confirm_subscriber(text) to service_role;

comment on column public.subscribers.subscription_status is
  'Only confirmed subscribers may be synchronized with the email marketing provider.';
