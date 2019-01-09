'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');
var UglifyJS = require('uglify-es');

var WebpackSWPlugin = function () {
    function WebpackSWPlugin(options) {
        _classCallCheck(this, WebpackSWPlugin);

        var defaultOptions = {
            minify: process.env.NODE_ENV === 'production',
            filename: "service-worker-builder.js"
        };
        this.options = _extends({}, defaultOptions, options);
    }

    _createClass(WebpackSWPlugin, [{
        key: 'apply',
        value: function apply(compiler) {
            var options = this.options;

            var publicPath = compiler.options.output.publicPath || './';
            var outputPath = compiler.options.output.path;
            var filepath = path.resolve(outputPath, options.filename);
            var workerPath = path.resolve(__dirname, './worker.js');
            var LoaderQuery = path.join("/", options.filename);
            var loaderPath = path.join(__dirname, 'workerLoader.js') + '?' + LoaderQuery;
            var module = compiler.options.module;
            var rules = void 0;
            if (module.rules) {
                module.rules = rules = [].concat(_toConsumableArray(module.rules));
            } else if (module.loaders) {
                module.loaders = rules = [].concat(_toConsumableArray(module.loaders));
            } else {
                module.rules = rules = [];
            }
            rules.push({
                test: workerPath,
                use: loaderPath
            });
            var chunkList = [];
            var outputFileSystem = compiler.outputFileSystem;

            compiler.hooks.done.tap('emit', function (stats) {
                var hash = stats.hash;

                var sw = fs.readFileSync(__dirname + '/sw.template.js').toString();
                var chunks = stats.compilation.chunks;

                //generate sw file content

                chunks.map(function (item) {
                    chunkList.push('' + publicPath + item.files[0]);
                });
                sw = 'var cacheStorageKey = \'sw$' + hash + '\';var cacheList=' + JSON.stringify(chunkList) + ';' + sw;
                if (options.minify) {
                    sw = UglifyJS.minify(sw).code;
                }
                outputFileSystem.mkdirp(path.resolve(outputPath), function (err) {
                    if (err) {
                        console.error(err);
                    }
                    outputFileSystem.writeFile(filepath, sw, function (err) {
                        if (err) {
                            console.err(err);
                        }
                    });
                });
            });
        }
    }]);

    return WebpackSWPlugin;
}();

module.exports = WebpackSWPlugin;