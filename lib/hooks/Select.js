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
var _common = require("#common");
var _SelectedOption = _interopRequireDefault(require("./SelectedOption"));
var _Options = _interopRequireDefault(require("./Options"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function Select(_ref) {
  var accessKey = _ref.accessKey,
    _ref$tabIndex = _ref.tabIndex,
    tabIndex = _ref$tabIndex === void 0 ? 0 : _ref$tabIndex,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    selectIndex = _ref.selectIndex,
    handleSelectIndexChange = _ref.handleSelectIndexChange,
    activeIndex = _ref.activeIndex,
    handleActiveIndexChange = _ref.handleActiveIndexChange,
    selectOptionRef = _ref.selectOptionRef,
    optionsRef = _ref.optionsRef,
    activeOptionRef = _ref.activeOptionRef,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
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
  var current = selectOptionRef.current;
  var handleFocus = (0, _react.useCallback)(function onFocus() {
    handleActiveIndexChange(selectIndex); // let `handleActiveIndexChange` handle `(index !== activeIndex)`
  }, [hasActiveOptions, selectIndex]);
  var handleBlur = (0, _react.useCallback)(function onBlur() {
    setHasActiveOptions(false);
  }, [hasActiveOptions, selectIndex]);
  var handleActiveEnterFocus = (0, _react.useCallback)(function onActiveEnterFocus() {
    //
  }, [current]);
  var handleActiveEnterBlur = (0, _react.useCallback)(function onActiveEnterBlur() {
    if (current) current.focus();
  }, [current]);
  var handleClick = (0, _react.useCallback)(function onClick(event) {
    if ((0, _common.isEventClickLike)(event)) {
      // it's probably an accessKey event
      if (current) current.focus();
    } else {
      // it's probably a mouse click
      setHasActiveOptions(true);
    }
  }, [hasActiveOptions, current]);
  var handleOptionClick = (0, _react.useCallback)(function onOptionClick(index) {
    setHasActiveOptions(false);
    handleSelectIndexChange(index); // let `handleSelectIndexChange` handle `(index !== selectIndex)`
    if (current) current.focus();
  }, [hasActiveOptions, current, selectIndex, activeIndex]);
  var handleActiveOptionsKeyPress = (0, _react.useCallback)(function onActiveOptionsKeyPress(event) {
    if ((0, _common.isKeyEnter)(event) || (0, _common.isKeySpace)(event)) return;
    handleActiveOptionsKeyChar(event);
  }, [activeChars, options]);
  var handleKeyPress = (0, _react.useCallback)(function onKeyPress(event) {
    handleKeyChar(event);
  }, [activeChars, options]);
  var handleActiveOptionsKeyUp = (0, _react.useCallback)(function onActiveOptionsKeyUp(event) {
    handleActiveOptionsKeyCode(event);
  }, [hasActiveOptions, selectIndex, activeIndex, upperBound, lowerBound]);
  var handleActiveOptionsKeyDown = (0, _react.useCallback)(function onActiveOptionsKeyDown() {/* */}, [hasActiveOptions, selectIndex, activeIndex, upperBound, lowerBound]);
  var handleKeyUp = (0, _react.useCallback)(function onKeyUp(event) {
    handleKeyCode(event);
  }, [hasActiveOptions]);
  var handleKeyDown = (0, _react.useCallback)(function onKeyDown() {/* */}, [hasActiveOptions]);
  var handleKeySpace = (0, _react.useCallback)(function onKeySpace() {
    setHasActiveOptions(false);
    handleSelectIndexChange(activeIndex); // let `handleSelectIndexChange` handle `(activeIndex !== selectIndex)`
  }, [hasActiveOptions, selectIndex, activeIndex]);
  var handleKeyEnter = (0, _react.useCallback)(function onKeyEnter() {
    setHasActiveOptions(false);
    handleSelectIndexChange(activeIndex); // let `handleSelectIndexChange` handle `(activeIndex !== selectIndex)`
  }, [hasActiveOptions, selectIndex, activeIndex]);
  var handleKeyEscape = (0, _react.useCallback)(function onKeyEscape() {
    setHasActiveOptions(false);
  }, [hasActiveOptions]);
  var decrementActiveIndex = (0, _react.useCallback)(function decrementActiveIndex() {
    var index = Math.max(activeIndex - 1, lowerBound);
    handleActiveIndexChange(index); // let `handleActiveIndexChange` handle `(index !== activeIndex)`
  }, [activeIndex, lowerBound]);
  var incrementActiveIndex = (0, _react.useCallback)(function incrementActiveIndex() {
    var index = Math.min(activeIndex + 1, upperBound);
    handleActiveIndexChange(index); // let `handleActiveIndexChange` handle `(index !== activeIndex)`
  }, [activeIndex, upperBound]);
  var handleKeyArrowUp = (0, _react.useCallback)(function onKeyArrowUp() {
    decrementActiveIndex();
    setActiveChars('');
  }, [activeIndex, lowerBound]);
  var handleKeyArrowDown = (0, _react.useCallback)(function onKeyArrowDown() {
    incrementActiveIndex();
    setActiveChars('');
  }, [activeIndex, upperBound]);
  var handleActiveOptionsKeyChar = (0, _react.useCallback)(function onActiveOptionsKeyChar(_ref2) {
    var keyChar = _ref2.charCode;
    var char = String.fromCharCode(keyChar).toLowerCase();
    var chars = activeChars + char;

    /*
    *  activeIndex()
    */
    if ((0, _common.hasExactMatch)(options, chars)) {
      setActiveChars(chars);
      handleActiveIndexChange((0, _common.getExactMatchIndex)(options, chars) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
      );
    } else {
      if ((0, _common.hasStartMatch)(options, chars)) {
        setActiveChars(chars);
        handleActiveIndexChange((0, _common.getStartMatchIndex)(options, chars) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
        );
      } else {
        if ((0, _common.hasExactMatch)(options, char)) {
          setActiveChars(char);
          handleActiveIndexChange((0, _common.getExactMatchIndex)(options, char) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
          );
        } else {
          if ((0, _common.hasStartMatch)(options, char)) {
            setActiveChars(char);
            handleActiveIndexChange((0, _common.getStartMatchIndex)(options, char) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
            );
          } else {
            if ((0, _common.hasGreaterThanMatch)(options, char)) {
              setActiveChars('');
              handleActiveIndexChange((0, _common.getGreaterThanMatchIndex)(options, char) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
              );
            } else {
              if ((0, _common.hasSmallerThanMatch)(options, char)) {
                setActiveChars('');
                handleActiveIndexChange((0, _common.getSmallerThanMatchIndex)(options, char) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
                );
              }
            }
          }
        }
      }
    }
  }, [activeChars, activeIndex, options, selectIndex]);
  var handleKeyChar = (0, _react.useCallback)(function onKeyChar(_ref3) {
    var keyChar = _ref3.charCode;
    var char = String.fromCharCode(keyChar).toLowerCase();
    var chars = activeChars + char;

    /*
    *  selectIndex()
    */
    if ((0, _common.hasExactMatch)(options, chars)) {
      setActiveChars(chars);
      handleSelectIndexChange((0, _common.getExactMatchIndex)(options, chars) // let `handleSelectIndexChange` handle `(index !== selectIndex)`
      );
    } else {
      if ((0, _common.hasStartMatch)(options, chars)) {
        setActiveChars(chars);
        handleSelectIndexChange((0, _common.getStartMatchIndex)(options, chars) // let `handleSelectIndexChange` handle `(index !== selectIndex)`
        );
      } else {
        if ((0, _common.hasExactMatch)(options, char)) {
          setActiveChars(char);
          handleSelectIndexChange((0, _common.getExactMatchIndex)(options, char) // let `handleSelectIndexChange` handle `(index !== selectIndex)`
          );
        } else {
          if ((0, _common.hasStartMatch)(options, char)) {
            setActiveChars(char);
            handleSelectIndexChange((0, _common.getStartMatchIndex)(options, char) // let `handleSelectIndexChange` handle `(index !== selectIndex)`
            );
          } else {
            if ((0, _common.hasGreaterThanMatch)(options, char)) {
              setActiveChars('');
              handleSelectIndexChange((0, _common.getGreaterThanMatchIndex)(options, char) // let `handleSelectIndexChange` handle `(index !== selectIndex)`
              );
            }
          }
        }
      }
    }
  }, [activeChars, activeIndex, options, selectIndex]);
  var handleActiveOptionsKeyCode = (0, _react.useCallback)(function onActiveOptionsKeyCode(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 13:
        // [hasActiveOptions, activeIndex]
        handleKeyEnter(event);
        break;
      case 27:
        // [hasActiveOptions]
        handleKeyEscape(event);
        break;
      case 32:
        // [hasActiveOptions, activeIndex]
        handleKeySpace(event);
        break;
      case 38:
        // [activeIndex, lowerBound]
        handleKeyArrowUp(event);
        break;
      case 40:
        // [activeIndex, upperBound]
        handleKeyArrowDown(event);
        break;
    }
  }, [hasActiveOptions, activeIndex, selectIndex, upperBound, lowerBound]);
  var handleKeyCode = (0, _react.useCallback)(function onKeyCode(_ref4) {
    var keyCode = _ref4.keyCode;
    if (keyCode === 32 || keyCode === 38 || keyCode === 40) {
      // space or arrow up or arrow down
      setHasActiveOptions(true);
    }
  }, [hasActiveOptions]);
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
    onActiveEnterFocus: handleActiveEnterFocus,
    onFocus: handleFocus,
    onActiveEnterBlur: handleActiveEnterBlur,
    onBlur: handleBlur,
    onClick: handleClick,
    onActiveOptionsKeyPress: handleActiveOptionsKeyPress,
    onKeyPress: handleKeyPress,
    onActiveOptionsKeyUp: handleActiveOptionsKeyUp,
    onKeyUp: handleKeyUp,
    onActiveOptionsKeyDown: handleActiveOptionsKeyDown,
    onKeyDown: handleKeyDown
  }, children), /*#__PURE__*/_react.default.createElement(_Options.default, {
    activeOptionRef: activeOptionRef,
    optionsRef: optionsRef,
    options: options,
    selectIndex: selectIndex,
    activeIndex: activeIndex,
    hasActiveOptions: hasActiveOptions,
    onActiveIndexChange: handleActiveIndexChange,
    onActiveEnterChange: setActiveEnter,
    onOptionClick: handleOptionClick,
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