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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function SelectedOption(_ref) {
  var selectOptionRef = _ref.selectOptionRef,
    accessKey = _ref.accessKey,
    tabIndex = _ref.tabIndex,
    children = _ref.children,
    options = _ref.options,
    selectIndex = _ref.selectIndex,
    activeEnter = _ref.activeEnter,
    hasActiveOptions = _ref.hasActiveOptions,
    handleActiveEnterFocus = _ref.handleActiveEnterFocus,
    handleFocus = _ref.handleFocus,
    handleActiveEnterBlur = _ref.handleActiveEnterBlur,
    handleBlur = _ref.handleBlur,
    handleClick = _ref.handleClick,
    handleActiveOptionsKeyPress = _ref.handleActiveOptionsKeyPress,
    handleKeyPress = _ref.handleKeyPress,
    handleActiveOptionsKeyUp = _ref.handleActiveOptionsKeyUp,
    handleKeyUp = _ref.handleKeyUp,
    handleActiveOptionsKeyDown = _ref.handleActiveOptionsKeyDown,
    handleKeyDown = _ref.handleKeyDown;
  var _useMemo = (0, _react.useMemo)(function () {
      return options[selectIndex] || {};
    }, [options, selectIndex]),
    text = _useMemo.text;
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: selectOptionRef,
    accessKey: accessKey,
    tabIndex: tabIndex,
    className: "selected-option",
    onFocus: activeEnter ? handleActiveEnterFocus : handleFocus,
    onBlur: activeEnter ? handleActiveEnterBlur : handleBlur,
    onClick: handleClick,
    onKeyPress: hasActiveOptions ? handleActiveOptionsKeyPress : handleKeyPress,
    onKeyUp: hasActiveOptions ? handleActiveOptionsKeyUp : handleKeyUp,
    onKeyDown: hasActiveOptions ? handleActiveOptionsKeyDown : handleKeyDown
  }, children || (0, _common.toOptionText)(text));
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
  handleActiveEnterFocus: _propTypes.default.func.isRequired,
  handleFocus: _propTypes.default.func.isRequired,
  handleActiveEnterBlur: _propTypes.default.func.isRequired,
  handleBlur: _propTypes.default.func.isRequired,
  handleClick: _propTypes.default.func.isRequired,
  handleActiveOptionsKeyPress: _propTypes.default.func.isRequired,
  handleKeyPress: _propTypes.default.func.isRequired,
  handleActiveOptionsKeyUp: _propTypes.default.func.isRequired,
  handleKeyUp: _propTypes.default.func.isRequired,
  handleActiveOptionsKeyDown: _propTypes.default.func.isRequired,
  handleKeyDown: _propTypes.default.func.isRequired
};