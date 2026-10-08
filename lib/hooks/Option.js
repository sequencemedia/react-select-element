"use strict";

require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Option;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _dedupe = _interopRequireDefault(require("classnames/dedupe"));
var _common = require("#common");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function Option(_ref) {
  var activeOptionRef = _ref.activeOptionRef,
    index = _ref.index,
    selectIndex = _ref.selectIndex,
    activeIndex = _ref.activeIndex,
    onActiveIndexChange = _ref.onActiveIndexChange,
    onOptionClick = _ref.onClick,
    text = _ref.option.text;
  /**
   *  Dependencies ordered from most to least likely to change
   */
  var className = (0, _react.useMemo)(function () {
    return (0, _dedupe.default)('option', {
      active: index === activeIndex,
      selected: index === selectIndex
    });
  }, [activeIndex, index, selectIndex]);
  var handleMouseEnter = (0, _react.useCallback)(function onMouseEnter() {
    onActiveIndexChange(index);
  }, [activeIndex, index, selectIndex]);
  var handleMouseLeave = (0, _react.useCallback)(function onMouseLeave() {
    onActiveIndexChange(index);
  }, [activeIndex, index, selectIndex]);
  var handleClick = (0, _react.useCallback)(function onClick() {
    onOptionClick(index);
  }, [activeIndex, index, selectIndex]);
  return /*#__PURE__*/_react.default.createElement("li", {
    ref: index === activeIndex ? activeOptionRef : null,
    className: className,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    role: "option",
    "aria-selected": index === selectIndex
  }, (0, _common.toOptionText)(text));
}
Option.propTypes = {
  activeOptionRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape()
  })]).isRequired,
  index: _propTypes.default.number.isRequired,
  selectIndex: _propTypes.default.number.isRequired,
  activeIndex: _propTypes.default.number.isRequired,
  onActiveIndexChange: _propTypes.default.func.isRequired,
  onClick: _propTypes.default.func.isRequired,
  option: _propTypes.default.shape().isRequired
};