-- ============================================
-- ĐẠI THÀNH CÔNG — Seed data from data.js
-- ============================================

-- Stores (7 chi nhánh)
insert into public.stores (id, name, addr, phone, staff, map_x, map_y) overriding system value values
  (1, 'CN Thủ Dầu Một (Trụ sở)', '123 Đại lộ Bình Dương, P. Phú Hòa, TP. Thủ Dầu Một', '0274 3 888 999', 14, 32, 38),
  (2, 'CN Thuận An',             '456 ĐT743, P. An Phú, TP. Thuận An',                    '0274 3 777 888', 11, 58, 62),
  (3, 'CN Dĩ An',                '789 Trần Hưng Đạo, P. Dĩ An, TP. Dĩ An',                '0274 3 666 777', 10, 70, 78),
  (4, 'CN Tân Uyên',             '12 ĐT747, P. Uyên Hưng, TP. Tân Uyên',                  '0274 3 555 666',  9, 64, 22),
  (5, 'CN Bến Cát',              '88 Đại lộ Bình Dương, P. Mỹ Phước, TX. Bến Cát',        '0274 3 444 555', 10, 24, 18),
  (6, 'CN Phú Giáo',             '34 Vành đai Phú Giáo, TT. Phước Vĩnh',                  '0274 3 333 444',  8, 48,  8),
  (7, 'CN Bàu Bàng',             '56 QL13, KCN Bàu Bàng, H. Bàu Bàng',                    '0274 3 222 333',  8, 14, 50);
select setval(pg_get_serial_sequence('public.stores','id'), 7);

-- Products (12 xe)
insert into public.products (id, name, brand, cat, year, price, old_price, badge, cc, color, status, stock, store_id, mileage, fuel, features) overriding system value values
  (1,  'Honda SH 350i ABS',       'Honda',   'tay-ga',      2026, 148900000, 158900000, 'new',  350, 'Đỏ Mâm Xôi',       'new',  12, 2, 0, 'Xăng', '{"Hệ thống ABS 2 kênh","Smart Key","Idling Stop","Đèn LED toàn xe"}'),
  (2,  'Yamaha Exciter 155 VVA',  'Yamaha',  'con-tay',     2026,  53500000,  56000000, 'hot',  155, 'Đen Mờ',           'new',  24, 3, 0, 'Xăng', '{"Công nghệ VVA","Hộp số 6 cấp","Phuộc hành trình ngược","Đồng hồ LCD"}'),
  (3,  'Honda Vision 2026',       'Honda',   'tay-ga',      2026,  32990000,      null, 'sale', 110, 'Trắng Ngọc Trai',  'new',  38, 1, 0, 'Xăng', '{"Phanh CBS","Idling Stop","Cốp 18L","Đồng hồ kỹ thuật số"}'),
  (4,  'SYM Galaxy 50',           'SYM',     'so-tu-dong',  2026,  21500000,      null,  null,   50, 'Xanh Navy',        'new',  15, 4, 0, 'Xăng', '{"Phù hợp HS-SV","Tiết kiệm xăng 1.6L/100km","Khởi động điện"}'),
  (5,  'Yamaha NVX 155 ABS',      'Yamaha',  'tay-ga',      2025,  56900000,      null, 'hot',  155, 'Xám Bạc',          'new',   8, 5, 0, 'Xăng', '{"Phanh ABS","Smart Motor Generator","Cốp rộng 25L"}'),
  (6,  'Honda Air Blade 160',     'Honda',   'tay-ga',      2026,  58500000,      null, 'new',  160, 'Đen Đỏ',           'new',  18, 2, 0, 'Xăng', '{"Động cơ eSP+ 160cc","ABS","Smart Key","HSTC kiểm soát lực kéo"}'),
  (7,  'Honda Wave Alpha 110',    'Honda',   'so-tu-dong',  2025,  18990000,      null, 'sale', 110, 'Đỏ Đen',           'new',  42, 6, 0, 'Xăng', '{"Tiết kiệm xăng 1.55L/100km","Bền bỉ huyền thoại","Phanh đĩa trước"}'),
  (8,  'VinFast Klara S',         'VinFast', 'xe-dien',     2025,  39900000,      null, 'new',    0, 'Xanh Bạc Hà',      'new',   6, 3, 0, 'Điện', '{"Pin LFP 22Ah","120km/sạc","Chống nước IP67","App theo dõi"}'),
  (9,  'Yamaha Grande Hybrid',    'Yamaha',  'tay-ga',      2024,  47200000,  49500000,  null,  125, 'Vàng Champagne',   'used',  1, 2, 8500, 'Xăng', '{"BSG Hybrid","Đời chủ","Bảo dưỡng định kỳ DTC"}'),
  (10, 'Honda SH Mode 2024',      'Honda',   'tay-ga',      2024,  56500000,  62000000, 'sale', 125, 'Trắng Đỏ',         'used',  1, 1, 5200, 'Xăng', '{"Đời chủ phụ nữ","Còn bảo hành","Sang tên 2 ngày"}'),
  (11, 'Suzuki Raider R150 Fi',   'Suzuki',  'con-tay',     2025,  51800000,      null,  null,  150, 'Xanh Vàng',        'new',   9, 5, 0, 'Xăng', '{"DOHC 4 van","Hộp số 6 cấp","Đồng hồ LCD full digital"}'),
  (12, 'Piaggio Liberty 150 ABS', 'Piaggio', 'tay-ga',      2026,  73900000,      null, 'new',  150, 'Trắng Sữa',        'new',   4, 1, 0, 'Xăng', '{"Phong cách Ý","ABS","Tay ga điện tử","Chìa khóa thông minh"}');
select setval(pg_get_serial_sequence('public.products','id'), 12);

-- News (6 bài)
insert into public.news (id, cat, title, excerpt, author, published_at) overriding system value values
  (1, 'Khuyến mãi', 'Đại Thành Công ưu đãi tháng 5: Giảm tới 8 triệu cho dòng SH', 'Toàn hệ thống 7 cửa hàng áp dụng chương trình giảm giá đặc biệt dành riêng cho các khách hàng đăng ký từ ngày 5/5 đến hết 31/5/2026.', 'Phòng Marketing',     '2026-05-02'),
  (2, 'Cẩm nang',   '5 mẹo bảo dưỡng xe tay ga giúp tiết kiệm xăng tới 20%',     'Đội kỹ thuật ĐTC chia sẻ các bí quyết bảo dưỡng đơn giản tại nhà để xe luôn vận hành mượt mà và bền bỉ theo năm tháng.',                'KTV Trưởng Minh Tuấn', '2026-04-28'),
  (3, 'Tin hãng',   'Honda Việt Nam ra mắt phiên bản giới hạn SH 350i Bordeaux', 'Phiên bản đặc biệt với màu sơn Bordeaux Sunset chỉ giới hạn 1.000 xe trên toàn quốc, phân phối chính thức tại ĐTC từ tuần sau.',         'Tin nhanh DTC',        '2026-04-24'),
  (4, 'Khuyến mãi', 'Trade-in Yamaha: Đổi xe cũ - Lên đời xe mới giá tốt nhất',  'Mang xe Yamaha cũ tới bất kỳ chi nhánh ĐTC để được định giá miễn phí và hỗ trợ trả góp tới 80% giá trị xe.',                          'Phòng KD',             '2026-04-20'),
  (5, 'Sự kiện',    'Khai trương chi nhánh Bàu Bàng với ưu đãi cực sốc',         'Chi nhánh thứ 7 của ĐTC chính thức đi vào hoạt động, dành tặng 100 mũ bảo hiểm cao cấp cho khách hàng đầu tiên.',                       'Ban Truyền Thông',     '2026-04-15'),
  (6, 'Cẩm nang',   'Chọn xe đầu tiên cho sinh viên: Tiêu chí và đề xuất',       'Hướng dẫn chi tiết cách chọn chiếc xe máy đầu tiên phù hợp với ngân sách của sinh viên và nhu cầu di chuyển hằng ngày.',                'Tư vấn ĐTC',           '2026-04-10');
select setval(pg_get_serial_sequence('public.news','id'), 6);

-- Demo orders
insert into public.orders (id, customer, phone, product_id, product_name, store_id, store_name, total, status, created_at) values
  ('DTC-2026-00831', 'Nguyễn Văn Hùng',   '0903 ***', 1, 'Honda SH 350i ABS',     2, 'CN Thuận An',     148900000, 'pending',   '2026-05-04'),
  ('DTC-2026-00830', 'Trần Thị Hà',       '0907 ***', 2, 'Yamaha Exciter 155',    3, 'CN Dĩ An',         53500000, 'confirmed', '2026-05-04'),
  ('DTC-2026-00829', 'Lê Minh Đức',       '0912 ***', 3, 'Honda Vision 2026',     1, 'CN Thủ Dầu Một',   32990000, 'delivered', '2026-05-03'),
  ('DTC-2026-00828', 'Phạm Thu Trang',    '0934 ***', 8, 'VinFast Klara S',       3, 'CN Dĩ An',         39900000, 'pending',   '2026-05-03'),
  ('DTC-2026-00827', 'Võ Quốc Bảo',       '0945 ***', 6, 'Honda Air Blade 160',   2, 'CN Thuận An',      58500000, 'confirmed', '2026-05-02'),
  ('DTC-2026-00826', 'Đỗ Lan Anh',        '0987 ***', 4, 'SYM Galaxy 50',         4, 'CN Tân Uyên',      21500000, 'cancelled', '2026-05-02'),
  ('DTC-2026-00825', 'Bùi Hoàng Long',    '0901 ***', 5, 'Yamaha NVX 155 ABS',    5, 'CN Bến Cát',       56900000, 'delivered', '2026-05-01');
