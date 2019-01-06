const fs =require('fs');
const path = require('path');
class WebpackSwPlugin {
    constructor(doneCallback, failCallback) {
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }
    
    apply(compiler) {
        const runtimePath = path.resolve(__dirname, './runtime.js')
        const data = JSON.stringify({
          scriptURL: path.join(this.options.publicPath, this.options.filename),
        })
        const loaderPath = `${path.join(__dirname, 'runtimeLoader.js')}?${data}`
        const module = compiler.options.module
        let rules
        if (module.rules) {
          module.rules = rules = [...module.rules]
        } else if (module.loaders) {
          module.loaders = rules = [...module.loaders]
        } else {
          module.rules = rules = []
        }
        rules.push({ test: runtimePath, use: loaderPath })
        let chunkList=[];
        compiler.hooks.done.tap('emit',function(stats){
            var sw=fs.readFileSync(`${__dirname}/sw.template.js`).toString();
            let {chunks}=stats.compilation;
            let publicPath=compiler.options.output.publicPath;
            let outputPath=compiler.options.output.path;
            chunks.map(item=>{
                chunkList.push(`${publicPath}/${item.files[0]}`);
            })
            sw=`var files=${JSON.stringify(chunkList)};;`+sw;
            fs.writeFileSync(path.resolve(outputPath,"sw.js"),sw);
        })
    }
}

module.exports = EndWebpackPlugin;