const path = require('path');
const config = require('../config')

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 打包前清理dist文件夹

module.exports = {
  entry: {
    'index': './js/index.js',
    'pageOne': './js/page1.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(htm|html)$/,
        use:[ 'html-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8,
            name: 'img/[name][hash].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    // index.html
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      hash: true,
      chunks: ['index']
    }),
    // page1.html
    new HtmlWebpackPlugin({
      template: 'pageOne.html',
      filename: 'pageOne.html',
      hash: true,
      chunks: ['pageOne']
    }),
    new CleanWebpackPlugin()
  ]
}