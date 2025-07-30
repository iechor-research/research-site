# Research CLI 网站开发指南

## 🏗️ 项目结构

```
research-site/
├── pages/           # Next.js 页面
├── components/      # React 组件
├── public/         # 静态资源
├── styles/         # 样式文件
├── dev.sh          # 本地开发脚本
├── deploy.sh       # 服务器部署脚本
└── package.json    # 项目配置
```

## 🚀 本地开发

### 1. 启动开发环境

```bash
cd research-site
./dev.sh
```

或者手动启动：

```bash
cd research-site
npm install --legacy-peer-deps
npm run dev
```

### 2. 访问网站

- 本地开发地址: http://localhost:3000
- 文件修改后会自动热重载

## 📦 服务器部署

### 1. 提交代码

```bash
# 在 research-cli 根目录
git add .
git commit -m "更新网站内容"
git push origin main
```

### 2. 服务器部署

登录服务器并运行部署脚本：

```bash
ssh root@8.216.80.83
cd /var/www/research-cli
./deploy.sh
```

### 3. 检查部署状态

部署完成后，检查服务状态：

```bash
# 检查进程
ps aux | grep "next start"

# 检查日志
tail -f /tmp/research-cli.log

# 测试服务
curl http://localhost:3001
```

## 🔧 常用命令

### 本地开发

```bash
# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 启动生产服务器
npm start
```

### 服务器操作

```bash
# 查看服务状态
ps aux | grep next

# 停止服务
pkill -f "next start"

# 查看日志
tail -f /tmp/research-cli.log

# 重启 nginx
docker restart labelstudio-nginx
```

## 🌐 访问地址

- **本地开发**: http://localhost:3000
- **服务器后端**: http://localhost:3001 (服务器内部)
- **公网访问**: https://freeme.pub

## 📁 重要文件

- `pages/index.js` - 首页
- `components/` - 可复用组件
- `public/` - 静态资源（图片、图标等）
- `styles/global.css` - 全局样式

## 🐛 故障排除

### 1. 依赖安装失败

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### 2. 服务启动失败

```bash
# 检查端口占用
lsof -i :3001

# 杀死占用进程
pkill -f "next start"

# 重新启动
./deploy.sh
```

### 3. 构建错误

```bash
# 清理缓存
rm -rf .next
npm run build
```

## 📝 开发注意事项

1. **依赖安装**: 必须使用 `--legacy-peer-deps` 参数
2. **端口配置**: 服务器使用 3001 端口，本地使用 3000 端口
3. **代码提交**: 修改后记得提交到 Git 仓库
4. **服务器部署**: 使用 `deploy.sh` 脚本自动化部署
