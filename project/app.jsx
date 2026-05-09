// === Main App ===
const { useState: useS, useEffect: useE } = React;
const { Header, Footer } = window.DTC_Components;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "lang": "vi",
  "heroVariant": "a",
  "animations": true
}/*EDITMODE-END*/;

const App = () => {
  const [route, setRoute] = useS('home');
  const [activeProduct, setActiveProduct] = useS(null);
  const [chatOpen, setChatOpen] = useS(false);
  const [tweaks, setTweaks] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, ()=>{}];
  const [showTweaks, setShowTweaks] = useS(false);

  const lang = tweaks.lang;
  const theme = tweaks.theme;
  const heroVariant = tweaks.heroVariant;
  const T = window.DTC_DATA.i18n[lang];

  const setLang = (l) => setTweaks('lang', l);
  const setTheme = (t) => setTweaks('theme', t);

  useE(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useE(() => {
    document.body.classList.toggle('no-anim', !tweaks.animations);
  }, [tweaks.animations]);

  useE(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  // Tweaks host wiring
  useE(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setShowTweaks(true);
      if (e.data?.type === '__deactivate_edit_mode') setShowTweaks(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const closeTweaks = () => {
    setShowTweaks(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  // Admin route is full-bleed
  if (route === 'admin') {
    return (
      <>
        <window.DTC_AdminPage setRoute={setRoute} />
        <window.DTC_FloatingWidgets openChat={()=>setChatOpen(true)} lang={lang} />
        {chatOpen && <window.DTC_AIChat close={()=>setChatOpen(false)} lang={lang} />}
        {showTweaks && <TweaksUI tweaks={tweaks} setTweaks={setTweaks} close={closeTweaks} />}
      </>
    );
  }

  return (
    <>
      <Header route={route} setRoute={setRoute} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} T={T} />
      <main>
        {route === 'home' && <window.DTC_Home T={T} lang={lang} setRoute={setRoute} setActiveProduct={setActiveProduct} heroVariant={heroVariant} />}
        {route === 'products' && <window.DTC_Pages.ProductsPage T={T} lang={lang} setRoute={setRoute} setActiveProduct={setActiveProduct} />}
        {route === 'detail' && <window.DTC_Pages.DetailPage p={activeProduct} lang={lang} setRoute={setRoute} />}
        {route === 'news' && <window.DTC_Pages.NewsPage lang={lang} setRoute={setRoute} />}
        {route === 'stores' && <window.DTC_Pages.StoresPage lang={lang} setRoute={setRoute} />}
        {route === 'contact' && <window.DTC_Pages.ContactPage lang={lang} setRoute={setRoute} />}
      </main>
      <Footer T={T} lang={lang} setRoute={setRoute} />
      <window.DTC_FloatingWidgets openChat={()=>setChatOpen(true)} lang={lang} />
      {chatOpen && <window.DTC_AIChat close={()=>setChatOpen(false)} lang={lang} />}
      {showTweaks && <TweaksUI tweaks={tweaks} setTweaks={setTweaks} close={closeTweaks} />}
    </>
  );
};

const TweaksUI = ({ tweaks, setTweaks, close }) => {
  const TP = window.TweaksPanel, TS = window.TweakSection, TR = window.TweakRadio, TT = window.TweakToggle;
  if (!TP) return null;
  return (
    <TP title="Tweaks · Đại Thành Công" onClose={close}>
      <TS title="Giao diện">
        <TR label="Chế độ màu" value={tweaks.theme} options={[{value:'light',label:'Sáng'},{value:'dark',label:'Tối'}]} onChange={(v)=>setTweaks('theme', v)} />
        <TR label="Ngôn ngữ" value={tweaks.lang} options={[{value:'vi',label:'Tiếng Việt'},{value:'en',label:'English'}]} onChange={(v)=>setTweaks('lang', v)} />
      </TS>
      <TS title="Trang chủ">
        <TR label="Phong cách Hero" value={tweaks.heroVariant}
            options={[{value:'a',label:'A · Cinematic'},{value:'b',label:'B · Centered'},{value:'c',label:'C · Diagonal'}]}
            onChange={(v)=>setTweaks('heroVariant', v)} />
      </TS>
      <TS title="Hiệu ứng">
        <TT label="Bật animation" value={tweaks.animations} onChange={(v)=>setTweaks('animations', v)} />
      </TS>
    </TP>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
