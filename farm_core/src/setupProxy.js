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
  app.use(
    "/api4", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://api.openweathermap.org/", // 기존 host

      changeOrigin: true,
      pathRewrite: {
        "^/api4": "",
      },
    })
  ),
    app.use(
      "/api5", // 기존 host 대신 사용할 경로
      createProxyMiddleware({
        target:
          "http://211.237.50.150:7080/openapi/112b64e3535521ef2e1200337a48807c24e820c4233a983e4dc035332a0bdd7d/json/", // 기존 host

        changeOrigin: true,
        pathRewrite: {
          "^/api5": "",
        },
      })
    );
  app.use(
    "/api6", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target:
        "http://211.237.50.150:7080/openapi/ef47786d3eabcb9f87d0c7d3b301f869312d4cf9af878855b06ed3c153a53290/json/",
      changeOrigin: true,
      pathRewrite: {
        "^/api6": "", // /api6 부분을 제거하고 나머지 URL을 사용
      },
    })
  );
};

// 데이터 fetch 시에는 기존 url 에서 host 부분을 위에서 설정해준 "/api" 로 바꿔서 fetch
