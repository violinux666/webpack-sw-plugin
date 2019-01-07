const fs =require('fs');
const path = require('path');
const swFileName="service-worker-builder.js"
class WebpackSWPlugin {
    constructor(doneCallback, failCallback) {
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }
    apply(compiler) {
        let publicPath=compiler.options.output.publicPath||'./';
        let outputPath=compiler.options.output.path;
        const workerPath = path.resolve(__dirname, './worker.js');
        const LoaderQuery = path.join(publicPath, swFileName);
        const loaderPath = `${path.join(__dirname, 'workerLoader.js')}?${LoaderQuery}`
        const module = compiler.options.module
        let rules
        if (module.rules) {
          module.rules = rules = [...module.rules]
        } else if (module.loaders) {
          module.loaders = rules = [...module.loaders]
        } else {
          module.rules = rules = []
        }
        rules.push({ 
            test: workerPath, 
            use: loaderPath ,
        })
        let chunkList=[];
        compiler.hooks.done.tap('emit',function(stats){
            var {hash}=stats;
            var sw=fs.readFileSync(`${__dirname}/sw.template.js`).toString();
            let {chunks}=stats.compilation;
            
            chunks.map(item=>{
                chunkList.push(`${publicPath}/${item.files[0]}`);
            })
            sw=`var cacheStorageKey = 'sw$${hash}';var cacheList=${JSON.stringify(chunkList)};`+sw;
            fs.writeFileSync(path.resolve(outputPath,swFileName),sw);
        })
    }
}

module.exports = WebpackSWPlugin;