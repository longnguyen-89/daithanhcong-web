-- Drop legacy admin policies that queried profiles directly.
-- Migration 0002 introduced current_user_role(), but older policy names from
-- 0001 were still present on deployed databases and could keep RLS recursion.

drop policy if exists "Admins can do everything on products" on public.products;
drop policy if exists "Admins can do everything on news" on public.news;
drop policy if exists "Admins can do everything on stores" on public.stores;
drop policy if exists "Admins can view all orders" on public.orders;
drop policy if exists "Admins can update orders" on public.orders;
