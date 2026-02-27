# Crypto Skills 融合方案 - 6551 API 集成

**双数据源架构：6551 API (主) + ClawIntel (备)**

---

## 📊 方案概述

### 架构图

```
┌─────────────────────────────────────────────────────────┐
│                   Crypto Skills v2.0                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐         ┌──────────────┐             │
│  │  6551 API    │────────▶│ crypto-6551  │             │
│  │  (主数据源)   │         │  (通用模块)   │             │
│  └──────────────┘         └──────┬───────┘             │
│                                  │                      │
│                                  ├──▶ crypto-intel     │
│                                  ├──▶ binance-content  │
│                                  └──▶ [其他 skills]    │
│                                                         │
│  ┌──────────────┐         ┌──────────────┐             │
│  │ ClawIntel    │────────▶│ Grok AI      │             │
│  │  (备用源)     │         │  (深度分析)   │             │
│  └──────────────┘         └──────────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 核心优势

### 6551 API (主数据源)

| 能力 | 说明 |
|------|------|
| **数据覆盖** | 50+ 新闻源，Twitter 数据 |
| **AI 评分** | 每条新闻自带 score(0-100), signal, grade |
| **实时性** | 24/7 监控，WebSocket 支持 |
| **成本** | 免费额度 10,000 次/天 |
| **类型** | news, listing, onchain, meme, market |

### ClawIntel (备用源)

| 能力 | 说明 |
|------|------|
| **深度分析** | Grok AI 生成深度洞察 |
| **自定义源** | 支持自定义数据源 |
| **本地存储** | SQLite 缓存 |
| **可控性** | 完全自主可控 |

---

## 📁 Skills 结构

```
skills/
├── crypto-6551/              # 🆕 通用 6551 API 模块
│   ├── SKILL.md              # API 文档
│   ├── package.json
│   ├── index.js              # 核心调用封装
│   └── test.js               # 单元测试
│
├── crypto-intel/             # ✏️ 已升级 v2.0
│   └── SKILL.md              # 集成 6551 + ClawIntel
│
├── binance-content/          # ✏️ 已升级 v2.0
│   └── SKILL.md              # 集成 6551 + Grok AI
│
└── test-integration.js       # 🆕 集成测试脚本
```

---

## 🚀 快速开始

### 1. 配置环境变量

编辑 `.env` 文件，添加 6551 Token：

```bash
# 6551 API (主数据源)
NEWS_6551_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEWS_6551_API_BASE=https://ai.6551.io

TWITTER_6551_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
TWITTER_6551_API_BASE=https://ai.6551.io

# Grok API (备用源，已有配置)
GROK_API_KEY=sk-...
GROK_API_ENDPOINT=https://ai.a9.bot/v1
GROK_API_MODEL=grok-4.20-beta
```

### 2. 获取 6551 Token

访问 https://6551.io/mcp 免费申请 Token

### 3. 测试 API

```bash
cd skills/crypto-6551
npm install dotenv
node test.js
```

### 4. 运行集成测试

```bash
cd skills
node test-integration.js
```

---

## 📖 使用示例

### crypto-intel (币圈价值信息)

```
帮我抓取过去4小时的币圈资讯
```

**自动模式** (默认)：
1. 优先使用 6551 API
2. 筛选 AI 评分 >= 70
3. 如果数据不足，补充 ClawIntel
4. 合并去重后输出

### binance-content (币安广场内容)

```
生成今天的币安广场内容
```

**自动模式** (默认)：
1. 6551 OpenNews 获取新闻
2. 6551 OpenTwitter 获取热门推文
3. 筛选高互动内容
4. 格式化为币安广场风格

---

## 🔧 API 调用示例

### 获取最新新闻

```javascript
import { Quick } from './crypto-6551/index.js';

// 获取最新 20 条新闻
const news = await Quick.latestNews(20);

// 获取 BTC 相关新闻
const btcNews = await Quick.coinNews('BTC', 20);

// 获取高评分新闻
const highScore = news.filter(n => n.score >= 80);
```

### 获取 Twitter 数据

```javascript
// 获取热门加密推文
const tweets = await Quick.hotTweets('bitcoin', 1000, 20);

// 获取 KOL 推文
const kolTweets = await Quick.kolTweets(
  ['VitalikButerin', 'cz_binance'],
  10
);
```

---

## 📊 数据源优先级

| 场景 | 主数据源 | 备用源 |
|------|----------|--------|
| **新闻资讯** | 6551 OpenNews | ClawIntel |
| **Twitter 数据** | 6551 OpenTwitter | ClawIntel |
| **上币公告** | 6551 Listing | ClawIntel |
| **链上数据** | 6551 OnChain | ClawIntel |
| **深度分析** | ClawIntel Grok AI | - |
| **自定义源** | ClawIntel | - |

---

## 🎯 下一步计划

### Phase 1: 基础集成 (当前)
- ✅ crypto-6551 通用模块
- ✅ crypto-intel v2.0
- ✅ binance-content v2.0
- ✅ 集成测试脚本

### Phase 2: 完善 (待实现)
- ⏳ ClawIntel 数据源集成
- ⏳ 数据去重逻辑
- ⏳ 智能切换策略
- ⏳ 本地缓存机制

### Phase 3: 优化 (可选)
- ⏳ WebSocket 实时推送
- ⏳ 自定义评分模型
- ⏳ 多语言支持

---

## 📝 配额管理

### 6551 API

- **免费额度**: 10,000 次/天
- **查询剩余配额**: 响应中的 `quota` 字段
- **成本**: 每次请求 1 单位

### Grok API

- **按使用量计费**
- **备用方案**: 仅在 6551 不可用时使用

---

## 🐛 故障排除

### 6551 API 返回 "无效的token"

**问题**: Token 格式错误或已过期

**解决**:
1. 检查 Token 格式（应该是 `eyJ...` 而不是 `ceyJ...`）
2. 重新访问 https://6551.io/mcp 获取新 Token
3. 更新 `.env` 文件

### 数据返回为空

**问题**: 筛选条件过于严格

**解决**:
1. 降低 `minScore` 阈值
2. 增大 `limit` 参数
3. 尝试不同的搜索关键词

---

## 📞 技术支持

- **6551 文档**: https://6551.io/mcp
- **6551 GitHub**: https://github.com/6551Team
- **ClawIntel**: 本地项目

---

*更新日期: 2026-02-27 | 版本: 2.0.0*
