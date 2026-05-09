-- Initial admin user (run once)
-- Email: admin@daithanhcong.vn
-- Password: DTC@2026 (CHANGE IMMEDIATELY after first login)

do $$
declare
  new_user_id uuid := gen_random_uuid();
begin
  if exists (select 1 from auth.users where email = 'admin@daithanhcong.vn') then
    raise notice 'admin@daithanhcong.vn already exists, skipping';
    return;
  end if;

  insert into auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    created_at, updated_at, role, aud, raw_app_meta_data, raw_user_meta_data,
    confirmation_token, recovery_token, email_change_token_new, email_change
  ) values (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'admin@daithanhcong.vn',
    crypt('DTC@2026', gen_salt('bf')),
    now(),
    now(), now(),
    'authenticated', 'authenticated',
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Quản trị ĐTC"}'::jsonb,
    '', '', '', ''
  );

  insert into auth.identities (
    id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
  ) values (
    gen_random_uuid(),
    new_user_id,
    json_build_object('sub', new_user_id::text, 'email', 'admin@daithanhcong.vn'),
    'email',
    new_user_id::text,
    now(), now(), now()
  );

  update public.profiles set role = 'admin', full_name = 'Quản trị ĐTC' where id = new_user_id;
end $$;
