-- Fix infinite recursion in profiles RLS policies
-- Use a SECURITY DEFINER helper that bypasses RLS when checking role

create or replace function public.current_user_role()
returns user_role
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

grant execute on function public.current_user_role() to authenticated, anon;

-- Drop recursive policies
drop policy if exists "Admins read all profiles" on public.profiles;
drop policy if exists "Admins manage products" on public.products;
drop policy if exists "Admins manage news" on public.news;
drop policy if exists "Admins manage stores" on public.stores;
drop policy if exists "Admins read orders" on public.orders;
drop policy if exists "Admins update orders" on public.orders;

-- Recreate using helper function (no recursion)
create policy "Admins read all profiles" on public.profiles
  for select using (public.current_user_role() = 'admin');

create policy "Admins manage products" on public.products
  for all using (public.current_user_role() in ('admin','staff'));
create policy "Admins manage news" on public.news
  for all using (public.current_user_role() in ('admin','staff'));
create policy "Admins manage stores" on public.stores
  for all using (public.current_user_role() in ('admin','staff'));
create policy "Admins read orders" on public.orders
  for select using (public.current_user_role() in ('admin','staff'));
create policy "Admins update orders" on public.orders
  for update using (public.current_user_role() in ('admin','staff'));
