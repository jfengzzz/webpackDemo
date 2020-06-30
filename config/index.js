'use strict'

const path = require('path')

module.exports = {
  dev: {
    devtool: 'inline-source-map',
    // 代理
    proxyTable: {
      '/api': {
        target: 'http://test/api/v1', // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      }
    },
    // Various Dev Server settings
    host: 'localhost',
    port: 8888
  },
  build: {
    devtool: 'source-map',
    productionSourceMap: false, // 打包运行如果无报错，可以改成 false，去除map文件，减小打包体积
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
  }
}