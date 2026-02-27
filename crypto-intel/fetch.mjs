#!/usr/bin/env node
/**
 * 币圈价值信息情报官 - API 调用脚本 (支持 SSE 流式响应)
 * 使用 Grok API 获取过去 N 小时的加密货币高价值信息
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
          content: `你是币圈价值信息情报官，专门从加密货币资讯中筛选出高价值内容。

筛选标准：
✅ 价格异动：单日涨跌 > 5%，或突破关键点位（$60K、$65K 等）
✅ 爆仓大户：单笔爆仓 > $1M，或 24H 总爆仓 > $10M
✅ 项目动态：融资 > $10M，或一线交易所（币安、Coinbase）上币
✅ 监管政策：影响市场的重要政策变动（SEC、各国政府）
✅ 链上数据：ETF 资金流向 > $50M，或鲸鱼大额转账

请输出 10-15 条高质量内容，按类型分组，每条包含：
- 标题（吸引眼球）
- 时间
- 内容摘要（3-5句话）
- 影响/分析（简短）

使用中文输出。`
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
  const timeframe = args.timeframe || '4小时';
  const maxResults = args.maxResults || 15;

  console.log('🔍 开始抓取币圈价值信息...');
  console.log(`📊 时间范围: 过去 ${timeframe}`);
  console.log('🤖 调用 Grok API...');

  const prompt = `请作为币圈价值信息情报官，汇总过去 ${timeframe} 内的重要加密货币资讯。

重点关注领域：
- 💰 价格异动（BTC/ETH 等主流币）
- 💥 爆仓大户（大额清算、鲸鱼操作）
- 🚀 项目动态（融资、上币、主网上线）
- ⚖️ 监管政策（SEC、各国政府）
- 📈 链上数据（ETF、资金流向、持仓）

请输出 10-15 条高质量内容，按类型分组。如果 ${timeframe} 内资讯不足，可以扩展到过去24小时。`;

  try {
    const result = await callGrokAPI(prompt);

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = now.toTimeString().slice(0, 5);

    const output = `# 币圈价值信息日报 - ${dateStr} ${timeStr}

生成时间: ${now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
时间范围: 过去 ${timeframe}
数据来源: Grok API (${CONFIG.GROK_API_MODEL})

---

${result}

---

## 📊 市场概览

**生成时间**: ${dateStr} ${timeStr}
**时间范围**: 过去 ${timeframe}
**AI 模型**: ${CONFIG.GROK_API_MODEL}

---

⚠️ **风险提示**: 市场有风险，投资需谨慎。以上信息仅供参考，不构成投资建议。`;

    console.log('\n✅ 币圈价值信息已生成!\n');
    console.log(output);

    return {
      success: true,
      content: output,
      filename: `币圈价值信息-${dateStr}-${timeStr.replace(':', '')}.md`
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
