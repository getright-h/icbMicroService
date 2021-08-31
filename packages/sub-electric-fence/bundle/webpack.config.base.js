const path = require('path');
const LoaderFactory = require('./loaders');
const PluginFactory = require('./plugins');
const getAlias = require('./alias');
const name = "sub-electric-fence"
const externals = require("./externals");
const { IS_BUILD, PUBLIC_PATH } = process.env;
module.exports = {
  entry:{"index":path.resolve(__dirname,'../src/index.tsx'),
  "indexSimple": path.resolve(__dirname,'../src/index.simple.tsx')
  },
  output: {
    publicPath: PUBLIC_PATH || "",
    // 把子应用打包成 umd 库格式
    
    filename:'js/[name].[hash:5].js',
    path:path.resolve(__dirname,'../dist'),
    library: `${name}`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${name}`
  },
  externals : IS_BUILD == "build" ? externals : {},
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