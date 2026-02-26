#!/bin/bash
# Crypto Skills - 一键推送到 GitHub 脚本

echo "🚀 Crypto Skills 部署脚本"
echo "===================="

# 进入项目目录
cd "$(dirname "$0")"

# 检查 Git 状态
echo "📋 检查 Git 状态..."
git status

# 显示远程仓库
echo ""
echo "📍 远程仓库配置："
git remote -v

# 如果远程仓库不存在，提示用户创建
if ! git remote get-url origin &>/dev/null; then
    echo ""
    echo "⚠️  还没有配置远程仓库"
    echo ""
    echo "请先在 GitHub 创建新仓库："
    echo "  1. 访问: https://github.com/new"
    echo "  2. 仓库名: crypto-skills"
    echo "  3. 设置为 Public"
    echo "  4. 不要勾选 'Initialize with README'"
    echo "  5. 点击 'Create repository'"
    echo ""
    echo "然后运行以下命令添加远程仓库："
    echo "  git remote add origin https://github.com/NickQi688/crypto-skills.git"
    echo "  ./push-to-github.sh"
    exit 1
fi

# 推送代码
echo ""
echo "📤 正在推送到 GitHub..."
echo "如果提示输入密码："
echo "  用户名: NickQi688"
echo "  密码: 使用 GitHub Personal Access Token"
echo ""
echo "获取 Token: https://github.com/settings/tokens"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "🌐 GitHub 仓库: https://github.com/NickQi688/crypto-skills"
    echo ""
    echo "📝 在其他电脑上使用："
    echo "  git clone https://github.com/NickQi688/crypto-skills.git"
    echo "  cd crypto-skills"
    echo "  cp .env.example .env"
    echo "  # 编辑 .env 文件填入 API Key"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "请检查："
    echo "  1. GitHub 仓库是否已创建"
    echo "  2. Personal Access Token 是否正确"
    echo "  3. 网络连接是否正常"
fi
