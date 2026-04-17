
Aesthetics Emi <9emi.studio@gmail.com>
下午8:42 (1 分鐘前)
寄給 我

exports.handler = async (event) => {
try {
const { question } = JSON.parse(event.body || "{}");

if (!question) {
return {
statusCode: 400,
body: JSON.stringify({ error: "缺少 question" }),
};
}

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
return {
statusCode: 500,
body: JSON.stringify({ error: "沒有讀到 GEMINI_API_KEY" }),
};
}

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
{
method: "POST",
headers: {
"Content-Type": "application/json",
"x-goog-api-key": apiKey,
},
body: JSON.stringify({
contents: [
{
parts: [
{
text: `你是 EMI Beauty Academy 的皮膚管理學科 AI 助教。
請用繁體中文回答。
回答要清楚、簡潔、有條理。
若問題不明確，請先根據問題本身給出最合理的解釋後再回答。

使用者問題：
${question}`,
},
],
},
],
}),
}
);

const data = await response.json();

const answer =
data?.candidates?.[0]?.content?.parts?.[0]?.text ||
"抱歉，暫時無法取得回覆。";

return {
statusCode: 200,
body: JSON.stringify({ answer }),
};
} catch (error) {
return {
statusCode: 500,
body: JSON.stringify({
error: error.message || "伺服器錯誤",
}),
};
}
};
