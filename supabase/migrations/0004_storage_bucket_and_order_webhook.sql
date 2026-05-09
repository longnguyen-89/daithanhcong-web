-- ============================================
-- Public images bucket (5MB cap, public read, admin write)
-- ============================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('public-images', 'public-images', true, 5242880,
  array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read images" on storage.objects;
drop policy if exists "Admin write images" on storage.objects;
drop policy if exists "Admin update images" on storage.objects;
drop policy if exists "Admin delete images" on storage.objects;

create policy "Public read images" on storage.objects
  for select using (bucket_id = 'public-images');

create policy "Admin write images" on storage.objects
  for insert with check (
    bucket_id = 'public-images' and public.current_user_role() in ('admin','staff')
  );

create policy "Admin update images" on storage.objects
  for update using (
    bucket_id = 'public-images' and public.current_user_role() in ('admin','staff')
  );

create policy "Admin delete images" on storage.objects
  for delete using (
    bucket_id = 'public-images' and public.current_user_role() in ('admin','staff')
  );

-- ============================================
-- Webhook trigger to call notify-order edge function on new orders
-- ============================================
create extension if not exists pg_net with schema extensions;

create or replace function public.trigger_notify_order()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  fn_url text := 'https://mftubiaywawjggpwobor.supabase.co/functions/v1/notify-order';
  payload jsonb;
begin
  payload := jsonb_build_object(
    'type', 'INSERT',
    'table', 'orders',
    'schema', 'public',
    'record', row_to_json(new)::jsonb
  );

  perform net.http_post(
    url := fn_url,
    body := payload,
    headers := '{"Content-Type":"application/json"}'::jsonb,
    timeout_milliseconds := 5000
  );

  return new;
exception when others then
  raise notice 'notify-order trigger failed: %', sqlerrm;
  return new;
end;
$$;

drop trigger if exists on_new_order_notify on public.orders;
create trigger on_new_order_notify
  after insert on public.orders
  for each row execute function public.trigger_notify_order();
