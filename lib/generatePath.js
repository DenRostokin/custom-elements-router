"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pathToRegexp = _interopRequireDefault(require("path-to-regexp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = {};
var cacheLimit = 10000;
var cacheCount = 0;

function compilePath(path) {
  if (cache[path]) return cache[path];

  var generator = _pathToRegexp.default.compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}
/**
 * Public API for generating a URL pathname from a path and parameters.
 */


function generatePath() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return path === '/' ? path : compilePath(path)(params, {
    pretty: true
  });
}

var _default = generatePath;
exports.default = _default;