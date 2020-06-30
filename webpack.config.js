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
    inline: true, // 在 dev-server 的两种不同模式之间切换。默认情况下，应用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。
    hot: true, // 启用 webpack 的模块热替换特性
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