const path = require('path');
const WebpackSWPlubin = require('../lib/index');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[
      new WebpackSWPlubin({})
  ]
};