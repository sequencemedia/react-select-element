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
exports.default = Options;
require("core-js/modules/es.array.map.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Option = _interopRequireDefault(require("./Option"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Options(_ref) {
  var options = _ref.options,
    optionsRef = _ref.optionsRef,
    activeOptionRef = _ref.activeOptionRef,
    selectIndex = _ref.selectIndex,
    activeIndex = _ref.activeIndex,
    hasActiveOptions = _ref.hasActiveOptions,
    id = _ref.id,
    handleActiveIndexChange = _ref.handleActiveIndexChange,
    handleActiveEnterChange = _ref.handleActiveEnterChange,
    handleOptionClick = _ref.handleOptionClick;
  var className = (0, _react.useMemo)(function () {
    return (0, _classnames.default)('options', {
      active: hasActiveOptions
    });
  }, [hasActiveOptions]);
  if (options.length) {
    return /*#__PURE__*/_react.default.createElement("ul", {
      ref: optionsRef,
      className: className,
      onMouseEnter: function onMouseEnter() {
        return handleActiveEnterChange(true);
      },
      onMouseLeave: function onMouseLeave() {
        return handleActiveEnterChange(false);
      },
      role: "listbox",
      "aria-hidden": !hasActiveOptions,
      id: id
    }, options.map(function (option, index) {
      return /*#__PURE__*/_react.default.createElement(_Option.default, {
        activeOptionRef: activeOptionRef,
        option: option,
        index: index,
        selectIndex: selectIndex,
        activeIndex: activeIndex,
        handleActiveIndexChange: handleActiveIndexChange,
        handleClick: handleOptionClick,
        key: index
      });
    }));
  }
}
Options.propTypes = {
  optionsRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape()
  })]),
  activeOptionRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape()
  })]),
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    text: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool])
  })),
  selectIndex: _propTypes.default.number.isRequired,
  activeIndex: _propTypes.default.number.isRequired,
  hasActiveOptions: _propTypes.default.bool.isRequired,
  id: _propTypes.default.string.isRequired,
  handleActiveIndexChange: _propTypes.default.func.isRequired,
  handleActiveEnterChange: _propTypes.default.func.isRequired,
  handleOptionClick: _propTypes.default.func.isRequired
};