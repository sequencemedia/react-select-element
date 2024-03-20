"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
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
exports.default = Select;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _common = require("../common");
var _SelectedOption = _interopRequireDefault(require("./SelectedOption"));
var _Options = _interopRequireDefault(require("./Options"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function Select(_ref) {
  var accessKey = _ref.accessKey,
    tabIndex = _ref.tabIndex,
    options = _ref.options,
    selectIndex = _ref.selectIndex,
    handleSelectIndexChange = _ref.handleSelectIndexChange,
    activeIndex = _ref.activeIndex,
    handleActiveIndexChange = _ref.handleActiveIndexChange,
    selectOptionRef = _ref.selectOptionRef,
    optionsRef = _ref.optionsRef,
    activeOptionRef = _ref.activeOptionRef,
    id = _ref.id;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    hasActiveOptions = _useState2[0],
    setHasActiveOptions = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    activeEnter = _useState4[0],
    setActiveEnter = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    activeChars = _useState6[0],
    setActiveChars = _useState6[1];
  var n = options.length;
  var _useMemo = (0, _react.useMemo)(function () {
      return {
        upperBound: Math.max(0, n - 1),
        lowerBound: 0
      };
    }, [n]),
    upperBound = _useMemo.upperBound,
    lowerBound = _useMemo.lowerBound;
  function handleFocus() {
    handleActiveIndexChange(selectIndex);
  }
  function handleBlur() {
    setHasActiveOptions(false);
  }
  var handleActiveEnterFocus = function handleActiveEnterFocus() {
    return true;
  };
  function handleActiveEnterBlur() {
    var current = selectOptionRef.current;
    current.focus();
  }
  function handleClick(event) {
    if ((0, _common.isEventClickLike)(event)) {
      // it's probably an accessKey event
      var current = selectOptionRef.current;
      current.focus();
    } else {
      // it's probably a mouse click
      setHasActiveOptions(true);
    }
  }
  function handleOptionClick(index) {
    setHasActiveOptions(false);
    handleSelectIndexChange(index);
    var current = selectOptionRef.current;
    current.focus();
  }
  function handleActiveOptionsKeyPress(event) {
    if ((0, _common.isKeyEnter)(event) || (0, _common.isKeySpace)(event)) return;
    return handleActiveOptionsKeyChar(event);
  }
  var handleKeyPress = function handleKeyPress(event) {
    return handleKeyChar(event);
  };
  var handleActiveOptionsKeyUp = function handleActiveOptionsKeyUp(event) {
    return handleActiveOptionsKeyCode(event);
  };
  var handleActiveOptionsKeyDown = function handleActiveOptionsKeyDown() {
    return true;
  };
  var handleKeyUp = function handleKeyUp(event) {
    return handleKeyCode(event);
  };
  var handleKeyDown = function handleKeyDown() {
    return true;
  };
  function handleKeySpace() {
    setHasActiveOptions(false);
    handleSelectIndexChange(activeIndex);
  }
  function handleKeyEnter() {
    setHasActiveOptions(false);
    handleSelectIndexChange(activeIndex);
  }
  function handleKeyEscape() {
    setHasActiveOptions(false);
  }
  var decrementActiveIndex = (0, _react.useCallback)(function decrementActiveIndex() {
    handleActiveIndexChange(Math.max(activeIndex - 1, lowerBound));
  }, [activeIndex, lowerBound]);
  var incrementActiveIndex = (0, _react.useCallback)(function incrementActiveIndex() {
    handleActiveIndexChange(Math.min(activeIndex + 1, upperBound));
  }, [activeIndex, upperBound]);
  function handleKeyArrowUp() {
    decrementActiveIndex();
    setActiveChars('');
  }
  function handleKeyArrowDown() {
    incrementActiveIndex();
    setActiveChars('');
  }
  var handleActiveOptionsKeyChar = (0, _react.useCallback)(function handleActiveOptionsKeyChar(_ref2) {
    var keyChar = _ref2.charCode;
    var char = String.fromCharCode(keyChar).toLowerCase();
    var chars = activeChars + char;

    /*
    *  activeIndex()
    */
    if ((0, _common.hasExactMatch)(options, chars)) {
      setActiveChars(chars);
      handleActiveIndexChange((0, _common.getExactMatchIndex)(options, chars));
    } else {
      if ((0, _common.hasStartMatch)(options, chars)) {
        setActiveChars(chars);
        handleActiveIndexChange((0, _common.getStartMatchIndex)(options, chars));
      } else {
        if ((0, _common.hasExactMatch)(options, char)) {
          setActiveChars(char);
          handleActiveIndexChange((0, _common.getExactMatchIndex)(options, char));
        } else {
          if ((0, _common.hasStartMatch)(options, char)) {
            setActiveChars(char);
            handleActiveIndexChange((0, _common.getStartMatchIndex)(options, char));
          } else {
            if ((0, _common.hasGreaterThanMatch)(options, char)) {
              setActiveChars('');
              handleActiveIndexChange((0, _common.getGreaterThanMatchIndex)(options, char));
            } else {
              if ((0, _common.hasSmallerThanMatch)(options, char)) {
                setActiveChars('');
                handleActiveIndexChange((0, _common.getSmallerThanMatchIndex)(options, char));
              }
            }
          }
        }
      }
    }
  }, [activeChars, options]);
  var handleKeyChar = (0, _react.useCallback)(function handleKeyChar(_ref3) {
    var keyChar = _ref3.charCode;
    var char = String.fromCharCode(keyChar).toLowerCase();
    var chars = activeChars + char;

    /*
    *  selectIndex()
    */
    if ((0, _common.hasExactMatch)(options, chars)) {
      setActiveChars(chars);
      handleSelectIndexChange((0, _common.getExactMatchIndex)(options, chars));
    } else {
      if ((0, _common.hasStartMatch)(options, chars)) {
        setActiveChars(chars);
        handleSelectIndexChange((0, _common.getStartMatchIndex)(options, chars));
      } else {
        if ((0, _common.hasExactMatch)(options, char)) {
          setActiveChars(char);
          handleSelectIndexChange((0, _common.getExactMatchIndex)(options, char));
        } else {
          if ((0, _common.hasStartMatch)(options, char)) {
            setActiveChars(char);
            handleSelectIndexChange((0, _common.getStartMatchIndex)(options, char));
          } else {
            if ((0, _common.hasGreaterThanMatch)(options, char)) {
              setActiveChars('');
              handleSelectIndexChange((0, _common.getGreaterThanMatchIndex)(options, char));
            }
          }
        }
      }
    }
  }, [activeChars, options]);
  function handleActiveOptionsKeyCode(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 13:
        handleKeyEnter(event);
        break;
      case 27:
        handleKeyEscape(event);
        break;
      case 32:
        handleKeySpace(event);
        break;
      case 38:
        handleKeyArrowUp(event);
        break;
      case 40:
        handleKeyArrowDown(event);
        break;
    }
  }
  function handleKeyCode(_ref4) {
    var keyCode = _ref4.keyCode;
    if (keyCode === 32 || keyCode === 38 || keyCode === 40) {
      // space or arrow up or arrow down
      setHasActiveOptions(true);
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "react-select-element",
    "aria-expanded": hasActiveOptions,
    "aria-haspopup": "listbox",
    "aria-controls": id
  }, /*#__PURE__*/_react.default.createElement(_SelectedOption.default, {
    selectOptionRef: selectOptionRef,
    accessKey: accessKey,
    tabIndex: tabIndex,
    options: options,
    selectIndex: selectIndex,
    activeEnter: activeEnter,
    hasActiveOptions: hasActiveOptions,
    handleActiveEnterFocus: handleActiveEnterFocus,
    handleFocus: handleFocus,
    handleActiveEnterBlur: handleActiveEnterBlur,
    handleBlur: handleBlur,
    handleClick: handleClick,
    handleActiveOptionsKeyPress: handleActiveOptionsKeyPress,
    handleKeyPress: handleKeyPress,
    handleActiveOptionsKeyUp: handleActiveOptionsKeyUp,
    handleKeyUp: handleKeyUp,
    handleActiveOptionsKeyDown: handleActiveOptionsKeyDown,
    handleKeyDown: handleKeyDown
  }), /*#__PURE__*/_react.default.createElement(_Options.default, {
    activeOptionRef: activeOptionRef,
    optionsRef: optionsRef,
    options: options,
    selectIndex: selectIndex,
    activeIndex: activeIndex,
    hasActiveOptions: hasActiveOptions,
    handleActiveIndexChange: handleActiveIndexChange,
    handleActiveEnterChange: setActiveEnter,
    handleOptionClick: handleOptionClick,
    id: id
  }));
}
Select.propTypes = {
  id: _propTypes.default.string.isRequired,
  selectOptionRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape()
  })]).isRequired,
  optionsRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape()
  })]).isRequired,
  activeOptionRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape()
  })]).isRequired,
  tabIndex: _propTypes.default.number,
  accessKey: _propTypes.default.string,
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    text: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool])
  })).isRequired,
  selectIndex: _propTypes.default.number.isRequired,
  handleSelectIndexChange: _propTypes.default.func.isRequired,
  activeIndex: _propTypes.default.number.isRequired,
  handleActiveIndexChange: _propTypes.default.func.isRequired,
  children: _propTypes.default.node
};
Select.defaultProps = {
  tabIndex: 0,
  options: [],
  disabled: false,
  readOnly: false
};