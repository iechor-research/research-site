#!/bin/bash

# Research CLI 本地开发脚本
# 用法: ./dev.sh

set -e

echo "🚀 启动 Research CLI 本地开发环境..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在 research-site 目录下运行此脚本"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install --legacy-peer-deps

# 启动开发服务器
echo "▶️  启动开发服务器..."
echo "🌐 本地访问地址: http://localhost:3000"
echo "🔄 文件变更会自动重新加载"
echo "⏹️  按 Ctrl+C 停止服务"

npm run dev 