const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const { NODE_ENV } = process.env;

class PluginFactory {
  constructor() {
    this.isProd = NODE_ENV === 'production';
    this.plugins = [];
  }

  // 配置 dll
  getDllPlugins() {
    const dllPlugins = [];
    const dllFiles = fs.readdirSync(path.resolve(__dirname, `../dll/${NODE_ENV}`));
    dllFiles.forEach(fileName => {
      if (/.*\.dll\.js/.test(fileName)) {
        dllPlugins.push(
          new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, `../dll/${NODE_ENV}`, fileName),
            publicPath: '..'
          })
        )
      }
      if (/.*\.mainfest\.json/.test(fileName)) {
        dllPlugins.push(
          new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, `../dll/${NODE_ENV}`, fileName)
          })
        )
      }
    });

    this.plugins.push(...dllPlugins);
  }

  getWebpackCdnPlugin() {
    let forFileName = this.isProd ? ".min" : "";
    this.plugins.push(
      new WebpackCdnPlugin({
        modules: {
           'react': [
             { name: 'react', var: 'React', path: `umd/react.${process.env.NODE_ENV}${forFileName}.js` },
             { name: 'react-dom', var: 'ReactDOM', path: `umd/react-dom.${process.env.NODE_ENV}${forFileName}.js` },
           ]
         }
      })
    )
  }

  getProgressBarPlugin() {
    this.plugins.push(
      new ProgressBarPlugin()
    )
  }

  getHtmlWebpackPlugin() {
    this.plugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        title: process.env.SITE_TITLE
      })
    )
  }

  getMiniCssExtractPlugin() {
    if (this.isProd) {
      this.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'css/[name].[hash:5].css'
        })
      )
    }
  }

  getDotenv() {
    this.plugins.push(
      new Dotenv({
        path: path.resolve(__dirname, `../enviroment/.env.${NODE_ENV}`)
      })
    );
  }

  getFriendlyErrorsWebpackPlugin() {
    this.plugins.push(
      new FriendlyErrorsWebpackPlugin()
    )
  }

  getPlugins() {
    this.getProgressBarPlugin();
    this.getHtmlWebpackPlugin();
    this.getMiniCssExtractPlugin();
    this.getDotenv();
    this.getFriendlyErrorsWebpackPlugin();
    // DLL 的插件放在最后 PUSH
    this.getDllPlugins();
    // this.getWebpackCdnPlugin();
    return this.plugins;
  }
}

module.exports = PluginFactory;