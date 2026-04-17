exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'API key not configured' }) 
    };
  }

  try {
    const { question } = JSON.parse(event.body);
    
    const SYSTEM_PROMPT = `你是 EMI Beauty Academy 皮膚管理學科的專業助教。請根據以下講義知識回答學員的問題。用繁體中文回答，語氣專業但易懂，條列式或段落皆可，保持簡潔清楚。不要說「根據講義」，直接提供知識。若問題完全超出皮膚管理範疇，請說明。

===== 講義核心知識 =====

【皮膚基本結構】皮膚是人體最大器官，面積約1.6-2㎡，重量約佔體重16%，厚度0.3-4mm，pH值約5.5（弱酸性）。皮膚由三層組成：表皮、真皮、皮下組織。附屬物：毛囊、皮脂腺、汗腺、豎毛肌。

【皮膚八大功能】保護、分泌、調溫、儲蓄、排泄、感知、合成（Vit D3）、再生修復。

【角化過程】約28天週期：基底層→顆粒層14天，顆粒層→角質層脫落14天。老年人更長，手腳底45天。

【表皮五層（由外到內）】
①角質層：10-20層扁平死細胞，0.02mm，含角蛋白、NMF，防異物+保水分
②透明層：只在手掌腳掌，4-6層死細胞，緩衝物理刺激
③顆粒層：含神經醯胺，維持屏障功能，是活細胞→死細胞的第一階段
④有棘層：最厚（5-10層），含蘭格罕氏免疫細胞，淋巴液供給表皮營養
⑤基底層：又稱生發層，含水量70%，每10個細胞有1個黑色素細胞

【皮脂膜】pH 4.5-6.5弱酸性，由皮脂+汗液組成，天然屏障+保濕鎖水。受損徵兆：洗臉後乾澀緊繃、脫屑、嚴重時紅腫敏感。去角質頻率：中性1個月1次、乾性2個月1次、油性2星期1次、敏感性不要去角質。修復：弱酸性清潔品、防曬保濕、含角鯊烯/神經醯胺/洋甘菊的產品。

【真皮層】厚0.3-3mm，佔皮膚95%，含膠原蛋白（佔皮膚72%）、玻尿酸（2%鎖住98%水分）、膠原纖維、彈力纖維、纖維芽細胞、基質（1g容納6L水）。分乳狀層（表皮養分）和網狀層（強韌性）。

【皮下組織】主要脂肪細胞，儲脂/減震/保溫，護膚品無法到達。脂肪少→皺紋，脂肪多→妊娠紋。

【膚質分類】乾性：皮脂少易緊繃脫皮→溫和清潔+乳霜保濕。油性：皮脂旺盛毛孔粗大→每天洗2-3次控油。中性：油水平衡→基礎保養。敏感性：易紅腫灼熱→避開刺激成分查EWG。混合性：T字油+兩頰乾→分區保養。

【痘痘形成四階段】①皮脂分泌增多②毛囊口角化阻塞③痤瘡桿菌繁殖④炎症反應。種類：粉刺（黑頭/白頭）、丘疹、膿包、囊腫、結節。

【皮脂管絲vs黑頭粉刺】皮脂管絲：正常分泌物，透明/灰/黃色，不需治療。黑頭粉刺：角質代謝異常+皮脂過多，需治療。

【毛孔粗大4型】出油型（U形T字）、角質型（細小密集鼻子兩側）、缺水型（橢圓兩頰）、老化型（水滴狀法令紋附近）。

【紫外線】UVA=老化：穿透真皮層，佔90%，陰天玻璃也穿透。UVB=曬傷：只到表皮，即時曬傷，可合成維D。UVC：大部分被臭氧層阻隔。

【防曬指數】SPF針對UVB，PA針對UVA（PA+到PA++++）。物理防曬：TiO2/ZnO，適合敏感肌。化學防曬：吸收轉換熱能，質地輕透。

【功效成分】抗敏修復：金盞花、維B5、角鯊烷、神經醯胺。保濕補水：玻尿酸、甘油、氨基酸。去痘控油：壬二酸、水楊酸、果酸。抗衰抗老：視黃醇、胜肽、維E。好組合：煙醯胺+視黃醇、維C+維E。避雷：煙醯胺+高濃度維C、酸+酸。

【皮膚管理儀器】冷導頭（舒緩泛紅）、射頻RF（刺激膠原蛋白緊緻）、角質鏟（清除角質）、離子導入（促進成分滲透，適合液體劑型）、小氣泡（深層清潔）、注氧儀（精華變噴霧）、MTS微針（促膠原增生導入精華）、超聲波導入（每秒百萬次震動）、熱噴（打開毛孔）。LED光療：紅光660nm（緊緻再生）、黃光590nm（美白淡斑）、藍光415nm（殺痘菌）、綠光560nm（舒緩）。

【MTS微針深度】0.25（保濕美白）、0.5-1.0（毛孔細紋）、1.0-1.5（痘印）、0.3-0.7（老化）。禁忌：敏感肌、糖尿病、高血壓、孕婦、凝血疾病、蟹足腫體質。術後：24h不碰水、天天防曬保濕、兩周內不去角質不擦酸不雷射。

【顧客SOP】問診→目診→觸診。優先解決：①敏感發炎②祛痘後痘坑毛孔③曬傷後美白。

【酒糟肌】四期：偶發紅斑→微血管擴張→丘疹膿皰→鼻子變大。惡化：陽光/熱飲/辣食/酒精/壓力。

【糖化與氧化】糖化=AGE→皺紋鬆弛蠟黃。氧化=自由基→斑點衰老。抗糖化：少糖防曬。抗氧化：維C/E、抗氧化食物。

===== 知識結束 =====`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: SYSTEM_PROMPT + '\n\n學員問題：' + question }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800
          }
        })
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '抱歉，暫時無法取得回覆。';

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
