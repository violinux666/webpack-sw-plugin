# webpack-sw-plugin

> plugin for webpack4 to build a ServiceWorker webapp quickly and easily

[![NPM](https://img.shields.io/npm/v/webpack-sw-plugin.svg)](https://www.npmjs.com/package/webpack-sw-plugin) 

## Features

- Easy to use with webpack4
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
import worker from 'webpack-sw-plugin/worker';
worker.register();
```

### Plugin options

You can pass a configuration options to webpack-sw-plugin.

- **filename**: The output serviceworker file name. default is 'service-worker-builder.js'.
- **minify**: controls if we need a minified sw file. would be true if the mode is production .

### onUpdate

when the webpack output file has benn changed, we provide a callback API u can do something

```jsx
import worker from 'webpack-sw-plugin/worker';
worker.register({
    console.log('client has a new version. page will refresh in 5s....');
    setTimeout(function(){
        window.location.reload();
    },5000)
});
```

There is a example in */example*. you could see result if change the text.

```jsx
const text="other values";
```

## Get Help

- Contact me on iewnap@outlook.com
- raise an issue on Github.[Submit a issue](https://github.com/violinux666/webpack-sw-plugin/issues/new)

## License

MIT © [violinux666](https://github.com/violinux666)