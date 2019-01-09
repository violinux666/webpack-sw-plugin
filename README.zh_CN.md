# webpack-sw-plugin

> webpack4插件，能快速容易的创建一个可离线访问的serviceWorker网页应用

[![NPM](https://img.shields.io/npm/v/webpack-sw-plugin.svg)](https://www.npmjs.com/package/webpack-sw-plugin) 

## 特性

- 简单的与webpack4使用
- 不需要提供ServiceWorker文件
- 提供了一个回调API，当webpack的输出文件发生变化时，你可以做一些处理

## 安装

```bash
npm install --save-dev webpack-sw-plugin
```

## 执行案例

```
npm run example
```

在浏览器内打开localhost:3000


## 使用教程

### 快速上手

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

客户端

```jsx
import worker from 'webpack-sw-plugin/lib/worker';
worker.register();
```

### 插件初始化选项

你可以传递一个配置给webpack-sw-plugin

- **filename**: The output serviceworker file name. default is 'service-worker-builder.js'.
- **minify**: controls if we need a minified sw file. would be true if the mode is production .

### 更新时回调

当webpack的输出文件变化时，我们提供了一个回调函数

```jsx
import worker from 'webpack-sw-plugin/worker';
worker.register({
    onUpdate:()=>{
        console.log('client has a new version. page will refresh in 5s....');
        setTimeout(function(){
            window.location.reload();
        },5000)
    }
});
```

这个是在example目录下的例子，如果你改变text的值，你将看到变化

```jsx
const text="other values";
```

## 寻求帮助

- 电邮：iewnap@outlook.com
- 直接提一个issue[Submit a issue](https://github.com/violinux666/webpack-sw-plugin/issues/new)

## License

MIT © [violinux666](https://github.com/violinux666)