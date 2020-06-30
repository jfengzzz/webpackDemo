const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common.js')
const config = require('../config')

const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 分离打包css，此组件并不支持热更新，官方建议在开发环境中关闭ExtractText组件

const webpack = require('webpack'); // 用于访问内置插件

module.exports = merge(commonWebpackConfig, {
  mode: 'production',
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    // 分离css
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css'
    }),
    // 指定环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': require('../config/prod.env')
    })
  ]
})