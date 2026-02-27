# 币圈价值信息情报官 v2.0

**双数据源融合：6551 API (主) + ClawIntel (备)**

---

## 描述

从加密货币资讯中筛选出高价值投资信息。采用**双数据源策略**：

### 🎯 主数据源：6551 API（优先）
- ✅ **50+ 新闻源**：Bloomberg, Reuters, CoinDesk, Cointelegraph, Binance 等
- ✅ **AI 评分系统**：每条新闻自带 score(0-100), signal(long/short/neutral)
- ✅ **实时更新**：24/7 监控，覆盖 news, listing, onchain, market 五大类型
- ✅ **Twitter 数据**：KOL 推文、热门讨论、市场情绪
- ✅ **免费额度**：10,000 次请求/天

### 🔧 备用数据源：ClawIntel（补充）
- Grok AI 深度分析
- 自定义数据源（6551 未覆盖的）
- 本地存储和缓存

---

## 使用方法

```
帮我抓取过去4小时的币圈资讯
```

或者带参数：

```
抓取币圈资讯:
- 时间范围: 12小时
- 最大条数: 20条
```

---

## 配置

在使用前，需要设置 API 配置。

编辑配置文件：`Web 3.0/机会方向/币安内容挖矿/.env`

```bash
# Grok API (ClawIntel 使用)
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

## 筛选标准

✅ **价格异动**: 单日涨跌 > 5%，或突破关键点位（$60K、$65K 等）
✅ **爆仓大户**: 单笔爆仓 > $1M，或 24H 总爆仓 > $10M
✅ **项目动态**: 融资 > $10M，或一线交易所（币安、Coinbase）上币
✅ **监管政策**: 影响市场的重要政策变动（SEC、各国政府）
✅ **链上数据**: ETF 资金流向 > $50M，或鲸鱼大额转账

---

## 输出格式

按类型分组，每条包含：
- 标题（吸引眼球）
- 时间
- 内容摘要（3-5句话）
- 影响/分析（简短）

---

## 参数说明

| 参数 | 默认值 | 说明 |
|------|--------|------|
| timeframe | 4h | 抓取时间范围 |
| maxResults | 15 | 最大输出条数 |
| saveFile | true | 是否保存到文件 |

---

## 工作流程

### 模式 1: 自动模式（默认）

```
1. 读取环境变量
2. 尝试调用 6551 API
   ├─ 获取最新新闻
   ├─ 筛选 AI 评分 >= minScore
   └─ 按类型分组
3. 判断数据是否充足
   ├─ 足够 → 直接输出
   └─ 不足 → 补充 ClawIntel
4. 数据合并与去重
5. 格式化输出
6. 保存到 vault（可选）
```

### 模式 2: 仅 6551

```
1. 调用 6551 OpenNews API
2. 调用 6551 OpenTwitter API
3. 按 AI 评分筛选
4. 输出
```

### 模式 3: 仅 ClawIntel

```
1. 调用 Grok API
2. 生成分析报告
3. 输出
```

---

## 依赖

- Node.js (运行脚本)
- Grok API Key (ClawIntel)
- 6551 API Token (免费获取: https://6551.io/mcp)

---

## 升级说明

### v2.0 主要变更

- ✅ 新增 6551 API 集成
- ✅ 双数据源智能切换
- ✅ AI 评分系统
- ✅ Twitter 数据支持
- ✅ 50+ 新闻源覆盖

### 从 v1.0 升级

1. 添加 6551 Token 到 `.env` 文件
2. 使用新的 `dataSource: auto` 参数
3. 输出中会包含数据来源标识

---

*Skill 版本: 2.0.0 | 最后更新: 2026-02-27*
