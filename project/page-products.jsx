// === Products / Detail / News / Contact pages ===
const { Icon, BikePlaceholder } = window.DTC_Components;

const ProductsPage = ({ T, lang, setRoute, setActiveProduct }) => {
  const D = window.DTC_DATA;
  const [view, setView] = useState('grid');
  const [filters, setFilters] = useState({ brands: [], cats: [], status: 'all', maxPrice: 200 });
  const [page, setPage] = useState(1);
  const PER = 8;

  const filtered = useMemo(() => {
    return D.products.filter(p => {
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.cats.length && !filters.cats.includes(p.cat)) return false;
      if (filters.status !== 'all' && p.status !== filters.status) return false;
      if (p.price > filters.maxPrice * 1000000) return false;
      return true;
    });
  }, [filters]);

  const paged = filtered.slice((page-1)*PER, page*PER);
  const pages = Math.ceil(filtered.length / PER);

  const toggle = (key, val) => {
    setFilters(f => ({...f, [key]: f[key].includes(val) ? f[key].filter(x=>x!==val) : [...f[key], val]}));
    setPage(1);
  };

  return (
    <div className="page-fade">
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <a href="#" onClick={(e)=>{e.preventDefault(); setRoute('home');}}>{lang==='vi'?'Trang chủ':'Home'}</a> / <span>{T.nav.products}</span>
          </div>
          <h1>{lang==='vi'?'Bộ sưu tập xe máy':'Motorcycle Collection'}</h1>
          <p className="lead">{lang==='vi'?'Tổng hợp xe mới và đã qua sử dụng tại 7 chi nhánh ĐTC. Bộ lọc thông minh giúp anh/chị tìm chiếc xe phù hợp trong vài giây.':'New and used inventory across our 7 branches.'}</p>
        </div>
      </div>
      <div className="container">
        <div className="listing-layout">
          <aside className="filter-panel">
            <h4>{lang==='vi'?'Hãng xe':'Brand'}</h4>
            <div className="check-list">
              {D.brands.map(b => (
                <label key={b}><input type="checkbox" checked={filters.brands.includes(b)} onChange={()=>toggle('brands', b)} /> {b}</label>
              ))}
            </div>
            <h4 style={{marginTop:24}}>{lang==='vi'?'Loại xe':'Type'}</h4>
            <div className="check-list">
              {D.categories.map(c => (
                <label key={c.id}><input type="checkbox" checked={filters.cats.includes(c.id)} onChange={()=>toggle('cats', c.id)} /> {lang==='vi'?c.vi:c.en}</label>
              ))}
            </div>
            <h4 style={{marginTop:24}}>{lang==='vi'?'Tình trạng':'Condition'}</h4>
            <div className="check-list">
              {[['all', lang==='vi'?'Tất cả':'All'], ['new', lang==='vi'?'Xe mới':'New'], ['used', lang==='vi'?'Xe đã qua sử dụng':'Used']].map(([k, l]) => (
                <label key={k}><input type="radio" name="cond" checked={filters.status===k} onChange={()=>{setFilters(f=>({...f, status:k})); setPage(1);}} /> {l}</label>
              ))}
            </div>
            <h4 style={{marginTop:24}}>{lang==='vi'?'Giá tối đa':'Max price'}: <span style={{color:'var(--burgundy)', fontFamily:'var(--font-display)'}}>{filters.maxPrice}M</span></h4>
            <input type="range" min="10" max="200" value={filters.maxPrice} onChange={(e)=>setFilters(f=>({...f, maxPrice:+e.target.value}))} style={{width:'100%', accentColor:'var(--burgundy)'}} />
          </aside>
          <div>
            <div className="toolbar">
              <div className="results-count">{lang==='vi'?'Tìm thấy':'Found'} <strong>{filtered.length}</strong> {lang==='vi'?'sản phẩm':'products'}</div>
              <div className="view-tools">
                <select className="select" style={{width:200}}>
                  <option>{lang==='vi'?'Sắp xếp: Mặc định':'Sort: Default'}</option>
                  <option>{lang==='vi'?'Giá: Thấp → Cao':'Price: Low → High'}</option>
                  <option>{lang==='vi'?'Giá: Cao → Thấp':'Price: High → Low'}</option>
                  <option>{lang==='vi'?'Mới nhất':'Newest'}</option>
                </select>
                <div className="view-toggle">
                  <button className={view==='grid'?'active':''} onClick={()=>setView('grid')}><Icon name="grid" size={14} /></button>
                  <button className={view==='list'?'active':''} onClick={()=>setView('list')}><Icon name="list" size={14} /></button>
                </div>
              </div>
            </div>
            {view==='grid' ? (
              <div className="products-grid">
                {paged.map(p => <window.DTC_ProductCard key={p.id} p={p} setRoute={setRoute} setActiveProduct={setActiveProduct} lang={lang} />)}
              </div>
            ) : (
              <div className="products-list">
                {paged.map(p => (
                  <div key={p.id} className="product-row" onClick={()=>{setActiveProduct(p); setRoute('detail');}}>
                    <div className="pc-img" style={p.image ? {aspectRatio:'4/3', backgroundImage:`url(${p.image})`, backgroundSize:'cover', backgroundPosition:'center'} : {aspectRatio: '4/3'}}>
                      {!p.image && <BikePlaceholder name={p.name} label={p.brand} />}
                    </div>
                    <div className="row-info">
                      <div className="pc-brand">{p.brand} · {p.year} · {p.color}</div>
                      <h3>{p.name}</h3>
                      <div className="row-meta">
                        <span><Icon name="zap" size={12} /> {p.cc>0?`${p.cc}cc`:'Điện'}</span>
                        <span><Icon name="map" size={12} /> {p.store}</span>
                        <span><Icon name="box" size={12} /> {lang==='vi'?'Còn':'Stock'} {p.stock}</span>
                      </div>
                    </div>
                    <div className="row-price">
                      <div className="pc-price">{window.formatVND(p.price)}</div>
                      {p.oldPrice && <div className="pc-price-old">{window.formatVND(p.oldPrice)}</div>}
                      <button className="btn btn-primary" style={{marginTop:10}}>{lang==='vi'?'Chi tiết':'View'} <Icon name="arrow" size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {pages > 1 && (
              <div className="pagination">
                {Array.from({length: pages}).map((_, i) => (
                  <button key={i} className={page===i+1?'active':''} onClick={()=>setPage(i+1)}>{i+1}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailPage = ({ p, lang, setRoute }) => {
  const [tab, setTab] = useState(0);
  if (!p) { setRoute('products'); return null; }
  const save = p.oldPrice ? p.oldPrice - p.price : 0;
  return (
    <div className="page-fade">
      <div className="page-hero" style={{padding:'40px 0'}}>
        <div className="container">
          <div className="breadcrumbs">
            <a href="#" onClick={(e)=>{e.preventDefault(); setRoute('home');}}>{lang==='vi'?'Trang chủ':'Home'}</a> /
            <a href="#" onClick={(e)=>{e.preventDefault(); setRoute('products');}}> {lang==='vi'?'Sản phẩm':'Products'}</a> / <span> {p.name}</span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="detail-layout">
          <div className="gallery">
            <div className="main-img" style={p.image ? {backgroundImage:`url(${p.image})`, backgroundSize:'cover', backgroundPosition:'center'} : null}>
              {!p.image && p.name}
            </div>
            <div className="thumbs">
              {[0,1,2,3].map(i => (
                <div key={i} className={`thumb ${i===tab?'active':''}`}
                  style={i===0 && p.image ? {backgroundImage:`url(${p.image})`, backgroundSize:'cover', backgroundPosition:'center'} : null}
                  onClick={()=>setTab(i)}></div>
              ))}
            </div>
          </div>
          <div className="detail-info">
            <div className="brand-line">{p.brand} · {p.year} · {p.status==='used'?(lang==='vi'?'Đã qua sử dụng':'Used'):(lang==='vi'?'Xe mới 100%':'Brand new')}</div>
            <h1>{p.name}</h1>
            <div className="detail-price-row">
              <div className="price">{window.formatVND(p.price)}</div>
              {p.oldPrice && <><div className="old">{window.formatVND(p.oldPrice)}</div><div className="save">-{window.formatVND(save)}</div></>}
            </div>
            <div className="spec-grid">
              <div className="spec"><div className="k">{lang==='vi'?'Dung tích':'Engine'}</div><div className="v">{p.cc>0?`${p.cc}cc`:'Điện'}</div></div>
              <div className="spec"><div className="k">{lang==='vi'?'Nhiên liệu':'Fuel'}</div><div className="v">{p.fuel}</div></div>
              <div className="spec"><div className="k">{lang==='vi'?'Màu sắc':'Color'}</div><div className="v">{p.color}</div></div>
              <div className="spec"><div className="k">{lang==='vi'?'Năm SX':'Year'}</div><div className="v">{p.year}</div></div>
              <div className="spec"><div className="k">{lang==='vi'?'Tồn kho':'Stock'}</div><div className="v">{p.stock} {lang==='vi'?'xe':'units'}</div></div>
              <div className="spec"><div className="k">{lang==='vi'?'Chi nhánh':'Branch'}</div><div className="v">{p.store}</div></div>
              {p.mileage > 0 && <div className="spec"><div className="k">ODO</div><div className="v">{p.mileage.toLocaleString()} km</div></div>}
              <div className="spec"><div className="k">{lang==='vi'?'Bảo hành':'Warranty'}</div><div className="v">{p.status==='new'?'24 tháng':'6 tháng DTC'}</div></div>
            </div>
            <div className="detail-actions">
              <button className="btn btn-primary"><Icon name="phone" size={14} />{lang==='vi'?'Đặt lịch xem xe':'Book a viewing'}</button>
              <button className="btn btn-gold">{lang==='vi'?'Trả góp · 0%':'Installment'}</button>
              <button className="btn btn-ghost"><Icon name="heart" size={14} /></button>
            </div>
            <ul className="feature-list">
              {p.features.map((f,i)=><li key={i}>{f}</li>)}
            </ul>
            <div style={{marginTop: 30, padding: 20, background: 'var(--bg-3)', borderRadius: 12, display: 'flex', gap: 16, alignItems: 'center'}}>
              <div style={{width:48, height:48, borderRadius: 999, background:'var(--burgundy)', color:'#fff', display:'grid', placeItems:'center'}}>
                <Icon name="shield" size={20} />
              </div>
              <div>
                <div style={{fontWeight:700, fontSize:14}}>{lang==='vi'?'Cam kết ĐTC':'DTC Promise'}</div>
                <div style={{fontSize:13, color:'var(--fg-2)', marginTop:2}}>
                  {lang==='vi'?'Xe chính hãng · Bảo hành đầy đủ · Hỗ trợ sang tên · Kiểm tra kỹ thuật miễn phí 1 năm':'Genuine · Full warranty · Transfer support · 1-year free check-up'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider-gold container"></div>
      <div className="container">
        <h2>{lang==='vi'?'Có thể bạn quan tâm':'You may also like'}</h2>
        <div className="products-grid" style={{marginTop:30}}>
          {window.DTC_DATA.products.filter(x=>x.id!==p.id && x.brand===p.brand).slice(0,4).map(x => (
            <window.DTC_ProductCard key={x.id} p={x} setRoute={setRoute} setActiveProduct={(np)=>{setRoute('detail');}} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
};

const NewsPage = ({ lang, setRoute }) => {
  const D = window.DTC_DATA;
  return (
    <div className="page-fade">
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumbs"><a href="#" onClick={(e)=>{e.preventDefault(); setRoute('home');}}>{lang==='vi'?'Trang chủ':'Home'}</a> / <span>{lang==='vi'?'Tin tức':'News'}</span></div>
          <h1>{lang==='vi'?'Tin tức & Cẩm nang':'News & Guides'}</h1>
          <p className="lead">{lang==='vi'?'Cập nhật mới nhất từ ĐTC, các hãng xe và bí quyết sử dụng từ đội kỹ thuật.':'Updates from DTC, manufacturers and tips from our experts.'}</p>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="news-grid">
            {D.news.map(n => (
              <div key={n.id} className="news-card">
                <div className="nc-img" style={n.cover ? {backgroundImage:`url(${n.cover})`, backgroundSize:'cover', backgroundPosition:'center'} : null}>
                  <span className="nc-cat">{n.cat}</span>
                  {!n.cover && (n.title.slice(0,28) + '…')}
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
    </div>
  );
};

const StoresPage = ({ lang, setRoute }) => {
  const D = window.DTC_DATA;
  return (
    <div className="page-fade">
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumbs"><a href="#" onClick={(e)=>{e.preventDefault(); setRoute('home');}}>{lang==='vi'?'Trang chủ':'Home'}</a> / <span>{lang==='vi'?'Cửa hàng':'Stores'}</span></div>
          <h1>{lang==='vi'?'7 chi nhánh tại Bình Dương':'7 branches in Binh Duong'}</h1>
          <p className="lead">{lang==='vi'?'Mạng lưới rộng khắp · Dịch vụ đồng nhất · Bảo hành liên thông toàn hệ thống.':'Wide network · Unified service · Cross-branch warranty.'}</p>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="branch-grid">
            {D.stores.map(s => (
              <div key={s.id} className="branch-card">
                <div className="b-id">{s.id}</div>
                <div>
                  <div className="b-name">{s.name}</div>
                  <div className="b-addr">{s.addr}</div>
                  <div className="b-stats">
                    <div className="stat"><strong>{s.staff}</strong>{lang==='vi'?'Nhân viên':'Staff'}</div>
                    <div className="stat"><strong>{s.phone.split(' ').slice(-1)[0]}</strong>{lang==='vi'?'Hotline':'Hotline'}</div>
                  </div>
                </div>
                <div>
                  <button className="btn btn-ghost" style={{padding:'10px 16px'}}><Icon name="map" size={14} />{lang==='vi'?'Bản đồ':'Map'}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactPage = ({ lang, setRoute }) => {
  const D = window.DTC_DATA;
  const [form, setForm] = useState({
    customer: '', phone: '', email: '',
    productId: D.products[0]?.id || null,
    storeId: D.stores[0]?.id || null,
    message: ''
  });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (busy) return;
    if (!form.customer.trim() || !form.phone.trim()) {
      setResult({ ok: false, msg: lang==='vi' ? 'Vui lòng nhập họ tên và số điện thoại' : 'Please enter your name and phone' });
      return;
    }
    setBusy(true);
    setResult(null);
    try {
      const product = D.products.find(p => p.id === Number(form.productId));
      const store = D.stores.find(s => s.id === Number(form.storeId));
      const { data, error } = await window.dtcSubmitOrder({
        customer: form.customer.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        productId: product?.id || null,
        productName: product?.name || null,
        storeId: store?.id || null,
        storeName: store?.name || null,
        total: product?.price || 0,
        message: form.message.trim() || null
      });
      if (error) throw error;
      setResult({
        ok: true,
        msg: lang==='vi'
          ? `Cảm ơn ${form.customer}! Mã đơn của anh/chị: ${data.id}. Đội ngũ ĐTC sẽ liên hệ trong vòng 30 phút.`
          : `Thanks ${form.customer}! Your reference: ${data.id}. Our team will reach out within 30 minutes.`
      });
      setForm({ customer:'', phone:'', email:'', productId: form.productId, storeId: form.storeId, message:'' });
    } catch (e) {
      setResult({ ok: false, msg: (lang==='vi' ? 'Gửi không thành công: ' : 'Submission failed: ') + (e?.message || e) });
    } finally {
      setBusy(false);
    }
  };

  return (
  <div className="page-fade">
    <div className="page-hero">
      <div className="container">
        <div className="breadcrumbs"><a href="#" onClick={(e)=>{e.preventDefault(); setRoute('home');}}>{lang==='vi'?'Trang chủ':'Home'}</a> / <span>{lang==='vi'?'Liên hệ':'Contact'}</span></div>
        <h1>{lang==='vi'?'Tư vấn nhanh — Phản hồi 24h':'Quick consultation — 24h response'}</h1>
        <p className="lead">{lang==='vi'?'Để lại thông tin, đội ngũ ĐTC sẽ liên hệ tư vấn trong vòng 30 phút trong giờ hành chính.':'Leave your details, our team will reach out within 30 minutes during business hours.'}</p>
      </div>
    </div>
    <section>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info-card">
            <div className="eyebrow" style={{color:'var(--gold)'}}>{lang==='vi'?'Kênh liên hệ':'Channels'}</div>
            <h2 style={{marginTop:14}}>{lang==='vi'?'Đa dạng kênh — Mọi lúc':'Always reachable'}</h2>
            <div style={{marginTop:30}}>
              <div className="contact-item">
                <div className="ci-icon"><Icon name="phone" size={18} /></div>
                <div><div className="ci-k">Hotline</div><div className="ci-v">1900 6789 (07:30 — 21:00)</div></div>
              </div>
              <div className="contact-item">
                <div className="ci-icon"><Icon name="chat" size={18} /></div>
                <div><div className="ci-k">Zalo OA</div><div className="ci-v">@daithanhcong.vn</div></div>
              </div>
              <div className="contact-item">
                <div className="ci-icon"><Icon name="mail" size={18} /></div>
                <div><div className="ci-k">Email</div><div className="ci-v">info@daithanhcong.vn</div></div>
              </div>
              <div className="contact-item" style={{borderBottom:0}}>
                <div className="ci-icon"><Icon name="map" size={18} /></div>
                <div><div className="ci-k">{lang==='vi'?'Trụ sở':'HQ'}</div><div className="ci-v">123 ĐL Bình Dương, TP. Thủ Dầu Một</div></div>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <div className="eyebrow">{lang==='vi'?'Gửi yêu cầu':'Inquiry'}</div>
            <h3 style={{marginTop:10}}>{lang==='vi'?'Để chúng tôi liên hệ tư vấn':'We will get back to you'}</h3>
            <p style={{color:'var(--fg-2)', marginTop:6, fontSize:13}}>{lang==='vi'?'Anh/chị vui lòng điền thông tin chính xác để được hỗ trợ tốt nhất.':'Please fill in accurate info for best support.'}</p>
            {result && (
              <div style={{
                marginTop: 14, padding: '12px 14px', borderRadius: 10,
                background: result.ok ? 'rgba(46,160,67,0.1)' : 'rgba(200,16,46,0.1)',
                border: `1px solid ${result.ok ? 'rgba(46,160,67,0.3)' : 'rgba(200,16,46,0.3)'}`,
                color: result.ok ? '#1a7f37' : 'var(--crimson)',
                fontSize: 13, lineHeight: 1.5
              }}>{result.msg}</div>
            )}
            <div className="form-grid">
              <div><label className="label">{lang==='vi'?'Họ và tên':'Full name'} *</label>
                <input className="input" placeholder="Nguyễn Văn A"
                  value={form.customer} onChange={e=>upd('customer', e.target.value)} /></div>
              <div><label className="label">{lang==='vi'?'Số điện thoại':'Phone'} *</label>
                <input className="input" placeholder="0903 ..."
                  value={form.phone} onChange={e=>upd('phone', e.target.value)} /></div>
              <div><label className="label">Email</label>
                <input className="input" type="email" placeholder="email@example.com"
                  value={form.email} onChange={e=>upd('email', e.target.value)} /></div>
              <div><label className="label">{lang==='vi'?'Mẫu xe quan tâm':'Bike of interest'}</label>
                <select className="select" value={form.productId || ''}
                  onChange={e=>upd('productId', e.target.value ? Number(e.target.value) : null)}>
                  {D.products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select></div>
              <div><label className="label">{lang==='vi'?'Chi nhánh gần':'Nearest branch'}</label>
                <select className="select" value={form.storeId || ''}
                  onChange={e=>upd('storeId', e.target.value ? Number(e.target.value) : null)}>
                  {D.stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select></div>
              <div className="full"><label className="label">{lang==='vi'?'Nội dung':'Message'}</label>
                <textarea className="input"
                  value={form.message} onChange={e=>upd('message', e.target.value)}
                  placeholder={lang==='vi'?'Anh/chị muốn tư vấn về…':'I would like to know about…'}></textarea></div>
              <div className="full">
                <button className="btn btn-primary" onClick={submit} disabled={busy}>
                  <Icon name="send" size={14} />
                  {busy ? (lang==='vi'?'Đang gửi…':'Submitting…') : (lang==='vi'?'Gửi yêu cầu':'Submit')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

window.DTC_Pages = { ProductsPage, DetailPage, NewsPage, StoresPage, ContactPage };
