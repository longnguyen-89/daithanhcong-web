-- ============================================
-- Site settings — flexible key-value JSON store
-- ============================================
create table public.site_settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz default now(),
  updated_by  uuid references auth.users(id)
);

create trigger trg_settings_touch before update on public.site_settings
  for each row execute function public.touch_updated_at();

alter table public.site_settings enable row level security;

create policy "Anyone reads settings" on public.site_settings
  for select using (true);

create policy "Admin manages settings" on public.site_settings
  for all using (public.current_user_role() in ('admin','staff'));

-- Seed AI defaults
insert into public.site_settings (key, value) values
  ('ai_config', jsonb_build_object(
    'enabled', true,
    'tone', 'friendly',
    'welcome_vi', 'Xin chào anh/chị! Em là trợ lý AI của ĐẠI THÀNH CÔNG. Em có thể giúp anh/chị tìm xe phù hợp, so sánh thông số, tư vấn trả góp, hoặc đặt lịch lái thử. Anh/chị cần em hỗ trợ gì ạ?',
    'welcome_en', 'Hello! I am DTC AI assistant. How may I help?',
    'suggestions_vi', jsonb_build_array('Tư vấn xe SH 350i', 'Trả góp 0% có điều kiện gì?', 'So sánh Exciter và Winner X', 'Đặt lịch lái thử'),
    'suggestions_en', jsonb_build_array('Tell me about SH 350i', '0% installment terms?', 'Exciter vs Winner', 'Book a test ride'),
    'extra_knowledge', E'CHÍNH SÁCH BÁN HÀNG:\n- Trả góp 0% lãi suất 12 tháng đầu\n- Sang tên đổi chủ trong 2 ngày làm việc\n- Bảo hành chính hãng + bảo hành mở rộng ĐTC 12 tháng\n- Kiểm tra kỹ thuật miễn phí 1 năm sau khi mua'
  )),
  ('brand_info', jsonb_build_object(
    'name', 'ĐẠI THÀNH CÔNG',
    'tagline', 'Premium Motorcycle Network · Est. 2018',
    'slogan_vi', 'Đoàn kết — Vượt giới hạn — Đại Thành Công',
    'slogan_en', 'United — Beyond Limits — Dai Thanh Cong',
    'hotline', '1900 6789',
    'hotline_hours', '07:30 — 21:00',
    'email', 'info@daithanhcong.vn',
    'zalo_oa', '@daithanhcong.vn',
    'hq_address', '123 Đại lộ Bình Dương, P. Phú Hòa, TP. Thủ Dầu Một',
    'social', jsonb_build_object('facebook', 'https://facebook.com/daithanhcong', 'youtube', '', 'tiktok', '')
  ));
