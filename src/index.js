const fs =require('fs');
const path = require('path');
const swFileName="vio-sw.js"
class WebpackSwPlugin {
    constructor(doneCallback, failCallback) {
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }
    handleWorkerFile(publicPath){
        const workerPath = path.resolve(__dirname, './worker.js');
        const LoaderQuery = JSON.stringify({
            swURL: path.join(publicPath, swFileName),
        })
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
    }
    apply(compiler) {
        let publicPath=compiler.options.output.publicPath;
        let outputPath=compiler.options.output.path;
        this.handleWorkerFile(publicPath);
        let chunkList=[];
        compiler.hooks.done.tap('emit',function(stats){
            var sw=fs.readFileSync(`${__dirname}/sw.template.js`).toString();
            let {chunks}=stats.compilation;
            
            chunks.map(item=>{
                chunkList.push(`${publicPath}/${item.files[0]}`);
            })
            sw=`var files=${JSON.stringify(chunkList)};;`+sw;
            fs.writeFileSync(path.resolve(outputPath,"sw.js"),sw);
        })
    }
}

module.exports = EndWebpackPlugin;