/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../lib/worker.js":
/*!************************!*\
  !*** ../lib/worker.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var swPath = 'dist/vio-sw.js';\n      'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nfunction register(_ref) {\n    var onUpdate = _ref.onUpdate;\n\n    if (navigator.serviceWorker) {\n        navigator.serviceWorker.addEventListener('message', function (e) {\n            var data = e.data;\n\n            if (data.requestPageUrl) {\n                sendPageUrl();\n            } else if (data.onUpdate) {\n                onUpdate && onUpdate.call(null);\n            }\n        });\n        navigator.serviceWorker.register(swPath).then(function (reg) {\n            if (reg.active) {\n                sendPageUrl();\n            }\n            return reg;\n        });\n    }\n}\nfunction sendPageUrl() {\n    send_message_to_sw({ pageUrl: location.href });\n}\nfunction send_message_to_sw(msg) {\n    return new Promise(function (resolve, reject) {\n        // Create a Message Channel\n        var msg_chan = new MessageChannel();\n        // Handler for recieving message reply from service worker\n        msg_chan.port1.onmessage = function (event) {\n            if (event.data.error) {\n                reject(event.data.error);\n            } else {\n                resolve(event.data);\n            }\n        };\n        // Send message to service worker along with port for reply\n        navigator.serviceWorker.controller.postMessage(msg, [msg_chan.port2]);\n    });\n}\nvar worker = {\n    register: register\n};\nexports.default = worker;\n\n//# sourceURL=webpack:///../lib/worker.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/worker */ \"../lib/worker.js\");\n/* harmony import */ var _lib_worker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_worker__WEBPACK_IMPORTED_MODULE_0__);\n\nconsole.log('hello world');\n_lib_worker__WEBPACK_IMPORTED_MODULE_0___default.a.register({\n    onUpdate:()=>{\n        console.log('onUpdate');\n    }\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });