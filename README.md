# Agent System - Vercel Deployment

本地 SQLite + Vercel 代理方案

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/your-username/agent-system.git
cd agent-system
```

### 2. 本地测试
```bash
# 安装依赖
npm install

# 本地运行（用于测试 Vercel 代码）
npm run dev
```

### 3. 部署到 Vercel
```bash
# 如果还没有登录 Vercel
npm install -g vercel
vercel login

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

## 📋 项目结构

```
agent-system/
├── api/
│   └── index.js          # Vercel API 处理逻辑
├── package.json          # 项目配置
├── vercel.json           # Vercel 配置
└── README.md             # 本文件
```

## 🔧 架构说明

```
用户浏览器
    ↓
Vercel HTTPS (公网)
    ↓
Vercel 代理层 (本文件)
    ↓
本地服务器 (127.0.0.1:9999)
    ↓
本地 SQLite (/root/Openclaw/agent_system.db)
```

**为什么这样设计？**

✅ **本地数据库：** Agent 直接访问 SQLite，快速可靠
✅ **Vercel 代理：** 提供公网 HTTPS 访问
✅ **数据安全：** 数据不出本地，完全控制

## 📊 API 端点

| 端点 | 方法 | 功能 |
|--------|------|------|
| `/` | GET | API 信息 |
| `/api/health` | GET | 健康检查 |
| `/api/proposals` | GET | 获取提案列表 |
| `/api/missions` | GET | 获取任务列表 |
| `/viewer` | GET | 数据库查看器 |

## 🌐 访问地址

### 本地测试
```bash
# 本地运行 Vercel 代码
npm run dev

# 访问
curl http://127.0.0.1:3000
curl http://127.0.0.1:3000/api/health
```

### Vercel 生产
```bash
# 部署后访问
https://your-app.vercel.app
https://your-app.vercel.app/api/health
https://your-app.vercel.app/api/proposals
```

## 🔐 配置环境变量（可选）

在 Vercel Dashboard 中配置：

- `DATABASE_URL` - 如果使用云数据库
- `LOCAL_SERVER_URL` - 本地服务器地址（如果需要代理）

## 📝 更新部署

```bash
# 修改代码后
git add .
git commit -m "Update API"
git push

# 自动部署到 Vercel
vercel --prod
```

## 🐛 故障排除

**问题：本地服务器无法连接**

解决方案：
1. 确保本地服务器正在运行：`bash /root/Openclaw/quick_start.sh`
2. 检查端口是否开放：`netstat -an | grep 9999`
3. 检查防火墙配置

**问题：API 返回空数据**

解决方案：
1. 检查本地数据库：`sqlite3 /root/Openclaw/agent_system.db "SELECT COUNT(*) FROM proposals"`
2. 检查日志：`tail -f /tmp/server.log`

## 📚 相关文档

- [本地部署指南](/root/Openclaw/VERCEL_DEPLOY_GUIDE.md)
- [系统架构](/root/Openclaw/agent_system_architecture.md)
- [Proposal Service](/root/Openclaw/proposal_service.py)

## 🎯 下一步

1. ✅ Vercel 基础代理层已部署
2. ⏳ 配置 Vercel 连接到本地服务器
3. ⏳ 扩展 Market Monitor 功能
4. ⏳ 实现 Q Agent 逻辑
5. ⏳ 开发 Web Dashboard

---

**作者：** Agent System Team
**版本：** 1.0.0
**最后更新：** 2026-02-23
