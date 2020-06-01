const path = require('path');
const LoaderFactory = require('./loaders');
const PluginFactory = require('./plugins');
const getAlias = require('./alias');
const name = "test"
module.exports = {
  entry:path.resolve(__dirname,'../src/index.tsx'),
  // output:{
  //   filename:'js/[name].[hash:5].js',
  //   path:path.resolve(__dirname,'../dist')
  // },
  output: {
    // 把子应用打包成 umd 库格式
       
    // filename:'js/[name].[hash:5].js',
    // path:path.resolve(__dirname,'../dist'),
    library: `${name}`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${name}`
  },
  module:{
    rules:[
      ...new LoaderFactory().getLoaders()
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      ...getAlias(),
      'react-dom': '@hot-loader/react-dom',
    }
  },
  plugins:[
    ...new PluginFactory().getPlugins()
  ]
}