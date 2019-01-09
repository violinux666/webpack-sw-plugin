const path = require('path');
const WebpackSWPlugin = require('../lib/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname,'dist'),
    port: 3000,
    inline:true
  },
  plugins:[
      new WebpackSWPlugin({}),
      new HtmlWebpackPlugin({
        title:"webpack-sw-plugin example",
        inject:true
      })
  ]
};