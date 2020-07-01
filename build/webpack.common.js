const path = require('path');
const config = require('../config')

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 打包前清理dist文件夹

module.exports = {
  entry: {
    'index': './src/js/index.js',
    'pageOne': './src/js/page1.js'
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
        test: /\.(png|jpe?g|gif|svg)(\?.*)?/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: 'img/[name].[hash].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    // index.html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
      chunks: ['index', 'commons', 'vendors']
    }),
    // page1.html
    new HtmlWebpackPlugin({
      template: './src/pageOne.html',
      filename: 'pageOne.html',
      hash: true,
      chunks: ['pageOne', 'commons', 'vendors']
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial',
      minSize: 3, // 模块的最小体积
      minChunks: 2, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      cacheGroups: { // 缓存组
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'commons'
        }
      }
    }
  }
}