/**
 * Crypto 6551 - 测试脚本
 * 验证 API 可用性和数据质量
 */

import { Quick } from './index.js';

console.log('🚀 开始测试 6551 API...\n');

// 测试 1: 获取最新新闻
console.log('📰 测试 1: 获取最新新闻');
const news = await Quick.latestNews(5);
console.log(`✅ 获取 ${news.length} 条新闻\n`);
news.forEach((item, i) => {
  console.log(`${i + 1}. [${item.source}] ${item.text}`);
  console.log(`   评分: ${item.score} | ${item.grade} | ${item.signal}`);
  console.log(`   币种: ${item.coins} | 时间: ${item.time}\n`);
});

// 测试 2: BTC 相关新闻
console.log('\n₿ 测试 2: BTC 相关新闻');
const btcNews = await Quick.coinNews('BTC', 5);
console.log(`✅ 获取 ${btcNews.length} 条 BTC 新闻\n`);

// 测试 3: 热门加密推文
console.log('\n🐦 测试 3: 热门加密推文 (minLikes: 1000)');
const tweets = await Quick.hotTweets('bitcoin', 1000, 5);
console.log(`✅ 获取 ${tweets.length} 条推文\n`);
tweets.forEach((item, i) => {
  console.log(`${i + 1}. @${item.user} (${item.name})`);
  console.log(`   ${item.text}`);
  console.log(`   ❤️ ${item.likes} | 🔁 ${item.retweets} | 👥 ${item.followers} 粉丝`);
  console.log(`   ${item.url}\n`);
});

// 测试 4: KOL 推文
console.log('\n⭐ 测试 4: KOL 推文');
const kolTweets = await Quick.kolTweets(['VitalikButerin', 'cz_binance'], 3);
console.log(`✅ 获取 ${kolTweets.length} 条 KOL 推文\n`);

console.log('✅ 所有测试完成！');
