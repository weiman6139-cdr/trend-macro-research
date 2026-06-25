const aStockLayers = [
  {
    title: "行情层",
    summary: "实时行情、K 线、盘口、PE/PB、市值、指数和 ETF 的低风险入口。",
    sources: ["mootdx", "腾讯财经", "百度股市通"],
    endpoints: ["K线带 MA5/10/20", "五档盘口", "逐笔成交", "PE / PB / 市值", "指数 / ETF"],
    useCases: ["单票估值前置报价", "指数与 ETF 横向对比", "交易层异动验证"],
    risk: "低风控",
    cadence: "实时 / 分钟级",
    priority: "优先级 1",
  },
  {
    title: "研报层",
    summary: "个股研报、行业研报、PDF 下载、一致预期和自然语言研报搜索。",
    sources: ["东财 reportapi", "同花顺", "iwencai"],
    endpoints: ["个股研报", "行业研报", "研报 PDF", "一致预期 EPS", "NL 语义搜索"],
    useCases: ["产业链主题检索", "盈利预测校验", "卖方观点聚合"],
    risk: "中风控",
    cadence: "日级 / 事件触发",
    priority: "研究入口",
  },
  {
    title: "信号层",
    summary: "强势股、题材归因、北向资金、板块归属、资金流、龙虎榜、解禁和行业对比。",
    sources: ["同花顺热点", "同花顺北向", "东财 push2 / datacenter"],
    endpoints: ["强势股", "题材 reason tags", "北向分钟流", "概念板块归属", "龙虎榜", "解禁日历"],
    useCases: ["题材归因", "资金异动发现", "行业轮动跟踪"],
    risk: "中风控",
    cadence: "分钟级 / 日级",
    priority: "信号发现",
  },
  {
    title: "资金面 / 筹码层",
    summary: "融资融券、大宗交易、股东户数、分红送转和 120 日资金流。",
    sources: ["东财 datacenter", "东财 push2his"],
    endpoints: ["两融明细", "大宗交易", "股东户数", "分红送转", "资金流 120 日"],
    useCases: ["筹码集中度判断", "杠杆资金跟踪", "交易结构验证"],
    risk: "中高风控",
    cadence: "日级 / 季度",
    priority: "交易结构",
  },
  {
    title: "新闻层",
    summary: "东财个股新闻和 7×24 全球财经资讯，替代已下线的财联社旧接口。",
    sources: ["东财 search-api-web", "东财 np-weblist"],
    endpoints: ["个股新闻", "全球资讯", "7×24 快讯"],
    useCases: ["事件触发解释", "公告前后舆情", "宏观资讯补充"],
    risk: "中风控",
    cadence: "实时 / 快讯",
    priority: "事件语境",
  },
  {
    title: "基础数据层",
    summary: "季报快照、F10 公司资料、东财个股信息和新浪财报三表。",
    sources: ["mootdx finance", "mootdx F10", "东财 push2", "新浪财经"],
    endpoints: ["季报 37 字段", "F10 九大类", "总股本 / 流通股", "资产负债表", "利润表", "现金流量表"],
    useCases: ["公司画像", "财务质量筛选", "估值分母校验"],
    risk: "低风控",
    cadence: "财报期 / 静态资料",
    priority: "基本面底座",
  },
  {
    title: "公告层",
    summary: "巨潮公告全文检索与下载，并用 mootdx F10 补充最新公告摘要。",
    sources: ["巨潮 cninfo", "mootdx F10"],
    endpoints: ["公告全文检索", "公告下载", "最新公告摘要", "orgId 动态映射"],
    useCases: ["重大事项追踪", "风险提示核验", "公司行为证据链"],
    risk: "低风控",
    cadence: "公告触发",
    priority: "证据归档",
  },
];

let activeLayer = 0;

function renderAStockPlatform() {
  const layer = aStockLayers[activeLayer];
  const layerTabs = document.querySelector("#layerTabs");
  const layerIndex = document.querySelector("#layerIndex");
  const layerTitle = document.querySelector("#layerTitle");
  const layerSummary = document.querySelector("#layerSummary");
  const layerRisk = document.querySelector("#layerRisk");
  const layerMetrics = document.querySelector("#layerMetrics");
  const layerSources = document.querySelector("#layerSources");
  const layerEndpoints = document.querySelector("#layerEndpoints");
  const layerUseCases = document.querySelector("#layerUseCases");

  layerTabs.innerHTML = aStockLayers
    .map(
      (item, index) => `
        <button class="layer-tab ${index === activeLayer ? "active" : ""}" type="button" data-layer="${index}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${item.title}</strong>
          <em>${item.priority}</em>
        </button>
      `,
    )
    .join("");

  layerIndex.textContent = `Layer ${String(activeLayer + 1).padStart(2, "0")}`;
  layerTitle.textContent = layer.title;
  layerSummary.textContent = layer.summary;
  layerRisk.textContent = layer.risk;
  layerRisk.className = `risk-badge ${layer.risk.includes("高") ? "warning" : "safe"}`;
  layerMetrics.innerHTML = `
    <div><span>数据源</span><strong>${layer.sources.length}</strong></div>
    <div><span>端点</span><strong>${layer.endpoints.length}</strong></div>
    <div><span>频率</span><strong>${layer.cadence}</strong></div>
  `;
  layerSources.innerHTML = layer.sources.map((source) => `<span>${source}</span>`).join("");
  layerEndpoints.innerHTML = layer.endpoints
    .map((endpoint) => `<div><span>${endpoint}</span></div>`)
    .join("");
  layerUseCases.innerHTML = layer.useCases.map((item) => `<li>${item}</li>`).join("");

}

renderAStockPlatform();

document.querySelector("#layerTabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-layer]");
  if (!button) return;
  activeLayer = Number(button.dataset.layer);
  renderAStockPlatform();
});
