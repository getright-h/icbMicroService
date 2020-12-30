const path = require('path');
const LoaderFactory = require('./loaders');
const PluginFactory = require('./plugins');
const getAlias = require('./alias');

module.exports = {
  entry:path.resolve(__dirname,'../src/index.tsx'),
  output:{
    filename:'js/[name].[hash:5].js',
    path:path.resolve(__dirname,'../dist')
  },
  module:{
    rules:[
      ...new LoaderFactory().getLoaders()
    ],
  },
  externals : {
    'react': 'React', // Case matters here 
    'react-dom' : 'ReactDOM',
    'react-router': 'ReactRouter',
    'axios': 'axios' // Case matters here ,
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