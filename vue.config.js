/*
 * @Author: kincaid
 * @Date: 2021-07-04 17:12:27
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-08 12:20:56
 * @Description: file content
 */

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
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
