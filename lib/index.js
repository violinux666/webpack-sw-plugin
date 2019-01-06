'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');

var WebpackSwPlugin = function () {
    function WebpackSwPlugin(doneCallback, failCallback) {
        _classCallCheck(this, WebpackSwPlugin);

        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }

    _createClass(WebpackSwPlugin, [{
        key: 'apply',
        value: function apply(compiler) {
            var chunkList = [];
            compiler.hooks.done.tap('emit', function (stats) {
                var sw = fs.readFileSync(__dirname + '/sw.template.js').toString();
                var chunks = stats.compilation.chunks;

                var publicPath = compiler.options.output.publicPath;
                var outputPath = compiler.options.output.path;
                chunks.map(function (item) {
                    chunkList.push(publicPath + '/' + item.files[0]);
                });
                sw = 'var files=' + JSON.stringify(chunkList) + ';;' + sw;
                fs.writeFileSync(path.resolve(outputPath, "sw.js"), sw);
            });
        }
    }]);

    return WebpackSwPlugin;
}();

module.exports = EndWebpackPlugin;