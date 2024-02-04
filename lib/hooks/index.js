"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectElement;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _nanoid = require("nanoid");
var _common = require("../common");
var _Disabled = _interopRequireDefault(require("./Disabled"));
var _ReadOnly = _interopRequireDefault(require("./ReadOnly"));
var _Select = _interopRequireDefault(require("./Select"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function SelectElement(props) {
  var _useState = (0, _react.useState)(function () {
      var id = props.id;
      return id || (0, _nanoid.nanoid)();
    }),
    _useState2 = _slicedToArray(_useState, 1),
    id = _useState2[0];
  var _useState3 = (0, _react.useState)(function () {
      return (0, _common.getSelectIndex)(props);
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    selectIndex = _useState4[0],
    setSelectIndex = _useState4[1];
  var _useState5 = (0, _react.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    activeIndex = _useState6[0],
    setActiveIndex = _useState6[1];
  var selectOptionRef = /*#__PURE__*/(0, _react.createRef)();
  var optionsRef = /*#__PURE__*/(0, _react.createRef)();
  var activeOptionRef = /*#__PURE__*/(0, _react.createRef)();
  var disabled = props.disabled;
  if (disabled) {
    return /*#__PURE__*/_react.default.createElement(_Disabled.default, _extends({
      id: id,
      selectIndex: selectIndex,
      activeIndex: activeIndex,
      selectOptionRef: selectOptionRef,
      optionsRef: optionsRef,
      activeOptionRef: activeOptionRef
    }, props));
  }
  var readOnly = props.readOnly;
  if (readOnly) {
    return /*#__PURE__*/_react.default.createElement(_ReadOnly.default, _extends({
      id: id,
      selectIndex: selectIndex,
      activeIndex: activeIndex,
      selectOptionRef: selectOptionRef,
      optionsRef: optionsRef,
      activeOptionRef: activeOptionRef
    }, props));
  }
  function handleSelectIndexChange(index) {
    /*
     * Is the index different to the index stored in state?
     */
    if (index !== selectIndex) {
      var onChange = props.onChange;

      /*
       *  Always invoke 'onChange' if it is available
       */
      if (onChange instanceof Function) onChange(index);

      /*
       *  Update the state
       */
      setSelectIndex(index);
    }
  }
  function handleActiveIndexChange(index) {
    if (index !== activeIndex) setActiveIndex(index);
  }
  return /*#__PURE__*/_react.default.createElement(_Select.default, _extends({
    id: id,
    selectIndex: selectIndex,
    handleSelectIndexChange: handleSelectIndexChange,
    activeIndex: activeIndex,
    handleActiveIndexChange: handleActiveIndexChange,
    selectOptionRef: selectOptionRef,
    optionsRef: optionsRef,
    activeOptionRef: activeOptionRef
  }, props));
}
SelectElement.propTypes = {
  id: _propTypes.default.string,
  defaultIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  index: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  tabIndex: _propTypes.default.number,
  accessKey: _propTypes.default.string,
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    text: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool])
  })),
  onChange: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  children: _propTypes.default.node
};
SelectElement.defaultProps = {
  defaultIndex: 0,
  tabIndex: 0,
  options: [],
  disabled: false,
  readOnly: false
};