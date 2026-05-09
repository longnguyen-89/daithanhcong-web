// === Reusable UI fragments ===
const { useState, useEffect, useRef, useMemo } = React;

const Icon = ({ name, size = 18 }) => {
  const paths = {
    search: 'M21 21l-4.3-4.3m1.3-5.7a7 7 0 11-14 0 7 7 0 0114 0z',
    cart: 'M6 6h15l-1.5 9h-13zM6 6L5 3H2m4 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm12 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
    user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M16 7a4 4 0 11-8 0 4 4 0 018 0z',
    heart: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
    arrow: 'M5 12h14M12 5l7 7-7 7',
    arrowUp: 'M7 17L17 7M7 7h10v10',
    moon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
    sun: 'M12 1v2m0 18v2m11-11h-2M3 12H1m17.5-6.5l-1.4 1.4M6.9 17.1l-1.4 1.4m0-13l1.4 1.4m10.2 10.2l1.4 1.4M12 7a5 5 0 100 10 5 5 0 000-10z',
    phone: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z',
    mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
    map: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z',
    chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
    plus: 'M12 5v14M5 12h14',
    edit: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z',
    trash: 'M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z',
    eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z',
    box: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12',
    chart: 'M3 3v18h18M7 14l4-4 4 4 5-5',
    settings: 'M12 15a3 3 0 100-6 3 3 0 000 6zm7-3a7 7 0 11-14 0 7 7 0 0114 0z',
    bell: 'M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0',
    menu: 'M3 12h18M3 6h18M3 18h18',
    close: 'M18 6L6 18M6 6l12 12',
    star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    fuel: 'M3 22V4a2 2 0 012-2h7a2 2 0 012 2v18M3 22h11M16 8h3a2 2 0 012 2v8a2 2 0 11-4 0v-3M14 8V4',
    speed: 'M12 22a10 10 0 100-20 10 10 0 000 20zm0-6V8m0 0l-3 3m3-3l3 3',
    clock: 'M12 22a10 10 0 100-20 10 10 0 000 20zm0-16v6l4 2',
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    upload: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
    tag: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01',
  };
  const d = paths[name] || paths.arrow;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
};

const BikePlaceholder = ({ name, label, dark }) => (
  <div className={`bike-placeholder ${dark ? 'dark' : ''}`}>
    <div className="ph-name">{name}</div>
    {label && <div className="ph-label">{label}</div>}
  </div>
);

const getBrand = () => (window.DTC_SETTINGS && window.DTC_SETTINGS.brand_info) || {};

const Header = ({ route, setRoute, lang, setLang, theme, setTheme, T }) => {
  const brand = getBrand();
  const hotline = brand.hotline || '1900 6789';
  const brandName = brand.name || 'ĐẠI THÀNH CÔNG';
  const tagline = brand.tagline || 'Premium Motorcycle Network · Est. 2018';
  return (
  <header className="site-header">
    <div className="header-top">
      <div className="container">
        <div className="top-left">
          <span><Icon name="phone" size={12} /> Hotline: <strong>{hotline}</strong></span>
          <span style={{opacity:0.5}}>·</span>
          <span>{lang === 'vi' ? 'Hệ thống 7 cửa hàng - Bình Dương' : '7 stores across Binh Duong'}</span>
        </div>
        <div>
          <a href="#">{lang === 'vi' ? 'Bảo hành' : 'Warranty'}</a>
          <a href="#">{lang === 'vi' ? 'Trả góp 0%' : '0% Installment'}</a>
          <a href="#">{lang === 'vi' ? 'Tuyển dụng' : 'Careers'}</a>
        </div>
      </div>
    </div>
    <div className="container header-main">
      <a href="#" className="brand" onClick={(e)=>{e.preventDefault(); setRoute('home');}}>
        <div className="brand-logo"><img src="assets/logo.png" alt="DTC" /></div>
        <div className="brand-text">
          <div className="brand-name">{brandName}</div>
          <div className="brand-tag">{tagline}</div>
        </div>
      </a>
      <nav className="nav">
        {['home','products','news','stores','contact','admin'].map(k => (
          <a key={k} href="#" className={route===k || (k==='products' && route==='detail') ? 'active' : ''}
             onClick={(e)=>{e.preventDefault(); setRoute(k);}}>
            {T.nav[k]}
          </a>
        ))}
      </nav>
      <div className="header-cta">
        <div className="lang-toggle">
          <button className={lang==='vi'?'active':''} onClick={()=>setLang('vi')}>VI</button>
          <button className={lang==='en'?'active':''} onClick={()=>setLang('en')}>EN</button>
        </div>
        <button className="icon-btn" onClick={()=>setTheme(theme==='dark'?'light':'dark')} title="Toggle theme">
          <Icon name={theme==='dark'?'sun':'moon'} size={16} />
        </button>
        <button className="icon-btn" title="Search"><Icon name="search" size={16} /></button>
        <button className="btn btn-primary" onClick={()=>setRoute('contact')}>
          <Icon name="phone" size={14} />{lang==='vi'?'Tư vấn':'Talk to us'}
        </button>
      </div>
    </div>
  </header>
  );
};

const Footer = ({ T, lang, setRoute }) => {
  const brand = getBrand();
  const slogan = lang==='vi' ? (brand.slogan_vi || T.slogan) : (brand.slogan_en || T.slogan);
  const hotline = brand.hotline || '1900 6789';
  const email = brand.email || 'info@daithanhcong.vn';
  const hours = brand.hotline_hours || '7:30 — 21:00';
  const brandName = brand.name || 'ĐẠI THÀNH CÔNG';
  return (
  <footer className="site-footer">
    <div className="footer-slogan">{slogan}</div>
    <div className="container footer-grid">
      <div className="footer-brand">
        <div className="footer-logo">
          <img src="assets/logo.png" alt="DTC" />
          <span>{brandName}</span>
        </div>
        <p>{lang==='vi'
          ? 'Hệ thống xe máy chính hãng hàng đầu Bình Dương với 7 chi nhánh và hơn 70 nhân viên tận tâm phục vụ. Cam kết minh bạch, bảo hành chính hãng, đồng hành cùng anh/chị trên mọi hành trình.'
          : 'Leading authorized motorcycle network in Binh Duong with 7 branches and 70+ devoted staff. Transparency, genuine warranty, accompanying you on every journey.'}</p>
      </div>
      <div>
        <h4>{lang==='vi'?'Sản phẩm':'Products'}</h4>
        <a href="#" onClick={(e)=>{e.preventDefault(); setRoute('products');}}>Honda</a>
        <a href="#" onClick={(e)=>{e.preventDefault(); setRoute('products');}}>Yamaha</a>
        <a href="#" onClick={(e)=>{e.preventDefault(); setRoute('products');}}>SYM · Suzuki</a>
        <a href="#" onClick={(e)=>{e.preventDefault(); setRoute('products');}}>VinFast Electric</a>
        <a href="#" onClick={(e)=>{e.preventDefault(); setRoute('products');}}>{lang==='vi'?'Xe đã qua sử dụng':'Used bikes'}</a>
      </div>
      <div>
        <h4>{lang==='vi'?'Hỗ trợ':'Support'}</h4>
        <a href="#">{lang==='vi'?'Trung tâm bảo hành':'Warranty center'}</a>
        <a href="#">{lang==='vi'?'Trả góp · Hồ sơ vay':'Installment'}</a>
        <a href="#">{lang==='vi'?'Sang tên đổi chủ':'Transfer service'}</a>
        <a href="#">{lang==='vi'?'Hỏi đáp':'FAQ'}</a>
      </div>
      <div>
        <h4>{lang==='vi'?'Liên hệ':'Contact'}</h4>
        <a><Icon name="phone" size={12} /> Hotline: {hotline}</a>
        <a><Icon name="mail" size={12} /> {email}</a>
        <a><Icon name="map" size={12} /> {lang==='vi'?'7 chi nhánh tại Bình Dương':'7 branches in Binh Duong'}</a>
        <a><Icon name="clock" size={12} /> {hours} ({lang==='vi'?'Mọi ngày':'Daily'})</a>
      </div>
    </div>
    <div className="container footer-bottom">
      <div className="copy">© {brandName} · {new Date().getFullYear()} — All rights reserved</div>
      <div>Designed with passion · Bình Dương, Việt Nam</div>
    </div>
  </footer>
  );
};

window.DTC_Components = { Icon, BikePlaceholder, Header, Footer };
