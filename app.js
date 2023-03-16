const express = require('express')
const {
  createProxyMiddleware
} = require('http-proxy-middleware');
const app = express()
const port = 8000

app.use('/', createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  onProxyReq: function (proxyReq, req, res) {
    proxyReq.setHeader("Authorization", "Bearer YOUR OpenAI Key");
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));

app.listen(port, () => {
  console.log(`Chatgpt app listening at http://localhost:${port}`)
})