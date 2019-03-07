"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tinyInvariant = _interopRequireDefault(require("tiny-invariant"));

var _matchPath = _interopRequireDefault(require("./matchPath"));

var _createElement = _interopRequireDefault(require("./createElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var renderRoutes = function renderRoutes() {
  var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var context = arguments.length > 1 ? arguments[1] : undefined;
  (0, _tinyInvariant.default)(context, 'You should not use renderRoutes without context');

  var _ref = context || {},
      location = _ref.location,
      contextMatch = _ref.match;

  var _routes$reduce = routes.reduce(function (matched, route) {
    if (matched.length) return matched;
    var match = route.path || route.from ? (0, _matchPath.default)(location.pathname, route) : contextMatch;
    return match ? [route, match] : [];
  }, []),
      _routes$reduce2 = _slicedToArray(_routes$reduce, 2),
      _routes$reduce2$ = _routes$reduce2[0],
      route = _routes$reduce2$ === void 0 ? {} : _routes$reduce2$,
      match = _routes$reduce2[1];

  var props = {
    route: route,
    context: _objectSpread({}, context, {
      match: match
    })
  };

  if (route.render) {
    return route.render(props);
  }

  if (route.component) {
    return (0, _createElement.default)(route.component, props);
  }

  return null;
};

var _default = renderRoutes;
exports.default = _default;