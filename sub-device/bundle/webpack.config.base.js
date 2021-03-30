const path = require('path');
const LoaderFactory = require('./loaders');
const PluginFactory = require('./plugins');
const externals = require("./externals");
const getAlias = require('./alias');
const name = "sub-device";
const { IS_BUILD, PUBLIC_PATH } = process.env;
console.log(PUBLIC_PATH, 'PUBLICK_PATH');
module.exports = {
  entry:path.resolve(__dirname,'../src/index.tsx'),
  output: {
    // 把子应用打包成 umd 库格式
    filename:'js/[name].[hash:5].js',
    path:path.resolve(__dirname,'../dist'),
    library: `${name}`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${name}`,
    publicPath: PUBLIC_PATH || '/'
  },
  externals : IS_BUILD == "build" ? externals : {},
  module: {
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