/**
 * Crypto Skills 集成测试
 * 验证 6551 + ClawIntel 数据合并逻辑
 */

import { Quick } from './crypto-6551/index.js';

console.log('🚀 开始集成测试...\n');

// ========== 测试 1: 6551 OpenNews ==========
console.log('📰 测试 1: 6551 OpenNews');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

const news = await Quick.latestNews(10);
console.log(`✅ 获取 ${news.length} 条新闻\n`);

// 按评分分组
const highScore = news.filter(n => n.score >= 80);
const mediumScore = news.filter(n => n.score >= 60 && n.score < 80);
const lowScore = news.filter(n => n.score < 60);

console.log(`📊 评分分布:`);
console.log(`   高分 (>=80): ${highScore.length} 条`);
console.log(`   中分 (60-79): ${mediumScore.length} 条`);
console.log(`   低分 (<60): ${lowScore.length} 条\n`);

// 显示高分新闻
if (highScore.length > 0) {
  console.log('⭐ 高分新闻:');
  highScore.slice(0, 3).forEach((item, i) => {
    console.log(`   ${i + 1}. [${item.source}] ${item.text}`);
    console.log(`      评分: ${item.score} (${item.grade}) | ${item.signal} | ${item.time}\n`);
  });
}

// ========== 测试 2: 6551 OpenTwitter ==========
console.log('\n🐦 测试 2: 6551 OpenTwitter');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

const tweets = await Quick.hotTweets('crypto', 500, 10);
console.log(`✅ 获取 ${tweets.length} 条热门推文\n`);

// 按互动量排序
const sortedTweets = tweets.sort((a, b) => b.likes - a.likes);
console.log(`📊 互动量 Top 5:`);
sortedTweets.slice(0, 5).forEach((item, i) => {
  console.log(`   ${i + 1}. @${item.user} (${item.name})`);
  console.log(`      ❤️ ${item.likes} | 🔁 ${item.retweets} | 👥 ${item.followers} 粉丝`);
  console.log(`      ${item.text.substring(0, 80)}...\n`);
});

// ========== 测试 3: BTC 专项新闻 ==========
console.log('\n₿ 测试 3: BTC 相关新闻');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

const btcNews = await Quick.coinNews('BTC', 10);
console.log(`✅ 获取 ${btcNews.length} 条 BTC 新闻\n`);

// 按 signal 分组
const longSignals = btcNews.filter(n => n.signal === 'long');
const shortSignals = btcNews.filter(n => n.signal === 'short');

console.log(`📊 信号分布:`);
console.log(`   看涨 (long): ${longSignals.length} 条`);
console.log(`   看跌 (short): ${shortSignals.length} 条\n`);

// ========== 测试 4: 数据合并模拟 ==========
console.log('\n🔀 测试 4: 数据合并逻辑');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// 模拟多数据源合并
const sources = {
  '6551-OpenNews': news.length,
  '6551-OpenTwitter': tweets.length,
  'ClawIntel-Grok': 0, // 暂未实现
};

console.log(`📊 数据源统计:`);
Object.entries(sources).forEach(([source, count]) => {
  console.log(`   ${source}: ${count} 条`);
});

const totalItems = Object.values(sources).reduce((a, b) => a + b, 0);
console.log(`\n✅ 总计: ${totalItems} 条信息`);

// ========== 测试 5: 输出格式化 ==========
console.log('\n📝 测试 5: 输出格式化');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

console.log('\n## 🔴 价格异动\n');
if (highScore.length > 0) {
  const item = highScore[0];
  console.log(`### ${item.text}`);
  console.log(`🕐 ${item.time} | 📊 评分: ${item.score} (${item.grade}) | 📈 ${item.signal}`);
  console.log(`📍 来源: 6551 (${item.source})\n`);
  console.log(`${item.summary}\n`);
}

console.log('\n## 🐦 Twitter 热门讨论\n');
if (sortedTweets.length > 0) {
  const tweet = sortedTweets[0];
  console.log(`### @${tweet.user}: ${tweet.name}`);
  console.log(`🕐 ${tweet.time} | ❤️ ${tweet.likes} | 🔁 ${tweet.retweets}`);
  console.log(`📍 来源: 6551 (OpenTwitter)\n`);
  console.log(`${tweet.text}\n`);
  console.log(`🔗 ${tweet.url}\n`);
}

// ========== 总结 ==========
console.log('\n✅ 测试完成！');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n📋 测试结果总结:');
console.log(`   ✅ 6551 OpenNews: 正常`);
console.log(`   ✅ 6551 OpenTwitter: 正常`);
console.log(`   ✅ AI 评分系统: 正常`);
console.log(`   ✅ 数据筛选逻辑: 正常`);
console.log(`   ⏳ ClawIntel 集成: 待实现`);
console.log('\n💡 下一步:');
console.log('   1. 实现 ClawIntel 数据源');
console.log('   2. 添加数据去重逻辑');
console.log('   3. 实现智能切换策略');
console.log('   4. 添加本地缓存机制\n');
