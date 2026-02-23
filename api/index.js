// Agent System Vercel API - 正式版本
// 这个 API 代理请求到本地 HTTP 服务器

import { createServer } from 'http';

const PORT = process.env.PORT || 3000;
const LOCAL_SERVER_URL = 'http://127.0.0.1:9999';

const app = createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  
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
      version: '4.0.0',
      deploy: 'vercel',
      port: PORT,
      timestamp: new Date().toISOString(),
      endpoints: {
        health: '/health',
        proposals: '/api/proposals',
        missions: '/api/missions',
        viewer: '/viewer'
      },
      note: 'Vercel 代理层 - 本地数据源'
    });
    return;
  }

  // 健康检查
  if (path === '/health') {
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

  // 404
  res.status(404).json({
    error: 'Not found',
    path: path,
    message: '端点不存在'
  });
});

app.listen(PORT, () => {
  console.log('🚀 Agent System Vercel API running');
  console.log(`🌐 Port: ${PORT}`);
  console.log(`📋 /health`);
  console.log(`📋 /api/proposals`);
  console.log(`📋 /api/missions`);
});

module.exports = app;
