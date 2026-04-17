exports.handler = async function(event, context) {
if (event.httpMethod !== 'POST') {
return { statusCode: 405, body: 'Method Not Allowed' };
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

try {
const { question } = JSON.parse(event.body);

const SYSTEM_PROMPT = `你是 EMI Beauty Academy 皮膚管理學科的專業助教。請根據講義知識用繁體中文回答學員問題，語氣專業易懂，直接提供知識不要說根據講義。

皮膚三層：表皮、真皮、皮下組織。pH值5.5。角化週期28天。
表皮五層：角質層、透明層（只手掌腳掌）、顆粒層、有棘層、基底層。
皮脂膜：pH4.5-6.5弱酸性，天然屏障保濕。
真皮層：膠原蛋白72%、玻尿酸（2%鎖住98%水分）、纖維芽細胞。
膚質：乾性/油性/中性/敏感/混合。
痘痘四階段：皮脂增多→毛囊阻塞→細菌繁殖→炎症。
防曬：SPF針對UVB，PA針對UVA。
MTS微針：0.25-1.5mm，術後24h不碰水。
儀器：RF射頻、離子導入、小氣泡、超聲波、LED光療。`;

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
{
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
contents: [{ parts: [{ text: SYSTEM_PROMPT + '\n\n學員問題：' + question }] }],
generationConfig: { temperature: 0.3, maxOutputTokens: 800 }
})
}
);

const data = await response.json();
const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '暫時無法回覆。';

return {
statusCode: 200,
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ answer: text })
};

} catch (error) {
return {
statusCode: 500,
body: JSON.stringify({ error: error.message })
};
}
};

