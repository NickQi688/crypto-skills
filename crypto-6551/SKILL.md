# Crypto 6551 - 币圈信息源聚合服务

**6551 API 调用的通用封装模块**

---

## 描述

提供统一的 6551 API 调用接口，支持 OpenNews（新闻聚合）和 OpenTwitter（推特数据）两大数据源。集成 AI 评分、实时搜索、多维度筛选功能。

**核心优势：**
- ✅ **50+ 新闻源**：Bloomberg, Reuters, CoinDesk, Cointelegraph, Binance 等
- ✅ **AI 评分系统**：每条新闻自带 score(0-100), signal(long/short/neutral), grade(A-F)
- ✅ **Twitter 数据**：用户推文、搜索、KOL 追踪、关注事件
- ✅ **实时更新**：WebSocket 推送支持
- ✅ **免费额度**：10000 次请求/天

---

## 使用方法

### 基础用法

```
获取最新加密货币新闻
搜索比特币相关推文
查看 VitalikButerin 的最新推文
获取 AI 评分 80 以上的重要新闻
```

### 高级用法

```
获取币安广场相关内容:
- 数据源: 6551 OpenNews + OpenTwitter
- 筛选: AI 评分 >= 70
- 时间: 过去 4 小时
- 最大条数: 20

搜索以太坊相关新闻:
- 关键词: ETH, Ethereum
- 来源: Bloomberg, Reuters, CoinDesk
- 信号类型: long

追踪 Twitter KOL:
- 用户列表: VitalikButerin, cz_binance, elonmusk
- 获取最新推文和互动数据
```

---

## 配置

### 环境变量

编辑 `Web 3.0/机会方向/币安内容挖矿/.env` 添加：

```bash
# 6551 API 配置
NEWS_6551_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEWS_6551_API_BASE=https://ai.6551.io
TWITTER_6551_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
TWITTER_6551_API_BASE=https://ai.6551.io
```

### API Token 获取

访问 https://6551.io/mcp 申请免费 Token

---

## API 接口

### OpenNews API

#### 1. 获取最新新闻

```bash
POST https://ai.6551.io/open/news_search
Content-Type: application/json
Authorization: Bearer $NEWS_6551_TOKEN

{
  "limit": 20,
  "page": 1
}
```

#### 2. 按关键词搜索

```json
{
  "q": "bitcoin ETF",
  "limit": 20,
  "page": 1
}
```

#### 3. 按币种筛选

```json
{
  "coins": ["BTC", "ETH"],
  "limit": 20,
  "page": 1
}
```

#### 4. 按来源筛选

```json
{
  "engineTypes": {
    "news": ["Bloomberg", "Reuters"]
  },
  "limit": 20,
  "page": 1
}
```

#### 5. 按类型筛选

```json
{
  "engineTypes": {
    "listing": ["binance"],
    "onchain": ["kol"],
    "market": ["price_change", "liquidation"]
  },
  "limit": 20
}
```

#### 6. 高质量筛选

```json
{
  "hasCoin": true,
  "limit": 50
}
```

### OpenTwitter API

#### 1. 获取用户推文

```bash
POST https://ai.6551.io/open/twitter_user_tweets
Content-Type: application/json
Authorization: Bearer $TWITTER_6551_TOKEN

{
  "username": "VitalikButerin",
  "maxResults": 20,
  "product": "Latest"
}
```

#### 2. 搜索推文

```json
{
  "keywords": "bitcoin",
  "minLikes": 1000,
  "product": "Top",
  "maxResults": 20
}
```

#### 3. 按标签搜索

```json
{
  "hashtag": "crypto",
  "minLikes": 500,
  "maxResults": 20
}
```

#### 4. 获取用户资料

```bash
POST https://ai.6551.io/open/twitter_user_info
{
  "username": "elonmusk"
}
```

#### 5. 关注事件

```bash
POST https://ai.6551.io/open/twitter_follower_events
{
  "username": "VitalikButerin",
  "isFollow": true,
  "maxResults": 20
}
```

---

## 数据结构

### OpenNews 响应

```json
{
  "id": "946751",
  "text": "Shares in Turkey's Galata Wind Down...",
  "newsType": "Reuters",
  "engineType": "news",
  "link": "https://...",
  "coins": [
    {
      "symbol": "BTC",
      "market_type": "spot",
      "match": "title"
    }
  ],
  "aiRating": {
    "score": 85,
    "grade": "A",
    "signal": "long",
    "status": "done",
    "summary": "中文摘要",
    "enSummary": "English summary"
  },
  "ts": "2026-02-27T06:58:33.294342Z"
}
```

### OpenTwitter 响应

```json
{
  "id": "2027143356820676932",
  "text": "On a scale of 0-100%...",
  "createdAt": "Thu Feb 26 22:06:53 +0000 2026",
  "retweetCount": 29,
  "favoriteCount": 1760,
  "replyCount": 1530,
  "userScreenName": "TheBTCTherapist",
  "userName": "The ₿itcoin Therapist",
  "userFollowers": 263752,
  "userVerified": true,
  "hashtags": ["bitcoin", "crypto"]
}
```

---

## 新闻源分类

### news (新闻)
- **主流媒体**: Bloomberg, Reuters, FT, CNN, CNBC, BBC
- **加密媒体**: CoinDesk, Cointelegraph, The Block, Decrypt, Blockworks
- **官方账号**: Binance, Coinbase, Solana, Ethereum
- **社交平台**: Twitter, Telegram, Weibo

### listing (上币公告)
- Binance, OKX, Bybit, Coinbase, Upbit, Bithumb, Hyperliquid

### onchain (链上)
- 巨鲸交易、KOL 交易、大额建仓

### meme (Meme)
- Twitter 热门 Meme 讨论

### market (行情异动)
- 涨跌幅、资金费率、大额清算、OI 异动

---

## 使用示例

### 示例 1：获取高评分新闻

```bash
curl -s -X POST 'https://ai.6551.io/open/news_search' \
  -H "Authorization: Bearer $NEWS_6551_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"limit":50,"page":1}' | \
  jq '[.data[] | select(.aiRating.score >= 80)]'
```

### 示例 2：搜索 BTC 相关新闻

```bash
curl -s -X POST 'https://ai.6551.io/open/news_search' \
  -H "Authorization: Bearer $NEWS_6551_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"coins":["BTC"],"limit":20,"page":1}'
```

### 示例 3：搜索热门加密推文

```bash
curl -s -X POST 'https://ai.6551.io/open/twitter_search' \
  -H "Authorization: Bearer $TWITTER_6551_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"keywords":"crypto","minLikes":1000,"maxResults":20}'
```

---

## 配额管理

- **免费额度**: 10,000 次请求/天
- **查询剩余配额**: 响应中的 `quota` 字段
- **成本**: 每次请求 1 单位

---

## 工作流程

1. **读取环境变量** 加载 API Token
2. **发起 HTTP 请求** 调用 6551 API
3. **解析响应数据** 提取有效信息
4. **智能筛选** 根据 AI 评分、关键词等筛选
5. **格式化输出** 统一输出格式

---

## 集成说明

此 skill 作为**数据源层**，可以被其他 skills 调用：

- `crypto-intel` - 币圈价值信息情报官
- `binance-content` - 币安广场内容情报专员
- `clawintel` - ClawIntel 项目

调用方式：

```
使用 crypto-6551 获取最新新闻，然后...
使用 crypto-6551 搜索 Twitter，然后...
```

---

## 依赖

- Node.js fetch (或 curl)
- 6551 API Token (免费)

---

## 更新日志

- **v1.0.0** (2026-02-27): 初始版本，支持 OpenNews + OpenTwitter

---

*Skill 版本: 1.0.0 | 最后更新: 2026-02-27*
