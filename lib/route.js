"use strict";

var _customElementsJsx = _interopRequireWildcard(require("custom-elements-jsx"));

var _tinyInvariant = _interopRequireDefault(require("tiny-invariant"));

var _matchPath = _interopRequireDefault(require("./matchPath"));

var _createElement = _interopRequireDefault(require("./createElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CustomRoute =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomRoute, _Component);

  function CustomRoute() {
    _classCallCheck(this, CustomRoute);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomRoute).apply(this, arguments));
  }

  _createClass(CustomRoute, [{
    key: "componentDidCreate",
    value: function componentDidCreate() {
      (0, _tinyInvariant.default)(this.props.context, 'You should not use <custom-route> without context');
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          propsLocation = _this$props.location,
          _this$props$context = _this$props.context,
          context = _this$props$context === void 0 ? {} : _this$props$context,
          propsPath = _this$props.path,
          from = _this$props.from,
          component = _this$props.component,
          render = _this$props.render,
          other = _objectWithoutProperties(_this$props, ["location", "context", "path", "from", "component", "render"]);

      var children = this.props.children;
      var _context$location = context.location,
          contextLocation = _context$location === void 0 ? {} : _context$location,
          computedMatch = context.computedMatch,
          contextMatch = context.match,
          history = context.history,
          staticContext = context.staticContext;
      var location = propsLocation || contextLocation;
      var path = propsPath || from;
      var match = computedMatch ? computedMatch // <Switch> already computed the match for us
      : path ? (0, _matchPath.default)(location.pathname, _objectSpread({}, this.props, {
        path: path
      })) : contextMatch;

      var props = _objectSpread({
        context: {
          history: history,
          location: location,
          match: match,
          staticContext: staticContext
        }
      }, other);

      if (children.length) {
        children = children.map(function (child) {
          if (typeof child === 'function') {
            return child(props);
          }

          return child;
        });
        return (0, _customElementsJsx.createFragmentWithChildren)(children, props);
      }

      if (match) {
        if (render) {
          return render(props);
        }

        if (component) {
          return (0, _createElement.default)(component, props);
        }

        return null;
      }

      return null;
    }
  }]);

  return CustomRoute;
}(_customElementsJsx.Component);

if (!window.customElements.get('custom-route')) window.customElements.define('custom-route', CustomRoute);