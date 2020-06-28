const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
// const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 分离打包css，此组件并不支持热更新，官方建议在开发环境中关闭ExtractText组件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 打包前清理dist文件夹

const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  entry: {
    'index': './js/index.js',
    'pageOne': './js/page1.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js'
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
      },
      {
        test: /\.(htm|html)$/,
        use:[ 'html-loader'] 
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    // index.html
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      hash: true,
      chunks: ['index']
    }),
    // page1.html
    new HtmlWebpackPlugin({
      template: './pageOne.html',
      filename: 'pageOne.html',
      hash: true,
      chunks: ['pageOne']
    }),
    // new ExtractTextPlugin({
    //   filename: 'css/[name].css'
    // }),
    new CleanWebpackPlugin()
  ]
}