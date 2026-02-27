#!/bin/bash

# Crypto Skills GitHub 仓库设置脚本

set -e

echo "🚀 Crypto Skills GitHub 仓库设置"
echo "=================================="
echo ""

# 1. 提交当前文件
echo "📝 提交文件到本地仓库..."
git add .
git commit -m "Initial commit: Crypto Skills for Claude

- crypto-6551: 6551 API integration with 50+ news sources
- crypto-intel: Dual data source (6551 + Grok AI)
- binance-content: Binance Square content generator

Features:
- AI scoring system (0-100)
- Real-time crypto news and Twitter data
- Free tier: 10,000 requests/day
"

# 2. 检查是否提供了 GitHub 仓库地址
if [ -z "$1" ]; then
    echo ""
    echo "⚠️  请提供 GitHub 仓库地址"
    echo ""
    echo "使用方法:"
    echo "  bash setup-github.sh https://github.com/用户名/crypto-skills.git"
    echo ""
    echo "或者手动执行:"
    echo "  1. 在 GitHub 创建新仓库 'crypto-skills'"
    echo "  2. 运行: git remote add origin <你的仓库地址>"
    echo "  3. 运行: git push -u origin main"
    exit 1
fi

# 3. 添加远程仓库
echo "🔗 添加远程仓库..."
git remote add origin $1
git remote -v

# 4. 推送到 GitHub
echo ""
echo "📤 推送到 GitHub..."
git push -u origin main

echo ""
echo "✅ 设置完成！"
echo ""
echo "📋 后续使用:"
echo "  git push                    # 推送更新"
echo "  git pull                    # 拉取更新"
echo ""
echo "🌐 仓库地址: $1"
