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
exports.default = SelectedOptionDisabled;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _common = require("#common");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function SelectedOptionDisabled(_ref) {
  var selectOptionRef = _ref.selectOptionRef,
    options = _ref.options,
    selectIndex = _ref.selectIndex,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var _useMemo = (0, _react.useMemo)(function () {
      var _options$selectIndex;
      return (_options$selectIndex = options[selectIndex]) !== null && _options$selectIndex !== void 0 ? _options$selectIndex : {};
    }, [options, selectIndex]),
    text = _useMemo.text;
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: selectOptionRef,
    className: "selected-option"
  }, children !== null && children !== void 0 ? children : (0, _common.toOptionText)(text));
}
SelectedOptionDisabled.propTypes = {
  selectOptionRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape()
  })]).isRequired,
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    text: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool])
  })).isRequired,
  selectIndex: _propTypes.default.number.isRequired,
  children: _propTypes.default.node
};