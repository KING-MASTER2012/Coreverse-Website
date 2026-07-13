alter table public.profiles add column if not exists username text;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
derived_username text;
begin
  derived_username := coalesce(
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'preferred_username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'name',
    split_part(new.email, '@', 1)
  );

insert into public.profiles (id, username)
values (new.id, derived_username);

return new;
end;
$$;

update public.profiles p
set username = coalesce(
  u.raw_user_meta_data->>'username',
  u.raw_user_meta_data->>'user_name',
  u.raw_user_meta_data->>'full_name',
  split_part(u.email, '@', 1)
)
  from auth.users u
where p.id = u.id and p.username is null;
