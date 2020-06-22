const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
// const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 分离打包css，此组件并不支持热更新，官方建议在开发环境中关闭ExtractText组件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 打包前清理dist文件夹

const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  entry: {
    'app': './js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/index.js'
  },
  devServer: {
    contentBase: './dist',
    host: 'localhost', // 服务器IP地址，默认是localhsot
    port: 8888, // 服务监听的端口号
    compress: true, // 是否开启服务端压缩（gzip）
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        // use: ExtractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: "css-loader"
        // })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // new ExtractTextPlugin({
    //   filename: 'css/[name].css'
    // }),
    new CleanWebpackPlugin()
  ]
}