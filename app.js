const channels = {
  macro: {
    title: "世界宏观观察",
    summary: "捕捉关键词热度、地缘事件、商品与利率信号之间的同步变化。",
    engines: ["worldmonitor", "digital-oracle"],
  },
  investment: {
    title: "投资研究",
    summary: "连接量化因子、研报摘要、产业报告和资产定价线索。",
    engines: ["qlib", "a-stock-data"],
  },
  frontierTech: {
    title: "前沿技术事件",
    summary: "追踪 AI、自动驾驶、脑机接口、具身智能与芯片产业节点。",
    engines: ["worldmonitor", "digital-oracle", "a-stock-data"],
  },
};

const engineProfiles = {
  worldmonitor: {
    label: "worldmonitor",
    method: "全球态势感知",
    role: "用策展信息源、跨流相关性、地缘/灾害/军事/金融信号发现异常事件。",
    features: ["500+ 信息源监控", "地缘/灾害/军事/金融交叉", "异常事件触发", "国家不稳定与风险雷达"],
  },
  "digital-oracle": {
    label: "digital-oracle",
    method: "价格信号交叉验证",
    role: "用预测市场、商品、汇率、利率、期权和风险比值验证宏观判断。",
    features: ["预测市场", "商品/汇率/利率", "期权与波动率", "三维以上证据验证"],
  },
  qlib: {
    label: "Qlib",
    method: "量化研究流水线",
    role: "把投资线索接入因子、模型训练、回测、风险建模和组合优化。",
    features: ["因子研究", "模型训练", "回测评估", "风险与组合优化"],
  },
  "a-stock-data": {
    label: "a-stock-data",
    method: "A 股七层数据接入",
    role: "提供行情、研报、热点、资金、新闻、财务和公告等中国市场证据。",
    features: ["行情", "研报", "资金", "公告/财务/新闻"],
  },
};

const capabilityOrder = ["worldmonitor", "digital-oracle", "qlib", "a-stock-data"];

const briefs = [
  {
    channel: "macro",
    title: "红海航运风险重新进入商品定价",
    summary: "航运绕行、保险费率和原油期权波动率同时上行，市场开始重新定价供应链尾部风险。",
    signal: "航运关键词热度 +168%，布油看涨期权成交放大",
    evidence: 6,
    impact: "能源、航运、欧洲制造业成本",
    risk: "事件仍可能被外交缓和快速逆转",
    confidence: 86,
    sources: ["新闻聚合", "商品期货", "期权成交"],
    updatedAt: "2026-06-25 15:40",
    range: "today",
    heat: "high",
    type: "事件",
    timeline: ["08:20 航运社媒热度跳升", "10:05 原油期权隐含波动率抬升", "14:30 欧洲制造业成本讨论升温"],
    facts: ["事实：多家航运公司讨论绕行方案。", "推断：供应链风险溢价正在回到能源价格。", "观点：若持续三日，关注炼化和化工利润挤压。"],
  },
  {
    channel: "macro",
    title: "黄金与实际利率背离扩大",
    summary: "黄金强势没有完全跟随实际利率解释，央行购金和地缘避险可能是更强驱动。",
    signal: "黄金热度 +92%，实际利率解释力下降",
    evidence: 5,
    impact: "贵金属、外汇储备、避险资产",
    risk: "美元快速走强会压制短线表现",
    confidence: 80,
    sources: ["贵金属行情", "央行数据", "宏观研报"],
    updatedAt: "2026-06-25 12:18",
    range: "today",
    heat: "high",
    type: "趋势",
    timeline: ["本周央行购金讨论增多", "ETF 资金流出放缓", "金价维持高位震荡"],
    facts: ["事实：黄金价格维持强势。", "推断：非利率变量权重上升。", "观点：黄金正在从利率交易切换到储备资产叙事。"],
  },
  {
    channel: "macro",
    title: "欧洲电价波动提示工业复苏脆弱",
    summary: "天然气库存安全但电价波动扩大，说明工业复苏面对天气和供给扰动仍不稳。",
    signal: "电价波动率 +47%，工业关键词回落",
    evidence: 4,
    impact: "欧洲化工、有色、制造 PMI",
    risk: "季节性天气因素可能夸大短期波动",
    confidence: 74,
    sources: ["电力市场", "PMI 跟踪", "产业新闻"],
    updatedAt: "2026-06-24 19:22",
    range: "week",
    heat: "medium",
    type: "市场异动",
    timeline: ["电价日内波动扩大", "天然气库存仍在安全区间", "工业复苏叙事降温"],
    facts: ["事实：能源价格波动回升。", "推断：利润率预期受到扰动。", "观点：欧洲周期股需要更强需求证据。"],
  },
  {
    channel: "macro",
    title: "拉美铜矿谈判成为通胀二阶变量",
    summary: "铜矿供应谈判被宏观资金关注，新能源与电网需求让铜价对供应扰动更敏感。",
    signal: "铜矿关键词 +71%，铜期限结构走强",
    evidence: 5,
    impact: "铜、矿业股、电网建设、通胀预期",
    risk: "库存释放会缓冲短期冲击",
    confidence: 78,
    sources: ["矿业公告", "期货曲线", "产业报告"],
    updatedAt: "2026-06-23 16:02",
    range: "week",
    heat: "medium",
    type: "产业",
    timeline: ["矿山谈判进入窗口期", "铜价期限结构走强", "电网投资报告引用增加"],
    facts: ["事实：供应扰动讨论升温。", "推断：通胀链条从能源扩散到金属。", "观点：铜可能成为宏观风险偏好的温度计。"],
  },
  {
    channel: "macro",
    title: "预测市场开始上修政策不确定性",
    summary: "多个预测市场合约显示政策路径分歧扩大，资产端尚未完全反映这一变化。",
    signal: "政策不确定性合约价格 +12pt",
    evidence: 3,
    impact: "股指波动率、美元、长端利率",
    risk: "预测市场流动性有限",
    confidence: 69,
    sources: ["预测市场", "利率曲线", "新闻热度"],
    updatedAt: "2026-06-18 09:44",
    range: "month",
    heat: "low",
    type: "趋势",
    timeline: ["合约价格连续抬升", "新闻关注度滞后", "利率曲线反应温和"],
    facts: ["事实：政策合约分歧扩大。", "推断：风险资产低估政策波动。", "观点：适合跟踪而非立即交易。"],
  },
  {
    channel: "investment",
    title: "高股息因子拥挤度回落但收益质量分化",
    summary: "红利资产回撤后估值压力缓解，但现金流覆盖和分红稳定性成为新的筛选核心。",
    signal: "高股息拥挤度 -18%，研报引用 +64%",
    evidence: 7,
    impact: "红利 ETF、公用事业、煤炭、银行",
    risk: "利率上行会重新压制估值",
    confidence: 84,
    sources: ["因子监控", "券商研报", "资金流"],
    updatedAt: "2026-06-25 14:06",
    range: "today",
    heat: "high",
    type: "研报",
    timeline: ["红利 ETF 资金转为净流入", "拥挤度指标回落", "研报转向质量筛选"],
    facts: ["事实：高股息资产经历估值修正。", "推断：资金开始做二次筛选。", "观点：现金流质量比静态股息率更重要。"],
  },
  {
    channel: "investment",
    title: "小盘成长动量因子出现短线修复",
    summary: "成交活跃度和盈利预期修正同步改善，但仍缺少中期基本面确认。",
    signal: "动量因子分位升至 73%，换手放大",
    evidence: 5,
    impact: "小盘成长、TMT、机器人主题",
    risk: "流动性回落会导致快速反转",
    confidence: 76,
    sources: ["量化因子", "行情数据", "卖方组合"],
    updatedAt: "2026-06-25 11:35",
    range: "today",
    heat: "medium",
    type: "市场异动",
    timeline: ["小盘指数跑赢", "量能温和放大", "盈利修正尚未确认"],
    facts: ["事实：短期动量改善。", "推断：交易资金先于基本面进场。", "观点：应设置更短观察窗口。"],
  },
  {
    channel: "investment",
    title: "电网设备产业报告密集上修海外需求",
    summary: "多份产业报告将海外电网投资作为核心变量，变压器和电力电子环节被反复提及。",
    signal: "产业报告数量 +118%，相关公司热度 +83%",
    evidence: 8,
    impact: "电网设备、变压器、出海链",
    risk: "订单交付和汇率波动影响利润",
    confidence: 88,
    sources: ["产业报告", "公告检索", "出口数据"],
    updatedAt: "2026-06-24 21:10",
    range: "week",
    heat: "high",
    type: "产业",
    timeline: ["海外电网报告密集发布", "订单公告引用增加", "市场关注从主题转向交付"],
    facts: ["事实：研报和公告共同指向海外需求。", "推断：产业链景气度具备持续验证点。", "观点：跟踪订单质量优先于概念扩散。"],
  },
  {
    channel: "investment",
    title: "港股互联网盈利修正扩散到广告链",
    summary: "平台公司成本纪律延续，广告和本地生活链条的盈利修正开始被模型捕捉。",
    signal: "盈利上修公司占比 +9pt",
    evidence: 4,
    impact: "港股互联网、广告代理、本地生活",
    risk: "宏观消费疲弱会限制收入弹性",
    confidence: 72,
    sources: ["盈利预测", "研报摘要", "交易数据"],
    updatedAt: "2026-06-20 18:26",
    range: "week",
    heat: "medium",
    type: "趋势",
    timeline: ["平台利润率继续改善", "广告链盈利预期上修", "消费数据仍显平淡"],
    facts: ["事实：盈利预测改善。", "推断：市场正在重新估算经营杠杆。", "观点：收入端弹性仍需验证。"],
  },
  {
    channel: "investment",
    title: "低波因子在震荡市重新获得配置价值",
    summary: "指数波动收敛后，低波资产的夏普优势重新出现，适合作为组合防守层。",
    signal: "低波组合夏普升至近 6 个月高位",
    evidence: 3,
    impact: "低波 ETF、防御组合、绝对收益策略",
    risk: "趋势行情启动会让低波跑输",
    confidence: 70,
    sources: ["回测摘要", "因子库", "组合监控"],
    updatedAt: "2026-06-12 10:00",
    range: "month",
    heat: "low",
    type: "研报",
    timeline: ["市场波动收敛", "低波组合回撤降低", "趋势因子贡献下降"],
    facts: ["事实：低波组合近期风险收益改善。", "推断：组合防守需求回升。", "观点：适合搭配而非替代进攻因子。"],
  },
  {
    channel: "frontierTech",
    title: "端侧 AI 芯片从参数竞赛转向功耗叙事",
    summary: "新一轮发布更强调每瓦算力和本地推理体验，手机与 PC 供应链开始重估端侧 AI 节奏。",
    signal: "端侧 AI 热度 +142%，功耗关键词 +96%",
    evidence: 7,
    impact: "AI PC、手机 SoC、存储、散热",
    risk: "应用缺失会削弱硬件升级意愿",
    confidence: 87,
    sources: ["发布会摘要", "供应链新闻", "产业研报"],
    updatedAt: "2026-06-25 13:28",
    range: "today",
    heat: "high",
    type: "事件",
    timeline: ["多家厂商强调本地推理", "功耗指标成为发布重点", "供应链热度上升"],
    facts: ["事实：端侧 AI 叙事从峰值算力转向效率。", "推断：硬件升级逻辑更依赖体验闭环。", "观点：关注可持续使用场景。"],
  },
  {
    channel: "frontierTech",
    title: "具身智能样机进入小规模工厂测试",
    summary: "人形机器人从展示视频走向有限场景测试，抓取稳定性和安全边界成为关键指标。",
    signal: "工厂测试关键词 +121%，机器人公司热度 +77%",
    evidence: 6,
    impact: "机器人本体、减速器、传感器、工业软件",
    risk: "样机测试不等于规模化订单",
    confidence: 82,
    sources: ["企业动态", "产业报告", "招聘数据"],
    updatedAt: "2026-06-25 09:52",
    range: "today",
    heat: "high",
    type: "产业",
    timeline: ["样机测试消息增多", "产业链报告密集引用", "招聘岗位偏向现场工程"],
    facts: ["事实：测试场景从演示转向工厂。", "推断：商业化指标开始变具体。", "观点：订单验证比视频效果更关键。"],
  },
  {
    channel: "frontierTech",
    title: "自动驾驶监管语境从安全员转向责任边界",
    summary: "讨论焦点从技术可行性转向事故责任、保险定价和城市运营许可。",
    signal: "责任边界关键词 +89%，政策文件引用增加",
    evidence: 5,
    impact: "Robotaxi、保险、城市交通运营",
    risk: "监管节奏存在地区差异",
    confidence: 78,
    sources: ["政策文件", "行业新闻", "保险讨论"],
    updatedAt: "2026-06-24 17:18",
    range: "week",
    heat: "medium",
    type: "事件",
    timeline: ["城市试点扩围", "责任边界讨论增加", "保险定价被纳入议题"],
    facts: ["事实：监管讨论更细化。", "推断：商业化进入制度建设阶段。", "观点：城市运营能力会成为新门槛。"],
  },
  {
    channel: "frontierTech",
    title: "脑机接口从医疗修复扩展到交互范式",
    summary: "非侵入式设备关注度上升，但真实突破仍集中在医疗修复场景。",
    signal: "脑机接口搜索 +64%，医疗场景来源占比 58%",
    evidence: 4,
    impact: "医疗器械、神经科学、消费电子交互",
    risk: "消费级叙事容易过热",
    confidence: 73,
    sources: ["论文摘要", "融资新闻", "医疗器械动态"],
    updatedAt: "2026-06-19 20:08",
    range: "week",
    heat: "medium",
    type: "趋势",
    timeline: ["非侵入式设备讨论升温", "医疗修复论文继续主导", "消费场景仍偏早期"],
    facts: ["事实：关注度上升。", "推断：商业叙事开始外溢。", "观点：医疗有效性仍是核心验证。"],
  },
  {
    channel: "frontierTech",
    title: "开源模型竞争转向工具调用稳定性",
    summary: "模型榜单之外，开发者更关注长任务、工具调用和多步推理的可靠性。",
    signal: "工具调用关键词 +53%，榜单关注降温",
    evidence: 5,
    impact: "AI Agent、开发者工具、企业自动化",
    risk: "评测口径仍不统一",
    confidence: 75,
    sources: ["开发者社区", "模型评测", "产品更新"],
    updatedAt: "2026-06-10 08:36",
    range: "month",
    heat: "low",
    type: "趋势",
    timeline: ["开源模型发布节奏加快", "工具调用讨论增加", "企业试点关注稳定性"],
    facts: ["事实：开发者讨论点转移。", "推断：模型能力进入工程化比较。", "观点：稳定性比单项分数更影响落地。"],
  },
];

const state = {
  channel: "macro",
  range: "today",
  heat: "all",
  type: "all",
  engine: "all",
  search: "",
};

const cardsEl = document.querySelector("#cards");
const emptyState = document.querySelector("#emptyState");
const resultCount = document.querySelector("#resultCount");
const channelTitle = document.querySelector("#channelTitle");
const channelSummary = document.querySelector("#channelSummary");
const metricCount = document.querySelector("#metricCount");
const metricHigh = document.querySelector("#metricHigh");
const metricAvg = document.querySelector("#metricAvg");
const channelEngines = document.querySelector("#channelEngines");
const focusSignal = document.querySelector("#focusSignal");
const mapCaption = document.querySelector("#mapCaption");
const engineList = document.querySelector("#engineList");
const capabilityGrid = document.querySelector("#capabilityGrid");

function getBriefEngines(brief) {
  if (brief.channel === "macro") return ["worldmonitor", "digital-oracle"];
  if (brief.channel === "investment") return ["qlib", "a-stock-data"];
  if (brief.channel === "frontierTech" && brief.type === "产业") {
    return ["worldmonitor", "digital-oracle", "a-stock-data"];
  }
  return ["worldmonitor", "digital-oracle"];
}

function getIntegrationPath(brief) {
  const engines = getBriefEngines(brief).map((engine) => engineProfiles[engine].label);
  if (brief.channel === "macro") {
    return `${engines.join(" + ")}：先从全球信息流发现异常，再用可交易价格按短/中/长周期做三维以上交叉验证。`;
  }
  if (brief.channel === "investment") {
    return `${engines.join(" + ")}：先用 A 股数据层抓研报、公告、资金和热点，再进入因子/回测/组合评估链路。`;
  }
  if (brief.type === "产业") {
    return `${engines.join(" + ")}：用全球技术事件做趋势触发，用市场定价和 A 股产业链数据做落地验证。`;
  }
  return `${engines.join(" + ")}：先监测全球技术信息流，再用市场定价和产业信号过滤新闻噪音。`;
}

function isInRange(itemRange, selectedRange) {
  if (selectedRange === "month") return true;
  if (selectedRange === "week") return itemRange === "today" || itemRange === "week";
  return itemRange === "today";
}

function matchesSearch(brief) {
  const query = state.search.trim().toLowerCase();
  if (!query) return true;
  return [
    brief.title,
    brief.summary,
    brief.signal,
    brief.impact,
    brief.risk,
    brief.type,
    ...brief.sources,
  ]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function getFilteredBriefs() {
  return briefs.filter((brief) => {
    return (
      brief.channel === state.channel &&
      isInRange(brief.range, state.range) &&
      (state.heat === "all" || brief.heat === state.heat) &&
      (state.type === "all" || brief.type === state.type) &&
      (state.engine === "all" || getBriefEngines(brief).includes(state.engine)) &&
      matchesSearch(brief) &&
      brief.sources.length > 0
    );
  });
}

function renderMetrics(channelBriefs) {
  const highCount = channelBriefs.filter((brief) => brief.heat === "high").length;
  const avg = Math.round(
    channelBriefs.reduce((sum, brief) => sum + brief.confidence, 0) / channelBriefs.length,
  );
  metricCount.textContent = channelBriefs.length;
  metricHigh.textContent = highCount;
  metricAvg.textContent = `${avg}%`;
}

function renderEngineList(channel) {
  engineList.innerHTML = channel.engines
    .map((engine, index) => {
      const profile = engineProfiles[engine];
      return `
        <article class="engine-item">
          <strong>${profile.label}<span>0${index + 1}</span></strong>
          <p>${profile.method}。${profile.role}</p>
        </article>
      `;
    })
    .join("");
}

function renderCapabilityGrid() {
  capabilityGrid.innerHTML = capabilityOrder
    .map((engine) => {
      const profile = engineProfiles[engine];
      return `
        <article class="capability-card">
          <span>${profile.method}</span>
          <h3>${profile.label}</h3>
          <p>${profile.role}</p>
          <ul>${profile.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
        </article>
      `;
    })
    .join("");
}

function renderCards() {
  const channel = channels[state.channel];
  const channelBriefs = briefs.filter((brief) => brief.channel === state.channel);
  const filteredBriefs = getFilteredBriefs();

  channelTitle.textContent = channel.title;
  channelSummary.textContent = channel.summary;
  channelEngines.textContent = channel.engines.map((engine) => engineProfiles[engine].label).join(" / ");
  focusSignal.textContent = filteredBriefs[0]?.title ?? channel.title;
  mapCaption.textContent = getIntegrationPath(filteredBriefs[0] ?? channelBriefs[0]);
  resultCount.textContent = `${filteredBriefs.length} 条`;
  renderMetrics(channelBriefs);
  renderEngineList(channel);

  cardsEl.innerHTML = filteredBriefs
    .map((brief, index) => {
      const heatText = { high: "高热度", medium: "中热度", low: "低热度" }[brief.heat];
      const briefEngines = getBriefEngines(brief);
      return `
        <article class="card" style="animation-delay: ${index * 45}ms">
          <div class="card-main">
            <div class="card-kicker">
              <span class="badge hot">${heatText}</span>
              <span class="badge">${brief.type}</span>
              <span class="badge confidence">置信度 ${brief.confidence}%</span>
              <span class="badge">${brief.evidence} 条证据</span>
              ${briefEngines.map((engine) => `<span class="badge engine">${engineProfiles[engine].label}</span>`).join("")}
            </div>
            <h3>${brief.title}</h3>
            <p class="summary">${brief.summary}</p>
            <div class="fact-grid">
              <div class="fact">
                <span>变化信号</span>
                <p>${brief.signal}</p>
              </div>
              <div class="fact">
                <span>影响对象</span>
                <p>${brief.impact}</p>
              </div>
              <div class="fact">
                <span>风险/不确定性</span>
                <p>${brief.risk}</p>
              </div>
              <div class="fact">
                <span>集成路径</span>
                <p>${getIntegrationPath(brief)}</p>
              </div>
            </div>
          </div>
          <aside class="card-side">
            <div class="side-block">
              <span>更新时间</span>
              <strong>${brief.updatedAt}</strong>
            </div>
            <div class="side-block">
              <span>证据来源</span>
              <div class="sources">
                ${brief.sources.map((source) => `<a href="#" aria-label="来源：${source}">${source}</a>`).join("")}
              </div>
            </div>
            <button class="expand" type="button">展开简报详情</button>
          </aside>
          <section class="details">
            <div>
              <h4>事件线</h4>
              <ul>${brief.timeline.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
            <div>
              <h4>事实 / 推断 / 观点</h4>
              <ul>${brief.facts.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
            <div>
              <h4>能力源说明</h4>
              <ul>${briefEngines
                .map((engine) => `<li>${engineProfiles[engine].label}：${engineProfiles[engine].role}</li>`)
                .join("")}</ul>
            </div>
          </section>
        </article>
      `;
    })
    .join("");

  emptyState.hidden = filteredBriefs.length !== 0;
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    state.channel = tab.dataset.channel;
    renderCards();
  });
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const group = chip.dataset.filter;
    document
      .querySelectorAll(`[data-filter="${group}"]`)
      .forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    state[group] = chip.dataset.value;
    renderCards();
  });
});

document.querySelector("#typeSelect").addEventListener("change", (event) => {
  state.type = event.target.value;
  renderCards();
});

document.querySelector("#engineSelect").addEventListener("change", (event) => {
  state.engine = event.target.value;
  renderCards();
});

document.querySelector("#searchInput").addEventListener("input", (event) => {
  state.search = event.target.value;
  renderCards();
});

cardsEl.addEventListener("click", (event) => {
  const button = event.target.closest(".expand");
  if (!button) return;
  const card = button.closest(".card");
  const isOpen = card.classList.toggle("open");
  button.textContent = isOpen ? "收起简报详情" : "展开简报详情";
});

renderCards();
renderCapabilityGrid();
