// Supabase Edge Function: notify-order
//
// Triggered by a Postgres webhook (Database Webhooks → Insert on `orders`).
// Sends email via Resend (RESEND_API_KEY) and/or Telegram (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID).
//
// Required secrets:
//   supabase secrets set RESEND_API_KEY=re_...
//   supabase secrets set NOTIFY_EMAIL=admin@daithanhcong.vn
//   supabase secrets set TELEGRAM_BOT_TOKEN=...           (optional)
//   supabase secrets set TELEGRAM_CHAT_ID=...             (optional)
//
// Deploy:
//   supabase functions deploy notify-order --no-verify-jwt

// deno-lint-ignore-file no-explicit-any

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const NOTIFY_EMAIL = Deno.env.get('NOTIFY_EMAIL') || 'admin@daithanhcong.vn';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@daithanhcong.vn';
const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

const fmtVND = (n: number) =>
  new Intl.NumberFormat('vi-VN').format(Number(n) || 0) + ' ₫';

async function sendEmail(order: any) {
  if (!RESEND_API_KEY) return { skipped: 'no RESEND_API_KEY' };
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:20px;background:#fafafa">
      <div style="background:linear-gradient(135deg,#8C0000,#5C0000);color:#fff;padding:24px;border-radius:12px 12px 0 0;text-align:center">
        <h2 style="margin:0;font-size:18px;letter-spacing:.06em">ĐẠI THÀNH CÔNG</h2>
        <div style="font-size:12px;opacity:.8;margin-top:4px">ĐƠN HÀNG MỚI · ${order.id}</div>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 12px 12px;border:1px solid #efe9e0;border-top:0">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#8a8a8a">Khách hàng</td><td style="padding:8px 0;font-weight:600">${order.customer}</td></tr>
          <tr><td style="padding:8px 0;color:#8a8a8a">SĐT</td><td style="padding:8px 0;font-weight:600">${order.phone}</td></tr>
          ${order.email ? `<tr><td style="padding:8px 0;color:#8a8a8a">Email</td><td style="padding:8px 0">${order.email}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#8a8a8a">Sản phẩm</td><td style="padding:8px 0;font-weight:600">${order.product_name || '-'}</td></tr>
          <tr><td style="padding:8px 0;color:#8a8a8a">Chi nhánh</td><td style="padding:8px 0">${order.store_name || '-'}</td></tr>
          <tr><td style="padding:8px 0;color:#8a8a8a">Giá tham chiếu</td><td style="padding:8px 0;color:#8C0000;font-weight:700">${fmtVND(order.total)}</td></tr>
          ${order.message ? `<tr><td colspan="2" style="padding-top:14px"><div style="color:#8a8a8a;font-size:12px">Tin nhắn:</div><div style="margin-top:6px;padding:12px;background:#f4efe6;border-radius:8px">${escapeHtml(order.message)}</div></td></tr>` : ''}
        </table>
        <div style="margin-top:20px;padding-top:18px;border-top:1px solid #efe9e0;font-size:12px;color:#8a8a8a;text-align:center">
          Vào CMS để xác nhận: <a href="https://dai-thanh-cong.vercel.app/admin" style="color:#8C0000">dai-thanh-cong.vercel.app/admin</a>
        </div>
      </div>
    </div>`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: `ĐTC Bot <${FROM_EMAIL}>`,
      to: [NOTIFY_EMAIL],
      subject: `🏍️ Đơn ${order.id} · ${order.customer} · ${order.product_name || ''}`.slice(0, 100),
      html
    })
  });
  if (!r.ok) {
    const text = await r.text();
    return { ok: false, status: r.status, body: text.slice(0, 200) };
  }
  return { ok: true };
}

async function sendTelegram(order: any) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return { skipped: 'no telegram config' };
  const text = [
    `🏍️ *Đơn mới · ${order.id}*`,
    `👤 ${order.customer}`,
    `📞 ${order.phone}`,
    `🛵 ${order.product_name || '-'}`,
    `🏢 ${order.store_name || '-'}`,
    `💰 ${fmtVND(order.total)}`,
    order.message ? `\n💬 _${escapeMd(String(order.message).slice(0, 200))}_` : '',
    `\n→ daithanhcong.com/admin`
  ].filter(Boolean).join('\n');

  const r = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' })
  });
  if (!r.ok) {
    const text = await r.text();
    return { ok: false, status: r.status, body: text.slice(0, 200) };
  }
  return { ok: true };
}

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

function escapeMd(s: string) {
  return String(s).replace(/[*_`\[\]]/g, '\\$&');
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid json' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Postgres webhook payload: { type, table, record, old_record, schema }
  const order = body.record || body;
  if (!order || !order.id) {
    return new Response(JSON.stringify({ error: 'no order data' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const [emailRes, telegramRes] = await Promise.allSettled([
    sendEmail(order),
    sendTelegram(order)
  ]);

  return new Response(JSON.stringify({
    ok: true,
    id: order.id,
    email: emailRes.status === 'fulfilled' ? emailRes.value : { error: String(emailRes.reason) },
    telegram: telegramRes.status === 'fulfilled' ? telegramRes.value : { error: String(telegramRes.reason) }
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
});
