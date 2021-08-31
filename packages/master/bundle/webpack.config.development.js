const path = require('path')
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = webpackMerge(baseConfig,{
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: process.env.WBPACK_DEV_SERVER_HOST,
    port: process.env.WBPACK_DEV_SERVER_PORT,
    contentBase: path.resolve(__dirname,'../dist'),
    overlay: {
      errors:true,
      warnings:true
    },
    hot: true,
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    stats: 'minimal',
  }
})