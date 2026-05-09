# Đại Thành Công — Hệ thống xe máy chính hãng Bình Dương

Website chính thức của hệ thống ĐẠI THÀNH CÔNG (ĐTC) — 7 cửa hàng xe máy chính hãng tại Bình Dương.

🌐 **Live:** [dai-thanh-cong.vercel.app](https://dai-thanh-cong.vercel.app)

## Stack

- **Frontend**: React 18 (UMD) + Babel Standalone — chạy trực tiếp trong browser, không cần build
- **Hosting**: Vercel (static)
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **AI Chat**: Smart fallback (rule-based) — sẵn sàng nâng cấp lên LLM API

## Cấu trúc

```
.
├── project/                    # Toàn bộ source web (Vercel deploy folder này)
│   ├── index.html              # Entry
│   ├── app.jsx                 # Root component, router
│   ├── data.js                 # Mock data + i18n + format helpers
│   ├── supabase.js             # Supabase client + data fetcher
│   ├── components.jsx          # Header, Footer, Icon, ProductCard
│   ├── page-home.jsx           # Trang chủ (hero, search, products, stores...)
│   ├── page-products.jsx       # Listing, detail, news, stores, contact
│   ├── page-admin.jsx          # CMS dashboard (cần đăng nhập)
│   ├── page-floating.jsx       # Chat AI + nút Zalo/Hotline
│   ├── tweaks-panel.jsx        # Edit-mode panel (chỉ dùng trong dev)
│   ├── styles*.css             # Brand system + page styles
│   ├── assets/                 # Logo + ảnh
│   └── uploads/                # Files upload từ admin (sau này → Supabase Storage)
├── supabase/                   # Migration SQL + seed
│   ├── migrations/
│   └── seed.sql
├── vercel.json                 # Cấu hình Vercel
└── .gitignore
```

## Phát triển local

Vì là static site, mở file là chạy:

```bash
# Cách 1: Python http server
cd project && python -m http.server 8000
# → http://localhost:8000

# Cách 2: Node (cần npm i -g serve)
cd project && serve .
```

## Deploy

Mỗi lần push lên branch `main`, Vercel auto-deploy. Để deploy thủ công:

```bash
vercel deploy --prod
```

## Routes

| Route | Mô tả |
|-------|-------|
| `/` (home) | Hero, search, sản phẩm mới, khuyến mãi, cửa hàng, tin tức |
| `products` | Catalog có filter (hãng, loại, giá, tình trạng) |
| `detail` | Chi tiết 1 xe (specs, features, gợi ý xe cùng hãng) |
| `news` | Danh sách tin tức / cẩm nang |
| `stores` | 7 chi nhánh ĐTC |
| `contact` | Form tư vấn |
| `admin` | CMS (cần Supabase Auth) |

## Admin

URL admin: `/admin` (state-based, click "Quản trị" trên header).

Các module:
- 📊 Dashboard — KPI, biểu đồ doanh thu, top chi nhánh
- 🏍️ Sản phẩm — CRUD xe + upload ảnh
- 📰 Tin tức — CRUD bài đăng
- 🛒 Đơn hàng — duyệt đơn từ form Liên hệ
- 🏢 Chi nhánh — quản lý 7 cửa hàng
- ⚙️ Thiết lập — cấu hình hệ thống

## License

© 2026 ĐẠI THÀNH CÔNG. All rights reserved.
