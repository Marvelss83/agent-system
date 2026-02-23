# 🚀 GitHub + Vercel 完整部署指南

## ✅ 已完成：项目打包

所有 Vercel 部署需要的文件已经打包到：
```
/root/Openclaw/agent-system/
├── api/
│   └── index.js          # Vercel API 处理
├── package.json          # 项目配置
├── vercel.json           # Vercel 配置
├── README.md             # 项目说明
└── .gitignore            # Git 忽略文件
```

Git 仓库已初始化并提交。

---

## 📋 第一步：创建 GitHub 仓库

### 在你的电脑上操作：

1. **登录 GitHub**
   - 打开 https://github.com
   - 登录你的账号

2. **创建新仓库**
   - 点击右上角 `+` → `New repository`
   - 仓库名称：`agent-system`
   - 描述：`Agent System - Vercel Deployment`
   - 选择：`Public` 或 `Private`（推荐 Public）
   - **不要**勾选 `Initialize this repository with a README`（我们已经有代码了）
   - 点击 `Create repository`

3. **复制仓库地址**
   - 例如：`https://github.com/your-username/agent-system.git`

---

## 📤 第二步：上传代码到 GitHub

### 在 VPS 上运行（我会帮你执行）：

```bash
# 进入项目目录
cd /root/Openclaw/agent-system

# 添加远程仓库（替换为你的地址）
git remote add origin https://github.com/your-username/agent-system.git

# 推送代码到 GitHub
git push -u origin master
```

**需要你提供：**
- 你的 GitHub 用户名
- 你的 GitHub token（用于推送代码）

---

## 🌐 第三步：在 Vercel 部署

### 在你的电脑上操作：

1. **登录 Vercel**
   - 打开 https://vercel.com/dashboard
   - 登录你的账号（你已经注册了）

2. **创建新项目**
   - 点击 `Add New...` → `Project`
   - 选择 `Import Git Repository`
   - 找到并选择 `agent-system` 仓库

3. **配置项目**
   - **Project Name:** `agent-system`
   - **Framework Preset:** `Other`
   - **Build Command:** 留空（不需要构建）
   - **Output Directory:** `api`

4. **环境变量（可选）**
   - 如果需要连接云数据库，添加：
     - `DATABASE_URL` = 你的数据库连接字符串

5. **部署**
   - 点击 `Deploy`
   - 等待 1-2 分钟

6. **获取访问地址**
   - 部署完成后，Vercel 会提供：
     - 预览地址：`https://agent-system-xxxx.vercel.app`
     - 生产地址：`https://agent-system.vercel.app`

---

## ✅ 第四步：测试部署

### 在你的电脑浏览器访问：

```bash
# 1. 测试根路径
https://agent-system.vercel.app/

# 2. 测试健康检查
https://agent-system.vercel.app/api/health

# 3. 测试查看器
https://agent-system.vercel.app/viewer
```

### 或用 curl 测试：
```bash
curl https://agent-system.vercel.app/
curl https://agent-system.vercel.app/api/health
```

---

## 🔄 后续更新代码

### 1. 修改代码（在 VPS 上）
```bash
cd /root/Openclaw/agent-system
# 编辑 api/index.js 或其他文件
```

### 2. 提交并推送
```bash
git add .
git commit -m "Update: your message"
git push
```

### 3. Vercel 自动部署
   - Vercel 检测到 GitHub 更新
   - 自动重新部署
   - 通常 1-2 分钟完成

---

## 🔧 本地服务器配置

### 当前本地服务器状态：
- ✅ 数据库：`/root/Openclaw/agent_system.db`（13 张表）
- ✅ 本地服务器：运行在端口 9999
- ✅ 查看器：`http://127.0.0.1:9999/viewer`

### Vercel 代理层：
- 🌐 公网地址：`https://agent-system.vercel.app`
- 🔄 代理模式：Vercel → 本地服务器（可选）
- ⚠️ 注意：当前返回模拟数据，需配置连接到本地服务器

---

## ❓ 需要我帮你做什么？

请告诉我：

**选项 A：我帮你上传到 GitHub**
- 提供：你的 GitHub 用户名
- 提供：你的 GitHub token
- 我会执行 git push命令

**选项 B：你自己上传**
- 按照上面的步骤操作
- 上传完成后告诉我

**选项 C：跳过 GitHub，直接在 Vercel 部署**
- 使用 Vercel CLI 直接部署：
  ```bash
  cd /root/Openclaw/agent-system
  vercel --prod
  ```

---

## 📊 架构总结

```
你的电脑
    ↓ 浏览器访问
Vercel (agent-system.vercel.app)
    ↓ HTTPS 公网
Vercel 代理层
    ↓ (可选代理到)
本地服务器 (127.0.0.1:9999)
    ↓
本地 SQLite (/root/Openclaw/agent_system.db)
    ↑
Agent System (直接访问)
```

**当前状态：**
- ✅ 本地数据库：13 张表，2 条提案
- ✅ 本地服务器：运行中
- ⏳ GitHub：等待上传
- ⏳ Vercel：等待部署

---

**你选择哪个选项？（A/B/C）**

A - 我帮你推送到 GitHub
B - 你自己操作
C - 直接用 Vercel CLI 部署（跳过 GitHub）

或者需要我解释其他部分？
