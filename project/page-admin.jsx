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

const AdminDashboard = () => {
  const D = window.DTC_DATA;
  const months = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];
  const values = [62, 68, 71, 75, 78, 82, 79, 85, 88, 92, 95, 102];
  const max = Math.max(...values);
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
            {D.orders.slice(0,5).map(o => (
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
  return (
    <div className="page-fade admin-card">
      <div className="admin-card-head">
        <h3>Quản lý sản phẩm xe ({D.products.length})</h3>
        <div style={{display:'flex', gap:8}}>
          <select className="select" style={{width:160, padding:'8px 12px'}}><option>Tất cả hãng</option>{D.brands.map(b=><option key={b}>{b}</option>)}</select>
          <button className="btn btn-primary" onClick={()=>openModal('product')}><Icon name="plus" size={14} />Thêm xe mới</button>
        </div>
      </div>
      <table className="admin-table">
        <thead><tr><th>Sản phẩm</th><th>Hãng</th><th>Loại</th><th>Giá</th><th>Tồn kho</th><th>Chi nhánh</th><th>Trạng thái</th><th></th></tr></thead>
        <tbody>
          {D.products.map(p => (
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
                <button title="Xóa"><Icon name="trash" size={14} /></button>
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

const AdminOrders = () => {
  const D = window.DTC_DATA;
  return (
    <div className="page-fade admin-card">
      <div className="admin-card-head"><h3>Đơn hàng / Yêu cầu tư vấn</h3>
        <div style={{display:'flex', gap:8}}>
          <select className="select" style={{width:160, padding:'8px 12px'}}><option>Tất cả trạng thái</option><option>Chờ xử lý</option><option>Đã xác nhận</option><option>Đã giao</option></select>
        </div>
      </div>
      <table className="admin-table">
        <thead><tr><th>Mã</th><th>Khách hàng</th><th>Sản phẩm</th><th>Chi nhánh</th><th>Ngày</th><th>Tổng</th><th>Trạng thái</th><th></th></tr></thead>
        <tbody>
          {D.orders.map(o => (
            <tr key={o.id}>
              <td style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--burgundy)', fontWeight:700}}>{o.id}</td>
              <td><div style={{fontWeight:600}}>{o.customer}</div><div style={{fontSize:11, color:'var(--fg-3)'}}>{o.phone}</div></td>
              <td>{o.product}</td>
              <td style={{fontSize:12}}>{o.store}</td>
              <td style={{fontFamily:'var(--font-mono)', fontSize:12}}>{o.date}</td>
              <td style={{fontFamily:'var(--font-display)', fontWeight:700, color:'var(--burgundy)'}}>{window.formatVND(o.total)}</td>
              <td><StatusPill s={o.status} /></td>
              <td><div className="actions">
                <button><Icon name="eye" size={14} /></button>
                <button><Icon name="edit" size={14} /></button>
              </div></td>
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

const ProductModal = ({ data, close }) => (
  <div className="modal-overlay" onClick={close}>
    <div className="modal" onClick={(e)=>e.stopPropagation()}>
      <div className="modal-head">
        <h3 style={{fontSize:18, fontFamily:'var(--font-display)'}}>{data ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
        <button onClick={close}><Icon name="close" size={18} /></button>
      </div>
      <div className="modal-body">
        <div className="form-row full"><div><label className="label">Tên xe *</label><input className="input" defaultValue={data?.name||''} placeholder="VD: Honda SH 350i ABS" /></div></div>
        <div className="form-row">
          <div><label className="label">Hãng *</label><select className="select" defaultValue={data?.brand}>{window.DTC_DATA.brands.map(b=><option key={b}>{b}</option>)}</select></div>
          <div><label className="label">Loại xe *</label><select className="select" defaultValue={data?.cat}>{window.DTC_DATA.categories.map(c=><option key={c.id} value={c.id}>{c.vi}</option>)}</select></div>
        </div>
        <div className="form-row">
          <div><label className="label">Giá bán (₫) *</label><input className="input" type="number" defaultValue={data?.price||''} /></div>
          <div><label className="label">Giá gốc (gạch ngang)</label><input className="input" type="number" defaultValue={data?.oldPrice||''} /></div>
        </div>
        <div className="form-row">
          <div><label className="label">Dung tích (cc)</label><input className="input" type="number" defaultValue={data?.cc||''} /></div>
          <div><label className="label">Năm SX</label><input className="input" type="number" defaultValue={data?.year||2026} /></div>
        </div>
        <div className="form-row">
          <div><label className="label">Tình trạng</label><select className="select" defaultValue={data?.status}><option value="new">Xe mới</option><option value="used">Đã qua sử dụng</option></select></div>
          <div><label className="label">Tồn kho</label><input className="input" type="number" defaultValue={data?.stock||1} /></div>
        </div>
        <div className="form-row full">
          <div><label className="label">Chi nhánh</label><select className="select" defaultValue={data?.store}>{window.DTC_DATA.stores.map(s=><option key={s.id}>{s.name}</option>)}</select></div>
        </div>
        <div className="form-row full">
          <div>
            <label className="label">Hình ảnh xe</label>
            <div className="upload-zone">
              <div className="uz-icon"><Icon name="upload" size={28} /></div>
              <div style={{fontWeight:600, color:'var(--fg)'}}>Kéo thả hoặc click để upload</div>
              <div style={{fontSize:12, marginTop:4}}>PNG, JPG · Tối đa 10 ảnh · Mỗi ảnh ≤ 5MB</div>
            </div>
            <div className="image-thumbs">
              {[1,2,3,4].map(i => <div key={i} className="it"></div>)}
              <div className="it add">+</div>
            </div>
          </div>
        </div>
        <div className="form-row full">
          <div><label className="label">Mô tả & tính năng</label><textarea className="input" style={{minHeight:100}} defaultValue={data?.features?.join('\n')||''} placeholder="Mỗi dòng là 1 tính năng..."></textarea></div>
        </div>
        <div style={{display:'flex', justifyContent:'flex-end', gap:10, marginTop:20, paddingTop:20, borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={close}>Hủy</button>
          <button className="btn btn-primary"><Icon name="plus" size={14} />Lưu sản phẩm</button>
        </div>
      </div>
    </div>
  </div>
);

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

const AdminPage = ({ setRoute }) => {
  const [tab, setTab] = useState('dashboard');
  const [modal, setModal] = useState(null);
  const openModal = (type, data) => setModal({ type, data });
  const close = () => setModal(null);

  const titles = {
    dashboard: 'Tổng quan hệ thống',
    products: 'Quản lý sản phẩm',
    news: 'Tin tức & Khuyến mãi',
    orders: 'Đơn hàng / Tư vấn',
    branches: 'Chi nhánh ĐTC',
    settings: 'Thiết lập',
  };

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
              <div style={{width:32, height:32, borderRadius:999, background:'var(--burgundy)', color:'#fff', display:'grid', placeItems:'center', fontWeight:700, fontSize:13}}>NV</div>
              <div><div style={{fontSize:13, fontWeight:600}}>NV. Hoàng Long</div><div style={{fontSize:10, color:'var(--fg-3)', fontFamily:'var(--font-mono)'}}>CN THUẬN AN</div></div>
            </div>
          </div>
        </div>
        {tab==='dashboard' && <AdminDashboard />}
        {tab==='products' && <AdminProducts openModal={openModal} />}
        {tab==='news' && <AdminNews openModal={openModal} />}
        {tab==='orders' && <AdminOrders />}
        {tab==='branches' && <AdminBranches />}
        {tab==='settings' && <div className="admin-card" style={{padding: 40}}><h3 style={{marginBottom: 14}}>Thiết lập hệ thống</h3><p style={{color:'var(--fg-2)'}}>Cấu hình thông tin chung, phân quyền, footer, hotline... (Demo).</p></div>}
        {modal?.type==='product' && <ProductModal data={modal.data} close={close} />}
        {modal?.type==='news' && <NewsModal data={modal.data} close={close} />}
      </main>
    </div>
  );
};

window.DTC_AdminPage = AdminPage;
