exports.handler = async (event) => {
try {
const { question } = JSON.parse(event.body || "{}");

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
text: question,
},
],
},
],
}),
}
);

const data = await response.json();

return {
statusCode: 200,
body: JSON.stringify(data),
};
} catch (error) {
return {
statusCode: 500,
body: JSON.stringify({
error: error.message || "錯誤",
}),
};
}
};

