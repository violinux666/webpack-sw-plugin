const fs =require('fs');
const path = require('path');
class WebpackSwPlugin {
    constructor(doneCallback, failCallback) {
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }

    apply(compiler) {
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