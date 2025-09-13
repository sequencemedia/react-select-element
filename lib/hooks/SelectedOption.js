"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectedOption;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _common = require("#common");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function SelectedOption(_ref) {
  var selectOptionRef = _ref.selectOptionRef,
    accessKey = _ref.accessKey,
    tabIndex = _ref.tabIndex,
    options = _ref.options,
    selectIndex = _ref.selectIndex,
    activeEnter = _ref.activeEnter,
    hasActiveOptions = _ref.hasActiveOptions,
    onActiveEnterFocus = _ref.onActiveEnterFocus,
    onFocus = _ref.onFocus,
    onActiveEnterBlur = _ref.onActiveEnterBlur,
    onBlur = _ref.onBlur,
    onClick = _ref.onClick,
    onActiveOptionsKeyPress = _ref.onActiveOptionsKeyPress,
    onKeyPress = _ref.onKeyPress,
    onActiveOptionsKeyUp = _ref.onActiveOptionsKeyUp,
    onKeyUp = _ref.onKeyUp,
    onActiveOptionsKeyDown = _ref.onActiveOptionsKeyDown,
    onKeyDown = _ref.onKeyDown,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var _useMemo = (0, _react.useMemo)(function () {
      var _options$selectIndex;
      return (_options$selectIndex = options[selectIndex]) !== null && _options$selectIndex !== void 0 ? _options$selectIndex : {};
    }, [options, selectIndex]),
    text = _useMemo.text;
  var handleFocus = activeEnter ? onActiveEnterFocus : onFocus;
  var handleBlur = activeEnter ? onActiveEnterBlur : onBlur;
  var handleKeyPress = hasActiveOptions ? onActiveOptionsKeyPress : onKeyPress;
  var handleKeyUp = hasActiveOptions ? onActiveOptionsKeyUp : onKeyUp;
  var handleKeyDown = hasActiveOptions ? onActiveOptionsKeyDown : onKeyDown;
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: selectOptionRef,
    accessKey: accessKey,
    tabIndex: tabIndex,
    className: "selected-option",
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: onClick,
    onKeyPress: handleKeyPress,
    onKeyUp: handleKeyUp,
    onKeyDown: handleKeyDown
  }, children !== null && children !== void 0 ? children : (0, _common.toOptionText)(text));
}
SelectedOption.propTypes = {
  selectOptionRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape()
  })]),
  accessKey: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    text: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool])
  })),
  children: _propTypes.default.node,
  selectIndex: _propTypes.default.number.isRequired,
  activeEnter: _propTypes.default.bool.isRequired,
  hasActiveOptions: _propTypes.default.bool.isRequired,
  onActiveEnterFocus: _propTypes.default.func.isRequired,
  onFocus: _propTypes.default.func.isRequired,
  onActiveEnterBlur: _propTypes.default.func.isRequired,
  onBlur: _propTypes.default.func.isRequired,
  onClick: _propTypes.default.func.isRequired,
  onActiveOptionsKeyPress: _propTypes.default.func.isRequired,
  onKeyPress: _propTypes.default.func.isRequired,
  onActiveOptionsKeyUp: _propTypes.default.func.isRequired,
  onKeyUp: _propTypes.default.func.isRequired,
  onActiveOptionsKeyDown: _propTypes.default.func.isRequired,
  onKeyDown: _propTypes.default.func.isRequired
};