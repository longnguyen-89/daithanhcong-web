// === Supabase client + data loader ===
window.DTC_CONFIG = {
  supabaseUrl: 'https://mftubiaywawjggpwobor.supabase.co',
  supabaseKey: 'sb_publishable_i8JdbK6A-ZpRWS11HYrOzQ_DicI2tgo'
};

(function initSupabase() {
  if (typeof supabase === 'undefined' || !supabase.createClient) {
    setTimeout(initSupabase, 80);
    return;
  }
  window.dtcSupabase = supabase.createClient(
    window.DTC_CONFIG.supabaseUrl,
    window.DTC_CONFIG.supabaseKey,
    { auth: { persistSession: true, autoRefreshToken: true, storageKey: 'dtc-auth' } }
  );
  window.dispatchEvent(new CustomEvent('dtc:supabase-ready'));
})();

function mapProduct(row, storeMap) {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    cat: row.cat,
    year: row.year,
    price: Number(row.price),
    oldPrice: row.old_price ? Number(row.old_price) : undefined,
    badge: row.badge || undefined,
    cc: row.cc,
    color: row.color,
    status: row.status,
    stock: row.stock,
    store: storeMap?.[row.store_id]?.name || '',
    storeId: row.store_id,
    mileage: row.mileage,
    fuel: row.fuel,
    features: Array.isArray(row.features) ? row.features : [],
    image: row.image_url || null
  };
}

function mapStore(row) {
  return {
    id: row.id,
    name: row.name,
    addr: row.addr,
    phone: row.phone,
    staff: row.staff,
    x: Number(row.map_x),
    y: Number(row.map_y)
  };
}

function mapNews(row) {
  return {
    id: row.id,
    cat: row.cat,
    title: row.title,
    excerpt: row.excerpt,
    author: row.author,
    date: new Date(row.published_at).toLocaleDateString('vi-VN')
  };
}

function mapOrder(row) {
  return {
    id: row.id,
    customer: row.customer,
    phone: row.phone,
    product: row.product_name,
    store: row.store_name,
    total: Number(row.total),
    status: row.status,
    date: new Date(row.created_at).toLocaleDateString('vi-VN')
  };
}

window.dtcLoadData = async function() {
  if (!window.dtcSupabase) return false;
  try {
    const sb = window.dtcSupabase;
    const [storesRes, productsRes, newsRes] = await Promise.all([
      sb.from('stores').select('*').eq('is_active', true).order('id'),
      sb.from('products').select('*').eq('is_active', true).order('id'),
      sb.from('news').select('*').eq('published', true).order('published_at', { ascending: false })
    ]);

    if (storesRes.error) throw storesRes.error;
    if (productsRes.error) throw productsRes.error;
    if (newsRes.error) throw newsRes.error;

    const storesById = {};
    (storesRes.data || []).forEach(s => { storesById[s.id] = s; });

    window.DTC_DATA.stores = (storesRes.data || []).map(mapStore);
    window.DTC_DATA.products = (productsRes.data || []).map(p => mapProduct(p, storesById));
    window.DTC_DATA.news = (newsRes.data || []).map(mapNews);

    window.dispatchEvent(new CustomEvent('dtc:data-loaded'));
    return true;
  } catch (e) {
    console.warn('[DTC] Could not load from Supabase, using mock:', e?.message || e);
    return false;
  }
};

window.dtcLoadOrders = async function() {
  if (!window.dtcSupabase) return [];
  const { data, error } = await window.dtcSupabase
    .from('orders').select('*').order('created_at', { ascending: false }).limit(100);
  if (error) {
    console.warn('[DTC] Could not load orders:', error.message);
    return [];
  }
  return (data || []).map(mapOrder);
};

window.dtcSignIn = async function(email, password) {
  return window.dtcSupabase.auth.signInWithPassword({ email, password });
};

window.dtcSignOut = async function() {
  return window.dtcSupabase.auth.signOut();
};

window.dtcGetSession = async function() {
  if (!window.dtcSupabase) return null;
  const { data } = await window.dtcSupabase.auth.getSession();
  if (!data?.session) return null;
  const userId = data.session.user.id;
  const { data: profile } = await window.dtcSupabase
    .from('profiles').select('*').eq('id', userId).maybeSingle();
  return { session: data.session, profile };
};

window.dtcOnAuthChange = function(cb) {
  if (!window.dtcSupabase) return () => {};
  const { data } = window.dtcSupabase.auth.onAuthStateChange((_event, session) => cb(session));
  return () => data.subscription.unsubscribe();
};

window.dtcSubmitOrder = async function(payload) {
  if (!window.dtcSupabase) throw new Error('Supabase not ready');
  let id;
  try {
    const { data: rpcId } = await window.dtcSupabase.rpc('generate_order_id');
    id = rpcId;
  } catch (_) {
    const yr = new Date().getFullYear();
    const tail = String(Date.now() % 100000).padStart(5, '0');
    id = `DTC-${yr}-${tail}`;
  }
  return window.dtcSupabase.from('orders').insert([{
    id,
    customer: payload.customer,
    phone: payload.phone,
    email: payload.email || null,
    product_id: payload.productId || null,
    product_name: payload.productName || null,
    store_id: payload.storeId || null,
    store_name: payload.storeName || null,
    total: payload.total || 0,
    message: payload.message || null,
    source: 'web',
    status: 'pending'
  }]).select().single();
};

window.dtcUpdateProduct = async function(id, fields) {
  return window.dtcSupabase.from('products').update(fields).eq('id', id).select().single();
};
window.dtcCreateProduct = async function(fields) {
  return window.dtcSupabase.from('products').insert([fields]).select().single();
};
window.dtcDeleteProduct = async function(id) {
  return window.dtcSupabase.from('products').update({ is_active: false }).eq('id', id);
};
window.dtcUpdateOrder = async function(id, fields) {
  return window.dtcSupabase.from('orders').update(fields).eq('id', id).select().single();
};

// Upload image to Supabase Storage (returns public URL)
window.dtcUploadImage = async function(file, folder) {
  if (!window.dtcSupabase) throw new Error('Supabase not ready');
  if (!file) throw new Error('No file provided');
  if (file.size > 5 * 1024 * 1024) throw new Error('Ảnh > 5MB. Vui lòng nén lại.');

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const safeFolder = (folder || 'misc').replace(/[^a-z0-9-]/gi, '-');
  const fileName = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;

  const { error } = await window.dtcSupabase.storage
    .from('public-images')
    .upload(fileName, file, { cacheControl: '31536000', contentType: file.type, upsert: false });
  if (error) throw error;

  const { data } = window.dtcSupabase.storage.from('public-images').getPublicUrl(fileName);
  return { path: fileName, url: data.publicUrl };
};

window.dtcDeleteImage = async function(path) {
  if (!window.dtcSupabase) return;
  return window.dtcSupabase.storage.from('public-images').remove([path]);
};
