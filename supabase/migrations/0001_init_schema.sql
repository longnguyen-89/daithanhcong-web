-- ============================================
-- ĐẠI THÀNH CÔNG — Initial schema
-- ============================================
-- Schema: products, news, stores, orders, profiles
-- Auth: managed by Supabase Auth (auth.users)
-- ============================================

-- ----- ENUMS -----
create type product_status as enum ('new', 'used');
create type product_badge as enum ('new', 'hot', 'sale');
create type order_status as enum ('pending', 'confirmed', 'delivered', 'cancelled');
create type user_role as enum ('admin', 'staff', 'viewer');

-- ----- STORES (chi nhánh) -----
create table public.stores (
  id          int generated always as identity primary key,
  name        text not null,
  addr        text not null,
  phone       text not null,
  staff       int default 0,
  map_x       numeric(5,2),
  map_y       numeric(5,2),
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- ----- PRODUCTS (xe) -----
create table public.products (
  id          int generated always as identity primary key,
  name        text not null,
  brand       text not null,
  cat         text not null,
  year        int not null,
  price       bigint not null,
  old_price   bigint,
  badge       product_badge,
  cc          int default 0,
  color       text,
  status      product_status not null default 'new',
  stock       int default 0,
  store_id    int references public.stores(id) on delete set null,
  mileage     int default 0,
  fuel        text default 'Xăng',
  features    text[] default '{}',
  image_url   text,
  description text,
  is_active   boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
create index idx_products_brand on public.products(brand);
create index idx_products_cat on public.products(cat);
create index idx_products_status on public.products(status);
create index idx_products_active on public.products(is_active);

-- ----- NEWS (tin tức) -----
create table public.news (
  id          int generated always as identity primary key,
  cat         text not null,
  title       text not null,
  excerpt     text,
  content     text,
  author      text default 'Phòng Marketing',
  cover_url   text,
  views       int default 0,
  published   boolean default true,
  published_at timestamptz default now(),
  created_at  timestamptz default now()
);
create index idx_news_published on public.news(published, published_at desc);

-- ----- ORDERS (đơn / yêu cầu tư vấn) -----
create table public.orders (
  id          text primary key,
  customer    text not null,
  phone       text not null,
  email       text,
  product_id  int references public.products(id) on delete set null,
  product_name text,
  store_id    int references public.stores(id) on delete set null,
  store_name  text,
  total       bigint default 0,
  status      order_status default 'pending',
  message     text,
  source      text default 'web',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
create index idx_orders_status on public.orders(status);
create index idx_orders_created on public.orders(created_at desc);

-- ----- PROFILES (admin / staff) -----
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  role        user_role default 'viewer',
  store_id    int references public.stores(id) on delete set null,
  avatar_url  text,
  created_at  timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email), 'viewer');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto order ID generator: DTC-YYYY-NNNNN
create or replace function public.generate_order_id()
returns text language plpgsql as $$
declare
  yr int := extract(year from now());
  seq int;
begin
  select coalesce(max(substring(id from 'DTC-\d{4}-(\d+)$')::int), 0) + 1
    into seq
    from public.orders
    where id like 'DTC-' || yr || '-%';
  return 'DTC-' || yr || '-' || lpad(seq::text, 5, '0');
end;
$$;

-- ----- updated_at triggers -----
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end;
$$;

create trigger trg_products_touch before update on public.products
  for each row execute function public.touch_updated_at();
create trigger trg_orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table public.products enable row level security;
alter table public.news enable row level security;
alter table public.stores enable row level security;
alter table public.orders enable row level security;
alter table public.profiles enable row level security;

-- Public READ for catalog data
create policy "Anyone can view active products" on public.products
  for select using (is_active = true);
create policy "Anyone can view published news" on public.news
  for select using (published = true);
create policy "Anyone can view active stores" on public.stores
  for select using (is_active = true);

-- Anyone can create an order (contact form submission)
create policy "Anyone can create orders" on public.orders
  for insert with check (true);

-- Admins / staff manage everything
create policy "Admins can do everything on products" on public.products
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','staff'))
  );
create policy "Admins can do everything on news" on public.news
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','staff'))
  );
create policy "Admins can do everything on stores" on public.stores
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','staff'))
  );
create policy "Admins can view all orders" on public.orders
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','staff'))
  );
create policy "Admins can update orders" on public.orders
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','staff'))
  );

-- Profiles
create policy "Users can read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Admins can read all profiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles p2 where p2.id = auth.uid() and p2.role = 'admin')
  );
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
