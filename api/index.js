// Agent System Vercel API - 代理层
// 这个 API 代理请求到本地 HTTP 服务器

module.exports = (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POSTPOST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  // 根路径 - API 信息
  if (path === '/' || path === '') {
    res.status(200).json({
      status: 'ok',
      server: 'agent-system-vercel',
      version: '1.0.0',
      deploy: 'vercel',
      timestamp: new Date().toISOString(),
      endpoints: {
        health: '/api/health',
        proposals: '/api/proposals',
        missions: '/api/missions',
        viewer: '/viewer'
      },
      note: '这是一个代理层，实际数据从本地服务器获取'
    });
    return;
  }

  // 健康检查
  if (path === '/api/health') {
    res.status(200).json({
      status: 'healthy',
      deploy: 'vercel',
      timestamp: new Date().toISOString(),
      note: 'Vercel 代理层正常运行',
      connection: '本地服务器连接需配置'
    });
    return;
  }

  // 提案列表
  if (path === '/api/proposals') {
    res.status(200).json({
      proposals: [],
      note: 'Vercel 代理模式：需连接本地服务器获取实际数据',
      timestamp: new Date().toISOString()
    });
    return;
  }

  // 任务列表
  if (path === '/api/missions') {
    res.status(200).json({
      missions: [],
      note: 'Vercel 代理模式：需连接本地服务器获取实际数据',
      timestamp: new Date().toISOString()
    });
    return;
  }

  // 数据库查看器
  if (path === '/viewer') {
    res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <title>Agent System - Vercel View</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .status {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .api-list {
      background: white;
      padding: 20px;
      border-radius: 8px;
    }
    .api-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚀 Agent System - Vercel 部署</h1>
    <p>本地 SQLite + Vercel 代理方案</p>
  </div>

  <div class="status">
    <h2>✅ 部署状态</h2>
    <p><strong>当前地址：</strong><code>${req.headers.host}</code></p>
    <p><strong>部署方式：</strong>Vercel 代理层</p>
    <p><strong>本地数据库：</strong>/root/Openclaw/agent_system.db</p>
    <p><strong>时间：</strong>${new Date().toISOString()}</p>
  </div>

  <div class="api-list">
    <h2>📋 可用的 API</h2>
    <div class="api-item">
      <strong>根路径：</strong><code>/</code>
      <br>返回 API 信息
    </div>
    <div class="api-item">
      <strong>健康检查：</strong><code>/api/health</code>
      <br>检查服务状态
    </div>
    <div class="api-item">
      <strong>提案列表：</strong><code>/api/proposals</code>
      <br>获取提案（需连接本地服务器）
    </div>
    <div class="api-item">
      <strong>任务列表：</strong><code>/api/missions</code>
      <br>获取任务（需连接本地服务器）
    </div>
  </div>

  <div class="status">
    <h2>🔧 下一步</h2>
    <ol>
      <li>配置 Vercel 连接到本地服务器</li>
      <li>测试 API 端点</li>
      <li>扩展 Market Monitor 功能</li>
      <li>实现 Q Agent 逻辑</li>
    </ol>
  </div>
</body>
</html>
    `);
    return;
  }

  // 404
  res.status(404).json({
    error: 'Not Found',
    path: path,
    message: '端点不存在'
  });
};
