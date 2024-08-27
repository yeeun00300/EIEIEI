const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://www.smartfarmkorea.net/", // 기존 host

      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
  app.use(
    "/api1", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://apihub.kma.go.kr/", // 기존 host

      changeOrigin: true,
      pathRewrite: {
        "^/api1": "",
      },
    })
  );
  app.use(
    "/api2", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://www.safemap.go.kr/", // 기존 host

      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
    })
  );
  app.use(
    "/api3", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "http://apis.data.go.kr/", // 기존 host

      changeOrigin: true,
      pathRewrite: {
        "^/api3": "",
      },
    })
  );
};

// 데이터 fetch 시에는 기존 url 에서 host 부분을 위에서 설정해준 "/api" 로 바꿔서 fetch
