const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common.js')
const config = require('../config')

const webpack = require('webpack'); // 用于访问内置插件

module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  devtool: config.dev.devtool,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: false,
    compress: true, // 是否开启服务端压缩（gzip）
    inline: true, // 在 dev-server 的两种不同模式之间切换。默认情况下，应用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。
    hot: true, // 启用 webpack 的模块热替换特性
    host: config.dev.host, // 服务器IP地址，默认是localhsot
    port: config.dev.port, // 服务监听的端口号
    proxy: config.dev.proxyTable // 代理
  },
  plugins: [
    // 指定环境
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    })
  ]
})