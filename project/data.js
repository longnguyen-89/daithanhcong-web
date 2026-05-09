// === Mock data: ĐẠI THÀNH CÔNG ===
window.DTC_DATA = {
  brands: ['Honda', 'Yamaha', 'SYM', 'Suzuki', 'Piaggio', 'VinFast', 'Kawasaki'],
  categories: [
    { id: 'tay-ga', vi: 'Xe tay ga', en: 'Scooter' },
    { id: 'so-tu-dong', vi: 'Xe số tự động', en: 'Auto' },
    { id: 'con-tay', vi: 'Xe côn tay', en: 'Manual' },
    { id: 'mo-to', vi: 'Mô tô phân khối lớn', en: 'Motorcycle' },
    { id: 'xe-dien', vi: 'Xe điện', en: 'Electric' },
    { id: 'xe-cu', vi: 'Xe đã qua sử dụng', en: 'Used' },
  ],
  products: [
    { id: 1, name: 'Honda SH 350i ABS', brand: 'Honda', cat: 'tay-ga', year: 2026, price: 148900000, oldPrice: 158900000, badge: 'new', cc: 350, color: 'Đỏ Mâm Xôi', status: 'new', stock: 12, store: 'CN Thuận An', mileage: 0, fuel: 'Xăng', features: ['Hệ thống ABS 2 kênh', 'Smart Key', 'Idling Stop', 'Đèn LED toàn xe'] },
    { id: 2, name: 'Yamaha Exciter 155 VVA', brand: 'Yamaha', cat: 'con-tay', year: 2026, price: 53500000, oldPrice: 56000000, badge: 'hot', cc: 155, color: 'Đen Mờ', status: 'new', stock: 24, store: 'CN Dĩ An', mileage: 0, fuel: 'Xăng', features: ['Công nghệ VVA', 'Hộp số 6 cấp', 'Phuộc hành trình ngược', 'Đồng hồ LCD'] },
    { id: 3, name: 'Honda Vision 2026', brand: 'Honda', cat: 'tay-ga', year: 2026, price: 32990000, badge: 'sale', cc: 110, color: 'Trắng Ngọc Trai', status: 'new', stock: 38, store: 'CN Thủ Dầu Một', mileage: 0, fuel: 'Xăng', features: ['Phanh CBS', 'Idling Stop', 'Cốp 18L', 'Đồng hồ kỹ thuật số'] },
    { id: 4, name: 'SYM Galaxy 50', brand: 'SYM', cat: 'so-tu-dong', year: 2026, price: 21500000, cc: 50, color: 'Xanh Navy', status: 'new', stock: 15, store: 'CN Tân Uyên', mileage: 0, fuel: 'Xăng', features: ['Phù hợp HS-SV', 'Tiết kiệm xăng 1.6L/100km', 'Khởi động điện'] },
    { id: 5, name: 'Yamaha NVX 155 ABS', brand: 'Yamaha', cat: 'tay-ga', year: 2025, price: 56900000, badge: 'hot', cc: 155, color: 'Xám Bạc', status: 'new', stock: 8, store: 'CN Bến Cát', mileage: 0, fuel: 'Xăng', features: ['Phanh ABS', 'Smart Motor Generator', 'Cốp rộng 25L'] },
    { id: 6, name: 'Honda Air Blade 160', brand: 'Honda', cat: 'tay-ga', year: 2026, price: 58500000, badge: 'new', cc: 160, color: 'Đen Đỏ', status: 'new', stock: 18, store: 'CN Thuận An', mileage: 0, fuel: 'Xăng', features: ['Động cơ eSP+ 160cc', 'ABS', 'Smart Key', 'HSTC kiểm soát lực kéo'] },
    { id: 7, name: 'Honda Wave Alpha 110', brand: 'Honda', cat: 'so-tu-dong', year: 2025, price: 18990000, badge: 'sale', cc: 110, color: 'Đỏ Đen', status: 'new', stock: 42, store: 'CN Phú Giáo', mileage: 0, fuel: 'Xăng', features: ['Tiết kiệm xăng 1.55L/100km', 'Bền bỉ huyền thoại', 'Phanh đĩa trước'] },
    { id: 8, name: 'VinFast Klara S', brand: 'VinFast', cat: 'xe-dien', year: 2025, price: 39900000, badge: 'new', cc: 0, color: 'Xanh Bạc Hà', status: 'new', stock: 6, store: 'CN Dĩ An', mileage: 0, fuel: 'Điện', features: ['Pin LFP 22Ah', '120km/sạc', 'Chống nước IP67', 'App theo dõi'] },
    { id: 9, name: 'Yamaha Grande Hybrid', brand: 'Yamaha', cat: 'tay-ga', year: 2024, price: 47200000, oldPrice: 49500000, cc: 125, color: 'Vàng Champagne', status: 'used', stock: 1, store: 'CN Thuận An', mileage: 8500, fuel: 'Xăng', features: ['BSG Hybrid', 'Đời chủ', 'Bảo dưỡng định kỳ DTC'] },
    { id: 10, name: 'Honda SH Mode 2024', brand: 'Honda', cat: 'tay-ga', year: 2024, price: 56500000, oldPrice: 62000000, badge: 'sale', cc: 125, color: 'Trắng Đỏ', status: 'used', stock: 1, store: 'CN Thủ Dầu Một', mileage: 5200, fuel: 'Xăng', features: ['Đời chủ phụ nữ', 'Còn bảo hành', 'Sang tên 2 ngày'] },
    { id: 11, name: 'Suzuki Raider R150 Fi', brand: 'Suzuki', cat: 'con-tay', year: 2025, price: 51800000, cc: 150, color: 'Xanh Vàng', status: 'new', stock: 9, store: 'CN Bến Cát', mileage: 0, fuel: 'Xăng', features: ['DOHC 4 van', 'Hộp số 6 cấp', 'Đồng hồ LCD full digital'] },
    { id: 12, name: 'Piaggio Liberty 150 ABS', brand: 'Piaggio', cat: 'tay-ga', year: 2026, price: 73900000, badge: 'new', cc: 150, color: 'Trắng Sữa', status: 'new', stock: 4, store: 'CN Thủ Dầu Một', mileage: 0, fuel: 'Xăng', features: ['Phong cách Ý', 'ABS', 'Tay ga điện tử', 'Chìa khóa thông minh'] },
  ],
  stores: [
    { id: 1, name: 'CN Thủ Dầu Một (Trụ sở)', addr: '123 Đại lộ Bình Dương, P. Phú Hòa, TP. Thủ Dầu Một', phone: '0274 3 888 999', staff: 14, x: 32, y: 38 },
    { id: 2, name: 'CN Thuận An', addr: '456 ĐT743, P. An Phú, TP. Thuận An', phone: '0274 3 777 888', staff: 11, x: 58, y: 62 },
    { id: 3, name: 'CN Dĩ An', addr: '789 Trần Hưng Đạo, P. Dĩ An, TP. Dĩ An', phone: '0274 3 666 777', staff: 10, x: 70, y: 78 },
    { id: 4, name: 'CN Tân Uyên', addr: '12 ĐT747, P. Uyên Hưng, TP. Tân Uyên', phone: '0274 3 555 666', staff: 9, x: 64, y: 22 },
    { id: 5, name: 'CN Bến Cát', addr: '88 Đại lộ Bình Dương, P. Mỹ Phước, TX. Bến Cát', phone: '0274 3 444 555', staff: 10, x: 24, y: 18 },
    { id: 6, name: 'CN Phú Giáo', addr: '34 Vành đai Phú Giáo, TT. Phước Vĩnh', phone: '0274 3 333 444', staff: 8, x: 48, y: 8 },
    { id: 7, name: 'CN Bàu Bàng', addr: '56 QL13, KCN Bàu Bàng, H. Bàu Bàng', phone: '0274 3 222 333', staff: 8, x: 14, y: 50 },
  ],
  news: [
    { id: 1, cat: 'Khuyến mãi', title: 'Đại Thành Công ưu đãi tháng 5: Giảm tới 8 triệu cho dòng SH', excerpt: 'Toàn hệ thống 7 cửa hàng áp dụng chương trình giảm giá đặc biệt dành riêng cho các khách hàng đăng ký từ ngày 5/5 đến hết 31/5/2026.', date: '02/05/2026', author: 'Phòng Marketing' },
    { id: 2, cat: 'Cẩm nang', title: '5 mẹo bảo dưỡng xe tay ga giúp tiết kiệm xăng tới 20%', excerpt: 'Đội kỹ thuật ĐTC chia sẻ các bí quyết bảo dưỡng đơn giản tại nhà để xe luôn vận hành mượt mà và bền bỉ theo năm tháng.', date: '28/04/2026', author: 'KTV Trưởng Minh Tuấn' },
    { id: 3, cat: 'Tin hãng', title: 'Honda Việt Nam ra mắt phiên bản giới hạn SH 350i Bordeaux', excerpt: 'Phiên bản đặc biệt với màu sơn Bordeaux Sunset chỉ giới hạn 1.000 xe trên toàn quốc, phân phối chính thức tại ĐTC từ tuần sau.', date: '24/04/2026', author: 'Tin nhanh DTC' },
    { id: 4, cat: 'Khuyến mãi', title: 'Trade-in Yamaha: Đổi xe cũ - Lên đời xe mới giá tốt nhất', excerpt: 'Mang xe Yamaha cũ tới bất kỳ chi nhánh ĐTC để được định giá miễn phí và hỗ trợ trả góp tới 80% giá trị xe.', date: '20/04/2026', author: 'Phòng KD' },
    { id: 5, cat: 'Sự kiện', title: 'Khai trương chi nhánh Bàu Bàng với ưu đãi cực sốc', excerpt: 'Chi nhánh thứ 7 của ĐTC chính thức đi vào hoạt động, dành tặng 100 mũ bảo hiểm cao cấp cho khách hàng đầu tiên.', date: '15/04/2026', author: 'Ban Truyền Thông' },
    { id: 6, cat: 'Cẩm nang', title: 'Chọn xe đầu tiên cho sinh viên: Tiêu chí và đề xuất', excerpt: 'Hướng dẫn chi tiết cách chọn chiếc xe máy đầu tiên phù hợp với ngân sách của sinh viên và nhu cầu di chuyển hằng ngày.', date: '10/04/2026', author: 'Tư vấn ĐTC' },
  ],
  orders: [
    { id: 'DTC-2026-00831', customer: 'Nguyễn Văn Hùng', phone: '0903 ***', product: 'Honda SH 350i ABS', store: 'CN Thuận An', total: 148900000, status: 'pending', date: '04/05/2026' },
    { id: 'DTC-2026-00830', customer: 'Trần Thị Hà', phone: '0907 ***', product: 'Yamaha Exciter 155', store: 'CN Dĩ An', total: 53500000, status: 'confirmed', date: '04/05/2026' },
    { id: 'DTC-2026-00829', customer: 'Lê Minh Đức', phone: '0912 ***', product: 'Honda Vision 2026', store: 'CN Thủ Dầu Một', total: 32990000, status: 'delivered', date: '03/05/2026' },
    { id: 'DTC-2026-00828', customer: 'Phạm Thu Trang', phone: '0934 ***', product: 'VinFast Klara S', store: 'CN Dĩ An', total: 39900000, status: 'pending', date: '03/05/2026' },
    { id: 'DTC-2026-00827', customer: 'Võ Quốc Bảo', phone: '0945 ***', product: 'Honda Air Blade 160', store: 'CN Thuận An', total: 58500000, status: 'confirmed', date: '02/05/2026' },
    { id: 'DTC-2026-00826', customer: 'Đỗ Lan Anh', phone: '0987 ***', product: 'SYM Galaxy 50', store: 'CN Tân Uyên', total: 21500000, status: 'cancelled', date: '02/05/2026' },
    { id: 'DTC-2026-00825', customer: 'Bùi Hoàng Long', phone: '0901 ***', product: 'Yamaha NVX 155 ABS', store: 'CN Bến Cát', total: 56900000, status: 'delivered', date: '01/05/2026' },
  ],
  i18n: {
    vi: {
      nav: { home: 'Trang chủ', products: 'Sản phẩm', news: 'Tin tức', stores: 'Cửa hàng', contact: 'Liên hệ', admin: 'Quản trị' },
      hero: {
        eyebrow: 'Hệ thống xe máy chính hãng · Bình Dương',
        titlePart1: 'Đẳng cấp', titleAccent: 'không giới hạn,', titlePart2: 'cho mọi hành trình.',
        lead: 'ĐẠI THÀNH CÔNG — 7 cửa hàng phục vụ tận tâm trên toàn Bình Dương. Xe chính hãng Honda, Yamaha, SYM, VinFast với chính sách bảo hành minh bạch và dịch vụ sau bán hàng đẳng cấp showroom.',
        cta1: 'Khám phá sản phẩm', cta2: 'Đặt lịch lái thử',
        stats: [
          { num: '7+', lbl: 'Chi nhánh' },
          { num: '70+', lbl: 'Nhân sự tận tâm' },
          { num: '15K+', lbl: 'Khách hàng' },
          { num: '4.9★', lbl: 'Đánh giá' },
        ],
      },
      sections: {
        searchTitle: 'Tìm kiếm xe phù hợp',
        newTitle: 'Sản phẩm mới về', newSub: 'Bộ sưu tập xe đời 2026 cập nhật mới nhất tại showroom',
        bestTitle: 'Xe bán chạy', bestSub: 'Top mẫu xe được khách hàng ĐTC tin chọn nhiều nhất',
        promoTitle: 'Khuyến mãi đang chạy', promoSub: 'Ưu đãi giới hạn cho khách đăng ký trong tháng',
        storesTitle: 'Hệ thống 7 cửa hàng', storesSub: 'Có mặt tại các quận huyện trọng điểm Bình Dương',
        newsTitle: 'Tin tức & Cẩm nang', newsSub: 'Tin tức ngành xe và bí quyết sử dụng từ chuyên gia ĐTC',
        contactTitle: 'Tư vấn nhanh',
      },
      slogan: 'Đoàn kết — Vượt giới hạn — Đại Thành Công',
    },
    en: {
      nav: { home: 'Home', products: 'Products', news: 'News', stores: 'Stores', contact: 'Contact', admin: 'Admin' },
      hero: {
        eyebrow: 'Authorized motorcycle network · Binh Duong',
        titlePart1: 'Premium class', titleAccent: 'without limits,', titlePart2: 'for every journey.',
        lead: 'DAI THANH CONG — 7 stores serving you across Binh Duong. Genuine Honda, Yamaha, SYM and VinFast bikes with transparent warranty and showroom-grade after-sales service.',
        cta1: 'Explore catalog', cta2: 'Book test ride',
        stats: [
          { num: '7+', lbl: 'Branches' },
          { num: '70+', lbl: 'Devoted staff' },
          { num: '15K+', lbl: 'Customers' },
          { num: '4.9★', lbl: 'Rating' },
        ],
      },
      sections: {
        searchTitle: 'Find your perfect ride',
        newTitle: 'Just arrived', newSub: 'Latest 2026 lineup landing at our showroom',
        bestTitle: 'Best sellers', bestSub: 'Most-loved bikes from our customers',
        promoTitle: 'Live promotions', promoSub: 'Limited deals this month',
        storesTitle: 'Our 7 branches', storesSub: 'Across all key districts of Binh Duong',
        newsTitle: 'News & Guides', newsSub: 'Industry news and expert tips',
        contactTitle: 'Quick consultation',
      },
      slogan: 'United — Beyond Limits — Dai Thanh Cong',
    },
  },
};

window.formatVND = function(n) {
  return new Intl.NumberFormat('vi-VN').format(n) + ' ₫';
};
