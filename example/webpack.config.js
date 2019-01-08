const path = require('path');
const WebpackSWPlubin = require('../lib/index');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  devServer: {
    contentBase: path.join(__dirname,'dist'),
    port: 3000,
    inline:true
  },
  plugins:[
      new WebpackSWPlubin({})
  ]
};