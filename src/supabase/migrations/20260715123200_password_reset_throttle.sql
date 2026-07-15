create table if not exists public.password_reset_throttle (
                                                            email text primary key,
                                                            last_requested_at timestamptz not null default now()
  );

alter table public.password_reset_throttle enable row level security;
