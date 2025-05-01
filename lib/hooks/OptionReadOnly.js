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
exports.default = OptionReadOnly;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _dedupe = _interopRequireDefault(require("classnames/dedupe"));
var _common = require("#common");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function OptionReadOnly(_ref) {
  var activeOptionRef = _ref.activeOptionRef,
    index = _ref.index,
    selectIndex = _ref.selectIndex,
    activeIndex = _ref.activeIndex,
    text = _ref.option.text;
  var className = (0, _react.useMemo)(function () {
    return (0, _dedupe.default)('option', {
      selected: index === selectIndex
    });
  }, [index, selectIndex]);
  return /*#__PURE__*/_react.default.createElement("li", {
    ref: index === activeIndex ? activeOptionRef : null,
    className: className,
    role: "option",
    "aria-selected": index === selectIndex
  }, (0, _common.toOptionText)(text));
}
OptionReadOnly.propTypes = {
  activeOptionRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape()
  })]).isRequired,
  index: _propTypes.default.number.isRequired,
  selectIndex: _propTypes.default.number.isRequired,
  activeIndex: _propTypes.default.number.isRequired,
  option: _propTypes.default.shape().isRequired
};