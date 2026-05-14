// === Admin: Settings tabs (AI + Site Info) ===
const { Icon: SettingsIcon } = window.DTC_Components;

const DEFAULT_HOME_CONTENT = {
  vi: {
    hero: {
      eyebrow: 'Hệ thống xe máy chính hãng · Bình Dương',
      titlePart1: 'Đẳng cấp',
      titleAccent: 'không giới hạn,',
      titlePart2: 'cho mọi hành trình.',
      lead: 'ĐẠI THÀNH CÔNG — 7 cửa hàng phục vụ tận tâm trên toàn Bình Dương. Xe chính hãng Honda, Yamaha, SYM, VinFast với chính sách bảo hành minh bạch và dịch vụ sau bán hàng đẳng cấp showroom.',
      cta1: 'Khám phá sản phẩm',
      cta2: 'Đặt lịch lái thử'
    },
    sections: {
      newTitle: 'Sản phẩm mới về',
      newSub: 'Bộ sưu tập xe đời 2026 cập nhật mới nhất tại showroom',
      bestTitle: 'Xe bán chạy',
      bestSub: 'Top mẫu xe được khách hàng ĐTC tin chọn nhiều nhất',
      promoTitle: 'Khuyến mãi đang chạy',
      promoSub: 'Ưu đãi giới hạn cho khách đăng ký trong tháng',
      storesTitle: 'Hệ thống 7 cửa hàng',
      storesSub: 'Có mặt tại các quận huyện trọng điểm Bình Dương',
      newsTitle: 'Tin tức & Cẩm nang',
      newsSub: 'Tin tức ngành xe và bí quyết sử dụng từ chuyên gia ĐTC'
    }
  },
  en: {
    hero: {
      eyebrow: 'Authorized motorcycle network · Binh Duong',
      titlePart1: 'Premium class',
      titleAccent: 'without limits,',
      titlePart2: 'for every journey.',
      lead: 'DAI THANH CONG — 7 stores serving you across Binh Duong. Genuine Honda, Yamaha, SYM and VinFast bikes with transparent warranty and showroom-grade after-sales service.',
      cta1: 'Explore catalog',
      cta2: 'Book test ride'
    },
    sections: {
      newTitle: 'Just arrived',
      newSub: 'Latest 2026 lineup landing at our showroom',
      bestTitle: 'Best sellers',
      bestSub: 'Most-loved bikes from our customers',
      promoTitle: 'Live promotions',
      promoSub: 'Limited deals this month',
      storesTitle: 'Our 7 branches',
      storesSub: 'Across all key districts of Binh Duong',
      newsTitle: 'News & Guides',
      newsSub: 'Industry news and expert tips'
    }
  }
};

const DEFAULT_APPEARANCE = {
  theme: 'light',
  heroVariant: 'a',
  animations: true,
  density: 'comfortable'
};

const mergeDeep = (base, value) => {
  if (!value || typeof value !== 'object') return { ...base };
  const out = { ...base };
  Object.keys(value).forEach((key) => {
    if (value[key] && typeof value[key] === 'object' && !Array.isArray(value[key])) {
      out[key] = mergeDeep(base[key] || {}, value[key]);
    } else {
      out[key] = value[key];
    }
  });
  return out;
};

const SettingsField = ({ label, hint, error, children }) => (
  <div className="settings-field">
    <label className="label">
      <span>{label}</span>
      {hint && <span className="label-hint">{hint}</span>}
    </label>
    {children}
    {error && <div className="field-error">{error}</div>}
  </div>
);

const SaveStatus = ({ status }) => {
  const current = status || { state: 'idle', msg: 'Sẵn sàng chỉnh sửa' };
  const label = {
    idle: 'Sẵn sàng',
    queued: 'Chờ tự lưu',
    saving: 'Đang lưu',
    saved: 'Đã lưu',
    error: 'Có lỗi'
  }[current.state] || 'Sẵn sàng';
  return (
    <div className={`save-status ${current.state}`}>
      <span className="save-dot"></span>
      <div>
        <strong>{label}</strong>
        <span>{current.msg}</span>
      </div>
    </div>
  );
};

const SettingsTabs = ({ active, setActive, items }) => (
  <div className="settings-tabs">
    {items.map((item) => (
      <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => setActive(item.id)}>
        <SettingsIcon name={item.icon} size={15} />
        <span>{item.label}</span>
      </button>
    ))}
  </div>
);

const SettingsPanel = ({ title, desc, status, children }) => (
  <div className="settings-panel">
    <div className="settings-panel-head">
      <div>
        <h3>{title}</h3>
        {desc && <p>{desc}</p>}
      </div>
      <SaveStatus status={status} />
    </div>
    <div className="settings-panel-body">{children}</div>
  </div>
);

const useAutoSaveSetting = (value, saveFn, options = {}) => {
  const delay = options.delay || 900;
  const [status, setStatus] = React.useState({ state: 'idle', msg: 'Sẵn sàng chỉnh sửa' });
  const readyRef = React.useRef(false);
  const timerRef = React.useRef(null);
  const saveRef = React.useRef(saveFn);
  saveRef.current = saveFn;

  const saveNow = React.useCallback(async (nextValue = value) => {
    if (!nextValue) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStatus({ state: 'saving', msg: 'Đang đồng bộ lên Supabase...' });
    try {
      await saveRef.current(nextValue);
      setStatus({
        state: 'saved',
        msg: options.successMsg || `Đã lưu lúc ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`
      });
    } catch (e) {
      setStatus({ state: 'error', msg: e?.message || String(e) });
    }
  }, [value, options.successMsg]);

  React.useEffect(() => {
    if (!value) return;
    if (!readyRef.current) {
      readyRef.current = true;
      return;
    }
    setStatus({ state: 'queued', msg: `Tự lưu sau ${Math.round(delay / 100) / 10}s` });
    timerRef.current = window.setTimeout(() => saveNow(value), delay);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [value, delay, saveNow]);

  return { status, saveNow };
};

const isUrlValue = (value) => !value || /^https?:\/\/.+\..+/.test(value);
const isEmailValue = (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// ============================================
// AI Settings tab
// ============================================
const AdminAISettings = () => {
  const [config, setConfig] = React.useState(null);
  const [testInput, setTestInput] = React.useState('Tư vấn xe SH 350i giúp em');
  const [testReply, setTestReply] = React.useState('');
  const [testing, setTesting] = React.useState(false);

  const persistAIConfig = React.useCallback(async (nextConfig) => {
    await window.dtcSaveSetting('ai_config', nextConfig);
  }, []);
  const autosave = useAutoSaveSetting(config, persistAIConfig, {
    delay: 1000,
    successMsg: 'Đã tự động lưu cấu hình AI.'
  });

  React.useEffect(() => {
    (async () => {
      const settings = window.DTC_SETTINGS || await window.dtcLoadSettings();
      setConfig(settings.ai_config || {});
    })();
  }, []);

  if (!config) {
    return <div className="admin-card settings-loading">Đang tải cấu hình AI...</div>;
  }

  const upd = (k, v) => setConfig(c => ({ ...c, [k]: v }));
  const updSugg = (lang, idx, v) => {
    const key = `suggestions_${lang}`;
    const list = [...(config[key] || [])];
    list[idx] = v;
    upd(key, list);
  };
  const addSugg = (lang) => {
    const key = `suggestions_${lang}`;
    upd(key, [...(config[key] || []), '']);
  };
  const rmSugg = (lang, idx) => {
    const key = `suggestions_${lang}`;
    upd(key, (config[key] || []).filter((_, i) => i !== idx));
  };

  const runTest = async () => {
    if (!testInput.trim() || testing) return;
    setTesting(true);
    setTestReply('');
    try {
      await autosave.saveNow(config);
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: testInput, history: [], lang: 'vi' })
      });
      const data = await r.json();
      if (r.ok && data.reply) {
        setTestReply(data.reply);
      } else if (data.fallback) {
        setTestReply('AI chưa được cấu hình hoặc đang tắt. Khách sẽ nhận trả lời rule-based.');
      } else {
        setTestReply('Lỗi: ' + (data.error || 'unknown'));
      }
    } catch (e) {
      setTestReply('Lỗi gọi API: ' + (e?.message || e));
    } finally {
      setTesting(false);
    }
  };

  const suggestionsVi = config.suggestions_vi || [];
  const suggestionsEn = config.suggestions_en || [];
  const previewWelcome = config.welcome_vi || 'Xin chào anh/chị! Em là trợ lý AI của ĐTC.';

  return (
    <div className="page-fade settings-workspace">
      <SettingsPanel
        title="Trợ lý AI"
        desc="Chỉnh lời chào, phong cách tư vấn, gợi ý nhanh và tri thức bán hàng. Mọi thay đổi tự lưu sau khi dừng nhập."
        status={autosave.status}
      >
        <div className="settings-edit-grid">
          <div className="settings-form-stack">
            <div className="settings-card-row">
              <div>
                <div className="settings-row-title">Trạng thái AI</div>
                <div className="settings-row-desc">Tắt AI sẽ chuyển khách sang câu trả lời rule-based.</div>
              </div>
              <label className="switch-row">
                <input type="checkbox" checked={config.enabled !== false} onChange={e=>upd('enabled', e.target.checked)} />
                <span>{config.enabled !== false ? 'Đang bật' : 'Đang tắt'}</span>
              </label>
            </div>

            <SettingsField label="Phong cách trò chuyện">
              <div className="choice-grid">
                {[
                  {k:'friendly', l:'Thân thiện', d:'Xưng em, gọi anh/chị'},
                  {k:'formal', l:'Trang trọng', d:'Chuyên nghiệp, lịch sự'},
                  {k:'casual', l:'Thân mật', d:'Gần gũi như tư vấn viên'}
                ].map(t => (
                  <button key={t.k} className={config.tone === t.k ? 'choice-card active' : 'choice-card'} onClick={()=>upd('tone', t.k)}>
                    <strong>{t.l}</strong>
                    <span>{t.d}</span>
                  </button>
                ))}
              </div>
            </SettingsField>

            <SettingsField label="Lời chào tiếng Việt" hint={`${(config.welcome_vi || '').length}/500`}>
              <textarea className="input" maxLength={500} value={config.welcome_vi || ''} onChange={e=>upd('welcome_vi', e.target.value)} />
            </SettingsField>

            <SettingsField label="Lời chào English" hint={`${(config.welcome_en || '').length}/500`}>
              <textarea className="input" maxLength={500} value={config.welcome_en || ''} onChange={e=>upd('welcome_en', e.target.value)} />
            </SettingsField>

            <SettingsField label="Câu hỏi gợi ý tiếng Việt">
              {suggestionsVi.map((s, i) => (
                <div key={i} className="setting-inline-row">
                  <input className="input" value={s} onChange={e=>updSugg('vi', i, e.target.value)} />
                  <button className="icon-btn" onClick={()=>rmSugg('vi', i)} title="Xóa"><SettingsIcon name="trash" size={14} /></button>
                </div>
              ))}
              <button className="btn btn-ghost small" onClick={()=>addSugg('vi')}><SettingsIcon name="plus" size={12} /> Thêm gợi ý</button>
            </SettingsField>

            <SettingsField label="Câu hỏi gợi ý English">
              {suggestionsEn.map((s, i) => (
                <div key={i} className="setting-inline-row">
                  <input className="input" value={s} onChange={e=>updSugg('en', i, e.target.value)} />
                  <button className="icon-btn" onClick={()=>rmSugg('en', i)} title="Xóa"><SettingsIcon name="trash" size={14} /></button>
                </div>
              ))}
              <button className="btn btn-ghost small" onClick={()=>addSugg('en')}><SettingsIcon name="plus" size={12} /> Add suggestion</button>
            </SettingsField>

            <SettingsField label="Kiến thức bổ sung" hint={`${(config.extra_knowledge || '').length} ký tự`}>
              <textarea className="input mono-area" value={config.extra_knowledge || ''} onChange={e=>upd('extra_knowledge', e.target.value)}
                placeholder={'CHÍNH SÁCH:\n- Trả góp 0% 12 tháng đầu\n- Bảo hành chính hãng\n\nKHUYẾN MÃI:\n- SH giảm 5 triệu'} />
            </SettingsField>
          </div>

          <div className="settings-preview-column">
            <div className="settings-preview-card">
              <div className="preview-label">Preview chat</div>
              <div className="ai-preview-box">
                <div className="ai-preview-head">
                  <div className="ai-avatar">AI</div>
                  <div>
                    <strong>Trợ lý ĐTC</strong>
                    <span>{config.enabled !== false ? 'Online' : 'Tạm tắt'}</span>
                  </div>
                </div>
                <div className="ai-preview-msg">{previewWelcome}</div>
                <div className="ai-preview-suggestions">
                  {suggestionsVi.filter(Boolean).slice(0, 4).map((s, i) => <button key={i}>{s}</button>)}
                </div>
              </div>
            </div>

            <div className="settings-preview-card">
              <div className="preview-label">Test nhanh</div>
              <textarea className="input" value={testInput} onChange={e=>setTestInput(e.target.value)} />
              <button className="btn btn-gold full" onClick={runTest} disabled={testing}>
                <SettingsIcon name="send" size={14} /> {testing ? 'Đang gọi AI...' : 'Test AI'}
              </button>
              {testReply && <div className="test-reply">{testReply}</div>}
            </div>
          </div>
        </div>
      </SettingsPanel>
    </div>
  );
};

// ============================================
// Site Info tab
// ============================================
const AdminSiteInfo = () => {
  const [active, setActive] = React.useState('brand');
  const [info, setInfo] = React.useState(null);
  const [homeContent, setHomeContent] = React.useState(null);
  const [appearance, setAppearance] = React.useState(null);

  const persistBrandInfo = React.useCallback(async (nextInfo) => {
    await window.dtcSaveSetting('brand_info', nextInfo);
  }, []);
  const persistHomeContent = React.useCallback(async (nextHome) => {
    await window.dtcSaveSetting('home_content', nextHome);
  }, []);
  const persistAppearance = React.useCallback(async (nextAppearance) => {
    await window.dtcSaveSetting('appearance', nextAppearance);
  }, []);

  const brandSave = useAutoSaveSetting(info, persistBrandInfo, { delay: 900, successMsg: 'Đã tự động lưu thương hiệu.' });
  const homeSave = useAutoSaveSetting(homeContent, persistHomeContent, { delay: 900, successMsg: 'Đã tự động lưu nội dung trang chủ.' });
  const appearanceSave = useAutoSaveSetting(appearance, persistAppearance, { delay: 700, successMsg: 'Đã tự động lưu giao diện.' });

  React.useEffect(() => {
    (async () => {
      const settings = window.DTC_SETTINGS || await window.dtcLoadSettings();
      setInfo(settings.brand_info || {});
      setHomeContent(mergeDeep(DEFAULT_HOME_CONTENT, settings.home_content || {}));
      setAppearance({ ...DEFAULT_APPEARANCE, ...(settings.appearance || {}) });
    })();
  }, []);

  if (!info || !homeContent || !appearance) {
    return <div className="admin-card settings-loading">Đang tải cấu hình website...</div>;
  }

  const updInfo = (k, v) => setInfo(b => ({ ...b, [k]: v }));
  const updSocial = (k, v) => setInfo(b => ({ ...b, social: { ...(b.social || {}), [k]: v } }));
  const updHome = (lang, group, k, v) => setHomeContent(h => ({
    ...h,
    [lang]: {
      ...h[lang],
      [group]: { ...(h[lang]?.[group] || {}), [k]: v }
    }
  }));
  const updAppearance = (k, v) => setAppearance(a => ({ ...a, [k]: v }));

  const currentStatus = active === 'home' ? homeSave.status : active === 'appearance' ? appearanceSave.status : brandSave.status;
  const homeVi = homeContent.vi || DEFAULT_HOME_CONTENT.vi;
  const hero = homeVi.hero || DEFAULT_HOME_CONTENT.vi.hero;
  const sections = homeVi.sections || DEFAULT_HOME_CONTENT.vi.sections;
  const social = info.social || {};
  const warnings = [
    !info.name?.trim() && 'Tên thương hiệu đang trống.',
    !info.hotline?.trim() && 'Hotline đang trống.',
    !isEmailValue(info.email) && 'Email chưa đúng định dạng.',
    !isUrlValue(social.facebook) && 'Facebook phải bắt đầu bằng http:// hoặc https://.',
    !isUrlValue(social.youtube) && 'YouTube phải bắt đầu bằng http:// hoặc https://.',
    !isUrlValue(social.tiktok) && 'TikTok phải bắt đầu bằng http:// hoặc https://.'
  ].filter(Boolean);

  const tabs = [
    { id: 'brand', label: 'Thương hiệu', icon: 'settings' },
    { id: 'home', label: 'Trang chủ', icon: 'grid' },
    { id: 'contact', label: 'Liên hệ & Social', icon: 'phone' },
    { id: 'appearance', label: 'Giao diện', icon: 'sun' }
  ];

  return (
    <div className="page-fade settings-workspace">
      <div className="settings-hero">
        <div>
          <h2>Tùy chỉnh website</h2>
          <p>Quản trị có thể đổi nội dung chính, hotline, social, hero và giao diện mà không cần sửa code. Mọi thay đổi tự lưu và có preview bên cạnh.</p>
        </div>
        <SaveStatus status={currentStatus} />
      </div>

      <SettingsTabs active={active} setActive={setActive} items={tabs} />

      {warnings.length > 0 && (
        <div className="settings-warning">
          <strong>Cần kiểm tra:</strong>
          {warnings.map((w, i) => <span key={i}>{w}</span>)}
        </div>
      )}

      {active === 'brand' && (
        <SettingsPanel title="Thương hiệu" desc="Tên, slogan và nhận diện hiển thị ở header, footer, AI và thông báo." status={brandSave.status}>
          <div className="settings-edit-grid">
            <div className="settings-form-stack">
              <div className="form-row">
                <SettingsField label="Tên thương hiệu" error={!info.name?.trim() ? 'Bắt buộc' : ''}>
                  <input className="input" value={info.name || ''} onChange={e=>updInfo('name', e.target.value)} />
                </SettingsField>
                <SettingsField label="Tagline">
                  <input className="input" value={info.tagline || ''} onChange={e=>updInfo('tagline', e.target.value)} />
                </SettingsField>
              </div>
              <SettingsField label="Slogan tiếng Việt">
                <input className="input" value={info.slogan_vi || ''} onChange={e=>updInfo('slogan_vi', e.target.value)} />
              </SettingsField>
              <SettingsField label="Slogan English">
                <input className="input" value={info.slogan_en || ''} onChange={e=>updInfo('slogan_en', e.target.value)} />
              </SettingsField>
            </div>
            <div className="settings-preview-card">
              <div className="preview-label">Preview header/footer</div>
              <div className="brand-preview">
                <img src="assets/logo.png" alt="" />
                <div>
                  <strong>{info.name || 'ĐẠI THÀNH CÔNG'}</strong>
                  <span>{info.tagline || 'Premium Motorcycle Network'}</span>
                </div>
              </div>
              <div className="footer-preview">{info.slogan_vi || 'Slogan hiển thị ở footer'}</div>
            </div>
          </div>
        </SettingsPanel>
      )}

      {active === 'home' && (
        <SettingsPanel title="Trang chủ" desc="Nội dung hero, CTA và tiêu đề các khu quan trọng trên trang chủ." status={homeSave.status}>
          <div className="settings-edit-grid">
            <div className="settings-form-stack">
              <div className="settings-subhead">Hero tiếng Việt</div>
              <SettingsField label="Dòng mô tả nhỏ">
                <input className="input" value={hero.eyebrow || ''} onChange={e=>updHome('vi', 'hero', 'eyebrow', e.target.value)} />
              </SettingsField>
              <div className="form-row">
                <SettingsField label="Tiêu đề phần 1">
                  <input className="input" value={hero.titlePart1 || ''} onChange={e=>updHome('vi', 'hero', 'titlePart1', e.target.value)} />
                </SettingsField>
                <SettingsField label="Cụm nhấn mạnh">
                  <input className="input" value={hero.titleAccent || ''} onChange={e=>updHome('vi', 'hero', 'titleAccent', e.target.value)} />
                </SettingsField>
              </div>
              <SettingsField label="Tiêu đề phần 2">
                <input className="input" value={hero.titlePart2 || ''} onChange={e=>updHome('vi', 'hero', 'titlePart2', e.target.value)} />
              </SettingsField>
              <SettingsField label="Đoạn giới thiệu" hint={`${(hero.lead || '').length}/360`}>
                <textarea className="input" maxLength={360} value={hero.lead || ''} onChange={e=>updHome('vi', 'hero', 'lead', e.target.value)} />
              </SettingsField>
              <div className="form-row">
                <SettingsField label="CTA chính">
                  <input className="input" value={hero.cta1 || ''} onChange={e=>updHome('vi', 'hero', 'cta1', e.target.value)} />
                </SettingsField>
                <SettingsField label="CTA phụ">
                  <input className="input" value={hero.cta2 || ''} onChange={e=>updHome('vi', 'hero', 'cta2', e.target.value)} />
                </SettingsField>
              </div>
              <div className="settings-subhead">Các khu nội dung</div>
              <div className="form-row">
                <SettingsField label="Sản phẩm mới - tiêu đề">
                  <input className="input" value={sections.newTitle || ''} onChange={e=>updHome('vi', 'sections', 'newTitle', e.target.value)} />
                </SettingsField>
                <SettingsField label="Sản phẩm mới - mô tả">
                  <input className="input" value={sections.newSub || ''} onChange={e=>updHome('vi', 'sections', 'newSub', e.target.value)} />
                </SettingsField>
              </div>
              <div className="form-row">
                <SettingsField label="Khuyến mãi - tiêu đề">
                  <input className="input" value={sections.promoTitle || ''} onChange={e=>updHome('vi', 'sections', 'promoTitle', e.target.value)} />
                </SettingsField>
                <SettingsField label="Tin tức - tiêu đề">
                  <input className="input" value={sections.newsTitle || ''} onChange={e=>updHome('vi', 'sections', 'newsTitle', e.target.value)} />
                </SettingsField>
              </div>
            </div>
            <div className="settings-preview-card sticky-preview">
              <div className="preview-label">Preview hero trang chủ</div>
              <div className={`home-hero-preview variant-${appearance.heroVariant}`}>
                <div className="mini-eyebrow">{hero.eyebrow}</div>
                <h1>{hero.titlePart1} <span>{hero.titleAccent}</span><br />{hero.titlePart2}</h1>
                <p>{hero.lead}</p>
                <div className="mini-actions">
                  <button>{hero.cta1}</button>
                  <button>{hero.cta2}</button>
                </div>
              </div>
              <div className="section-preview-list">
                <div><strong>{sections.newTitle}</strong><span>{sections.newSub}</span></div>
                <div><strong>{sections.promoTitle}</strong><span>{sections.promoSub}</span></div>
                <div><strong>{sections.newsTitle}</strong><span>{sections.newsSub}</span></div>
              </div>
            </div>
          </div>
        </SettingsPanel>
      )}

      {active === 'contact' && (
        <SettingsPanel title="Liên hệ & Social" desc="Thông tin này xuất hiện ở header, footer, nút nổi và phần liên hệ." status={brandSave.status}>
          <div className="settings-edit-grid">
            <div className="settings-form-stack">
              <div className="form-row">
                <SettingsField label="Hotline" error={!info.hotline?.trim() ? 'Bắt buộc' : ''}>
                  <input className="input" value={info.hotline || ''} onChange={e=>updInfo('hotline', e.target.value)} />
                </SettingsField>
                <SettingsField label="Giờ mở cửa">
                  <input className="input" value={info.hotline_hours || ''} onChange={e=>updInfo('hotline_hours', e.target.value)} />
                </SettingsField>
              </div>
              <div className="form-row">
                <SettingsField label="Email" error={!isEmailValue(info.email) ? 'Email chưa đúng định dạng' : ''}>
                  <input className="input" type="email" value={info.email || ''} onChange={e=>updInfo('email', e.target.value)} />
                </SettingsField>
                <SettingsField label="Zalo OA">
                  <input className="input" value={info.zalo_oa || ''} onChange={e=>updInfo('zalo_oa', e.target.value)} />
                </SettingsField>
              </div>
              <SettingsField label="Địa chỉ trụ sở">
                <input className="input" value={info.hq_address || ''} onChange={e=>updInfo('hq_address', e.target.value)} />
              </SettingsField>
              <div className="form-row">
                <SettingsField label="Facebook" error={!isUrlValue(social.facebook) ? 'URL chưa hợp lệ' : ''}>
                  <input className="input" value={social.facebook || ''} onChange={e=>updSocial('facebook', e.target.value)} />
                </SettingsField>
                <SettingsField label="YouTube" error={!isUrlValue(social.youtube) ? 'URL chưa hợp lệ' : ''}>
                  <input className="input" value={social.youtube || ''} onChange={e=>updSocial('youtube', e.target.value)} />
                </SettingsField>
              </div>
              <SettingsField label="TikTok" error={!isUrlValue(social.tiktok) ? 'URL chưa hợp lệ' : ''}>
                <input className="input" value={social.tiktok || ''} onChange={e=>updSocial('tiktok', e.target.value)} />
              </SettingsField>
            </div>
            <div className="settings-preview-card">
              <div className="preview-label">Preview liên hệ</div>
              <div className="contact-preview">
                <div><SettingsIcon name="phone" size={16} /><strong>{info.hotline || '1900 6789'}</strong></div>
                <div><SettingsIcon name="clock" size={16} /><span>{info.hotline_hours || '07:30 - 21:00'}</span></div>
                <div><SettingsIcon name="mail" size={16} /><span>{info.email || 'info@daithanhcong.vn'}</span></div>
                <div><SettingsIcon name="map" size={16} /><span>{info.hq_address || 'Địa chỉ trụ sở'}</span></div>
              </div>
            </div>
          </div>
        </SettingsPanel>
      )}

      {active === 'appearance' && (
        <SettingsPanel title="Giao diện" desc="Thiết lập mặc định cho theme, hero và mật độ hiển thị." status={appearanceSave.status}>
          <div className="settings-edit-grid">
            <div className="settings-form-stack">
              <SettingsField label="Theme mặc định">
                <div className="choice-grid">
                  {[
                    { k: 'light', l: 'Sáng', d: 'Nền sáng, dễ đọc' },
                    { k: 'dark', l: 'Tối', d: 'Nền tối, nổi bật màu vàng' }
                  ].map(item => (
                    <button key={item.k} className={appearance.theme === item.k ? 'choice-card active' : 'choice-card'} onClick={()=>updAppearance('theme', item.k)}>
                      <strong>{item.l}</strong><span>{item.d}</span>
                    </button>
                  ))}
                </div>
              </SettingsField>
              <SettingsField label="Kiểu hero">
                <div className="choice-grid three">
                  {[
                    { k: 'a', l: 'Cinematic', d: 'Ảnh xe bên phải' },
                    { k: 'b', l: 'Centered', d: 'Nội dung ở giữa' },
                    { k: 'c', l: 'Editorial', d: 'Nền sáng hiện đại' }
                  ].map(item => (
                    <button key={item.k} className={appearance.heroVariant === item.k ? 'choice-card active' : 'choice-card'} onClick={()=>updAppearance('heroVariant', item.k)}>
                      <strong>{item.l}</strong><span>{item.d}</span>
                    </button>
                  ))}
                </div>
              </SettingsField>
              <SettingsField label="Mật độ giao diện">
                <div className="choice-grid">
                  {[
                    { k: 'comfortable', l: 'Thoáng', d: 'Dễ đọc, nhiều khoảng thở' },
                    { k: 'compact', l: 'Gọn', d: 'Nhiều dữ liệu hơn mỗi màn hình' }
                  ].map(item => (
                    <button key={item.k} className={appearance.density === item.k ? 'choice-card active' : 'choice-card'} onClick={()=>updAppearance('density', item.k)}>
                      <strong>{item.l}</strong><span>{item.d}</span>
                    </button>
                  ))}
                </div>
              </SettingsField>
              <div className="settings-card-row">
                <div>
                  <div className="settings-row-title">Animation</div>
                  <div className="settings-row-desc">Tắt khi cần giao diện nhẹ hơn trên máy yếu.</div>
                </div>
                <label className="switch-row">
                  <input type="checkbox" checked={appearance.animations !== false} onChange={e=>updAppearance('animations', e.target.checked)} />
                  <span>{appearance.animations !== false ? 'Đang bật' : 'Đang tắt'}</span>
                </label>
              </div>
            </div>
            <div className="settings-preview-card">
              <div className="preview-label">Preview giao diện</div>
              <div className={`appearance-preview ${appearance.theme}`}>
                <div className="ap-header">
                  <span>{info.name || 'ĐTC'}</span>
                  <button>{hero.cta1}</button>
                </div>
                <div className="ap-hero">
                  <strong>{hero.titlePart1} {hero.titleAccent}</strong>
                  <p>{hero.lead}</p>
                </div>
                <div className="ap-row">
                  <div></div><div></div><div></div>
                </div>
              </div>
            </div>
          </div>
        </SettingsPanel>
      )}
    </div>
  );
};

window.DTC_AdminAISettings = AdminAISettings;
window.DTC_AdminSiteInfo = AdminSiteInfo;
