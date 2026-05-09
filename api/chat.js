// Vercel Serverless Function: POST /api/chat
// Proxies user messages to Anthropic API with brand context.
// Requires env var ANTHROPIC_API_KEY (set in Vercel dashboard).

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mftubiaywawjggpwobor.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_i8JdbK6A-ZpRWS11HYrOzQ_DicI2tgo';

async function loadProductsContext() {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=name,brand,year,price,cc,color,fuel,stock,store_id,status,features&is_active=eq.true&limit=20`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!r.ok) return '';
    const products = await r.json();
    return products.map(p =>
      `- ${p.name} (${p.year}, ${p.brand}, ${p.cc > 0 ? p.cc + 'cc' : 'điện'}, ${p.fuel}, ${p.color}): ${Number(p.price).toLocaleString('vi-VN')}đ, còn ${p.stock} xe${p.status === 'used' ? ' [đã qua sử dụng]' : ''}`
    ).join('\n');
  } catch {
    return '';
  }
}

async function loadAIConfig() {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/site_settings?key=eq.ai_config&select=value`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!r.ok) return {};
    const rows = await r.json();
    return rows[0]?.value || {};
  } catch {
    return {};
  }
}

async function loadBrandInfo() {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/site_settings?key=eq.brand_info&select=value`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!r.ok) return {};
    const rows = await r.json();
    return rows[0]?.value || {};
  } catch {
    return {};
  }
}

const TONE_HINTS = {
  vi: {
    friendly: 'Xưng "em", gọi khách "anh/chị", thân thiện gần gũi',
    formal: 'Xưng "chúng tôi", gọi khách "Quý khách", trang trọng chuyên nghiệp',
    casual: 'Xưng "mình", gọi khách "bạn", thoải mái như bạn bè'
  },
  en: {
    friendly: 'Warm and approachable, like a friendly salesperson',
    formal: 'Use formal "you", professional and polished',
    casual: 'Conversational and casual, like a knowledgeable friend'
  }
};

const buildSystem = (lang, productsCtx, aiConfig, brand) => {
  const tone = aiConfig.tone || 'friendly';
  const toneHint = TONE_HINTS[lang]?.[tone] || TONE_HINTS[lang]?.friendly || '';
  const extra = aiConfig.extra_knowledge || '';
  const hotline = brand.hotline || '1900 6789';
  const hotlineHours = brand.hotline_hours || '07:30 — 21:00';
  const email = brand.email || 'info@daithanhcong.vn';
  const zalo = brand.zalo_oa || '@daithanhcong.vn';
  const brandName = brand.name || (lang === 'en' ? 'DAI THANH CONG' : 'ĐẠI THÀNH CÔNG');

  if (lang === 'en') {
    return `You are a customer service assistant for ${brandName} (DTC), a network of 7 authorized motorcycle stores in Bình Dương province, Vietnam. Brands: Honda, Yamaha, SYM, Suzuki, Piaggio, VinFast, Kawasaki.

KEY INFO:
- Hotline: ${hotline} (${hotlineHours} daily)
- 7 branches: Thủ Dầu Một (HQ), Thuận An, Dĩ An, Tân Uyên, Bến Cát, Phú Giáo, Bàu Bàng
- Email: ${email} · Zalo OA: ${zalo}
- Services: trade-in, 0% installment, transfer service, free 1-year inspection

TONE: ${toneHint}
- Reply in 2–4 short sentences
- Always end with a concrete next-step suggestion (call, book viewing, visit branch, fill contact form)
- If a question is outside scope (politics, off-topic), politely redirect to bike topics or hotline

CURRENT INVENTORY:
${productsCtx || '(unavailable, suggest hotline)'}

${extra ? '\nADDITIONAL KNOWLEDGE FROM ADMIN:\n' + extra : ''}`;
  }
  return `Bạn là trợ lý tư vấn của ${brandName} (ĐTC) — hệ thống 7 cửa hàng xe máy chính hãng tại Bình Dương. Các hãng phân phối: Honda, Yamaha, SYM, Suzuki, Piaggio, VinFast, Kawasaki.

THÔNG TIN CỐT LÕI:
- Hotline: ${hotline} (${hotlineHours} hàng ngày)
- 7 chi nhánh: Thủ Dầu Một (trụ sở), Thuận An, Dĩ An, Tân Uyên, Bến Cát, Phú Giáo, Bàu Bàng
- Email: ${email} · Zalo OA: ${zalo}
- Dịch vụ: trade-in xe cũ, trả góp 0%, sang tên đổi chủ, kiểm tra kỹ thuật miễn phí 1 năm

PHONG CÁCH: ${toneHint}
- Trả lời ngắn gọn 2–4 câu
- Luôn kết thúc bằng gợi ý hành động cụ thể (gọi hotline, đặt lịch xem xe, ghé chi nhánh gần nhất, điền form Liên hệ)
- Nếu câu hỏi ngoài phạm vi (chính trị, lệch chủ đề), nhẹ nhàng chuyển hướng về xe máy hoặc hotline
- Đưa số liệu giá tiền theo định dạng "53,5 triệu" hoặc "53.500.000đ"

DANH MỤC XE HIỆN CÓ:
${productsCtx || '(chưa load được, gợi ý gọi hotline)'}

${extra ? '\nKIẾN THỨC BỔ SUNG TỪ QUẢN TRỊ:\n' + extra : ''}`;
};

export default async function handler(req, res) {
  // CORS for cross-origin if needed (same origin in production but safe)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'AI service not configured',
      fallback: true
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const { message, history = [], lang = 'vi' } = body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message required' });
  }
  if (message.length > 1000) {
    return res.status(400).json({ error: 'message too long (max 1000 chars)' });
  }

  try {
    const [productsCtx, aiConfig, brand] = await Promise.all([
      loadProductsContext(),
      loadAIConfig(),
      loadBrandInfo()
    ]);

    if (aiConfig.enabled === false) {
      return res.status(503).json({ error: 'AI disabled by admin', fallback: true });
    }

    const messages = [
      ...history.slice(-6).map(m => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: String(m.content || '').slice(0, 800)
      })),
      { role: 'user', content: message }
    ];

    const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: buildSystem(lang, productsCtx, aiConfig, brand),
        messages
      })
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error('Anthropic error', aiRes.status, errText);
      return res.status(502).json({ error: 'Upstream error', fallback: true });
    }

    const data = await aiRes.json();
    const reply = data?.content?.[0]?.text || '';
    return res.status(200).json({ reply, model: data.model });
  } catch (e) {
    console.error('Chat handler error:', e);
    return res.status(500).json({ error: e?.message || 'Internal error', fallback: true });
  }
}
