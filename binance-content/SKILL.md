# 币安广场内容情报专员 v2.0

**双数据源融合：6551 API (主) + Grok AI (备)**

---

## 描述

从币圈资讯中筛选出适合在币安广场发布的高互动内容。采用**双数据源策略**：

### 🎯 主数据源：6551 API（优先）
- ✅ **50+ 新闻源**：覆盖主流媒体、加密媒体、官方账号
- ✅ **AI 评分系统**：自动识别高影响力内容
- ✅ **Twitter 数据**：KOL 推文、热门讨论、市场情绪
- ✅ **实时更新**：24/7 监控热点

### 🔧 备用数据源：Grok AI（补充）
- 深度内容分析
- 角度建议优化
- 社区反应预测

---

## 使用方法

```
生成今天的币安广场内容
```

或者带参数：

```
生成币安内容:
- 时间范围: 12小时
- 内容类型: 吃瓜类+交易类
- 最大条数: 15条
```

---

## 配置

在使用前，需要设置 API 配置。

编辑配置文件：`Web 3.0/机会方向/币安内容挖矿/.env`

```bash
# Grok API (备用数据源)
GROK_API_KEY=your_api_key_here
GROK_API_ENDPOINT=https://ai.a9.bot/v1
GROK_API_MODEL=grok-4.20-beta

# 6551 API (主数据源)
NEWS_6551_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEWS_6551_API_BASE=https://ai.6551.io
TWITTER_6551_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
TWITTER_6551_API_BASE=https://ai.6551.io
```

---

## 内容筛选标准

### ✅ 必须保留: 币安广场高互动内容

#### 吃瓜八卦类 (高互动!)
- 大户爆仓/亏损晒单
- 钱包被盗/黑客事件
- 项目方跑路/Rug Pull
- 名人互撕/争议言论
- 市场异动/暴涨暴跌
- Meme币暴富/归零故事

#### 交易观点类
- 技术分析/图表解读
- 市场趋势预判
- 仓位管理策略
- 宏观事件影响
- 链上数据解读

#### 项目动态类
- 融资新闻
- TGE/上币公告
- 主网上线
- 重大合作
- 产品发布
- 空投放送

#### 热点板块类
- 新叙事/新概念
- 资金流向
- 板块轮动
- 市场情绪指标

### ❌ 直接忽略
- 纯技术分析(缺乏市场情绪)
- 项目方宣传软文
- 毫无新意的"冲冲冲"
- 没有具体信息的喊单
- 与加密货币无关的话题
- 明显的广告/推广

---

## 监控博主列表

### 中文区 KOL/博主
@WuBlockchain @BlockBeatsAsia @ChainCatcher_ @OdailyChina
@PANewsCN @TechFlowPost @web3a99 @0xCryptoCat

### 项目方/官方账号
@solana @ethereum @binance @cz_binance @VitalikButerin

### 交易/市场观点
@CryptoCobain @HsakaTrades @LightCrypto @TheCryptoDog

---

## 输出格式

按内容类型分组，每条包含：
- 标题（吸引眼球）
- 来源 (@博主名)
- 时间 (X小时前)
- 热度 (❤️ Xk | 🔁 X)
- 内容摘要
- 适合角度 (快讯类/吃瓜类/交易类)
- 原推链接

---

## 参数说明

| 参数 | 默认值 | 说明 |
|------|--------|------|
| timeframe | 24h | 抓取时间范围 |
| maxResults | 15 | 最大输出条数 |
| types | all | 内容类型: gossip/trading/news/trending/all |
| saveFile | true | 是否保存到文件 |

---

## 工作流程

### 模式 1: 自动模式（默认）

```
1. 读取环境变量
2. 调用 6551 OpenNews API（新闻类）
3. 调用 6551 OpenTwitter API（社交类）
4. 按 AI 评分筛选 (score >= 70)
5. 按内容类型分组
6. 输出适合币安广场的内容
7. 保存到 vault（可选）
```

### 模式 2: 仅 6551

```
1. 调用 6551 API
2. 筛选高互动内容
3. 格式化输出
```

### 模式 3: 仅 Grok AI

```
1. 调用 Grok API
2. AI 分析并筛选
3. 输出
```

---

## 发布策略

### 早上 9:00
- 吃瓜类 1-2 条（互动率高）
- 交易观点类 1 条

### 下午 15:00
- 交易观点类 2 条（下午思考时间）
- 项目动态类 1 条

### 晚上 21:00
- 热点板块类 2 条（晚间活跃）
- 吃瓜类 1 条

---

## 依赖

- Node.js (运行脚本)
- Grok API Key (备用)
- 6551 API Token (主数据源，免费获取)

---

## 升级说明

### v2.0 主要变更

- ✅ 新增 6551 API 集成
- ✅ AI 评分系统
- ✅ Twitter 数据支持
- ✅ 50+ 新闻源覆盖
- ✅ 双数据源智能切换

### 从 v1.0 升级

1. 添加 6551 Token 到 `.env` 文件
2. 使用新的自动模式
3. 输出中会包含 AI 评分信息

---

*Skill 版本: 2.0.0 | 最后更新: 2026-02-27*
