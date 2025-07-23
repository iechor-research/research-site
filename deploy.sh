#!/bin/bash

# Research CLI 网站部署脚本
# 用法: ./deploy.sh

set -e

echo "🚀 开始部署 Research CLI 网站..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在 research-site 目录下运行此脚本"
    exit 1
fi

# 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin main

# 安装依赖
echo "📦 安装依赖..."
npm install --legacy-peer-deps

# 构建项目
echo "🔨 构建项目..."
npm run build

# 停止现有进程
echo "⏹️  停止现有服务..."
pkill -f "next start" || true
pkill -f "npm.*start" || true

# 启动服务
echo "▶️  启动服务..."
PORT=3001 npm start > /tmp/research-cli.log 2>&1 &

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 5

# 检查服务状态
if curl -f http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ 部署成功! 服务运行在 http://localhost:3001"
    echo "📄 日志文件: /tmp/research-cli.log"
else
    echo "❌ 部署失败! 请检查日志: /tmp/research-cli.log"
    exit 1
fi

echo "🎉 部署完成!" 