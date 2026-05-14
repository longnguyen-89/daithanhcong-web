-- Defaults for the admin website customizer.

insert into public.site_settings (key, value) values
  ('home_content', jsonb_build_object(
    'vi', jsonb_build_object(
      'hero', jsonb_build_object(
        'eyebrow', 'Hệ thống xe máy chính hãng · Bình Dương',
        'titlePart1', 'Đẳng cấp',
        'titleAccent', 'không giới hạn,',
        'titlePart2', 'cho mọi hành trình.',
        'lead', 'ĐẠI THÀNH CÔNG — 7 cửa hàng phục vụ tận tâm trên toàn Bình Dương. Xe chính hãng Honda, Yamaha, SYM, VinFast với chính sách bảo hành minh bạch và dịch vụ sau bán hàng đẳng cấp showroom.',
        'cta1', 'Khám phá sản phẩm',
        'cta2', 'Đặt lịch lái thử'
      ),
      'sections', jsonb_build_object(
        'newTitle', 'Sản phẩm mới về',
        'newSub', 'Bộ sưu tập xe đời 2026 cập nhật mới nhất tại showroom',
        'bestTitle', 'Xe bán chạy',
        'bestSub', 'Top mẫu xe được khách hàng ĐTC tin chọn nhiều nhất',
        'promoTitle', 'Khuyến mãi đang chạy',
        'promoSub', 'Ưu đãi giới hạn cho khách đăng ký trong tháng',
        'storesTitle', 'Hệ thống 7 cửa hàng',
        'storesSub', 'Có mặt tại các quận huyện trọng điểm Bình Dương',
        'newsTitle', 'Tin tức & Cẩm nang',
        'newsSub', 'Tin tức ngành xe và bí quyết sử dụng từ chuyên gia ĐTC'
      )
    ),
    'en', jsonb_build_object(
      'hero', jsonb_build_object(
        'eyebrow', 'Authorized motorcycle network · Binh Duong',
        'titlePart1', 'Premium class',
        'titleAccent', 'without limits,',
        'titlePart2', 'for every journey.',
        'lead', 'DAI THANH CONG — 7 stores serving you across Binh Duong. Genuine Honda, Yamaha, SYM and VinFast bikes with transparent warranty and showroom-grade after-sales service.',
        'cta1', 'Explore catalog',
        'cta2', 'Book test ride'
      ),
      'sections', jsonb_build_object(
        'newTitle', 'Just arrived',
        'newSub', 'Latest 2026 lineup landing at our showroom',
        'bestTitle', 'Best sellers',
        'bestSub', 'Most-loved bikes from our customers',
        'promoTitle', 'Live promotions',
        'promoSub', 'Limited deals this month',
        'storesTitle', 'Our 7 branches',
        'storesSub', 'Across all key districts of Binh Duong',
        'newsTitle', 'News & Guides',
        'newsSub', 'Industry news and expert tips'
      )
    )
  )),
  ('appearance', jsonb_build_object(
    'theme', 'light',
    'heroVariant', 'a',
    'animations', true,
    'density', 'comfortable'
  ))
on conflict (key) do nothing;
