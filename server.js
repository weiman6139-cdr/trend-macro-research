import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".md": "text/markdown; charset=utf-8",
};

let cache = {
  expiresAt: 0,
  payload: null,
};

function json(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
  });
  res.end(JSON.stringify(payload));
}

function nowText() {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formatter.format(new Date()).replaceAll("/", "-");
}

async function fetchJson(url, timeoutMs = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "trend-macro-research/1.0" },
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchText(url, timeoutMs = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "trend-macro-research/1.0" },
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function gdeltUrl(query, maxrecords = 8) {
  const params = new URLSearchParams({
    query,
    mode: "artlist",
    format: "json",
    maxrecords: String(maxrecords),
    sort: "hybridrel",
  });
  return `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;
}

async function getGdeltArticles(query, label) {
  try {
    const data = await fetchJson(gdeltUrl(query));
    return (data.articles || []).slice(0, 8).map((article) => ({
      title: article.title,
      url: article.url,
      source: article.sourceCommonName || label,
      domain: article.domain,
      language: article.language,
      seenAt: article.seendate,
    }));
  } catch (error) {
    return [];
  }
}

async function getHnStories(query, label) {
  try {
    const params = new URLSearchParams({
      query,
      tags: "story",
      hitsPerPage: "8",
    });
    const data = await fetchJson(`https://hn.algolia.com/api/v1/search?${params.toString()}`);
    return (data.hits || []).slice(0, 8).map((hit) => ({
      title: hit.title || hit.story_title,
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      source: hit.author ? `HN / ${hit.author}` : label,
      domain: hit.url ? new URL(hit.url).hostname.replace(/^www\./, "") : "news.ycombinator.com",
      seenAt: hit.created_at,
    }));
  } catch (error) {
    return [];
  }
}

function heatFromIndex(index) {
  if (index < 2) return "high";
  if (index < 5) return "medium";
  return "low";
}

function rangeFromIndex(index) {
  if (index < 3) return "today";
  if (index < 6) return "week";
  return "month";
}

function briefFromArticle(article, index, channel, type, impact, engineNote) {
  const sourceName = article.source || article.domain || "GDELT";
  return {
    channel,
    title: article.title || "实时信号更新",
    summary: `${sourceName} 刚进入监测样本，系统将其归入${impact}相关信号，并等待更多来源交叉验证。`,
    signal: `GDELT 实时新闻命中，来源：${sourceName}`,
    evidence: article.url ? 2 : 1,
    impact,
    risk: "自动抓取内容需要继续核验原文语境、重复报道和来源偏差。",
    confidence: Math.max(62, 84 - index * 3),
    sources: [sourceName, "GDELT Doc 2.1"],
    updatedAt: nowText(),
    range: rangeFromIndex(index),
    heat: heatFromIndex(index),
    type,
    timeline: [
      `${nowText()} 抓取到实时来源：${sourceName}`,
      "系统完成频道归类与证据字段补全",
      "等待后续来源、价格或公告信号交叉验证",
    ],
    facts: [
      `事实：${sourceName} 发布或聚合了该主题内容。`,
      `推断：该信号可能影响${impact}。`,
      `观点：${engineNote}`,
    ],
  };
}

async function buildRealtimeBriefs() {
  const [macroArticles, macroHn, techArticles, techHn, investmentHn] = await Promise.all([
    getGdeltArticles('(geopolitics OR "supply chain" OR oil OR inflation OR "central bank") sourcelang:english', "Global News"),
    getHnStories("geopolitics", "HN Macro"),
    getGdeltArticles('("artificial intelligence" OR semiconductor OR robotics OR "autonomous driving" OR "brain computer interface") sourcelang:english', "Technology News"),
    getHnStories("artificial intelligence", "HN Technology"),
    getHnStories("stocks", "HN Markets"),
  ]);
  const macroSource = macroArticles.length ? macroArticles : macroHn;
  const techSource = techArticles.length ? techArticles : techHn;

  const macro = macroSource
    .slice(0, 5)
    .map((article, index) =>
      briefFromArticle(article, index, "macro", index % 2 === 0 ? "事件" : "趋势", "地缘、能源、通胀和利率预期", "先作为宏观观察样本进入列表，等待价格和多来源确认。"),
    );
  const frontierTech = techSource
    .slice(0, 5)
    .map((article, index) =>
      briefFromArticle(article, index, "frontierTech", index % 2 === 0 ? "产业" : "事件", "AI、芯片、机器人和自动驾驶产业链", "技术新闻需要结合产品、订单、论文和监管信号继续验证。"),
    );
  const investment = investmentHn
    .slice(0, 5)
    .map((article, index) =>
      briefFromArticle(article, index, "investment", index % 2 === 0 ? "市场异动" : "趋势", "资产价格、公司盈利、风险偏好和资金流", "当前为公开实时资讯层，后续可接入券商、交易所或 Qlib 因子服务。"),
    );

  return {
    generatedAt: new Date().toISOString(),
    sourceMode: "live",
    briefs: [...macro, ...investment, ...frontierTech].filter((brief) => brief.sources.length > 0),
    diagnostics: {
      macroArticles: macroArticles.length,
      macroHn: macroHn.length,
      techArticles: techArticles.length,
      techHn: techHn.length,
      investmentHn: investmentHn.length,
    },
  };
}

async function handleRealtimeBriefs(res) {
  if (cache.payload && Date.now() < cache.expiresAt) {
    json(res, 200, cache.payload);
    return;
  }

  const payload = await buildRealtimeBriefs();
  cache = {
    expiresAt: Date.now() + 5 * 60 * 1000,
    payload,
  };
  json(res, 200, payload);
}

async function handleWorldmonitorHealth(res) {
  try {
    await fetchText("http://127.0.0.1:3100/", 1500);
    json(res, 200, { ok: true, url: "http://127.0.0.1:3100/" });
  } catch (error) {
    json(res, 503, {
      ok: false,
      url: "http://127.0.0.1:3100/",
      message: "worldmonitor 本地服务未运行，请在 integrations/worldmonitor 中启动 npm run dev -- --host 127.0.0.1 --port 3100",
    });
  }
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = normalize(join(root, pathname));

  if (!filePath.startsWith(root) || !existsSync(filePath)) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, {
    "content-type": mimeTypes[extname(filePath)] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(res);
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/api/realtime-briefs") {
      await handleRealtimeBriefs(res);
      return;
    }
    if (url.pathname === "/api/worldmonitor-health") {
      await handleWorldmonitorHealth(res);
      return;
    }
    serveStatic(req, res);
  } catch (error) {
    json(res, 500, { ok: false, message: error.message });
  }
}).listen(port, host, () => {
  console.log(`Trend Macro Research running at http://${host}:${port}/`);
});
