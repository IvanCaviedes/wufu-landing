create table if not exists public.subscription_rate_limits (
  key_hash text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 1 check (request_count > 0)
);

alter table public.subscription_rate_limits enable row level security;
revoke all on table public.subscription_rate_limits from anon, authenticated;

create or replace function public.check_subscription_rate_limit(
  identifier text,
  max_requests integer,
  window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  allowed boolean;
begin
  if identifier is null
    or length(identifier) > 128
    or max_requests < 1
    or window_seconds < 1 then
    return false;
  end if;

  insert into public.subscription_rate_limits as limits (
    key_hash,
    window_started_at,
    request_count
  )
  values (identifier, now(), 1)
  on conflict (key_hash) do update
  set
    window_started_at = case
      when limits.window_started_at <= now() - make_interval(secs => window_seconds)
        then now()
      else limits.window_started_at
    end,
    request_count = case
      when limits.window_started_at <= now() - make_interval(secs => window_seconds)
        then 1
      else limits.request_count + 1
    end
  returning request_count <= max_requests into allowed;

  return allowed;
end;
$$;

revoke all on function public.check_subscription_rate_limit(text, integer, integer) from public;
revoke all on function public.check_subscription_rate_limit(text, integer, integer) from anon;
revoke all on function public.check_subscription_rate_limit(text, integer, integer) from authenticated;
grant execute on function public.check_subscription_rate_limit(text, integer, integer) to service_role;

comment on table public.subscription_rate_limits is
  'Hashed identifiers used for server-side subscription abuse prevention.';
