"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "renderRoutes", {
  enumerable: true,
  get: function get() {
    return _renderRoutes.default;
  }
});
Object.defineProperty(exports, "matchRoutes", {
  enumerable: true,
  get: function get() {
    return _matchRoutes.default;
  }
});
exports.default = void 0;

var _customElementsJsx = require("custom-elements-jsx");

var _tinyInvariant = _interopRequireDefault(require("tiny-invariant"));

var _renderRoutes = _interopRequireDefault(require("./renderRoutes"));

var _matchRoutes = _interopRequireDefault(require("./matchRoutes"));

require("./link");

require("./navLink");

require("./redirect");

require("./switch");

require("./route");

require("./memoryRouter");

require("./staticRouter");

require("./browserRouter");

require("./hashRouter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CustomRouter =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomRouter, _Component);

  function CustomRouter() {
    _classCallCheck(this, CustomRouter);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomRouter).apply(this, arguments));
  }

  _createClass(CustomRouter, [{
    key: "componentDidCreate",
    value: function componentDidCreate() {
      var _this = this;

      (0, _tinyInvariant.default)(this.props.history, 'You should not use <custom-router> without history');
      var _this$props = this.props,
          history = _this$props.history,
          staticContext = _this$props.staticContext;
      this.location = history.location;

      if (!staticContext) {
        this.unlisten = history.listen(function (location) {
          _this.location = location;

          _this.update();
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.unlisten) this.unlisten();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          routes = _this$props2.routes,
          history = _this$props2.history,
          staticContext = _this$props2.staticContext,
          children = _this$props2.children;
      var context = {
        history: history,
        location: this.location,
        match: CustomRouter.computeRootMatch(this.location.pathname),
        staticContext: staticContext
      };

      if (routes) {
        return (0, _renderRoutes.default)(routes, context);
      }

      return (0, _customElementsJsx.createFragmentWithChildren)(children, {
        context: context
      });
    }
  }]);

  return CustomRouter;
}(_customElementsJsx.Component);

CustomRouter.computeRootMatch = function (pathname) {
  return {
    path: '/',
    url: '/',
    params: {},
    isExact: pathname === '/'
  };
};

if (!window.customElements.get('custom-router')) window.customElements.define('custom-router', CustomRouter);
var _default = CustomRouter;
exports.default = _default;