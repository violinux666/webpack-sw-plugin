# webpack-sw-plugin

> plugin for webpack4 , Be quickly and easily to build a ServiceWorker webapp you can access it offline

[![NPM](https://img.shields.io/npm/v/webpack-sw-plugin.svg)](https://www.npmjs.com/package/webpack-sw-plugin) 

[简体中文](https://github.com/violinux666/webpack-sw-plugin/blob/master/README.zh_CN.md)|[English](https://github.com/violinux666/webpack-sw-plugin)

## Features

- Easy to use with webpack4
- No ServiceWorker file is required
- Provider a callback API that do something when the webpack output file is changed

## install

```bash
npm install --save-dev webpack-sw-plugin
```

## Run example

```
npm run example
```

and then, open localhost:3000


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

```jsx
import worker from 'webpack-sw-plugin/lib/worker';
worker.register();
```

### Plugin options

You can pass a configuration options to webpack-sw-plugin.

```js
plugins:[
    new WebpackSWPlugin({
        filename: "test-sw.js",
        minify: true
    })
]
```

- **filename**: The output serviceworker file name. default is 'service-worker-builder.js'.
- **minify**: controls if we need a minified sw file. would be true if the mode is production .

### onUpdate

when the webpack output file has benn changed, we provide a callback API you can do something

```jsx
import worker from 'webpack-sw-plugin/lib/worker';
worker.register({
    onUpdate:()=>{
        const test="Page has a new version, refresh the page?";
        var result=confirm(test);
        if(result){
            window.location.reload();
        }
    }
});
```

onUpdate will be triggered if webpack output file has been changed.
For example, page will show a dialog, page will use the newest bundle file after refresh

## Get Help

- Contact me on iewnap@outlook.com
- raise an issue on Github.[Submit a issue](https://github.com/violinux666/webpack-sw-plugin/issues/new)

## License

MIT © [violinux666](https://github.com/violinux666)