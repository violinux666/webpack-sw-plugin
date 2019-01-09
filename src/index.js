const fs =require('fs');
const path = require('path');
const UglifyJS = require ('uglify-es');
class WebpackSWPlugin {
    constructor(options) {
        let defaultOptions={
            minify: process.env.NODE_ENV === 'production',
            filename:"service-worker-builder.js"
        };
        this.options={
            ...defaultOptions,
            ...options
        }
    }
    apply(compiler) {
        let {options}=this;
        let publicPath=compiler.options.output.publicPath||'./';
        let outputPath=compiler.options.output.path;
        const filepath=path.resolve(outputPath,options.filename);
        const workerPath = path.resolve(__dirname, './worker.js');
        const LoaderQuery = path.join("/", options.filename);
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
        let {outputFileSystem}=compiler;
        compiler.hooks.done.tap('emit',function(stats){
            var {hash}=stats;
            var sw=fs.readFileSync(`${__dirname}/sw.template.js`).toString();
            let {chunks}=stats.compilation;
            
            //generate sw file content
            chunks.map(item=>{
                chunkList.push(`${publicPath}/${item.files[0]}`);
            })
            sw=`var cacheStorageKey = 'sw$${hash}';var cacheList=${JSON.stringify(chunkList)};`+sw;
            sw=UglifyJS.minify(sw).code;

            outputFileSystem.mkdirp(path.resolve(outputPath),(err)=>{
                if(err){
                    console.error(err);
                }
                outputFileSystem.writeFile(filepath,sw,(err)=>{
                    if(err){
                        console.err(err);
                    }
                })
            })
        })
    }
}

module.exports = WebpackSWPlugin;