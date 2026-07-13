insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
  on conflict (id) do nothing;

create table public.profiles (
                               id uuid primary key references auth.users (id) on delete cascade
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select
                                  using (true);

create function public.handle_new_user()
  returns trigger
  language plpgsql
security definer
set search_path = public
as $$
begin
insert into public.profiles (id)
values (new.id);
return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
