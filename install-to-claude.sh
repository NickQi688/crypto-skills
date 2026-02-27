#!/bin/bash

# Crypto Skills 安装脚本 - Claude Desktop 版本
# 将 skills 复制到 Claude Desktop

set -e

VAULT_ROOT="/Users/zhaobo/Documents/qukuaiqiji/my-note"
CLAUDE_SKILLS="$HOME/Library/Application Support/Claude/claude-desk-config.json"
SOURCE_DIR="$VAULT_ROOT/Web 3.0/机会方向/币安内容挖矿/skills"

echo "🚀 开始安装 Crypto Skills 到 Claude Desktop..."
echo ""

# 检查 Claude Desktop 配置文件
if [ ! -f "$CLAUDE_SKILLS" ]; then
  echo "❌ Claude Desktop 配置文件不存在: $CLAUDE_SKILLS"
  echo "请确认 Claude Desktop 已正确安装"
  echo ""
  echo "💡 如果是 Claude Code (命令行版)，配置文件位置可能不同"
  exit 1
fi

echo "📁 Claude 配置: $CLAUDE_SKILLS"
echo "📁 源目录: $SOURCE_DIR"
echo ""

# 创建 Claude skills 目录（如果不存在）
CLAUDE_SKILLS_DIR="$HOME/Documents/Claude/Skills"
mkdir -p "$CLAUDE_SKILLS_DIR"

echo "📦 安装 skills 到: $CLAUDE_SKILLS_DIR"
echo ""

# 1. 安装 crypto-6551 (新增)
echo "📦 [1/3] 安装 crypto-6551..."
if [ -d "$SOURCE_DIR/crypto-6551" ]; then
  rm -rf "$CLAUDE_SKILLS_DIR/crypto-6551"
  cp -r "$SOURCE_DIR/crypto-6551" "$CLAUDE_SKILLS_DIR/"
  echo "✅ crypto-6551 安装完成"
else
  echo "⚠️  crypto-6551 源目录不存在"
fi

# 2. 更新 crypto-intel
echo ""
echo "📦 [2/3] 更新 crypto-intel..."
if [ -d "$SOURCE_DIR/crypto-intel" ]; then
  rm -rf "$CLAUDE_SKILLS_DIR/crypto-intel"
  mkdir -p "$CLAUDE_SKILLS_DIR/crypto-intel"
  cp "$SOURCE_DIR/crypto-intel/SKILL.md" "$CLAUDE_SKILLS_DIR/crypto-intel/"
  echo "✅ crypto-intel 更新完成"
else
  echo "⚠️  crypto-intel 源目录不存在"
fi

# 3. 更新 binance-content
echo ""
echo "📦 [3/3] 更新 binance-content..."
if [ -d "$SOURCE_DIR/binance-content" ]; then
  rm -rf "$CLAUDE_SKILLS_DIR/binance-content"
  mkdir -p "$CLAUDE_SKILLS_DIR/binance-content"
  cp "$SOURCE_DIR/binance-content/SKILL.md" "$CLAUDE_SKILLS_DIR/binance-content/"
  echo "✅ binance-content 更新完成"
else
  echo "⚠️  binance-content 源目录不存在"
fi

echo ""
echo "🎉 安装完成！"
echo ""
echo "📋 已安装的 skills:"
ls -1 "$CLAUDE_SKILLS_DIR" | grep -E "crypto-6551|crypto-intel|binance-content" | sed 's/^/   ✅ /'
echo ""

# 检查是否需要配置环境变量
ENV_FILE="$SOURCE_DIR/../.env"
if [ -f "$ENV_FILE" ]; then
  echo "💡 提示: 环境变量已配置在:"
  echo "   $ENV_FILE"
  echo ""
  echo "   包含:"
  echo "   - NEWS_6551_TOKEN"
  echo "   - TWITTER_6551_TOKEN"
  echo "   - GROK_API_KEY"
  echo ""
fi

echo "💡 下一步:"
echo "   1. 重启 Claude Desktop"
echo "   2. 在对话中使用，例如："
echo "   - 帮我抓取过去4小时的币圈资讯"
echo "   - 生成今天的币安广场内容"
echo ""
