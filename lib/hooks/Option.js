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
exports.default = Option;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _common = require("../common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Option(_ref) {
  var activeOptionRef = _ref.activeOptionRef,
    index = _ref.index,
    selectIndex = _ref.selectIndex,
    activeIndex = _ref.activeIndex,
    handleActiveIndexChange = _ref.handleActiveIndexChange,
    handleClick = _ref.handleClick,
    text = _ref.option.text;
  var className = (0, _react.useMemo)(function () {
    return (0, _classnames.default)({
      selected: index === selectIndex
    }, 'option', {
      active: index === activeIndex
    });
  }, [index, selectIndex, activeIndex]);
  return /*#__PURE__*/_react.default.createElement("li", {
    ref: index === activeIndex ? activeOptionRef : null,
    className: className,
    onMouseEnter: function onMouseEnter() {
      return handleActiveIndexChange(index);
    },
    onMouseLeave: function onMouseLeave() {
      return handleActiveIndexChange(index);
    },
    onClick: function onClick() {
      return handleClick(index);
    },
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
  handleActiveIndexChange: _propTypes.default.func.isRequired,
  handleClick: _propTypes.default.func.isRequired,
  option: _propTypes.default.shape().isRequired
};