const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://spring-boot-dev.us-east-1.elasticbeanstalk.com/api",
      changeOrigin: true,
    })
  );
};
