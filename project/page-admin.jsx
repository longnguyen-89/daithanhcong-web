// === Admin Dashboard ===
const { Icon, BikePlaceholder } = window.DTC_Components;

const AdminSidebar = ({ tab, setTab, setRoute }) => {
  const items = [
    { section: 'TỔNG QUAN' },
    { id: 'dashboard', label: 'Dashboard', icon: 'chart' },
    { section: 'NỘI DUNG' },
    { id: 'products', label: 'Sản phẩm xe', icon: 'box', count: 12 },
    { id: 'news', label: 'Tin tức / Khuyến mãi', icon: 'edit', count: 6 },
    { section: 'KINH DOANH' },
    { id: 'orders', label: 'Đơn hàng / Tư vấn', icon: 'cart', count: 7 },
    { id: 'branches', label: 'Chi nhánh', icon: 'map', count: 7 },
    { section: 'HỆ THỐNG' },
    { id: 'settings', label: 'Thiết lập', icon: 'settings' },
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
  const [filterBrand, setFilterBrand] = useState('all');
  const [, force] = useState(0);
  const list = filterBrand === 'all' ? D.products : D.products.filter(p => p.brand === filterBrand);

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
    <div className="page-fade admin-card">
      <div className="admin-card-head">
        <h3>Quản lý sản phẩm xe ({list.length})</h3>
        <div style={{display:'flex', gap:8}}>
          <select className="select" style={{width:160, padding:'8px 12px'}}
            value={filterBrand} onChange={e => setFilterBrand(e.target.value)}>
            <option value="all">Tất cả hãng</option>
            {D.brands.map(b=><option key={b} value={b}>{b}</option>)}
          </select>
          <button className="btn btn-primary" onClick={()=>openModal('product')}><Icon name="plus" size={14} />Thêm xe mới</button>
        </div>
      </div>
      <table className="admin-table">
        <thead><tr><th>Sản phẩm</th><th>Hãng</th><th>Loại</th><th>Giá</th><th>Tồn kho</th><th>Chi nhánh</th><th>Trạng thái</th><th></th></tr></thead>
        <tbody>
          {list.map(p => (
            <tr key={p.id}>
              <td>
                <div className="product-cell">
                  <div className="mini-img"></div>
                  <div><div className="pname">{p.name}</div><div className="pmeta">ID #{p.id} · {p.year} · {p.color}</div></div>
                </div>
              </td>
              <td>{p.brand}</td>
              <td style={{fontSize:12}}>{D.categories.find(c=>c.id===p.cat)?.vi}</td>
              <td style={{fontFamily:'var(--font-display)', fontWeight:700, color:'var(--burgundy)'}}>{window.formatVND(p.price)}</td>
              <td><span className="badge badge-stock">{p.stock} xe</span></td>
              <td style={{fontSize:12}}>{p.store}</td>
              <td>{p.status==='new' ? <span className="badge badge-new">MỚI</span> : <span className="badge badge-used">CŨ</span>}</td>
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
  );
};

const AdminNews = ({ openModal }) => {
  const D = window.DTC_DATA;
  return (
    <div className="page-fade admin-card">
      <div className="admin-card-head">
        <h3>Tin tức & Khuyến mãi</h3>
        <button className="btn btn-primary" onClick={()=>openModal('news')}><Icon name="plus" size={14} />Đăng bài mới</button>
      </div>
      <table className="admin-table">
        <thead><tr><th>Tiêu đề</th><th>Chuyên mục</th><th>Tác giả</th><th>Ngày đăng</th><th>Lượt xem</th><th></th></tr></thead>
        <tbody>
          {D.news.map(n => (
            <tr key={n.id}>
              <td><div style={{fontWeight:600, maxWidth:480}}>{n.title}</div></td>
              <td><span className="badge badge-new">{n.cat}</span></td>
              <td style={{fontSize:13, color:'var(--fg-2)'}}>{n.author}</td>
              <td style={{fontFamily:'var(--font-mono)', fontSize:12}}>{n.date}</td>
              <td style={{fontFamily:'var(--font-mono)', fontWeight:700, color:'var(--burgundy)'}}>{(1200 + n.id*340).toLocaleString()}</td>
              <td><div className="actions">
                <button><Icon name="eye" size={14} /></button>
                <button onClick={()=>openModal('news', n)}><Icon name="edit" size={14} /></button>
                <button><Icon name="trash" size={14} /></button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
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

const AdminBranches = () => {
  const D = window.DTC_DATA;
  return (
    <div className="page-fade">
      <div className="admin-card" style={{marginBottom: 16}}>
        <div className="admin-card-head"><h3>7 chi nhánh ĐẠI THÀNH CÔNG</h3>
          <button className="btn btn-primary"><Icon name="plus" size={14} />Thêm chi nhánh</button>
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
                <div className="stat"><strong>{[14,11,9,7,12,6,8][s.id-1]}</strong>XE BÁN</div>
                <div className="stat"><strong>{[28,22,19,14,21,11,16][s.id-1]}</strong>ĐƠN/THÁNG</div>
              </div>
            </div>
            <div className="actions">
              <button><Icon name="edit" size={14} /></button>
              <button><Icon name="settings" size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductModal = ({ data, close }) => {
  const D = window.DTC_DATA;
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
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    if (busy) return;
    if (!form.name.trim() || !form.price) {
      setErr('Tên xe và giá là bắt buộc'); return;
    }
    setBusy(true); setErr('');
    try {
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

  return (
  <div className="modal-overlay" onClick={close}>
    <div className="modal" onClick={(e)=>e.stopPropagation()}>
      <div className="modal-head">
        <h3 style={{fontSize:18, fontFamily:'var(--font-display)'}}>{data ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
        <button onClick={close}><Icon name="close" size={18} /></button>
      </div>
      <div className="modal-body">
        {err && <div style={{padding:'10px 14px', marginBottom:12, background:'rgba(200,16,46,0.1)', color:'var(--crimson)', borderRadius:8, fontSize:13}}>{err}</div>}
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

const NewsModal = ({ data, close }) => (
  <div className="modal-overlay" onClick={close}>
    <div className="modal" onClick={(e)=>e.stopPropagation()}>
      <div className="modal-head">
        <h3 style={{fontSize:18, fontFamily:'var(--font-display)'}}>{data?'Chỉnh sửa bài viết':'Đăng bài mới'}</h3>
        <button onClick={close}><Icon name="close" size={18} /></button>
      </div>
      <div className="modal-body">
        <div className="form-row full"><div><label className="label">Tiêu đề *</label><input className="input" defaultValue={data?.title||''} placeholder="Tiêu đề hấp dẫn..." /></div></div>
        <div className="form-row">
          <div><label className="label">Chuyên mục</label><select className="select" defaultValue={data?.cat}><option>Khuyến mãi</option><option>Cẩm nang</option><option>Tin hãng</option><option>Sự kiện</option></select></div>
          <div><label className="label">Tác giả</label><input className="input" defaultValue={data?.author||'Phòng Marketing'} /></div>
        </div>
        <div className="form-row full">
          <div><label className="label">Ảnh đại diện</label>
            <div className="upload-zone"><div className="uz-icon"><Icon name="upload" size={28} /></div><div style={{fontWeight:600, color:'var(--fg)'}}>Tải ảnh bìa</div></div>
          </div>
        </div>
        <div className="form-row full"><div><label className="label">Tóm tắt</label><textarea className="input" defaultValue={data?.excerpt||''} placeholder="2-3 câu tóm tắt..."></textarea></div></div>
        <div className="form-row full"><div><label className="label">Nội dung *</label><textarea className="input" style={{minHeight:160}} placeholder="Nội dung bài viết..."></textarea></div></div>
        <div style={{display:'flex', justifyContent:'flex-end', gap:10, marginTop:20, paddingTop:20, borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={close}>Hủy</button>
          <button className="btn btn-ghost">Lưu nháp</button>
          <button className="btn btn-primary">Đăng bài</button>
        </div>
      </div>
    </div>
  </div>
);

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
    settings: 'Thiết lập',
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
            <button className="icon-btn" onClick={onSignOut} title="Đăng xuất"><Icon name="arrow" size={16} /></button>
          </div>
        </div>
        {tab==='dashboard' && <AdminDashboard orders={orders} />}
        {tab==='products' && <AdminProducts openModal={openModal} />}
        {tab==='news' && <AdminNews openModal={openModal} />}
        {tab==='orders' && <AdminOrders orders={orders} refresh={refreshOrders} />}
        {tab==='branches' && <AdminBranches />}
        {tab==='settings' && (
          <div className="admin-card" style={{padding: 40}}>
            <h3 style={{marginBottom: 14}}>Thiết lập hệ thống</h3>
            <p style={{color:'var(--fg-2)', marginBottom: 20}}>Cấu hình thông tin chung, phân quyền, footer, hotline...</p>
            <div style={{padding:16, background:'var(--bg-3)', borderRadius:8, fontSize:13}}>
              <div style={{marginBottom:8}}><strong>Email đăng nhập:</strong> {email}</div>
              <div style={{marginBottom:8}}><strong>Vai trò:</strong> {role}</div>
              <div><strong>Supabase Project:</strong> daithanhcong-web</div>
            </div>
          </div>
        )}
        {modal?.type==='product' && <ProductModal data={modal.data} close={close} />}
        {modal?.type==='news' && <NewsModal data={modal.data} close={close} />}
      </main>
    </div>
  );
};

window.DTC_AdminPage = AdminPage;
