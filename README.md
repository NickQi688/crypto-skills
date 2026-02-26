# Crypto Skills - 币圈信息抓取工具集

一套用于抓取和分析加密货币市场信息的 AI Skills，支持币安广场内容挖掘和币圈价值情报收集。

---

## 📦 包含的 Skills

### 1. binance-content - 币安广场内容情报专员

从币圈资讯中筛选出适合在币安广场发布的高互动内容。

**功能特点：**
- 自动抓取过去 24 小时加密货币资讯
- 筛选吃瓜八卦、交易观点、项目动态、热点板块
- 支持多种内容类型分类
- 内置发布策略建议

**使用场景：**
- 币安广场内容运营
- 社交媒体内容策划
- 市场热点追踪

---

### 2. crypto-intel - 币圈价值信息情报官

从加密货币资讯中筛选出高价值投资信息。

**功能特点：**
- 价格异动监控（涨跌 > 5%）
- 爆仓大户追踪（单笔 > $1M）
- 项目动态筛选（融资 > $10M）
- 监管政策更新
- 链上数据分析

**使用场景：**
- 投资决策参考
- 市场趋势分析
- 风险事件监控

---

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/NickQi688/crypto-skills.git
cd crypto-skills
```

### 2. 配置 API

创建 `.env` 文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入您的 Grok API 配置：

```bash
GROK_API_KEY=your_api_key_here
GROK_API_ENDPOINT=https://ai.a9.bot/v1
GROK_API_MODEL=grok-4.20-beta
```

### 3. 使用 Skill

将 `binance-content` 和 `crypto-intel` 目录复制到您的 AI 助手 skills 目录：

```bash
# OpenClaw
cp -r binance-content ~/.openclaw/skills/
cp -r crypto-intel ~/.openclaw/skills/

# Zylos
cp -r binance-content ~/.zylos/skills/
cp -r crypto-intel ~/.zylos/skills/
```

---

## 📋 环境要求

- Node.js 18+
- Grok API Key
- OpenClaw 或 Zylos（可选）

---

## 📖 使用示例

### 币安广场内容

```
生成今天的币安广场内容
```

或带参数：

```
生成币安内容:
- 时间范围: 12小时
- 内容类型: 吃瓜类+交易类
- 最大条数: 15条
```

### 币圈情报

```
帮我抓取过去4小时的币圈资讯
```

或带参数：

```
抓取币圈资讯:
- 时间范围: 12小时
- 最大条数: 20条
```

---

## 🔧 配置说明

### API 配置

| 变量 | 说明 | 必填 |
|------|------|------|
| GROK_API_KEY | Grok API 密钥 | ✅ |
| GROK_API_ENDPOINT | API 端点地址 | ✅ |
| GROK_API_MODEL | 使用的模型 | ✅ |

### 获取 Grok API Key

访问 [Groq](https://groq.com) 注册账号并获取 API Key。

---

## 📁 项目结构

```
crypto-skills/
├── binance-content/      # 币安广场内容 Skill
│   ├── SKILL.md          # Skill 定义文件
│   └── fetch.mjs         # 数据抓取脚本
├── crypto-intel/         # 币圈情报 Skill
│   ├── SKILL.md          # Skill 定义文件
│   └── fetch.mjs         # 数据抓取脚本
├── .env.example          # 环境变量示例
└── README.md             # 项目说明
```

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

MIT License

---

## 🙏 致谢

- Grok API - 提供强大的 AI 能力
- OpenClaw/Zylos - AI 助手框架

---

*最后更新: 2026-02-26*
