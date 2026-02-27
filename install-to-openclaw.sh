#!/bin/bash

# Crypto Skills 安装脚本
# 将 skills 复制到 OpenClaw 目录

set -e

VAULT_ROOT="/Users/zhaobo/Documents/qukuaiqiji/my-note"
OPENCLAW_SKILLS="$HOME/.openclaw/skills"
SOURCE_DIR="$VAULT_ROOT/Web 3.0/机会方向/币安内容挖矿/skills"

echo "🚀 开始安装 Crypto Skills 到 OpenClaw..."
echo ""

# 检查 OpenClaw 目录
if [ ! -d "$OPENCLAW_SKILLS" ]; then
  echo "❌ OpenClaw skills 目录不存在: $OPENCLAW_SKILLS"
  echo "请确认 OpenClaw 已正确安装"
  exit 1
fi

echo "📁 目标目录: $OPENCLAW_SKILLS"
echo "📁 源目录: $SOURCE_DIR"
echo ""

# 1. 安装 crypto-6551 (新增)
echo "📦 安装 crypto-6551..."
if [ -d "$SOURCE_DIR/crypto-6551" ]; then
  cp -r "$SOURCE_DIR/crypto-6551" "$OPENCLAW_SKILLS/"
  echo "✅ crypto-6551 安装完成"
else
  echo "⚠️  crypto-6551 源目录不存在"
fi

# 2. 更新 crypto-intel
echo ""
echo "📦 更新 crypto-intel..."
if [ -d "$OPENCLAW_SKILLS/crypto-intel" ]; then
  cp "$SOURCE_DIR/crypto-intel/SKILL.md" "$OPENCLAW_SKILLS/crypto-intel/"
  echo "✅ crypto-intel 更新完成"
else
  echo "⚠️  crypto-intel 未安装，跳过"
fi

# 3. 更新 binance-content
echo ""
echo "📦 更新 binance-content..."
if [ -d "$OPENCLAW_SKILLS/binance-content" ]; then
  cp "$SOURCE_DIR/binance-content/SKILL.md" "$OPENCLAW_SKILLS/binance-content/"
  echo "✅ binance-content 更新完成"
else
  echo "⚠️  binance-content 未安装，跳过"
fi

echo ""
echo "🎉 安装完成！"
echo ""
echo "📋 已安装的 skills:"
ls -1 "$OPENCLAW_SKILLS" | grep -E "crypto-6551|crypto-intel|binance-content" | sed 's/^/   ✅ /'
echo ""
echo "💡 使用方式:"
echo "   在对话中直接使用，例如："
echo "   - 帮我抓取过去4小时的币圈资讯"
echo "   - 生成今天的币安广场内容"
echo ""
