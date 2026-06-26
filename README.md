# 趋势宏观研究网页

一个公开访问的单页趋势研究原型，顶部用 Tab 切换三个独立频道：

- 世界宏观观察
- 投资研究
- 前沿技术事件

页面当前是“本地实时数据服务 + 前端研究驾驶舱”实现，重点验证信息架构、研究简报卡、筛选交互、能力源集成方式和自动数据生成流程。
当前视觉方向为方案 B：深蓝科技研究驾驶舱，参考苹果式简洁、玻璃层次、柔和蓝色光感和高密度但克制的信息排版。

## 参考项目如何集成

- `worldmonitor`：作为全球态势感知层，负责从新闻、地缘、灾害、军事、金融和基础设施信息流中发现异常事件与跨流相关性。
- `digital-oracle`：作为宏观研究方法层，负责把事件放进预测市场、商品、汇率、利率、期权和风险比值等可定价信号中交叉验证。
- `Qlib`：作为投资研究频道的量化研究引擎参考，承接因子、模型训练、回测、风险建模和组合优化。
- `a-stock-data`：作为中国市场数据层参考，承接行情、研报、热点、资金、新闻、财务和公告。

## 本地部署状态

- `digital-oracle`：已部署到 `integrations/digital-oracle`，本地 `SKILL.md`、providers、references、scripts、tests 可用。
- `a-stock-data`：已部署到 `integrations/a-stock-data`，本地 `SKILL.md`、README、assets、license 可用。
- `worldmonitor`：已部署。源码位于 `integrations/worldmonitor`，依赖已安装，本地开发服务运行在 `http://127.0.0.1:3100/`。
- `Qlib`：待部署。当前网络下 `git clone --depth 1` 和源码包下载均超时，且本机未安装 `pyqlib`。

## 当前功能

- 三个频道 Tab 切换
- 自动实时数据：本地 Node 服务从公开实时源抓取宏观、投资、前沿技术信号，并生成研究简报卡；接口失败时前端回退到内置示例数据
- 关键词搜索
- 时间范围、热度、内容类型筛选
- 能力源筛选：`worldmonitor`、`digital-oracle`、`Qlib`、`a-stock-data`
- 频道态势驾驶舱：情报指标、信号地图、能力源流水线
- 四层能力矩阵：展示四个参考项目保留为可接入的系统能力，支持点击穿透到本地部署状态、本地项目文档或部署命令
- 三类频道各自动生成最多 5 张研究简报卡
- 卡片展开后显示事件线、事实/推断/观点、能力源说明
- 每条简报展示来源、证据数量、置信度和更新时间

## 本地运行

启动趋势宏观研究主站和实时数据接口：

```bash
node server.js
```

然后访问：

```text
http://127.0.0.1:3000/
```

如果要在 worldmonitor 穿透页里看到完整运行实例，另开一个终端启动：

```bash
cd integrations/worldmonitor
npm run dev -- --host 127.0.0.1 --port 3100
```

直接打开 `index.html` 也可以读取 `http://127.0.0.1:3000/api/realtime-briefs`，但前提是上面的 `node server.js` 正在运行。
