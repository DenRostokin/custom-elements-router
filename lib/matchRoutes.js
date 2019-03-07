"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _matchPath = _interopRequireDefault(require("./matchPath"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var matchRoutes = function matchRoutes() {
  var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var pathname = arguments.length > 1 ? arguments[1] : undefined;
  return routes.reduce(function (acc, route) {
    var path = route.path || route.from;
    var match = path ? (0, _matchPath.default)(pathname, route) : acc.length ? acc[acc.length - 1].match : _index.default.computeRootMatch(pathname);

    if (match) {
      var routesMatch = route.routes ? matchRoutes(route.routes, pathname) : [];
      return [].concat(_toConsumableArray(acc), [{
        route: route,
        match: match
      }], _toConsumableArray(routesMatch));
    }

    return acc;
  }, []);
};

var _default = matchRoutes;
exports.default = _default;