/**
 * Crypto 6551 - 通用 API 调用模块
 * 支持 OpenNews 和 OpenTwitter
 */

import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const BASE_URL = process.env.NEWS_6551_API_BASE || 'https://ai.6551.io';
const NEWS_TOKEN = process.env.NEWS_6551_TOKEN;
const TWITTER_TOKEN = process.env.TWITTER_6551_TOKEN;

/**
 * 通用 HTTP 请求封装
 */
async function request(endpoint, token, body = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method: body ? 'POST' : 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ 请求失败: ${url}`, error.message);
    return null;
  }
}

/**
 * OpenNews API
 */
export const OpenNews = {
  /**
   * 获取最新新闻
   */
  async getLatest(limit = 20, page = 1) {
    return request('/open/news_search', NEWS_TOKEN, { limit, page });
  },

  /**
   * 关键词搜索
   */
  async search(keyword, limit = 20, page = 1) {
    return request('/open/news_search', NEWS_TOKEN, { q: keyword, limit, page });
  },

  /**
   * 按币种搜索
   */
  async searchByCoin(coins, limit = 20, page = 1) {
    return request('/open/news_search', NEWS_TOKEN, { coins, limit, page });
  },

  /**
   * 按来源搜索
   */
  async searchBySource(engineTypes, limit = 20, page = 1) {
    return request('/open/news_search', NEWS_TOKEN, { engineTypes, limit, page });
  },

  /**
   * 获取高评分新闻
   */
  async getHighScore(minScore = 80, limit = 50) {
    const result = await request('/open/news_search', NEWS_TOKEN, { limit, page: 1 });
    if (result && result.data) {
      return {
        ...result,
        data: result.data.filter(item => item.aiRating?.score >= minScore)
      };
    }
    return result;
  },

  /**
   * 按信号搜索 (long/short/neutral)
   */
  async getBySignal(signal, limit = 20) {
    const result = await request('/open/news_search', NEWS_TOKEN, { limit: 100, page: 1 });
    if (result && result.data) {
      return {
        ...result,
        data: result.data.filter(item => item.aiRating?.signal === signal).slice(0, limit)
      };
    }
    return result;
  },

  /**
   * 获取新闻源分类
   */
  async getSources() {
    return request('/open/news_type', NEWS_TOKEN);
  },
};

/**
 * OpenTwitter API
 */
export const OpenTwitter = {
  /**
   * 获取用户推文
   */
  async getUserTweets(username, maxResults = 20) {
    return request('/open/twitter_user_tweets', TWITTER_TOKEN, {
      username,
      maxResults,
      product: 'Latest'
    });
  },

  /**
   * 搜索推文
   */
  async search(options) {
    const body = {
      maxResults: options.maxResults || 20,
      product: options.product || 'Top',
    };

    if (options.keywords) body.keywords = options.keywords;
    if (options.hashtag) body.hashtag = options.hashtag;
    if (options.fromUser) body.fromUser = options.fromUser;
    if (options.minLikes) body.minLikes = options.minLikes;
    if (options.minRetweets) body.minRetweets = options.minRetweets;

    return request('/open/twitter_search', TWITTER_TOKEN, body);
  },

  /**
   * 获取用户资料
   */
  async getUserInfo(username) {
    return request('/open/twitter_user_info', TWITTER_TOKEN, { username });
  },

  /**
   * 获取关注事件
   */
  async getFollowerEvents(username, isFollow = true, maxResults = 20) {
    return request('/open/twitter_follower_events', TWITTER_TOKEN, {
      username,
      isFollow,
      maxResults
    });
  },

  /**
   * 获取删推
   */
  async getDeletedTweets(username, maxResults = 20) {
    return request('/open/twitter_deleted_tweets', TWITTER_TOKEN, {
      username,
      maxResults
    });
  },
};

/**
 * 快捷方法
 */
export const Quick = {
  /**
   * 获取最新加密新闻
   */
  async latestNews(limit = 20) {
    const result = await OpenNews.getLatest(limit);
    return formatNews(result);
  },

  /**
   * 搜索币相关新闻
   */
  async coinNews(coin, limit = 20) {
    const result = await OpenNews.searchByCoin([coin.toUpperCase()], limit);
    return formatNews(result);
  },

  /**
   * 获取热门加密推文
   */
  async hotTweets(keyword = 'crypto', minLikes = 1000, limit = 20) {
    const result = await OpenTwitter.search({
      keywords: keyword,
      minLikes,
      maxResults: limit
    });
    return formatTweets(result);
  },

  /**
   * 获取 KOL 推文
   */
  async kolTweets(usernames, limit = 10) {
    const promises = usernames.map(username =>
      OpenTwitter.getUserTweets(username, limit)
    );
    const results = await Promise.all(promises);
    return results.map(r => formatTweets(r)).flat();
  },
};

/**
 * 格式化输出
 */
function formatNews(result) {
  if (!result?.data) return [];
  return result.data.map(item => ({
    id: item.id,
    text: item.text,
    source: item.newsType,
    type: item.engineType,
    link: item.link,
    coins: item.coins?.map(c => c.symbol).join(', ') || '-',
    score: item.aiRating?.score || 0,
    grade: item.aiRating?.grade || '-',
    signal: item.aiRating?.signal || '-',
    summary: item.aiRating?.summary || item.aiRating?.enSummary || '',
    time: new Date(item.ts).toLocaleString('zh-CN'),
  }));
}

function formatTweets(result) {
  if (!result?.data) return [];
  return result.data.map(item => ({
    id: item.id,
    text: item.text,
    user: item.userScreenName,
    name: item.userName,
    followers: item.userFollowers,
    verified: item.userVerified,
    likes: item.favoriteCount,
    retweets: item.retweetCount,
    replies: item.replyCount,
    time: new Date(item.createdAt).toLocaleString('zh-CN'),
    url: `https://x.com/${item.userScreenName}/status/${item.id}`,
  }));
}

export default { OpenNews, OpenTwitter, Quick };
