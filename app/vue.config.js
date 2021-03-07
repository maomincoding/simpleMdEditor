'use strict'
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "Simple·MarkDown编辑器" // page title
const port = process.env.port || process.env.npm_config_port || 6061 // dev port

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/site/mdeditor" : "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    host: "localhost",
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // proxy: {
    //   "/api": {
    //     target: "http://47.103.61.198:5010",
    //     changeOrigin: true,
    //     secure: false,
    //     pathRewrite: {
    //       "^/api": "/api",
    //     },
    //   },
    // },
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);
    // config.plugins.delete('preload')
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");
  },
};