"use strict";

var _customElementsJsx = _interopRequireWildcard(require("custom-elements-jsx"));

var _history = require("history");

var _tinyInvariant = _interopRequireDefault(require("tiny-invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CustomRedirect =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomRedirect, _Component);

  function CustomRedirect() {
    _classCallCheck(this, CustomRedirect);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomRedirect).apply(this, arguments));
  }

  _createClass(CustomRedirect, [{
    key: "componentDidCreate",
    value: function componentDidCreate() {
      (0, _tinyInvariant.default)(this.props.context, 'You should not use <custom-redirect> without context');
      var _this$props = this.props,
          route = _this$props.route,
          _this$props$context = _this$props.context,
          context = _this$props$context === void 0 ? {} : _this$props$context,
          to = _this$props.to,
          _this$props$push = _this$props.push,
          push = _this$props$push === void 0 ? false : _this$props$push;
      var history = context.history; // if we use custom-redirect inside of routes that we pass to the custom-router
      // the we should use values from route object. otherwise we use values from props

      var redirectTo = route ? route.to : to;
      var redirectPush = route ? route.push : push;
      var location = (0, _history.createLocation)(redirectTo);
      var method = redirectPush ? history.push : history.replace;
      method(location);
    }
  }]);

  return CustomRedirect;
}(_customElementsJsx.Component);

if (!window.customElements.get('custom-redirect')) window.customElements.define('custom-redirect', CustomRedirect);