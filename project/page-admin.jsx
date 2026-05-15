// === Admin Dashboard ===
const { Icon, BikePlaceholder } = window.DTC_Components;

const AdminSidebar = ({ tab, setTab, setRoute }) => {
  const D = window.DTC_DATA || {};
  const products = D.products || [];
  const news = D.news || [];
  const stores = D.stores || [];
  const orders = D.orders || [];
  const items = [
    { section: 'TỔNG QUAN' },
    { id: 'dashboard', label: 'Dashboard', icon: 'chart' },
    { section: 'NỘI DUNG' },
    { id: 'products', label: 'Sản phẩm xe', icon: 'box', count: products.length },
    { id: 'news', label: 'Tin tức / Khuyến mãi', icon: 'edit', count: news.length },
    { section: 'KINH DOANH' },
    { id: 'orders', label: 'Đơn hàng / Tư vấn', icon: 'cart', count: orders.length },
    { id: 'branches', label: 'Chi nhánh', icon: 'map', count: stores.length },
    { section: 'HỆ THỐNG' },
    { id: 'ai', label: 'Trợ lý AI', icon: 'chat' },
    { id: 'settings', label: 'Thông tin chung', icon: 'settings' },
  ];
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <img src="assets/logo.png" alt="" />
        <div>
          <div className="lb">ĐTC ADMIN</div>
          <div className="sb">CMS · v2.6</div>
        </div>
      </div>
      <nav className="admin-nav">
        {items.map((it, i) => it.section ? (
          <div key={i} className="admin-nav-section">{it.section}</div>
        ) : (
          <button key={it.id} className={tab===it.id?'active':''} onClick={()=>setTab(it.id)}>
            <Icon name={it.icon} size={16} />
            <span>{it.label}</span>
            {it.count !== undefined && <span className="count">{it.count}</span>}
          </button>
        ))}
        <div style={{marginTop: 'auto', paddingTop: 24}}>
          <button onClick={()=>setRoute('home')}>
            <Icon name="arrow" size={16} />
            <span>← Về trang chủ</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

const StatusPill = ({ s }) => {
  const map = { pending: 'Chờ xử lý', confirmed: 'Đã xác nhận', delivered: 'Đã giao', cancelled: 'Đã hủy' };
  return <span className={`status-pill ${s}`}>{map[s]}</span>;
};

const AdminMetricStrip = ({ items }) => (
  <div className="admin-metric-strip">
    {items.map((item) => (
      <div key={item.label} className={`admin-mini-metric ${item.tone || ''}`}>
        <span>{item.label}</span>
        <strong>{item.value}</strong>
      </div>
    ))}
  </div>
);

const QualityTags = ({ items }) => {
  const visible = items.filter(Boolean);
  if (!visible.length) return <span className="quality-tag ok">Sẵn sàng hiển thị</span>;
  return (
    <div className="quality-tags">
      {visible.map((item, i) => <span key={i} className={`quality-tag ${item.tone || 'warn'}`}>{item.label}</span>)}
    </div>
  );
};

const normalizeImages = (items) => Array.from(new Set(
  (items || []).map(v => String(v || '').trim()).filter(Boolean)
));

const getFileList = (files) => Array.from(files || []).filter(file => file && file.type?.startsWith('image/'));

const AdminDashboard = ({ orders }) => {
  const D = window.DTC_DATA;
  const months = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];
  const values = [62, 68, 71, 75, 78, 82, 79, 85, 88, 92, 95, 102];
  const max = Math.max(...values);
  const recentOrders = (orders && orders.length ? orders : D.orders).slice(0, 5);
  return (
    <div className="page-fade">
      <div className="kpi-row">
        <div className="kpi-card"><div className="k">Doanh thu tháng</div><div className="v">2.8 tỷ</div><div className="delta">↑ 12.4% so tháng trước</div></div>
        <div className="kpi-card"><div className="k">Đơn hàng mới</div><div className="v">147</div><div className="delta">↑ 8.2%</div></div>
        <div className="kpi-card"><div className="k">Xe đã bán</div><div className="v">128</div><div className="delta">↑ 6.7%</div></div>
        <div className="kpi-card"><div className="k">Tư vấn chờ</div><div className="v">23</div><div className="delta down">↓ 3.1%</div></div>
      </div>
      <div className="admin-grid-2">
        <div className="admin-card chart-card">
          <div className="admin-card-head"><h3>Doanh thu 12 tháng (đơn vị: triệu ₫)</h3><span style={{fontSize:11, color:'var(--fg-3)', fontFamily:'var(--font-mono)'}}>2025 — 2026</span></div>
          <div style={{padding:'30px 22px 40px'}}>
            <div className="chart-bars">
              {values.map((v,i) => (
                <div key={i} className="chart-bar" style={{height: `${(v/max)*100}%`}}>
                  <div className="bar-value">{v*10}</div>
                  <div className="bar-label">{months[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="admin-card-head"><h3>Top 5 chi nhánh</h3></div>
          <div style={{padding: 0}}>
            {D.stores.slice(0,5).map((s, i) => {
              const sales = [98, 87, 76, 65, 58][i];
              return (
                <div key={s.id} style={{padding:'14px 22px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:14}}>
                  <div style={{width:32, height:32, borderRadius:8, background:'var(--burgundy)', color:'#fff', display:'grid', placeItems:'center', fontFamily:'var(--font-display)', fontWeight:800, fontSize:13}}>{s.id}</div>
                  <div style={{flex:1, minWidth: 0}}>
                    <div style={{fontWeight:600, fontSize:13.5}}>{s.name}</div>
                    <div style={{height:6, background:'var(--bg-3)', borderRadius:4, marginTop:8, overflow:'hidden'}}>
                      <div style={{width:`${sales}%`, height:'100%', background:'linear-gradient(90deg, var(--burgundy), var(--gold))'}}></div>
                    </div>
                  </div>
                  <div style={{fontFamily:'var(--font-display)', fontWeight:800, color:'var(--burgundy)', fontSize:15}}>{sales}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-card-head"><h3>Đơn hàng mới nhất</h3><button className="btn btn-ghost" style={{padding:'8px 16px'}}>Xem tất cả →</button></div>
        <table className="admin-table">
          <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Sản phẩm</th><th>Chi nhánh</th><th>Tổng</th><th>Trạng thái</th><th></th></tr></thead>
          <tbody>
            {recentOrders.map(o => (
              <tr key={o.id}>
                <td style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--burgundy)', fontWeight:700}}>{o.id}</td>
                <td><div style={{fontWeight:600}}>{o.customer}</div><div style={{fontSize:11, color:'var(--fg-3)'}}>{o.phone}</div></td>
                <td>{o.product}</td>
                <td style={{fontSize:12, color:'var(--fg-2)'}}>{o.store}</td>
                <td style={{fontFamily:'var(--font-display)', fontWeight:700, color:'var(--burgundy)'}}>{window.formatVND(o.total)}</td>
                <td><StatusPill s={o.status} /></td>
                <td><div className="actions"><button title="Xem"><Icon name="eye" size={14} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminProducts = ({ openModal }) => {
  const D = window.DTC_DATA;
  const [query, setQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [, force] = useState(0);
  const normalizedQuery = query.trim().toLowerCase();
  const list = D.products.filter(p => {
    const byQuery = !normalizedQuery || [p.name, p.brand, p.color, p.store].join(' ').toLowerCase().includes(normalizedQuery);
    const byBrand = filterBrand === 'all' || p.brand === filterBrand;
    const byStatus = filterStatus === 'all' || p.status === filterStatus;
    const byStock = filterStock === 'all'
      || (filterStock === 'low' && Number(p.stock) <= 5)
      || (filterStock === 'missing-image' && !p.image)
      || (filterStock === 'ready' && Number(p.stock) > 5 && p.image);
    return byQuery && byBrand && byStatus && byStock;
  });
  const missingImages = D.products.filter(p => !p.image).length;
  const lowStock = D.products.filter(p => Number(p.stock) <= 5).length;
  const usedCount = D.products.filter(p => p.status === 'used').length;

  const removeProduct = async (p) => {
    if (!confirm(`Ẩn sản phẩm "${p.name}" khỏi website? (có thể bật lại trong DB)`)) return;
    try {
      const { error } = await window.dtcDeleteProduct(p.id);
      if (error) throw error;
      D.products = D.products.filter(x => x.id !== p.id);
      force(n => n + 1);
    } catch (e) {
      alert('Lỗi: ' + (e?.message || e));
    }
  };

  return (
    <div className="page-fade admin-content-stack">
      <AdminMetricStrip items={[
        { label: 'Tổng sản phẩm', value: D.products.length },
        { label: 'Sắp hết hàng', value: lowStock, tone: lowStock ? 'warn' : 'ok' },
        { label: 'Thiếu ảnh', value: missingImages, tone: missingImages ? 'danger' : 'ok' },
        { label: 'Xe đã qua sử dụng', value: usedCount }
      ]} />

      <div className="admin-card">
        <div className="admin-card-head content-head">
          <div>
            <h3>Quản lý sản phẩm xe ({list.length})</h3>
            <p>Tìm, lọc và kiểm tra nhanh dữ liệu hiển thị ngoài website.</p>
          </div>
          <button className="btn btn-primary" onClick={()=>openModal('product')}><Icon name="plus" size={14} />Thêm xe mới</button>
        </div>
        <div className="content-toolbar">
          <div className="admin-search-field">
            <Icon name="search" size={14} />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Tìm theo tên xe, hãng, màu, chi nhánh..." />
          </div>
          <select className="select" value={filterBrand} onChange={e => setFilterBrand(e.target.value)}>
            <option value="all">Tất cả hãng</option>
            {D.brands.map(b=><option key={b} value={b}>{b}</option>)}
          </select>
          <select className="select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">Mới & cũ</option>
            <option value="new">Xe mới</option>
            <option value="used">Xe đã qua sử dụng</option>
          </select>
          <select className="select" value={filterStock} onChange={e => setFilterStock(e.target.value)}>
            <option value="all">Tất cả chất lượng</option>
            <option value="ready">Sẵn sàng hiển thị</option>
            <option value="low">Sắp hết hàng</option>
            <option value="missing-image">Thiếu ảnh</option>
          </select>
        </div>
      <table className="admin-table">
        <thead><tr><th>Sản phẩm</th><th>Hãng</th><th>Loại</th><th>Giá</th><th>Tồn kho</th><th>Chất lượng dữ liệu</th><th></th></tr></thead>
        <tbody>
          {list.length === 0 && (
            <tr><td colSpan={7} className="admin-empty-cell">Không tìm thấy sản phẩm phù hợp bộ lọc.</td></tr>
          )}
          {list.map(p => (
            <tr key={p.id}>
              <td>
                <div className="product-cell">
                  <div className="mini-img" style={p.image ? {backgroundImage:`url(${p.image})`, backgroundSize:'cover', backgroundPosition:'center'} : null}></div>
                  <div><div className="pname">{p.name}</div><div className="pmeta">ID #{p.id} · {p.year} · {p.color || 'chưa có màu'} · {p.store || 'chưa gán chi nhánh'}</div></div>
                </div>
              </td>
              <td>{p.brand}</td>
              <td style={{fontSize:12}}>{D.categories.find(c=>c.id===p.cat)?.vi}</td>
              <td style={{fontFamily:'var(--font-display)', fontWeight:700, color:'var(--burgundy)'}}>{window.formatVND(p.price)}</td>
              <td><span className="badge badge-stock">{p.stock} xe</span></td>
              <td>
                <QualityTags items={[
                  !p.image && { label: 'Thiếu ảnh', tone: 'danger' },
                  Number(p.stock) <= 5 && { label: 'Sắp hết hàng', tone: 'warn' },
                  !p.features?.length && { label: 'Thiếu tính năng', tone: 'warn' },
                  p.status === 'used' && { label: 'Xe cũ', tone: 'muted' }
                ]} />
              </td>
              <td><div className="actions">
                <button title="Xem"><Icon name="eye" size={14} /></button>
                <button title="Sửa" onClick={()=>openModal('product', p)}><Icon name="edit" size={14} /></button>
                <button title="Ẩn" onClick={()=>removeProduct(p)}><Icon name="trash" size={14} /></button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

const AdminNews = ({ openModal }) => {
  const D = window.DTC_DATA;
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [quality, setQuality] = useState('all');
  const [, force] = useState(0);
  const cats = Array.from(new Set(D.news.map(n => n.cat))).filter(Boolean);
  const normalizedQuery = query.trim().toLowerCase();
  const list = D.news.filter(n => {
    const byQuery = !normalizedQuery || [n.title, n.excerpt, n.author, n.cat].join(' ').toLowerCase().includes(normalizedQuery);
    const byCat = cat === 'all' || n.cat === cat;
    const byQuality = quality === 'all'
      || (quality === 'missing-cover' && !n.cover)
      || (quality === 'missing-excerpt' && !n.excerpt)
      || (quality === 'ready' && n.cover && n.excerpt);
    return byQuery && byCat && byQuality;
  });
  const missingCover = D.news.filter(n => !n.cover).length;
  const missingExcerpt = D.news.filter(n => !n.excerpt).length;

  const remove = async (n) => {
    if (!confirm(`Ẩn bài "${n.title}" khỏi website?`)) return;
    try {
      const { error } = await window.dtcDeleteNews(n.id);
      if (error) throw error;
      D.news = D.news.filter(x => x.id !== n.id);
      force(x => x + 1);
    } catch (e) {
      alert('Lỗi: ' + (e?.message || e));
    }
  };

  return (
    <div className="page-fade admin-content-stack">
      <AdminMetricStrip items={[
        { label: 'Tổng bài viết', value: D.news.length },
        { label: 'Chuyên mục', value: cats.length },
        { label: 'Thiếu ảnh bìa', value: missingCover, tone: missingCover ? 'danger' : 'ok' },
        { label: 'Thiếu tóm tắt', value: missingExcerpt, tone: missingExcerpt ? 'warn' : 'ok' }
      ]} />

      <div className="admin-card">
        <div className="admin-card-head content-head">
          <div>
            <h3>Tin tức & Khuyến mãi ({list.length})</h3>
            <p>Biên tập nội dung, lọc nhanh theo chuyên mục và phát hiện bài thiếu dữ liệu.</p>
          </div>
          <button className="btn btn-primary" onClick={()=>openModal('news')}><Icon name="plus" size={14} />Đăng bài mới</button>
        </div>
        <div className="content-toolbar">
          <div className="admin-search-field">
            <Icon name="search" size={14} />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Tìm tiêu đề, tác giả, tóm tắt..." />
          </div>
          <select className="select" value={cat} onChange={e=>setCat(e.target.value)}>
            <option value="all">Tất cả chuyên mục</option>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="select" value={quality} onChange={e=>setQuality(e.target.value)}>
            <option value="all">Tất cả chất lượng</option>
            <option value="ready">Sẵn sàng</option>
            <option value="missing-cover">Thiếu ảnh bìa</option>
            <option value="missing-excerpt">Thiếu tóm tắt</option>
          </select>
        </div>
      <table className="admin-table">
        <thead><tr><th></th><th>Tiêu đề</th><th>Chuyên mục</th><th>Tác giả</th><th>Ngày đăng</th><th>Chất lượng</th><th></th></tr></thead>
        <tbody>
          {list.length === 0 && (
            <tr><td colSpan={7} className="admin-empty-cell">Không tìm thấy bài viết phù hợp bộ lọc.</td></tr>
          )}
          {list.map(n => (
            <tr key={n.id}>
              <td style={{width:60}}>
                <div style={{width:48, height:36, borderRadius:6, background:'var(--bg-3)',
                  ...(n.cover ? {backgroundImage:`url(${n.cover})`, backgroundSize:'cover', backgroundPosition:'center'} : {})}}></div>
              </td>
              <td><div style={{fontWeight:600, maxWidth:440}}>{n.title}</div></td>
              <td><span className="badge badge-new">{n.cat}</span></td>
              <td style={{fontSize:13, color:'var(--fg-2)'}}>{n.author}</td>
              <td style={{fontFamily:'var(--font-mono)', fontSize:12}}>{n.date}</td>
              <td>
                <QualityTags items={[
                  !n.cover && { label: 'Thiếu ảnh bìa', tone: 'danger' },
                  !n.excerpt && { label: 'Thiếu tóm tắt', tone: 'warn' },
                  !n.content && { label: 'Thiếu nội dung', tone: 'warn' }
                ]} />
              </td>
              <td><div className="actions">
                <button onClick={()=>openModal('news', n)}><Icon name="edit" size={14} /></button>
                <button onClick={()=>remove(n)}><Icon name="trash" size={14} /></button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

const AdminOrders = ({ orders, refresh }) => {
  const [filter, setFilter] = useState('all');
  const [busy, setBusy] = useState(null);
  const list = orders || [];
  const visible = filter === 'all' ? list : list.filter(o => o.status === filter);

  const updateStatus = async (id, newStatus) => {
    setBusy(id);
    try {
      const { error } = await window.dtcUpdateOrder(id, { status: newStatus });
      if (error) throw error;
      await refresh();
    } catch (e) {
      alert('Lỗi: ' + (e?.message || e));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="page-fade admin-card">
      <div className="admin-card-head"><h3>Đơn hàng / Yêu cầu tư vấn ({list.length})</h3>
        <div style={{display:'flex', gap:8}}>
          <select className="select" style={{width:180, padding:'8px 12px'}}
            value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="delivered">Đã giao</option>
            <option value="cancelled">Đã hủy</option>
          </select>
          <button className="btn btn-ghost" onClick={refresh}><Icon name="arrow" size={14} />Làm mới</button>
        </div>
      </div>
      <table className="admin-table">
        <thead><tr><th>Mã</th><th>Khách hàng</th><th>Sản phẩm</th><th>Chi nhánh</th><th>Ngày</th><th>Tổng</th><th>Trạng thái</th><th></th></tr></thead>
        <tbody>
          {visible.length === 0 && (
            <tr><td colSpan={8} style={{textAlign:'center', padding:30, color:'var(--fg-3)'}}>Không có đơn hàng nào</td></tr>
          )}
          {visible.map(o => (
            <tr key={o.id} style={{opacity: busy === o.id ? 0.5 : 1}}>
              <td style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--burgundy)', fontWeight:700}}>{o.id}</td>
              <td><div style={{fontWeight:600}}>{o.customer}</div><div style={{fontSize:11, color:'var(--fg-3)'}}>{o.phone}</div></td>
              <td>{o.product}</td>
              <td style={{fontSize:12}}>{o.store}</td>
              <td style={{fontFamily:'var(--font-mono)', fontSize:12}}>{o.date}</td>
              <td style={{fontFamily:'var(--font-display)', fontWeight:700, color:'var(--burgundy)'}}>{window.formatVND(o.total)}</td>
              <td><StatusPill s={o.status} /></td>
              <td>
                <select className="select" style={{padding:'4px 8px', fontSize:11, width:130}}
                  value={o.status} disabled={busy === o.id}
                  onChange={e => updateStatus(o.id, e.target.value)}>
                  <option value="pending">Chờ xử lý</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="delivered">Đã giao</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminBranches = ({ openModal }) => {
  const D = window.DTC_DATA;
  const [, force] = useState(0);
  const remove = async (s) => {
    if (!confirm(`Ẩn chi nhánh "${s.name}" khỏi website?`)) return;
    try {
      const { error } = await window.dtcDeleteStore(s.id);
      if (error) throw error;
      D.stores = D.stores.filter(x => x.id !== s.id);
      force(x => x + 1);
    } catch (e) {
      alert('Lỗi: ' + (e?.message || e));
    }
  };

  return (
    <div className="page-fade">
      <div className="admin-card" style={{marginBottom: 16}}>
        <div className="admin-card-head"><h3>{D.stores.length} chi nhánh ĐẠI THÀNH CÔNG</h3>
          <button className="btn btn-primary" onClick={()=>openModal('store')}><Icon name="plus" size={14} />Thêm chi nhánh</button>
        </div>
      </div>
      <div className="branch-grid">
        {D.stores.map(s => (
          <div key={s.id} className="branch-card">
            <div className="b-id">{s.id}</div>
            <div>
              <div className="b-name">{s.name}</div>
              <div className="b-addr">{s.addr}</div>
              <div className="b-stats">
                <div className="stat"><strong>{s.staff}</strong>NHÂN VIÊN</div>
                <div className="stat"><strong>{s.phone.split(' ').slice(-1)[0]}</strong>HOTLINE</div>
              </div>
            </div>
            <div className="actions">
              <button title="Sửa" onClick={()=>openModal('store', s)}><Icon name="edit" size={14} /></button>
              <button title="Ẩn" onClick={()=>remove(s)}><Icon name="trash" size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StoreModal = ({ data, close, onSaved }) => {
  const [form, setForm] = useState({
    name: data?.name || '',
    addr: data?.addr || '',
    phone: data?.phone || '',
    staff: data?.staff ?? 1,
    map_x: data?.x ?? 50,
    map_y: data?.y ?? 50,
    is_active: true
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    if (busy) return;
    if (!form.name.trim() || !form.addr.trim() || !form.phone.trim()) {
      setErr('Tên, địa chỉ và SĐT là bắt buộc'); return;
    }
    setBusy(true); setErr('');
    try {
      const payload = {
        name: form.name.trim(),
        addr: form.addr.trim(),
        phone: form.phone.trim(),
        staff: Number(form.staff) || 0,
        map_x: Number(form.map_x) || 50,
        map_y: Number(form.map_y) || 50,
        is_active: true
      };
      if (data?.id) {
        const { error } = await window.dtcUpdateStore(data.id, payload);
        if (error) throw error;
      } else {
        const { error } = await window.dtcCreateStore(payload);
        if (error) throw error;
      }
      if (onSaved) await onSaved();
      close();
    } catch (e) {
      setErr(e?.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head">
          <h3 style={{fontSize:18, fontFamily:'var(--font-display)'}}>{data?'Chỉnh sửa chi nhánh':'Thêm chi nhánh mới'}</h3>
          <button onClick={close}><Icon name="close" size={18} /></button>
        </div>
        <div className="modal-body">
          {err && <div style={{padding:'10px 14px', marginBottom:12, background:'rgba(200,16,46,0.1)', color:'var(--crimson)', borderRadius:8, fontSize:13}}>{err}</div>}
          <div className="form-row full"><div><label className="label">Tên chi nhánh *</label>
            <input className="input" value={form.name} onChange={e=>upd('name', e.target.value)} placeholder="VD: CN Thuận An" /></div></div>
          <div className="form-row full"><div><label className="label">Địa chỉ *</label>
            <input className="input" value={form.addr} onChange={e=>upd('addr', e.target.value)} placeholder="Số nhà, đường, phường, thành phố" /></div></div>
          <div className="form-row">
            <div><label className="label">Số điện thoại *</label>
              <input className="input" value={form.phone} onChange={e=>upd('phone', e.target.value)} placeholder="0274 3 777 888" /></div>
            <div><label className="label">Số nhân viên</label>
              <input className="input" type="number" min="0" value={form.staff} onChange={e=>upd('staff', e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div><label className="label">Map X (0-100)</label>
              <input className="input" type="number" min="0" max="100" value={form.map_x} onChange={e=>upd('map_x', e.target.value)} /></div>
            <div><label className="label">Map Y (0-100)</label>
              <input className="input" type="number" min="0" max="100" value={form.map_y} onChange={e=>upd('map_y', e.target.value)} /></div>
          </div>
          <div style={{fontSize:11, color:'var(--fg-3)', marginTop:-8, marginBottom:14}}>
            💡 Map X/Y dùng cho bản đồ minh hoạ ở trang chủ. 0,0 = góc trên trái; 100,100 = góc dưới phải.
          </div>
          <div style={{display:'flex', justifyContent:'flex-end', gap:10, marginTop:20, paddingTop:20, borderTop:'1px solid var(--border)'}}>
            <button className="btn btn-ghost" onClick={close} disabled={busy}>Hủy</button>
            <button className="btn btn-primary" onClick={save} disabled={busy}>
              <Icon name={data?'edit':'plus'} size={14} />
              {busy?'Đang lưu…':(data?'Cập nhật':'Lưu chi nhánh')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductModal = ({ data, close }) => {
  const D = window.DTC_DATA;
  const existingImages = normalizeImages([data?.image, ...(data?.images || [])]);
  const [form, setForm] = useState({
    name: data?.name || '',
    brand: data?.brand || D.brands[0],
    cat: data?.cat || D.categories[0].id,
    price: data?.price || '',
    old_price: data?.oldPrice || '',
    cc: data?.cc ?? '',
    year: data?.year || 2026,
    status: data?.status || 'new',
    stock: data?.stock ?? 1,
    color: data?.color || '',
    store_id: data?.storeId || D.stores[0]?.id,
    fuel: data?.fuel || 'Xăng',
    features: (data?.features || []).join('\n'),
    image_url: data?.image || existingImages[0] || '',
    gallery_images: existingImages
  });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');
  const fileInputRef = React.useRef(null);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addImages = (urls) => {
    const cleanUrls = normalizeImages(urls);
    if (!cleanUrls.length) return;
    setForm(f => {
      const gallery = normalizeImages([...(f.gallery_images || []), ...cleanUrls]);
      return { ...f, gallery_images: gallery, image_url: f.image_url || gallery[0] || '' };
    });
  };
  const setPrimaryImage = (url) => {
    setForm(f => ({ ...f, image_url: url, gallery_images: normalizeImages([url, ...(f.gallery_images || [])]) }));
  };
  const removeImage = (url) => {
    setForm(f => {
      const gallery = normalizeImages(f.gallery_images).filter(item => item !== url);
      const image_url = f.image_url === url ? (gallery[0] || '') : (gallery.includes(f.image_url) ? f.image_url : gallery[0] || '');
      return { ...f, gallery_images: gallery, image_url };
    });
  };

  const handleFiles = async (files) => {
    const list = getFileList(files);
    if (!list.length) return;
    setUploading(true);
    setErr('');
    const uploaded = [];
    try {
      for (const file of list) {
        const { url } = await window.dtcUploadImage(file, 'products');
        uploaded.push(url);
      }
      addImages(uploaded);
    } catch (e) {
      setErr('Upload thất bại: ' + (e?.message || e));
      addImages(uploaded);
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (busy) return;
    if (!form.name.trim() || !form.price) {
      setErr('Tên xe và giá là bắt buộc'); return;
    }
    setBusy(true); setErr('');
    try {
      const galleryImages = normalizeImages([form.image_url, ...(form.gallery_images || [])]);
      const payload = {
        name: form.name.trim(),
        brand: form.brand,
        cat: form.cat,
        price: Number(form.price),
        old_price: form.old_price ? Number(form.old_price) : null,
        cc: Number(form.cc) || 0,
        year: Number(form.year),
        status: form.status,
        stock: Number(form.stock) || 0,
        color: form.color.trim() || null,
        store_id: Number(form.store_id) || null,
        fuel: form.fuel,
        features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
        image_url: form.image_url || galleryImages[0] || null,
        gallery_images: galleryImages,
        is_active: true
      };
      if (data?.id) {
        const { error } = await window.dtcUpdateProduct(data.id, payload);
        if (error) throw error;
      } else {
        const { error } = await window.dtcCreateProduct(payload);
        if (error) throw error;
      }
      await window.dtcLoadData();
      close();
    } catch (e) {
      setErr(e?.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  const previewFeatures = form.features.split('\n').map(s => s.trim()).filter(Boolean);
  const selectedCategory = D.categories.find(c => c.id === form.cat)?.vi || form.cat;
  const selectedStore = D.stores.find(s => String(s.id) === String(form.store_id));
  const stockNumber = Number(form.stock) || 0;
  const galleryImages = normalizeImages([form.image_url, ...(form.gallery_images || [])]);
  const previewImage = form.image_url || galleryImages[0] || '';

  return (
  <div className="modal-overlay" onClick={close}>
    <div className="modal" onClick={(e)=>e.stopPropagation()}>
      <div className="modal-head">
        <h3 style={{fontSize:18, fontFamily:'var(--font-display)'}}>{data ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
        <button onClick={close}><Icon name="close" size={18} /></button>
      </div>
      <div className="modal-body">
        {err && <div style={{padding:'10px 14px', marginBottom:12, background:'rgba(200,16,46,0.1)', color:'var(--crimson)', borderRadius:8, fontSize:13}}>{err}</div>}
        <div className="editor-live-preview product-preview">
          <div className="elp-media" style={previewImage ? {backgroundImage:`url(${previewImage})`} : null}>
            {!previewImage && <Icon name="box" size={30} />}
          </div>
          <div className="elp-body">
            <div className="elp-label">Preview sản phẩm</div>
            <h4>{form.name.trim() || 'Tên xe sẽ hiển thị tại đây'}</h4>
            <div className="elp-meta-row">
              <span>{form.brand}</span>
              <span>{selectedCategory}</span>
              <span>{form.year || 'Năm SX'}</span>
              <span>{form.color || 'Chưa có màu'}</span>
            </div>
            <div className="elp-price">{form.price ? window.formatVND(Number(form.price)) : 'Chưa nhập giá'}</div>
            <QualityTags items={[
              !form.name.trim() && { label: 'Thiếu tên', tone: 'danger' },
              !form.price && { label: 'Thiếu giá', tone: 'danger' },
              !galleryImages.length && { label: 'Thiếu ảnh', tone: 'warn' },
              stockNumber <= 5 && { label: 'Sắp hết hàng', tone: 'warn' },
              !previewFeatures.length && { label: 'Thiếu tính năng', tone: 'warn' }
            ]} />
            <div className="elp-note">
              {selectedStore ? selectedStore.name : 'Chưa gán chi nhánh'} · {previewFeatures.length || 0} tính năng · {galleryImages.length || 0} ảnh
            </div>
          </div>
        </div>
        <div className="form-row full"><div><label className="label">Tên xe *</label>
          <input className="input" placeholder="VD: Honda SH 350i ABS" value={form.name} onChange={e=>upd('name', e.target.value)} /></div></div>
        <div className="form-row">
          <div><label className="label">Hãng *</label>
            <select className="select" value={form.brand} onChange={e=>upd('brand', e.target.value)}>
              {D.brands.map(b=><option key={b}>{b}</option>)}
            </select></div>
          <div><label className="label">Loại xe *</label>
            <select className="select" value={form.cat} onChange={e=>upd('cat', e.target.value)}>
              {D.categories.map(c=><option key={c.id} value={c.id}>{c.vi}</option>)}
            </select></div>
        </div>
        <div className="form-row">
          <div><label className="label">Giá bán (₫) *</label>
            <input className="input" type="number" value={form.price} onChange={e=>upd('price', e.target.value)} /></div>
          <div><label className="label">Giá gốc (gạch ngang)</label>
            <input className="input" type="number" value={form.old_price} onChange={e=>upd('old_price', e.target.value)} /></div>
        </div>
        <div className="form-row">
          <div><label className="label">Dung tích (cc)</label>
            <input className="input" type="number" value={form.cc} onChange={e=>upd('cc', e.target.value)} /></div>
          <div><label className="label">Năm SX</label>
            <input className="input" type="number" value={form.year} onChange={e=>upd('year', e.target.value)} /></div>
        </div>
        <div className="form-row">
          <div><label className="label">Tình trạng</label>
            <select className="select" value={form.status} onChange={e=>upd('status', e.target.value)}>
              <option value="new">Xe mới</option><option value="used">Đã qua sử dụng</option>
            </select></div>
          <div><label className="label">Tồn kho</label>
            <input className="input" type="number" value={form.stock} onChange={e=>upd('stock', e.target.value)} /></div>
        </div>
        <div className="form-row">
          <div><label className="label">Màu sắc</label>
            <input className="input" placeholder="VD: Đỏ Mâm Xôi" value={form.color} onChange={e=>upd('color', e.target.value)} /></div>
          <div><label className="label">Nhiên liệu</label>
            <select className="select" value={form.fuel} onChange={e=>upd('fuel', e.target.value)}>
              <option>Xăng</option><option>Điện</option><option>Hybrid</option>
            </select></div>
        </div>
        <div className="form-row full">
          <div><label className="label">Chi nhánh</label>
            <select className="select" value={form.store_id} onChange={e=>upd('store_id', e.target.value)}>
              {D.stores.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
            </select></div>
        </div>
        <div className="form-row full">
          <div>
            <label className="label">
              <span>Ảnh xe</span>
              <span className="label-hint">Nên dùng 1600x1200px · tỉ lệ 4:3 · WebP/JPG dưới 5MB</span>
            </label>
            <div className="upload-zone upload-zone-compact" style={{position:'relative', cursor:'pointer'}}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); }}
              onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}>
              <div className="uz-icon"><Icon name="upload" size={26} /></div>
              <div style={{fontWeight:600, color:'var(--fg)'}}>{uploading ? 'Đang upload ảnh…' : 'Kéo thả nhiều ảnh hoặc click để upload'}</div>
              <div style={{fontSize:12, marginTop:4}}>Ảnh đầu tiên hoặc ảnh được đặt chính sẽ hiện ngoài danh sách sản phẩm.</div>
              <input ref={fileInputRef} type="file" accept="image/*" multiple style={{display:'none'}}
                onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }} />
            </div>
            <input className="input image-url-input" placeholder="Hoặc dán URL ảnh chính trực tiếp..."
              value={form.image_url}
              onChange={e=>upd('image_url', e.target.value)}
              onBlur={()=>addImages([form.image_url])} />
            {galleryImages.length > 0 && (
              <div className="image-thumbs image-manager">
                {galleryImages.map((url, i) => (
                  <div key={url} className={`it ${url === form.image_url ? 'primary' : ''}`} style={{backgroundImage:`url(${url})`, backgroundSize:'cover', backgroundPosition:'center'}}>
                    {url === form.image_url && <span className="primary-badge">Chính</span>}
                    <div className="thumb-actions">
                      {url !== form.image_url && <button type="button" onClick={() => setPrimaryImage(url)}>Đặt chính</button>}
                      <button type="button" onClick={() => removeImage(url)}>Xóa</button>
                    </div>
                    <span className="thumb-index">{i + 1}</span>
                  </div>
                ))}
                <button type="button" className="it add" onClick={() => fileInputRef.current?.click()} title="Thêm ảnh"><Icon name="plus" size={20} /></button>
              </div>
            )}
            <div className="media-helper">
              Gợi ý: chụp ngang đủ sáng, xe chiếm 75-85% khung hình; thêm 3-6 ảnh gồm góc trước, hông, sau, đồng hồ ODO và chi tiết tem/mâm để trang chi tiết nhìn đầy đủ hơn.
            </div>
          </div>
        </div>
        <div className="form-row full">
          <div><label className="label">Tính năng (mỗi dòng 1 tính năng)</label>
            <textarea className="input" style={{minHeight:100}} value={form.features} onChange={e=>upd('features', e.target.value)}
              placeholder="Hệ thống ABS 2 kênh&#10;Smart Key&#10;Idling Stop"></textarea></div>
        </div>
        <div style={{display:'flex', justifyContent:'flex-end', gap:10, marginTop:20, paddingTop:20, borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={close}>Hủy</button>
          <button className="btn btn-primary" onClick={save} disabled={busy}>
            <Icon name={data ? "edit" : "plus"} size={14} />
            {busy ? 'Đang lưu…' : (data ? 'Cập nhật' : 'Lưu sản phẩm')}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

const NewsModal = ({ data, close, onSaved }) => {
  const cats = ['Khuyến mãi', 'Cẩm nang', 'Tin hãng', 'Sự kiện'];
  const existingImages = normalizeImages([data?.cover_url || data?.cover, ...(data?.images || [])]);
  const [form, setForm] = useState({
    title: data?.title || '',
    cat: data?.cat || cats[0],
    author: data?.author || 'Phòng Marketing',
    excerpt: data?.excerpt || '',
    content: data?.content || '',
    cover_url: data?.cover_url || data?.cover || existingImages[0] || '',
    gallery_images: existingImages,
    published: data?.published !== false
  });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');
  const fileRef = React.useRef(null);
  const galleryRef = React.useRef(null);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addNewsImages = (urls) => {
    const cleanUrls = normalizeImages(urls);
    if (!cleanUrls.length) return;
    setForm(f => {
      const gallery = normalizeImages([...(f.gallery_images || []), ...cleanUrls]);
      return { ...f, gallery_images: gallery, cover_url: f.cover_url || gallery[0] || '' };
    });
  };
  const setCoverImage = (url) => {
    setForm(f => ({ ...f, cover_url: url, gallery_images: normalizeImages([url, ...(f.gallery_images || [])]) }));
  };
  const removeNewsImage = (url) => {
    setForm(f => {
      const gallery = normalizeImages(f.gallery_images).filter(item => item !== url);
      const cover_url = f.cover_url === url ? (gallery[0] || '') : (gallery.includes(f.cover_url) ? f.cover_url : gallery[0] || '');
      return { ...f, gallery_images: gallery, cover_url };
    });
  };
  const insertImageToContent = (url) => {
    setForm(f => ({
      ...f,
      content: `${(f.content || '').trimEnd()}\n\n![Ảnh bài viết](${url})\n`
    }));
  };

  const handleCover = async (file) => {
    if (!file) return;
    setUploading(true);
    setErr('');
    try {
      const { url } = await window.dtcUploadImage(file, 'news');
      setCoverImage(url);
    } catch (e) {
      setErr('Upload thất bại: ' + (e?.message || e));
    } finally {
      setUploading(false);
    }
  };

  const handleNewsImages = async (files) => {
    const list = getFileList(files);
    if (!list.length) return;
    setUploading(true);
    setErr('');
    const uploaded = [];
    try {
      for (const file of list) {
        const { url } = await window.dtcUploadImage(file, 'news');
        uploaded.push(url);
      }
      addNewsImages(uploaded);
    } catch (e) {
      setErr('Upload thất bại: ' + (e?.message || e));
      addNewsImages(uploaded);
    } finally {
      setUploading(false);
    }
  };

  const save = async (publishImmediate) => {
    if (busy) return;
    if (!form.title.trim()) {
      setErr('Tiêu đề không được trống'); return;
    }
    setBusy(true); setErr('');
    try {
      const galleryImages = normalizeImages([form.cover_url, ...(form.gallery_images || [])]);
      const payload = {
        title: form.title.trim(),
        cat: form.cat,
        author: form.author.trim() || 'Phòng Marketing',
        excerpt: form.excerpt.trim() || null,
        content: form.content || null,
        cover_url: form.cover_url || galleryImages[0] || null,
        gallery_images: galleryImages,
        published: publishImmediate !== undefined ? publishImmediate : form.published
      };
      if (data?.id) {
        const { error } = await window.dtcUpdateNews(data.id, payload);
        if (error) throw error;
      } else {
        const { error } = await window.dtcCreateNews({ ...payload, published_at: new Date().toISOString() });
        if (error) throw error;
      }
      if (onSaved) await onSaved();
      close();
    } catch (e) {
      setErr(e?.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  const excerptLength = form.excerpt.trim().length;
  const contentLength = form.content.trim().length;
  const newsImages = normalizeImages([form.cover_url, ...(form.gallery_images || [])]);

  return (
  <div className="modal-overlay" onClick={close}>
    <div className="modal" onClick={(e)=>e.stopPropagation()}>
      <div className="modal-head">
        <h3 style={{fontSize:18, fontFamily:'var(--font-display)'}}>{data?'Chỉnh sửa bài viết':'Đăng bài mới'}</h3>
        <button onClick={close}><Icon name="close" size={18} /></button>
      </div>
      <div className="modal-body">
        {err && <div style={{padding:'10px 14px', marginBottom:12, background:'rgba(200,16,46,0.1)', color:'var(--crimson)', borderRadius:8, fontSize:13}}>{err}</div>}
        <div className="editor-live-preview news-preview">
          <div className="elp-media wide" style={form.cover_url ? {backgroundImage:`url(${form.cover_url})`} : null}>
            {!form.cover_url && <Icon name="edit" size={28} />}
          </div>
          <div className="elp-body">
            <div className="elp-label">Preview bài viết</div>
            <div className="elp-meta-row"><span>{form.cat}</span><span>{form.author || 'Tác giả'}</span><span>{form.published ? 'Công khai' : 'Bản nháp'}</span></div>
            <h4>{form.title.trim() || 'Tiêu đề bài viết sẽ hiển thị tại đây'}</h4>
            <p>{form.excerpt.trim() || 'Phần tóm tắt giúp bài viết rõ hơn ở danh sách tin tức.'}</p>
            <QualityTags items={[
              !form.title.trim() && { label: 'Thiếu tiêu đề', tone: 'danger' },
              !newsImages.length && { label: 'Thiếu ảnh bìa', tone: 'warn' },
              excerptLength < 60 && { label: 'Tóm tắt ngắn', tone: 'warn' },
              contentLength < 160 && { label: 'Nội dung ngắn', tone: 'warn' },
              !form.published && { label: 'Đang lưu nháp', tone: 'muted' }
            ]} />
            <div className="elp-note">{newsImages.length || 0} ảnh đã gắn với bài viết</div>
          </div>
        </div>

        <div className="form-row full"><div><label className="label">Tiêu đề *</label>
          <input className="input" value={form.title} onChange={e=>upd('title', e.target.value)} placeholder="Tiêu đề hấp dẫn..." /></div></div>

        <div className="form-row">
          <div><label className="label">Chuyên mục</label>
            <select className="select" value={form.cat} onChange={e=>upd('cat', e.target.value)}>
              {cats.map(c=><option key={c}>{c}</option>)}
            </select></div>
          <div><label className="label">Tác giả</label>
            <input className="input" value={form.author} onChange={e=>upd('author', e.target.value)} /></div>
        </div>

        <div className="form-row full">
          <div>
            <label className="label">
              <span>Ảnh bìa</span>
              <span className="label-hint">Nên dùng 1600x900px · tỉ lệ 16:9 · WebP/JPG dưới 5MB</span>
            </label>
            <div className="upload-zone upload-zone-compact" style={{cursor:'pointer'}}
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleCover(e.dataTransfer.files?.[0]); }}>
              {form.cover_url ? (
                <div style={{display:'flex', gap:14, alignItems:'center'}}>
                  <img src={form.cover_url} alt="" style={{width:160, height:90, objectFit:'cover', borderRadius:6}} />
                  <div style={{textAlign:'left', flex:1}}>
                    <div style={{fontWeight:600, color:'var(--fg)', fontSize:13}}>Ảnh bìa hiện tại — click để đổi</div>
                    <button type="button" className="btn btn-ghost" style={{marginTop:8, padding:'4px 10px', fontSize:11}}
                      onClick={e=>{e.stopPropagation(); upd('cover_url', '');}}>Xóa ảnh</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="uz-icon"><Icon name="upload" size={28} /></div>
                  <div style={{fontWeight:600, color:'var(--fg)'}}>{uploading ? 'Đang upload…' : 'Tải ảnh bìa (PNG/JPG/WebP, ≤5MB)'}</div>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>{handleCover(e.target.files?.[0]); e.target.value = '';}} />
            </div>
            <input className="input image-url-input" placeholder="Hoặc dán URL ảnh bìa trực tiếp..."
              value={form.cover_url}
              onChange={e=>upd('cover_url', e.target.value)}
              onBlur={()=>addNewsImages([form.cover_url])} />
            <div className="media-helper">
              Ảnh bìa sẽ bị crop về 16:9 trên danh sách tin tức; đặt chữ hoặc logo cách mép ít nhất 120px để không bị cắt trên mobile.
            </div>
          </div>
        </div>

        <div className="form-row full">
          <div>
            <label className="label">
              <span>Ảnh nội dung</span>
              <span className="label-hint">Nên rộng 1200-1600px · dùng để chèn vào bài</span>
            </label>
            <div className="upload-zone upload-zone-compact" style={{cursor:'pointer'}}
              onClick={() => galleryRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleNewsImages(e.dataTransfer.files); }}>
              <div className="uz-icon"><Icon name="upload" size={26} /></div>
              <div style={{fontWeight:600, color:'var(--fg)'}}>{uploading ? 'Đang upload ảnh…' : 'Kéo thả nhiều ảnh hoặc click để upload'}</div>
              <div style={{fontSize:12, marginTop:4}}>Có thể đặt làm ảnh bìa hoặc chèn trực tiếp vào nội dung Markdown.</div>
              <input ref={galleryRef} type="file" accept="image/*" multiple style={{display:'none'}}
                onChange={e=>{handleNewsImages(e.target.files); e.target.value = '';}} />
            </div>
            {newsImages.length > 0 && (
              <div className="image-thumbs image-manager news-image-manager">
                {newsImages.map((url, i) => (
                  <div key={url} className={`it ${url === form.cover_url ? 'primary' : ''}`} style={{backgroundImage:`url(${url})`, backgroundSize:'cover', backgroundPosition:'center'}}>
                    {url === form.cover_url && <span className="primary-badge">Bìa</span>}
                    <div className="thumb-actions">
                      {url !== form.cover_url && <button type="button" onClick={() => setCoverImage(url)}>Đặt bìa</button>}
                      <button type="button" onClick={() => insertImageToContent(url)}>Chèn</button>
                      <button type="button" onClick={() => removeNewsImage(url)}>Xóa</button>
                    </div>
                    <span className="thumb-index">{i + 1}</span>
                  </div>
                ))}
                <button type="button" className="it add" onClick={() => galleryRef.current?.click()} title="Thêm ảnh"><Icon name="plus" size={20} /></button>
              </div>
            )}
            <div className="media-helper">
              Gợi ý: ảnh bài viết nên cùng tông sáng với ảnh bìa, không để chữ nhỏ trong ảnh; mỗi bài nên có 1 ảnh bìa và 2-5 ảnh minh họa nếu bài dài.
            </div>
          </div>
        </div>

        <div className="form-row full"><div><label className="label">Tóm tắt</label>
          <textarea className="input" value={form.excerpt} onChange={e=>upd('excerpt', e.target.value)} placeholder="2-3 câu tóm tắt hiển thị ở list tin tức..."></textarea></div></div>

        <div className="form-row full"><div>
          <label className="label" style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
            <span>Nội dung *</span>
            <span style={{fontSize:11, color:'var(--fg-3)', fontWeight:400}}>Hỗ trợ Markdown · Xuống dòng tự ngắt đoạn</span>
          </label>
          <textarea className="input" style={{minHeight:200, fontFamily:'var(--font-body)', lineHeight:1.6}}
            value={form.content} onChange={e=>upd('content', e.target.value)}
            placeholder="Nội dung bài viết...&#10;&#10;**In đậm**, *in nghiêng*&#10;&#10;## Tiêu đề con&#10;&#10;- Mục 1&#10;- Mục 2"></textarea>
        </div></div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:20, paddingTop:20, borderTop:'1px solid var(--border)'}}>
          <label style={{display:'flex', alignItems:'center', gap:8, fontSize:13, cursor:'pointer'}}>
            <input type="checkbox" checked={form.published} onChange={e=>upd('published', e.target.checked)} />
            Hiển thị công khai
          </label>
          <div style={{display:'flex', gap:10}}>
            <button className="btn btn-ghost" onClick={close} disabled={busy}>Hủy</button>
            <button className="btn btn-ghost" onClick={()=>save(false)} disabled={busy}>Lưu nháp</button>
            <button className="btn btn-primary" onClick={()=>save(true)} disabled={busy}>
              <Icon name={data?'edit':'plus'} size={14} />
              {busy ? 'Đang lưu…' : (data ? 'Cập nhật' : 'Đăng bài')}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const AdminPage = ({ setRoute, session, onSignOut }) => {
  const [tab, setTab] = useState('dashboard');
  const [modal, setModal] = useState(null);
  const [orders, setOrders] = useState([]);
  const openModal = (type, data) => setModal({ type, data });
  const close = () => setModal(null);

  const refreshOrders = React.useCallback(async () => {
    if (window.dtcLoadOrders) {
      const data = await window.dtcLoadOrders();
      setOrders(data);
    }
  }, []);

  React.useEffect(() => { refreshOrders(); }, [refreshOrders]);

  const titles = {
    dashboard: 'Tổng quan hệ thống',
    products: 'Quản lý sản phẩm',
    news: 'Tin tức & Khuyến mãi',
    orders: 'Đơn hàng / Tư vấn',
    branches: 'Chi nhánh ĐTC',
    ai: 'Trợ lý AI · Cấu hình & Kiến thức',
    settings: 'Thông tin thương hiệu & Liên hệ',
  };

  const email = session?.session?.user?.email || 'admin';
  const name = session?.profile?.full_name || email.split('@')[0];
  const role = session?.profile?.role || 'viewer';
  const initials = (name || 'A').split(' ').slice(-2).map(s => s[0]).join('').toUpperCase().slice(0,2);

  return (
    <div className="admin-shell">
      <AdminSidebar tab={tab} setTab={setTab} setRoute={setRoute} />
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <div style={{fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'0.16em', color:'var(--fg-3)', textTransform:'uppercase'}}>
              ADMIN · CMS · {new Date().toLocaleDateString('vi-VN')}
            </div>
            <h1 style={{marginTop:8}}>{titles[tab]}</h1>
          </div>
          <div className="topbar-tools">
            <div className="search-box"><Icon name="search" size={14} /><input placeholder="Tìm kiếm nhanh..." /></div>
            <button className="icon-btn" style={{position:'relative'}}><Icon name="bell" size={16} /><span style={{position:'absolute', top:6, right:8, width:8, height:8, borderRadius:999, background:'var(--crimson)'}}></span></button>
            <div style={{display:'flex', alignItems:'center', gap:10, padding:'4px 14px 4px 4px', borderRadius:999, background:'var(--bg-2)', border:'1px solid var(--border)'}}>
              <div style={{width:32, height:32, borderRadius:999, background:'var(--burgundy)', color:'#fff', display:'grid', placeItems:'center', fontWeight:700, fontSize:13}}>{initials}</div>
              <div>
                <div style={{fontSize:13, fontWeight:600}}>{name}</div>
                <div style={{fontSize:10, color:'var(--fg-3)', fontFamily:'var(--font-mono)', textTransform:'uppercase'}}>{role}</div>
              </div>
            </div>
            <button className="btn btn-ghost" onClick={onSignOut} title="Đăng xuất"
              style={{padding:'8px 14px', fontSize:12, gap:6}}>
              <Icon name="arrow" size={14} /> Đăng xuất
            </button>
          </div>
        </div>
        {tab==='dashboard' && <AdminDashboard orders={orders} />}
        {tab==='products' && <AdminProducts openModal={openModal} />}
        {tab==='news' && <AdminNews openModal={openModal} />}
        {tab==='orders' && <AdminOrders orders={orders} refresh={refreshOrders} />}
        {tab==='branches' && <AdminBranches openModal={openModal} />}
        {tab==='ai' && <window.DTC_AdminAISettings />}
        {tab==='settings' && <window.DTC_AdminSiteInfo />}
        {modal?.type==='product' && <ProductModal data={modal.data} close={close} />}
        {modal?.type==='news' && <NewsModal data={modal.data} close={close} onSaved={()=>window.dtcLoadData()} />}
        {modal?.type==='store' && <StoreModal data={modal.data} close={close} onSaved={()=>window.dtcLoadData()} />}
      </main>
    </div>
  );
};

window.DTC_AdminPage = AdminPage;
