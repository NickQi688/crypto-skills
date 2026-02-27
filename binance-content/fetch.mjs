#!/usr/bin/env node
/**
 * 币安广场内容情报专员 - API 调用脚本 (支持 SSE 流式响应)
 * 使用 Grok API 获取过去 N 小时的适合币安广场发布的内容
 */

import https from 'https';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取 .env 配置
function loadEnv() {
  try {
    const envPath = join(__dirname, '../../../.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const env = {};

    for (const line of envContent.split('\n')) {
      const [key, ...valueParts] = line.split('=');
      if (key && !key.startsWith('#') && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }

    return env;
  } catch (error) {
    console.error('❌ 无法读取 .env 文件:', error.message);
    return {};
  }
}

const env = loadEnv();

const CONFIG = {
  GROK_API_KEY: env.GROK_API_KEY || '',
  GROK_API_ENDPOINT: env.GROK_API_ENDPOINT || 'https://ai.a9.bot/v1',
  GROK_API_MODEL: env.GROK_API_MODEL || 'grok-4.20-beta'
};

/**
 * 调用 Grok API (支持流式响应)
 */
function callGrokAPI(prompt) {
  return new Promise((resolve, reject) => {
    const url = new URL(CONFIG.GROK_API_ENDPOINT + '/chat/completions');

    const requestBody = {
      model: CONFIG.GROK_API_MODEL,
      messages: [
        {
          role: 'system',
          content: `请作为我的币安广场内容情报专员，汇总过去 24 小时内我关注的区块链/加密货币博主发布的内容，筛选出**适合在币安广场发布**的素材。

## 监控博主列表

### 中文区 KOL/博主 (优先级最高)
@WuBlockchain @BlockBeatsAsia @ChainCatcher_ @OdailyChina @PANewsCN @TechFlowPost @web3a99 @0xCryptoCat

### 项目方/官方账号
@solana @ethereum @binance @cz_binance @VitalikButerin

### 交易/市场观点
@CryptoCobain @HsakaTrades @LightCrypto @TheCryptoDog

## 内容筛选标准

### ✅ 必须保留: 币安广场高互动内容

#### 1. 吃瓜八卦类 (高互动!)
- 大户爆仓/亏损晒单
- 钱包被盗/黑客事件
- 项目方跑路/Rug Pull
- 名人互撕/争议言论
- 市场异动/暴涨暴跌
- Meme币暴富/归零故事

#### 2. 交易观点类
- 技术分析/图表解读
- 市场趋势预判
- 仓位管理策略
- 宏观事件影响
- 链上数据解读

#### 3. 项目动态类
- 融资新闻
- TGE/上币公告
- 主网上线
- 重大合作
- 产品发布
- 空投放送

#### 4. 热点板块类
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
- 纯理论/学术讨论
- 明显的广告/推广

## 输出格式

按内容类型分组，每条包含：
1. **标题** - 吸引眼球，感叹式
2. **来源** - @博主名
3. **时间** - X小时前
4. **热度** - ❤️ Xk | 🔁 X
5. **内容摘要** - 3-5句话
6. **适合角度** - 快讯类/吃瓜类/交易类
7. **原推链接** - 方便查看

## 排序优先级
1. 互动热度 (点赞 + 转发)
2. 时效性 (24小时内)
3. 争议性 (容易引发讨论)
4. 可执行性 (有明确机会)

**目标**: 每天 10-15 条高质量内容

请使用中文输出。`
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 4000
    };

    const postData = JSON.stringify(requestBody);

    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.GROK_API_KEY}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let fullContent = '';
      let buffer = '';

      res.on('data', (chunk) => {
        buffer += chunk;
        const lines = buffer.split('\n');

        // 保留最后不完整的行
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                fullContent += parsed.choices[0].delta.content;
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      });

      res.on('end', () => {
        if (fullContent) {
          resolve(fullContent);
        } else {
          reject(new Error('Empty response'));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * 主函数
 */
async function main(args = {}) {
  const timeframe = args.timeframe || '24小时';
  const maxResults = args.maxResults || 15;
  const types = args.types || 'all';

  console.log('🔍 开始生成币安广场内容...');
  console.log(`📊 时间范围: 过去 ${timeframe}`);
  console.log('🤖 调用 Grok API...');

  const typeFilter = types === 'all' ? '' : `，重点关注: ${types}`;

  const prompt = `请作为币安广场内容情报专员，汇总过去 ${timeframe} 内的加密货币资讯${typeFilter}。

重点筛选适合在币安广场发布的高互动内容：
- 🍉 吃瓜八卦类 (爆仓、被盗、跑路、争议)
- 📊 交易观点类 (技术分析、市场趋势)
- 🚀 项目动态类 (融资、TGE、主网)
- 🔥 热点板块类 (新叙事、板块轮动)

请输出 10-15 条高质量内容，按类型分组。结尾请加上今日币安广场内容趋势总结和建议策略。`;

  try {
    const result = await callGrokAPI(prompt);

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = now.toTimeString().slice(0, 5);

    const output = `# 币安广场内容日报 - ${dateStr} ${timeStr}

生成时间: ${now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
时间范围: 过去 ${timeframe}
数据来源: Grok API (${CONFIG.GROK_API_MODEL})

---

${result}

---

## 💡 发布建议

### 早9点发布
- 吃瓜类 1-2 条（互动率高）
- 交易观点类 1 条

### 下午3点发布
- 交易观点类 2 条（下午思考时间）
- 项目动态类 1 条

### 晚上9点发布
- 热点板块类 2 条（晚间活跃）
- 吃瓜类 1 条

### ⚠️ 注意事项
- 关联币种标签优先选择永续合约
- 错开发布，3个账号不要同时发相同内容
- 积极回复评论，增加流量
- 记得添加话题标签 #加密货币 #BTC #ETH

---

*生成时间: ${dateStr} ${timeStr} | Skill: binance-content*`;

    console.log('\n✅ 币安广场内容已生成!\n');
    console.log(output);

    return {
      success: true,
      content: output,
      filename: `币安广场内容-${dateStr}-${timeStr.replace(':', '')}.md`
    };

  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// 导出供 Skill 使用
export { main };

// 如果直接运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
