require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
    app.use(
        "/auth/google",
        createProxyMiddleware({
            target: process.env.REACT_APP_SERVER_HOME_PAGE_URL,
            changeOrigin: true,
      })
    );
  };