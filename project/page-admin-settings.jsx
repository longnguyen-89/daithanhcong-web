// === Admin: Settings tabs (AI + Site Info) ===
const { Icon: SettingsIcon } = window.DTC_Components;

const SettingsField = ({ label, hint, children }) => (
  <div style={{marginBottom: 18}}>
    <label className="label" style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
      <span>{label}</span>
      {hint && <span style={{fontSize:11, color:'var(--fg-3)', fontWeight:400, fontFamily:'var(--font-body)'}}>{hint}</span>}
    </label>
    {children}
  </div>
);

const Toast = ({ kind, msg }) => (
  msg ? (
    <div style={{
      padding:'10px 14px', marginBottom:14, borderRadius:8, fontSize:13,
      background: kind==='ok' ? 'rgba(46,160,67,0.1)' : 'rgba(200,16,46,0.1)',
      color: kind==='ok' ? '#1a7f37' : 'var(--crimson)',
      border: `1px solid ${kind==='ok' ? 'rgba(46,160,67,0.3)' : 'rgba(200,16,46,0.3)'}`
    }}>{msg}</div>
  ) : null
);

// ============================================
// AI Settings tab — chỉnh AI từ giao diện
// ============================================
const AdminAISettings = () => {
  const [config, setConfig] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [testInput, setTestInput] = React.useState('Tư vấn xe SH 350i giúp em');
  const [testReply, setTestReply] = React.useState('');
  const [testing, setTesting] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const settings = window.DTC_SETTINGS || await window.dtcLoadSettings();
      setConfig(settings.ai_config || {});
    })();
  }, []);

  if (!config) {
    return <div className="admin-card" style={{padding:40, textAlign:'center', color:'var(--fg-3)'}}>Đang tải cấu hình AI…</div>;
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

  const save = async () => {
    setBusy(true); setToast(null);
    try {
      await window.dtcSaveSetting('ai_config', config);
      setToast({ kind:'ok', msg:'Đã lưu cấu hình AI. Thay đổi áp dụng ngay cho cuộc trò chuyện mới.' });
      setTimeout(() => setToast(null), 4000);
    } catch (e) {
      setToast({ kind:'err', msg:'Lưu thất bại: ' + (e?.message || e) });
    } finally {
      setBusy(false);
    }
  };

  const runTest = async () => {
    if (!testInput.trim() || testing) return;
    setTesting(true); setTestReply('');
    try {
      // Save first so test uses latest config
      await window.dtcSaveSetting('ai_config', config);
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: testInput, history: [], lang: 'vi' })
      });
      const data = await r.json();
      if (r.ok && data.reply) {
        setTestReply(data.reply);
      } else if (data.fallback) {
        setTestReply('⚠️ AI chưa được cấu hình hoặc bị tắt. Khách sẽ nhận trả lời rule-based.');
      } else {
        setTestReply('Lỗi: ' + (data.error || 'unknown'));
      }
    } catch (e) {
      setTestReply('Lỗi gọi API: ' + (e?.message || e));
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="page-fade">
      <Toast kind={toast?.kind} msg={toast?.msg} />

      <div className="admin-grid-2">
        <div className="admin-card" style={{padding: 28}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 22}}>
            <h3 style={{fontFamily:'var(--font-display)'}}>Cấu hình trợ lý AI</h3>
            <label style={{display:'flex', alignItems:'center', gap:8, fontSize:13, cursor:'pointer'}}>
              <input type="checkbox" checked={config.enabled !== false} onChange={e=>upd('enabled', e.target.checked)} />
              {config.enabled !== false ? 'BẬT' : 'TẮT'}
            </label>
          </div>

          <SettingsField label="Phong cách trò chuyện">
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {[
                {k:'friendly', l:'Thân thiện', d:'Xưng "em"'},
                {k:'formal', l:'Trang trọng', d:'Xưng "chúng tôi"'},
                {k:'casual', l:'Thân mật', d:'Xưng "mình"'}
              ].map(t => (
                <label key={t.k} style={{
                  flex: 1, minWidth: 130, padding:'10px 14px', borderRadius:8, cursor:'pointer',
                  border: `2px solid ${config.tone === t.k ? 'var(--burgundy)' : 'var(--border)'}`,
                  background: config.tone === t.k ? 'rgba(140,0,0,0.04)' : 'transparent'
                }}>
                  <input type="radio" name="tone" value={t.k} checked={config.tone === t.k} onChange={()=>upd('tone', t.k)}
                    style={{display:'none'}} />
                  <div style={{fontWeight:600, fontSize:13}}>{t.l}</div>
                  <div style={{fontSize:11, color:'var(--fg-3)', marginTop:2}}>{t.d}</div>
                </label>
              ))}
            </div>
          </SettingsField>

          <SettingsField label="Lời chào (Tiếng Việt)" hint={`${(config.welcome_vi||'').length}/500`}>
            <textarea className="input" style={{minHeight:80}} maxLength={500}
              value={config.welcome_vi || ''} onChange={e=>upd('welcome_vi', e.target.value)} />
          </SettingsField>

          <SettingsField label="Lời chào (English)" hint={`${(config.welcome_en||'').length}/500`}>
            <textarea className="input" style={{minHeight:80}} maxLength={500}
              value={config.welcome_en || ''} onChange={e=>upd('welcome_en', e.target.value)} />
          </SettingsField>

          <SettingsField label="Câu hỏi gợi ý (VI)" hint="Hiện trên giao diện chat">
            {(config.suggestions_vi || []).map((s, i) => (
              <div key={i} style={{display:'flex', gap:6, marginBottom:6}}>
                <input className="input" value={s} onChange={e=>updSugg('vi', i, e.target.value)} />
                <button className="icon-btn" onClick={()=>rmSugg('vi', i)} title="Xóa"><SettingsIcon name="trash" size={14} /></button>
              </div>
            ))}
            <button className="btn btn-ghost" onClick={()=>addSugg('vi')} style={{padding:'6px 12px', fontSize:12}}>
              <SettingsIcon name="plus" size={12} /> Thêm gợi ý
            </button>
          </SettingsField>

          <SettingsField label="Câu hỏi gợi ý (EN)">
            {(config.suggestions_en || []).map((s, i) => (
              <div key={i} style={{display:'flex', gap:6, marginBottom:6}}>
                <input className="input" value={s} onChange={e=>updSugg('en', i, e.target.value)} />
                <button className="icon-btn" onClick={()=>rmSugg('en', i)} title="Xóa"><SettingsIcon name="trash" size={14} /></button>
              </div>
            ))}
            <button className="btn btn-ghost" onClick={()=>addSugg('en')} style={{padding:'6px 12px', fontSize:12}}>
              <SettingsIcon name="plus" size={12} /> Add suggestion
            </button>
          </SettingsField>

          <SettingsField
            label="📚 Kiến thức bổ sung (cho AI tham khảo)"
            hint={`${(config.extra_knowledge||'').length} ký tự`}>
            <textarea className="input" style={{minHeight: 180, fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.5}}
              value={config.extra_knowledge || ''} onChange={e=>upd('extra_knowledge', e.target.value)}
              placeholder="VD:&#10;CHÍNH SÁCH:&#10;- Trả góp 0% 12 tháng đầu&#10;- Bảo hành chính hãng 24 tháng&#10;&#10;KHUYẾN MÃI THÁNG NÀY:&#10;- SH giảm 5tr&#10;- Tặng phụ kiện cho Exciter&#10;&#10;FAQ:&#10;- Có giao xe tận nhà không? Có, miễn phí trong nội thành." />
            <div style={{fontSize:11, color:'var(--fg-3)', marginTop:6, lineHeight:1.5}}>
              💡 Liệt kê khuyến mãi, FAQ, chính sách, đặc thù từng dòng xe... AI sẽ dùng làm tài liệu tham chiếu khi tư vấn khách.
            </div>
          </SettingsField>

          <button className="btn btn-primary" onClick={save} disabled={busy} style={{width:'100%', justifyContent:'center', padding:'12px'}}>
            <SettingsIcon name="edit" size={14} /> {busy ? 'Đang lưu…' : 'Lưu cấu hình AI'}
          </button>
        </div>

        {/* Live test panel */}
        <div className="admin-card" style={{padding: 28, alignSelf:'flex-start', position:'sticky', top: 20}}>
          <h3 style={{fontFamily:'var(--font-display)', marginBottom: 6}}>Thử nghiệm trực tiếp</h3>
          <p style={{fontSize:13, color:'var(--fg-3)', marginBottom: 18}}>
            Gõ câu hỏi giả lập để xem AI phản hồi với cấu hình hiện tại.
          </p>
          <SettingsField label="Câu hỏi của khách">
            <textarea className="input" style={{minHeight:70}}
              value={testInput} onChange={e=>setTestInput(e.target.value)} />
          </SettingsField>
          <button className="btn btn-gold" onClick={runTest} disabled={testing} style={{width:'100%', justifyContent:'center'}}>
            <SettingsIcon name="send" size={14} /> {testing ? 'Đang gọi AI…' : 'Test AI'}
          </button>
          {testReply && (
            <div style={{
              marginTop: 16, padding: 16, borderRadius: 10,
              background: 'var(--bg-3)',
              border: '1px solid var(--border)',
              fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap'
            }}>
              <div style={{fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'.1em', color:'var(--burgundy)', marginBottom:8}}>BOT TRẢ LỜI</div>
              {testReply}
            </div>
          )}
          <div style={{marginTop: 22, padding: 14, background: 'var(--bg-3)', borderRadius: 8, fontSize: 12, color: 'var(--fg-2)', lineHeight: 1.5}}>
            <strong>💡 Mẹo:</strong> Mỗi lần test sẽ tự lưu cấu hình hiện tại trước. Sau khi điều chỉnh kiến thức, hãy thử các câu hỏi như:
            <ul style={{marginTop:8, paddingLeft: 18}}>
              <li>"Trả góp 0% có điều kiện gì?"</li>
              <li>"Có khuyến mãi gì tháng này?"</li>
              <li>"Có giao xe tận nhà không?"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Site Info tab — chỉnh thương hiệu, hotline, social
// ============================================
const AdminSiteInfo = () => {
  const [info, setInfo] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const settings = window.DTC_SETTINGS || await window.dtcLoadSettings();
      setInfo(settings.brand_info || {});
    })();
  }, []);

  if (!info) {
    return <div className="admin-card" style={{padding:40, textAlign:'center', color:'var(--fg-3)'}}>Đang tải…</div>;
  }

  const upd = (k, v) => setInfo(b => ({ ...b, [k]: v }));
  const updSocial = (k, v) => setInfo(b => ({ ...b, social: { ...(b.social || {}), [k]: v } }));

  const save = async () => {
    setBusy(true); setToast(null);
    try {
      await window.dtcSaveSetting('brand_info', info);
      setToast({ kind: 'ok', msg: 'Đã lưu thông tin thương hiệu.' });
      setTimeout(() => setToast(null), 3500);
    } catch (e) {
      setToast({ kind: 'err', msg: 'Lưu thất bại: ' + (e?.message || e) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page-fade admin-card" style={{padding: 28, maxWidth: 760}}>
      <Toast kind={toast?.kind} msg={toast?.msg} />
      <h3 style={{fontFamily:'var(--font-display)', marginBottom:6}}>Thông tin thương hiệu</h3>
      <p style={{fontSize:13, color:'var(--fg-3)', marginBottom: 22}}>
        Chỉnh hotline, email, slogan, social link... Áp dụng cho header, footer, AI Bot, email thông báo.
      </p>

      <div className="form-row">
        <div><SettingsField label="Tên thương hiệu">
          <input className="input" value={info.name || ''} onChange={e=>upd('name', e.target.value)} />
        </SettingsField></div>
        <div><SettingsField label="Tagline">
          <input className="input" value={info.tagline || ''} onChange={e=>upd('tagline', e.target.value)} />
        </SettingsField></div>
      </div>

      <SettingsField label="Slogan (VI)">
        <input className="input" value={info.slogan_vi || ''} onChange={e=>upd('slogan_vi', e.target.value)} />
      </SettingsField>
      <SettingsField label="Slogan (EN)">
        <input className="input" value={info.slogan_en || ''} onChange={e=>upd('slogan_en', e.target.value)} />
      </SettingsField>

      <div className="form-row">
        <div><SettingsField label="Hotline">
          <input className="input" value={info.hotline || ''} onChange={e=>upd('hotline', e.target.value)} />
        </SettingsField></div>
        <div><SettingsField label="Giờ mở cửa">
          <input className="input" value={info.hotline_hours || ''} onChange={e=>upd('hotline_hours', e.target.value)} placeholder="07:30 — 21:00" />
        </SettingsField></div>
      </div>

      <div className="form-row">
        <div><SettingsField label="Email">
          <input className="input" type="email" value={info.email || ''} onChange={e=>upd('email', e.target.value)} />
        </SettingsField></div>
        <div><SettingsField label="Zalo OA">
          <input className="input" value={info.zalo_oa || ''} onChange={e=>upd('zalo_oa', e.target.value)} />
        </SettingsField></div>
      </div>

      <SettingsField label="Địa chỉ trụ sở">
        <input className="input" value={info.hq_address || ''} onChange={e=>upd('hq_address', e.target.value)} />
      </SettingsField>

      <h4 style={{marginTop: 24, marginBottom: 12, fontSize: 14, color: 'var(--fg-2)'}}>Mạng xã hội</h4>
      <div className="form-row">
        <div><SettingsField label="Facebook">
          <input className="input" value={info.social?.facebook || ''} onChange={e=>updSocial('facebook', e.target.value)} placeholder="https://facebook.com/..." />
        </SettingsField></div>
        <div><SettingsField label="YouTube">
          <input className="input" value={info.social?.youtube || ''} onChange={e=>updSocial('youtube', e.target.value)} placeholder="https://youtube.com/@..." />
        </SettingsField></div>
      </div>
      <SettingsField label="TikTok">
        <input className="input" value={info.social?.tiktok || ''} onChange={e=>updSocial('tiktok', e.target.value)} placeholder="https://tiktok.com/@..." />
      </SettingsField>

      <button className="btn btn-primary" onClick={save} disabled={busy} style={{marginTop: 10, padding:'12px 20px'}}>
        <SettingsIcon name="edit" size={14} /> {busy ? 'Đang lưu…' : 'Lưu thông tin'}
      </button>
    </div>
  );
};

window.DTC_AdminAISettings = AdminAISettings;
window.DTC_AdminSiteInfo = AdminSiteInfo;
