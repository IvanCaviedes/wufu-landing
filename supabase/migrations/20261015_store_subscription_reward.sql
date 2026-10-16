drop function if exists public.register_pending_subscriber(
  text,
  text,
  text,
  text,
  boolean,
  timestamptz,
  text,
  text,
  timestamptz
);

create or replace function public.register_pending_subscriber(
  p_email text,
  p_name text,
  p_pet_type text,
  p_discovery_source text,
  p_signals_found smallint,
  p_reward_unlocked boolean,
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
  saved_status text;
begin
  insert into public.subscribers as subscribers (
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
    p_signals_found,
    p_reward_unlocked,
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
    name = case
      when subscribers.subscription_status = 'pending' then excluded.name
      else subscribers.name
    end,
    pet_type = case
      when subscribers.subscription_status = 'pending' then excluded.pet_type
      else subscribers.pet_type
    end,
    discovery_source = case
      when subscribers.subscription_status = 'pending' then excluded.discovery_source
      else subscribers.discovery_source
    end,
    signals_found = greatest(subscribers.signals_found, excluded.signals_found),
    reward_unlocked = subscribers.reward_unlocked or excluded.reward_unlocked,
    marketing_consent = case
      when subscribers.subscription_status = 'pending' then excluded.marketing_consent
      else subscribers.marketing_consent
    end,
    consented_at = case
      when subscribers.subscription_status = 'pending' then excluded.consented_at
      else subscribers.consented_at
    end,
    consent_version = case
      when subscribers.subscription_status = 'pending' then excluded.consent_version
      else subscribers.consent_version
    end,
    confirmation_token_hash = case
      when subscribers.subscription_status = 'pending' then excluded.confirmation_token_hash
      else subscribers.confirmation_token_hash
    end,
    confirmation_expires_at = case
      when subscribers.subscription_status = 'pending' then excluded.confirmation_expires_at
      else subscribers.confirmation_expires_at
    end,
    updated_at = now()
  returning subscription_status into saved_status;

  return saved_status = 'pending';
end;
$$;

revoke all on function public.register_pending_subscriber(
  text,
  text,
  text,
  text,
  smallint,
  boolean,
  boolean,
  timestamptz,
  text,
  text,
  timestamptz
) from public, anon, authenticated;

grant execute on function public.register_pending_subscriber(
  text,
  text,
  text,
  text,
  smallint,
  boolean,
  boolean,
  timestamptz,
  text,
  text,
  timestamptz
) to service_role;
