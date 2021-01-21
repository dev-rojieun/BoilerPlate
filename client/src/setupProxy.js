const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',   // server/index.js 에서 port 번호를 5000번을 줬고, client (3000)에서 타겟을 5000 port 로 주겟다.
      changeOrigin: true,
    })
  );
};