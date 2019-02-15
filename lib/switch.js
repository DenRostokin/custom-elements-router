"use strict";

var _customElementsJsx = _interopRequireWildcard(require("custom-elements-jsx"));

var _tinyInvariant = _interopRequireDefault(require("tiny-invariant"));

var _matchPath = _interopRequireDefault(require("./matchPath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CustomSwitch =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomSwitch, _Component);

  function CustomSwitch() {
    _classCallCheck(this, CustomSwitch);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomSwitch).apply(this, arguments));
  }

  _createClass(CustomSwitch, [{
    key: "componentDidCreate",
    value: function componentDidCreate() {
      (0, _tinyInvariant.default)(this.props.context, 'You should not use <custom-switch> without context');
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$children = _this$props.children,
          children = _this$props$children === void 0 ? [] : _this$props$children,
          _this$props$context = _this$props.context,
          context = _this$props$context === void 0 ? {} : _this$props$context;
      var _context$location = context.location,
          location = _context$location === void 0 ? {} : _context$location,
          contextMatch = context.match;

      var _children$reduce = children.reduce(function (matched, child) {
        if (matched.length) return matched;
        var path = child.props.path || child.props.from;
        var childMatch = path ? (0, _matchPath.default)(location.pathname, _objectSpread({}, child.props, {
          path: path
        })) : contextMatch;
        return childMatch ? [child, childMatch] : [];
      }, []),
          _children$reduce2 = _slicedToArray(_children$reduce, 2),
          element = _children$reduce2[0],
          match = _children$reduce2[1];

      if (element) {
        element.props.context = _objectSpread({}, element.props.context, context, {
          computedMatch: match
        });
        return element;
      }

      return null;
    }
  }]);

  return CustomSwitch;
}(_customElementsJsx.Component);

if (!window.customElements.get('custom-switch')) window.customElements.define('custom-switch', CustomSwitch);