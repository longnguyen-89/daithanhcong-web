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
  const [dataReady, setDataReady] = useS(false);
  const [session, setSession] = useS(null);

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
    const applyAppearance = () => {
      const appearance = window.DTC_SETTINGS && window.DTC_SETTINGS.appearance;
      if (!appearance) return;
      setTweaks({
        theme: appearance.theme || 'light',
        heroVariant: appearance.heroVariant || appearance.hero_variant || 'a',
        animations: appearance.animations !== false
      });
    };
    window.addEventListener('dtc:settings-loaded', applyAppearance);
    applyAppearance();
    return () => window.removeEventListener('dtc:settings-loaded', applyAppearance);
  }, []);

  useE(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  // Load data + settings from Supabase on mount (with mock fallback)
  useE(() => {
    let cancelled = false;
    const load = async () => {
      const promises = [];
      if (window.dtcLoadData) promises.push(window.dtcLoadData());
      if (window.dtcLoadSettings) promises.push(window.dtcLoadSettings());
      await Promise.all(promises);
      if (!cancelled) setDataReady(true);
    };
    if (window.dtcSupabase) load();
    else window.addEventListener('dtc:supabase-ready', load, { once: true });
    return () => { cancelled = true; };
  }, []);

  // Watch Supabase auth session
  useE(() => {
    if (!window.dtcGetSession) return;
    let unsub = () => {};
    window.dtcGetSession().then(s => setSession(s));
    if (window.dtcOnAuthChange) {
      unsub = window.dtcOnAuthChange(async (sess) => {
        if (!sess) { setSession(null); return; }
        // Use the session passed by the listener directly; only fetch the profile.
        // Calling getSession() again from this path can deadlock supabase-js.
        const profile = await window.dtcGetProfile(sess.user.id);
        setSession({ session: sess, profile });
      });
    }
    return unsub;
  }, []);

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

  // Admin route is full-bleed, requires auth
  if (route === 'admin') {
    const role = session?.profile?.role;
    if (!session) {
      return (
        <>
          <window.DTC_LoginGate lang={lang} setRoute={setRoute} onSignedIn={async () => {
            const s = await window.dtcGetSession();
            setSession(s);
          }} />
          {showTweaks && <TweaksUI tweaks={tweaks} setTweaks={setTweaks} close={closeTweaks} />}
        </>
      );
    }
    if (role !== 'admin' && role !== 'staff') {
      return (
        <window.DTC_AccessDenied lang={lang} session={session} setRoute={setRoute}
          onSignOut={async () => { await window.dtcSignOut(); setSession(null); }} />
      );
    }
    return (
      <>
        <window.DTC_AdminPage setRoute={setRoute} session={session}
          onSignOut={async () => { await window.dtcSignOut(); setSession(null); setRoute('home'); }} />
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
        {route === 'detail' && <window.DTC_Pages.DetailPage p={activeProduct} lang={lang} setRoute={setRoute} setActiveProduct={setActiveProduct} />}
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
