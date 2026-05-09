// === Auth: Login + Access denied ===
const { Icon } = window.DTC_Components;

const LoginGate = ({ lang, setRoute, onSignedIn }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState('');

  const submit = async (e) => {
    e?.preventDefault?.();
    if (busy) return;
    setBusy(true);
    setErr('');
    try {
      const { error } = await window.dtcSignIn(email.trim(), password);
      if (error) throw error;
      await onSignedIn();
    } catch (e) {
      setErr(e?.message || 'Đăng nhập thất bại');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: 'linear-gradient(135deg, var(--burgundy-deep) 0%, var(--burgundy) 50%, #2a0000 100%)',
      padding: 24
    }}>
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'var(--bg-2)',
        borderRadius: 20,
        boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '36px 36px 24px',
          background: 'linear-gradient(135deg, var(--burgundy) 0%, var(--burgundy-deep) 100%)',
          color: '#fff',
          textAlign: 'center'
        }}>
          <img src="assets/logo.png" alt="DTC" style={{ width: 56, height: 56, marginBottom: 12 }} />
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '0.06em' }}>
            ĐẠI THÀNH CÔNG
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            CMS · Admin Portal
          </div>
        </div>
        <form onSubmit={submit} style={{ padding: 32 }}>
          <div style={{ marginBottom: 18 }}>
            <label className="label">Email</label>
            <input className="input" type="email" autoFocus required
              placeholder="admin@daithanhcong.vn"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label className="label">Mật khẩu</label>
            <input className="input" type="password" required
              placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {err && (
            <div style={{
              padding: '10px 14px',
              background: 'rgba(200,16,46,0.1)',
              border: '1px solid rgba(200,16,46,0.3)',
              color: 'var(--crimson)',
              borderRadius: 8,
              fontSize: 13,
              marginBottom: 16
            }}>{err}</div>
          )}
          <button className="btn btn-primary" type="submit" disabled={busy}
            style={{ width: '100%', justifyContent: 'center', padding: '14px 18px' }}>
            {busy ? 'Đang đăng nhập…' : 'Đăng nhập'} <Icon name="arrow" size={14} />
          </button>
          <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, color: 'var(--fg-3)' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); setRoute('home'); }}
              style={{ color: 'var(--fg-2)' }}>← Quay về trang chủ</a>
          </div>
        </form>
      </div>
    </div>
  );
};

const AccessDenied = ({ lang, session, setRoute, onSignOut }) => (
  <div style={{
    minHeight: '100vh', display: 'grid', placeItems: 'center',
    background: 'var(--bg)', padding: 24
  }}>
    <div style={{
      maxWidth: 460, textAlign: 'center', padding: 40,
      background: 'var(--bg-2)', borderRadius: 16,
      boxShadow: 'var(--shadow-lg)'
    }}>
      <div style={{
        width: 64, height: 64, margin: '0 auto 18px',
        borderRadius: 999, background: 'var(--bg-3)',
        display: 'grid', placeItems: 'center', color: 'var(--crimson)'
      }}>
        <Icon name="shield" size={28} />
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 10 }}>Không có quyền truy cập</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 14, marginBottom: 24 }}>
        Tài khoản <strong>{session?.session?.user?.email}</strong> chưa được cấp quyền vào CMS.
        Liên hệ quản trị viên để được cấp quyền <code>admin</code> hoặc <code>staff</code>.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button className="btn btn-ghost" onClick={() => setRoute('home')}>← Trang chủ</button>
        <button className="btn btn-primary" onClick={onSignOut}>Đăng xuất</button>
      </div>
    </div>
  </div>
);

window.DTC_LoginGate = LoginGate;
window.DTC_AccessDenied = AccessDenied;
