// === AI Chat / Floating widgets / Tweaks ===
const { Icon } = window.DTC_Components;

const FloatingWidgets = ({ openChat, lang }) => {
  const brand = (window.DTC_SETTINGS && window.DTC_SETTINGS.brand_info) || {};
  const hotline = brand.hotline || '1900 6789';
  const telHref = 'tel:' + hotline.replace(/\s/g, '');
  return (
  <div className="floating-stack">
    <a className="float-btn zalo" href="#" onClick={(e)=>e.preventDefault()} title="Zalo">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.93 2 10.78c0 2.78 1.5 5.25 3.84 6.86-.16.6-.55 2.06-.62 2.39-.1.42.15.42.32.31.13-.09 2.05-1.4 2.88-1.96.84.21 1.7.32 2.58.32 5.52 0 10-3.93 10-8.78S17.52 2 12 2z"/></svg>
      <span className="float-label">Chat Zalo OA</span>
    </a>
    <a className="float-btn phone" href={telHref} title={'Hotline ' + hotline}>
      <Icon name="phone" size={22} />
      <span className="float-label">Hotline {hotline}</span>
    </a>
    <button className="float-btn ai" onClick={openChat} title="AI Tư vấn">
      <Icon name="chat" size={22} />
      <span className="float-label">{lang==='vi'?'Tư vấn AI 24/7':'AI Assistant'}</span>
    </button>
  </div>
  );
};

const AIChat = ({ close, lang }) => {
  const aiCfg = (window.DTC_SETTINGS && window.DTC_SETTINGS.ai_config) || {};
  const defaultWelcome = lang==='vi'
    ? 'Xin chào anh/chị! Em là trợ lý AI của ĐẠI THÀNH CÔNG. Em có thể giúp anh/chị tìm xe phù hợp, so sánh thông số, tư vấn trả góp, hoặc đặt lịch lái thử. Anh/chị cần em hỗ trợ gì ạ?'
    : 'Hello! I am DTC AI assistant. I can help you find the right bike, compare specs, advise on installments or book a test ride. How may I help?';
  const welcomeText = (lang==='vi' ? aiCfg.welcome_vi : aiCfg.welcome_en) || defaultWelcome;

  const [msgs, setMsgs] = useState([{ role: 'bot', content: welcomeText }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs, busy]);

  const send = async (text) => {
    const t = (text || input).trim();
    if (!t || busy) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', content: t }]);
    setBusy(true);
    try {
      const history = msgs.slice(-6).map(m => ({ role: m.role, content: m.content }));
      const apiRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: t, history, lang })
      });

      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.reply) {
          setMsgs(m => [...m, { role: 'bot', content: data.reply }]);
        } else {
          throw new Error('Empty reply');
        }
      } else if (apiRes.status === 503) {
        // Server intentionally returned fallback (no API key) — use rule-based
        const reply = window.DTC_aiFallback
          ? window.DTC_aiFallback(t, lang)
          : (lang==='vi'
              ? 'Cảm ơn anh/chị! Vui lòng gọi 1900 6789 để được hỗ trợ nhanh nhất.'
              : 'Thanks! Please call 1900 6789 for fastest support.');
        setMsgs(m => [...m, { role: 'bot', content: reply }]);
      } else {
        throw new Error(`API ${apiRes.status}`);
      }
    } catch (e) {
      const reply = window.DTC_aiFallback
        ? window.DTC_aiFallback(t, lang)
        : (lang==='vi'
            ? 'Xin lỗi anh/chị, em đang gặp sự cố nhỏ. Vui lòng gọi hotline 1900 6789 ạ!'
            : 'Sorry, I have a small issue. Please call 1900 6789!');
      setMsgs(m => [...m, { role: 'bot', content: reply }]);
    }
    setBusy(false);
  };

  const defaultSuggVi = ['Tư vấn xe SH 350i', 'Trả góp 0% có điều kiện gì?', 'So sánh Exciter và Winner X', 'Đặt lịch lái thử'];
  const defaultSuggEn = ['Tell me about SH 350i', '0% installment terms?', 'Exciter vs Winner', 'Book a test ride'];
  const cfgSugg = lang==='vi' ? aiCfg.suggestions_vi : aiCfg.suggestions_en;
  const suggestions = (Array.isArray(cfgSugg) && cfgSugg.length > 0)
    ? cfgSugg.filter(Boolean)
    : (lang==='vi' ? defaultSuggVi : defaultSuggEn);

  return (
    <div className="ai-chat">
      <div className="ai-chat-header">
        <div className="ai-avatar">AI</div>
        <div>
          <h4>{lang==='vi'?'Trợ lý ĐTC':'DTC Assistant'}</h4>
          <div className="ai-status">{lang==='vi'?'Online · phản hồi tức thì':'Online · instant reply'}</div>
        </div>
        <button className="ai-chat-close" onClick={close}><Icon name="close" size={18} /></button>
      </div>
      <div className="ai-chat-body" ref={bodyRef}>
        {msgs.map((m, i) => <div key={i} className={`ai-msg ${m.role}`}>{m.content}</div>)}
        {busy && <div className="ai-msg bot thinking">{lang==='vi'?'Em đang soạn câu trả lời…':'Typing…'}</div>}
      </div>
      {msgs.length <= 2 && (
        <div className="ai-suggestions">
          {suggestions.map((s, i) => <button key={i} onClick={()=>send(s)}>{s}</button>)}
        </div>
      )}
      <div className="ai-chat-input">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder={lang==='vi'?'Nhập câu hỏi…':'Ask anything…'} />
        <button className="send" onClick={()=>send()}><Icon name="send" size={16} /></button>
      </div>
    </div>
  );
};

window.DTC_aiFallback = function(q, lang) {
  const D = window.DTC_DATA || {};
  const fmt = window.formatVND || (n => n + ' ₫');
  const text = (q || '').toLowerCase();
  const products = D.products || [];

  const match = products.find(p => text.includes(p.name.toLowerCase()))
    || products.find(p => p.name.toLowerCase().split(' ').some(w => w.length > 3 && text.includes(w)));

  if (match) {
    return lang === 'vi'
      ? `Dạ, ${match.name} (${match.year}) hiện đang có giá ${fmt(match.price)} tại ${match.store}, còn ${match.stock} xe. Một số điểm nổi bật: ${match.features.slice(0,2).join(', ')}. Anh/chị muốn em đặt lịch xem xe hay tư vấn trả góp 0% ạ?`
      : `${match.name} (${match.year}) is priced at ${fmt(match.price)} at ${match.store}, ${match.stock} in stock. Highlights: ${match.features.slice(0,2).join(', ')}. Would you like to book a viewing or learn about 0% installment?`;
  }

  if (/(trả góp|installment|loan|vay)/.test(text)) {
    return lang === 'vi'
      ? 'Dạ ĐTC đang áp dụng trả góp 0% lãi suất 12 tháng đầu, hỗ trợ đến 80% giá trị xe, duyệt hồ sơ trong 30 phút chỉ cần CCCD và hộ khẩu/CMND người thân. Anh/chị quan tâm mẫu xe nào để em báo lịch trả cụ thể ạ?'
      : 'We offer 0% installment for the first 12 months, up to 80% of the bike value, approved in 30 minutes with just your ID. Which bike are you considering so I can prepare a payment plan?';
  }

  if (/(lái thử|test ride|trải nghiệm)/.test(text)) {
    return lang === 'vi'
      ? 'Dạ anh/chị có thể đặt lịch lái thử miễn phí tại 7 chi nhánh ĐTC. Em sẽ giữ chỗ trong vòng 24h, có sẵn xe đời mới: SH 350i, Exciter 155, Vision 2026, Air Blade 160. Anh/chị muốn lái thử mẫu nào và tại chi nhánh gần nhà nào ạ?'
      : 'You can book a free test ride at any of our 7 branches. We have the latest models ready: SH 350i, Exciter 155, Vision 2026, Air Blade 160. Which model and which branch works for you?';
  }

  if (/(điện|electric|vinfast|klara)/.test(text)) {
    return lang === 'vi'
      ? 'Dạ về xe điện, ĐTC đang có VinFast Klara S — pin LFP 22Ah, đi 120km/lần sạc, chống nước IP67, giá 39.9 triệu. Phù hợp đi học/đi làm trong nội đô Bình Dương. Anh/chị có muốn em báo chi tiết tại chi nhánh gần nhất không ạ?'
      : 'For electric, we have VinFast Klara S — LFP 22Ah battery, 120km per charge, IP67 waterproof, priced at 39.9M VND. Want me to share more details at the nearest branch?';
  }

  if (/(cũ|used|second|đã qua)/.test(text)) {
    return lang === 'vi'
      ? 'Dạ xe đã qua sử dụng tại ĐTC đều được kiểm tra 60 hạng mục, bảo hành 6 tháng và hỗ trợ sang tên 2 ngày. Hiện có Yamaha Grande Hybrid (47.2tr) và Honda SH Mode 2024 (56.5tr). Anh/chị muốn xem chi tiết mẫu nào ạ?'
      : 'Our used bikes pass a 60-point inspection, come with 6-month warranty and 2-day ownership transfer. Currently we have Yamaha Grande Hybrid (47.2M) and Honda SH Mode 2024 (56.5M). Want details on either?';
  }

  if (/(địa chỉ|cửa hàng|chi nhánh|branch|store|address)/.test(text)) {
    return lang === 'vi'
      ? 'Dạ ĐTC có 7 chi nhánh tại Bình Dương: Thủ Dầu Một (trụ sở), Thuận An, Dĩ An, Tân Uyên, Bến Cát, Phú Giáo và Bàu Bàng. Mở cửa 7:30 — 21:00 mỗi ngày. Anh/chị ở khu vực nào để em chỉ chi nhánh gần nhất ạ?'
      : 'We have 7 branches across Binh Duong: Thu Dau Mot (HQ), Thuan An, Di An, Tan Uyen, Ben Cat, Phu Giao, Bau Bang. Open 7:30 — 21:00 daily. Which area are you in so I can suggest the closest one?';
  }

  if (/(giá|price|bao nhiêu|cost)/.test(text)) {
    return lang === 'vi'
      ? `Dạ một số mức giá tham khảo tại ĐTC: SH 350i ABS từ 148.9tr, Exciter 155 VVA từ 53.5tr, Vision 2026 từ 32.9tr, Wave Alpha từ 18.9tr. Anh/chị quan tâm dòng nào để em báo chi tiết kèm khuyến mãi tháng này ạ?`
      : `Reference prices: SH 350i ABS from 148.9M, Exciter 155 VVA from 53.5M, Vision 2026 from 32.9M, Wave Alpha from 18.9M VND. Which one would you like detailed pricing and current promotions for?`;
  }

  return lang === 'vi'
    ? 'Dạ em đã tiếp nhận câu hỏi của anh/chị. Để được tư vấn chi tiết nhất, anh/chị vui lòng gọi hotline 1900 6789 (7:30 — 21:00) hoặc để lại số điện thoại tại mục Liên hệ — đội ĐTC sẽ phản hồi trong 30 phút ạ!'
    : "Got your question! For the most detailed support please call 1900 6789 (7:30 — 21:00) or leave your phone on the Contact page — our team will respond within 30 minutes.";
};

window.DTC_FloatingWidgets = FloatingWidgets;
window.DTC_AIChat = AIChat;
