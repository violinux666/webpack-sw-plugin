# webpack-sw-plugin

> plugin for webpack4 to build a ServiceWorker webapp quickly and easily

[![NPM](https://img.shields.io/npm/v/webpack-sw-plugin.svg)](https://www.npmjs.com/package/webpack-sw-plugin) 

## Features

- Easy to use with webpack4
- No ServiceWorker file is required
- Provider a callback API that do something when the webpack output file is changed

## install

```bash
npm install --save webpack-sw-plugin
```

## Run example

```
npm run example
```

open localhost:3000


## Usage

### quick start

webpack.config.js

```jsx
const WebpackSWPlugin = require('webpack-sw-plugin');
module.exports = {
    // entry
    // output
    plugins:[
        new WebpackSWPlugin()
    ]
}
```

client

```
import worker from 'webpack-sw-plugin/worker';
worker.register();
```