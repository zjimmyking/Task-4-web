/*
 * @Author: kincaid
 * @Date: 2021-07-04 17:12:27
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-11 18:40:42
 * @Description: file content
 */

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'? '/Task-4-web/': '/',
  lintOnSave: false,
  outputDir: 'dist',
  configureWebpack: {
    devtool: isProd ? false: 'source-map',
    devServer: {
      open: true,
      proxy: {
        '/netease-api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/netease-api': '' },
          changeOrigin: true,
          secure: false,
        },
      },
      port: 8888,
    }
  },
  css: {
    
  },
}
