// === Home Page ===
const { Icon, BikePlaceholder } = window.DTC_Components;

const HeroV1 = ({ T, setRoute }) => (
  <section className="hero">
    <div className="container hero-grid">
      <div>
        <div className="hero-eyebrow">{T.hero.eyebrow}</div>
        <h1>
          {T.hero.titlePart1} <span className="accent">{T.hero.titleAccent}</span><br/>
          {T.hero.titlePart2}
        </h1>
        <p className="lead">{T.hero.lead}</p>
        <div className="hero-actions">
          <button className="btn btn-gold" onClick={()=>setRoute('products')}>
            {T.hero.cta1} <Icon name="arrow" size={16} />
          </button>
          <button className="btn btn-ghost" style={{color:'#fff', borderColor:'rgba(255,255,255,0.2)'}} onClick={()=>setRoute('contact')}>
            {T.hero.cta2}
          </button>
        </div>
        <div className="hero-stats">
          {T.hero.stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="num">{s.num}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card-bike">
          <div className="price-tag">148.900.000 ₫</div>
          <div className="ph-name">Honda SH 350i ABS<br/><span style={{fontSize:14, opacity:0.6, fontWeight:500}}>2026 · Bordeaux Edition</span></div>
          <div className="meta-strip">
            <div className="meta-item"><div className="k">Engine</div><div className="v">350cc · eSP+</div></div>
            <div className="meta-item"><div className="k">Color</div><div className="v">Đỏ Mâm Xôi</div></div>
            <div className="meta-item"><div className="k">Stock</div><div className="v">12 xe</div></div>
          </div>
        </div>
        <div className="hero-thumbs">
          <div className="hero-thumb active"></div>
          <div className="hero-thumb"></div>
          <div className="hero-thumb"></div>
        </div>
      </div>
    </div>
  </section>
);

const HeroV2 = ({ T, setRoute }) => (
  <section className="hero hero-v2">
    <div className="container hero-grid">
      <div>
        <div className="hero-eyebrow">{T.hero.eyebrow}</div>
        <h1>{T.hero.titlePart1} <span className="accent">{T.hero.titleAccent}</span> {T.hero.titlePart2}</h1>
        <p className="lead">{T.hero.lead}</p>
        <div className="hero-actions">
          <button className="btn btn-gold" onClick={()=>setRoute('products')}>{T.hero.cta1} <Icon name="arrow" size={16} /></button>
          <button className="btn btn-ghost" style={{color:'#fff', borderColor:'rgba(255,255,255,0.2)'}} onClick={()=>setRoute('contact')}>{T.hero.cta2}</button>
        </div>
        <div className="hero-stats">
          {T.hero.stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="num">{s.num}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
        <div className="hero-strip">
          <div className="strip-card">SH 350i · 2026</div>
          <div className="strip-card">Exciter 155 VVA</div>
          <div className="strip-card">Vision · Just arrived</div>
        </div>
      </div>
    </div>
  </section>
);

const HeroV3 = ({ T, setRoute }) => (
  <section className="hero hero-v3">
    <div className="container hero-grid">
      <div style={{position:'relative', zIndex: 2}}>
        <div className="hero-eyebrow">{T.hero.eyebrow}</div>
        <h1>{T.hero.titlePart1} <span className="accent">{T.hero.titleAccent}</span><br/>{T.hero.titlePart2}</h1>
        <p className="lead">{T.hero.lead}</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={()=>setRoute('products')}>{T.hero.cta1} <Icon name="arrow" size={16} /></button>
          <button className="btn btn-ghost" onClick={()=>setRoute('contact')}>{T.hero.cta2}</button>
        </div>
        <div className="hero-stats">
          {T.hero.stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="num">{s.num}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual" style={{height: 520}}>
        <div className="hero-card-bike" style={{width: '110%'}}>
          <div className="price-tag">53.500.000 ₫</div>
          <div className="ph-name">Yamaha Exciter 155<br/><span style={{fontSize:14, opacity:0.6, fontWeight:500}}>2026 VVA · Đen Mờ</span></div>
          <div className="meta-strip">
            <div className="meta-item"><div className="k">Engine</div><div className="v">155cc VVA</div></div>
            <div className="meta-item"><div className="k">Gear</div><div className="v">6-speed</div></div>
            <div className="meta-item"><div className="k">Stock</div><div className="v">24 xe</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const QuickSearch = ({ T, setRoute, lang }) => {
  const D = window.DTC_DATA;
  return (
    <div className="container quick-search">
      <div className="qs-card">
        <div className="field">
          <label className="label">{lang==='vi'?'Hãng xe':'Brand'}</label>
          <select className="select"><option>{lang==='vi'?'Tất cả hãng':'All brands'}</option>{D.brands.map(b=><option key={b}>{b}</option>)}</select>
        </div>
        <div className="field">
          <label className="label">{lang==='vi'?'Loại xe':'Type'}</label>
          <select className="select"><option>{lang==='vi'?'Tất cả loại':'All types'}</option>{D.categories.map(c=><option key={c.id}>{lang==='vi'?c.vi:c.en}</option>)}</select>
        </div>
        <div className="field">
          <label className="label">{lang==='vi'?'Mức giá':'Price'}</label>
          <select className="select">
            <option>{lang==='vi'?'Mọi mức giá':'Any price'}</option>
            <option>Dưới 30 triệu</option><option>30 — 60 triệu</option><option>60 — 100 triệu</option><option>Trên 100 triệu</option>
          </select>
        </div>
        <div className="field">
          <label className="label">{lang==='vi'?'Tình trạng':'Condition'}</label>
          <select className="select"><option>{lang==='vi'?'Mới & cũ':'New & used'}</option><option>{lang==='vi'?'Xe mới':'New'}</option><option>{lang==='vi'?'Xe đã qua sử dụng':'Used'}</option></select>
        </div>
        <button className="btn btn-primary" onClick={()=>setRoute('products')}>
          <Icon name="search" size={14} />{lang==='vi'?'Tìm xe':'Search'}
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ p, setRoute, setActiveProduct, lang }) => {
  const badgeMap = { new: {cls:'badge-new', label:'NEW'}, hot: {cls:'badge-hot', label:'HOT'}, sale: {cls:'badge-sale', label:'SALE'} };
  const b = p.badge ? badgeMap[p.badge] : null;
  return (
    <div className="product-card" onClick={()=>{ setActiveProduct(p); setRoute('detail'); }}>
      <div className="pc-img">
        <div className="ph-name">{p.name}</div>
        <div className="pc-badges">
          {b && <span className={`badge ${b.cls}`}>{b.label}</span>}
          {p.status === 'used' && <span className="badge badge-used">{lang==='vi'?'XE CŨ':'USED'}</span>}
        </div>
        <div className="pc-fav" onClick={(e)=>e.stopPropagation()}><Icon name="heart" size={14} /></div>
      </div>
      <div className="pc-body">
        <div className="pc-brand">{p.brand} · {p.year}</div>
        <div className="pc-name">{p.name}</div>
        <div className="pc-meta">
          <span><Icon name="zap" size={12} /> {p.cc>0?`${p.cc}cc`:'Điện'}</span>
          <span><Icon name="fuel" size={12} /> {p.fuel}</span>
          {p.mileage>0 && <span><Icon name="speed" size={12} /> {p.mileage.toLocaleString()}km</span>}
        </div>
        <div className="pc-foot">
          <div>
            <div className="pc-price">{window.formatVND(p.price)}</div>
            {p.oldPrice && <div className="pc-price-old">{window.formatVND(p.oldPrice)}</div>}
          </div>
          <div className="pc-cta">{lang==='vi'?'Chi tiết':'View'} <Icon name="arrow" size={12} /></div>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = ({ T, setRoute, setActiveProduct, lang, filter }) => {
  const D = window.DTC_DATA;
  const list = D.products.filter(filter).slice(0, 4);
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">{lang==='vi'?'Showroom':'Showroom'}</div>
            <h2 style={{marginTop: 12}}>{T.title}</h2>
            <p style={{color:'var(--fg-2)', marginTop:8, maxWidth:560}}>{T.sub}</p>
          </div>
          <a href="#" className="head-link" onClick={(e)=>{e.preventDefault(); setRoute('products');}}>
            {lang==='vi'?'Xem tất cả →':'View all →'}
          </a>
        </div>
        <div className="products-grid">
          {list.map(p => <ProductCard key={p.id} p={p} setRoute={setRoute} setActiveProduct={setActiveProduct} lang={lang} />)}
        </div>
      </div>
    </section>
  );
};

const PromoSection = ({ T, lang }) => (
  <section className="tight">
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow">{lang==='vi'?'Ưu đãi':'Offers'}</div>
          <h2 style={{marginTop:12}}>{T.sections.promoTitle}</h2>
        </div>
      </div>
      <div className="promo-strip">
        <div className="promo-card dark">
          <div className="promo-tag">{lang==='vi'?'Tháng 5 · Limited':'May · Limited'}</div>
          <h3>{lang==='vi'?'Giảm tới 8.000.000₫\ndòng SH 350i 2026':'Save up to 8M VND\nHonda SH 350i 2026'}</h3>
          <button className="pc-arrow"><Icon name="arrow" size={16} /></button>
        </div>
        <div className="promo-card gold">
          <div className="promo-tag">{lang==='vi'?'Trả góp':'Installment'}</div>
          <h3>{lang==='vi'?'Trả góp 0%\n12 tháng đầu':'0% Interest\nFirst 12 months'}</h3>
          <button className="pc-arrow"><Icon name="arrow" size={16} /></button>
        </div>
        <div className="promo-card pearl">
          <div className="promo-tag">{lang==='vi'?'Trade-in':'Trade-in'}</div>
          <h3>{lang==='vi'?'Đổi xe cũ\nLên đời mới':'Trade up\nyour old bike'}</h3>
          <button className="pc-arrow"><Icon name="arrow" size={16} /></button>
        </div>
      </div>
    </div>
  </section>
);

const StoresSection = ({ T, lang }) => {
  const D = window.DTC_DATA;
  const [active, setActive] = useState(1);
  return (
    <section className="stores-section">
      <div className="container">
        <div className="eyebrow">{lang==='vi'?'Hiện diện':'Network'}</div>
        <h2 style={{marginTop:14}}>{T.sections.storesTitle}</h2>
        <p style={{color:'rgba(255,255,255,0.7)', marginTop:10, maxWidth: 600}}>{T.sections.storesSub}</p>
        <div className="stores-grid">
          <div className="stores-list">
            {D.stores.map(s => (
              <div key={s.id} className={`store-item ${active===s.id?'active':''}`} onClick={()=>setActive(s.id)}>
                <div className="store-name">#{s.id} — {s.name}</div>
                <div className="store-addr">{s.addr}</div>
                <div className="store-meta">{s.phone} · {s.staff} {lang==='vi'?'nhân viên':'staff'}</div>
              </div>
            ))}
          </div>
          <div className="stores-map">
            <div className="map-grid"></div>
            <div className="map-label" style={{top:'5%', left:'8%'}}>BÌNH DƯƠNG</div>
            <div className="map-label" style={{bottom:'8%', right:'10%'}}>HCM</div>
            {D.stores.map(s => (
              <div key={s.id} className={`map-pin ${active===s.id?'active':''}`}
                   style={{left:`${s.x}%`, top:`${s.y}%`}}
                   onClick={()=>setActive(s.id)}>
                {s.id}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsTeaser = ({ T, lang, setRoute }) => {
  const D = window.DTC_DATA;
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">{lang==='vi'?'Cập nhật':'Updates'}</div>
            <h2 style={{marginTop:12}}>{T.sections.newsTitle}</h2>
            <p style={{color:'var(--fg-2)', marginTop:8}}>{T.sections.newsSub}</p>
          </div>
          <a href="#" className="head-link" onClick={(e)=>{e.preventDefault(); setRoute('news');}}>
            {lang==='vi'?'Xem tất cả →':'View all →'}
          </a>
        </div>
        <div className="news-grid">
          {D.news.slice(0,3).map(n => (
            <div key={n.id} className="news-card">
              <div className="nc-img">
                <span className="nc-cat">{n.cat}</span>
                {n.title.slice(0,30)}…
              </div>
              <div className="nc-body">
                <div className="nc-meta">{n.date} · {n.author}</div>
                <h3>{n.title}</h3>
                <p>{n.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = ({ T, lang, setRoute, setActiveProduct, heroVariant }) => {
  const HeroComp = heroVariant === 'b' ? HeroV2 : heroVariant === 'c' ? HeroV3 : HeroV1;
  return (
    <div className="page-fade">
      <HeroComp T={T} setRoute={setRoute} />
      <QuickSearch T={T} setRoute={setRoute} lang={lang} />
      <ProductsSection T={{title:T.sections.newTitle, sub:T.sections.newSub}} setRoute={setRoute} setActiveProduct={setActiveProduct} lang={lang} filter={p=>p.status==='new' && p.year===2026} />
      <PromoSection T={T} lang={lang} />
      <ProductsSection T={{title:T.sections.bestTitle, sub:T.sections.bestSub}} setRoute={setRoute} setActiveProduct={setActiveProduct} lang={lang} filter={p=>['hot','sale'].includes(p.badge) || [1,2,3].includes(p.id)} />
      <StoresSection T={T} lang={lang} />
      <NewsTeaser T={T} lang={lang} setRoute={setRoute} />
      <div className="container">
        <div className="brand-row">
          {window.DTC_DATA.brands.map(b => <div key={b} className="brand-logo-item">{b}</div>)}
        </div>
      </div>
    </div>
  );
};

window.DTC_Home = Home;
window.DTC_ProductCard = ProductCard;
