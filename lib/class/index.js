"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _nanoid = require("nanoid");
var _classnames = _interopRequireDefault(require("classnames"));
var _common = require("#common");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SelectElement = exports.default = /*#__PURE__*/function (_Component) {
  function SelectElement(props) {
    var _this;
    _classCallCheck(this, SelectElement);
    _this = _callSuper(this, SelectElement, [props]);
    _defineProperty(_this, "handleFocus", function () {
      var selectIndex = _this.state.selectIndex;
      _this.activeIndex(selectIndex);
    });
    _defineProperty(_this, "handleBlur", function () {
      _this.setState({
        hasActiveOptions: false
      });
    });
    _defineProperty(_this, "handleMouseEnter", function () {
      _this.setState({
        activeEnter: true
      });
    });
    _defineProperty(_this, "handleMouseLeave", function () {
      _this.setState({
        activeEnter: false
      });
    });
    _defineProperty(_this, "handleActiveEnterFocus", function () {
      return true;
    });
    _defineProperty(_this, "handleActiveEnterBlur", function () {
      _this.getSelectOption().focus();
    });
    _defineProperty(_this, "handleClick", function (event) {
      if ((0, _common.isEventClickLike)(event)) {
        // it's probably an accessKey event
        _this.getSelectOption().focus();
      } else {
        // it's probably a mouse click
        _this.setState({
          hasActiveOptions: true
        });
      }
    });
    _defineProperty(_this, "handleOptionClick", function (index) {
      _this.setState({
        hasActiveOptions: false
      });
      _this.selectIndex(index);
      _this.getSelectOption().focus();
    });
    _defineProperty(_this, "handleActiveOptionsKeyPress", function (event) {
      if ((0, _common.isKeyEnter)(event) || (0, _common.isKeySpace)(event)) return;
      return _this.handleActiveOptionsKeyChar(event);
    });
    _defineProperty(_this, "handleKeyPress", function (event) {
      return _this.handleKeyChar(event);
    });
    _defineProperty(_this, "handleActiveOptionsKeyUp", function (event) {
      return _this.handleActiveOptionsKeyCode(event);
    });
    _defineProperty(_this, "handleActiveOptionsKeyDown", function () {
      return true;
    });
    _defineProperty(_this, "handleKeyUp", function (event) {
      return _this.handleKeyCode(event);
    });
    _defineProperty(_this, "handleKeyDown", function () {
      return true;
    });
    _defineProperty(_this, "getOptionRef", function (index) {
      var activeIndex = _this.state.activeIndex;
      if (index === activeIndex) {
        return _this.activeOption;
      }
    });
    _defineProperty(_this, "renderOptionDisabled", function (option, index) {
      var optionText = _this.renderOptionText(option, index);
      var selectIndex = _this.state.selectIndex;
      return /*#__PURE__*/_react.default.createElement("li", {
        key: index,
        ref: _this.getOptionRef(index),
        className: _this.getOptionDisabledClassName(index),
        role: "option",
        "aria-selected": index === selectIndex
      }, optionText);
    });
    _defineProperty(_this, "renderOptionReadOnly", function (option, index) {
      var optionText = _this.renderOptionText(option, index);
      var selectIndex = _this.state.selectIndex;
      return /*#__PURE__*/_react.default.createElement("li", {
        key: index,
        ref: _this.getOptionRef(index),
        className: _this.getOptionReadOnlyClassName(index),
        role: "option",
        "aria-selected": index === selectIndex
      }, optionText);
    });
    _defineProperty(_this, "renderOption", function (option, index) {
      var optionText = _this.renderOptionText(option, index);
      var selectIndex = _this.state.selectIndex;
      var handleMouse = function handleMouse() {
        return _this.activeIndex(index);
      };
      return /*#__PURE__*/_react.default.createElement("li", {
        key: index,
        ref: _this.getOptionRef(index),
        className: _this.getOptionClassName(index),
        onMouseEnter: handleMouse,
        onMouseLeave: handleMouse,
        onClick: function onClick() {
          return _this.handleOptionClick(index);
        },
        role: "option",
        "aria-selected": index === selectIndex
      }, optionText);
    });
    _this.selectOption = /*#__PURE__*/(0, _react.createRef)();
    _this.options = /*#__PURE__*/(0, _react.createRef)();
    _this.activeOption = /*#__PURE__*/(0, _react.createRef)();
    var id = props.id;
    _this.state = {
      id: id || (0, _nanoid.nanoid)(),
      selectIndex: (0, _common.getSelectIndex)(props),
      hasActiveOptions: false,
      activeEnter: false,
      activeIndex: 0,
      activeChars: ''
    };
    return _this;
  }
  _inherits(SelectElement, _Component);
  return _createClass(SelectElement, [{
    key: "upperBound",
    get: function get() {
      var _this$props$options = this.props.options,
        _this$props$options2 = _this$props$options === void 0 ? [] : _this$props$options,
        n = _this$props$options2.length;
      return Math.max(0, n - 1);
    }
  }, {
    key: "lowerBound",
    get: function get() {
      return 0;
    }
  }, {
    key: "scrollOptionIntoView",
    value: function scrollOptionIntoView(element) {
      if (element) {
        var options = this.getOptions();
        if (options.contains(element)) {
          var clientHeight = options.clientHeight;
          var offsetHeight = element.offsetHeight,
            offsetTop = element.offsetTop;
          var i = clientHeight / 2;
          var j = offsetHeight / 2;
          var n = Math.max(0, offsetTop - i + j);
          if (n !== options.scrollTop) options.scrollTop = n;
        }
      }
    }
  }, {
    key: "toLowerBound",
    value: function toLowerBound() {
      this.setState({
        activeIndex: this.lowerBound
      });
    }
  }, {
    key: "toUpperBound",
    value: function toUpperBound() {
      this.setState({
        activeIndex: this.upperBound
      });
    }
  }, {
    key: "handleKeySpace",
    value: function handleKeySpace() {
      this.setState({
        hasActiveOptions: false
      });
      var activeIndex = this.state.activeIndex;
      this.selectIndex(activeIndex);
    }
  }, {
    key: "handleKeyEnter",
    value: function handleKeyEnter() {
      this.setState({
        hasActiveOptions: false
      });
      var activeIndex = this.state.activeIndex;
      this.selectIndex(activeIndex);
    }
  }, {
    key: "handleKeyEscape",
    value: function handleKeyEscape() {
      this.setState({
        hasActiveOptions: false
      });
    }
  }, {
    key: "handleKeyArrowUp",
    value: function handleKeyArrowUp() {
      this.decrementActiveIndex();
      this.setState({
        activeChars: ''
      });
    }
  }, {
    key: "handleKeyArrowDown",
    value: function handleKeyArrowDown() {
      this.incrementActiveIndex();
      this.setState({
        activeChars: ''
      });
    }
  }, {
    key: "handleActiveOptionsKeyChar",
    value: function handleActiveOptionsKeyChar(_ref) {
      var keyChar = _ref.charCode;
      var activeChars = this.state.activeChars;
      var _this$props$options3 = this.props.options,
        options = _this$props$options3 === void 0 ? [] : _this$props$options3;
      var char = String.fromCharCode(keyChar).toLowerCase();
      var chars = activeChars + char;

      /*
       *  activeIndex()
       */
      if ((0, _common.hasExactMatch)(options, chars)) {
        this.setState({
          activeChars: chars
        });
        this.activeIndex((0, _common.getExactMatchIndex)(options, chars));
      } else {
        if ((0, _common.hasStartMatch)(options, chars)) {
          this.setState({
            activeChars: chars
          });
          this.activeIndex((0, _common.getStartMatchIndex)(options, chars));
        } else {
          if ((0, _common.hasExactMatch)(options, char)) {
            this.setState({
              activeChars: char
            });
            this.activeIndex((0, _common.getExactMatchIndex)(options, char));
          } else {
            if ((0, _common.hasStartMatch)(options, char)) {
              this.setState({
                activeChars: char
              });
              this.activeIndex((0, _common.getStartMatchIndex)(options, char));
            } else {
              if ((0, _common.hasGreaterThanMatch)(options, char)) {
                this.setState({
                  activeChars: ''
                });
                this.activeIndex((0, _common.getGreaterThanMatchIndex)(options, char));
              } else {
                if ((0, _common.hasSmallerThanMatch)(options, char)) {
                  this.setState({
                    activeChars: ''
                  });
                  this.activeIndex((0, _common.getSmallerThanMatchIndex)(options, char));
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: "handleKeyChar",
    value: function handleKeyChar(_ref2) {
      var keyChar = _ref2.charCode;
      var activeChars = this.state.activeChars;
      var _this$props$options4 = this.props.options,
        options = _this$props$options4 === void 0 ? [] : _this$props$options4;
      var char = String.fromCharCode(keyChar).toLowerCase();
      var chars = activeChars + char;

      /*
       *  selectIndex()
       */
      if ((0, _common.hasExactMatch)(options, chars)) {
        this.setState({
          activeChars: chars
        });
        this.selectIndex((0, _common.getExactMatchIndex)(options, chars));
      } else {
        if ((0, _common.hasStartMatch)(options, chars)) {
          this.setState({
            activeChars: chars
          });
          this.selectIndex((0, _common.getStartMatchIndex)(options, chars));
        } else {
          if ((0, _common.hasExactMatch)(options, char)) {
            this.setState({
              activeChars: char
            });
            this.selectIndex((0, _common.getExactMatchIndex)(options, char));
          } else {
            if ((0, _common.hasStartMatch)(options, char)) {
              this.setState({
                activeChars: char
              });
              this.selectIndex((0, _common.getStartMatchIndex)(options, char));
            } else {
              if ((0, _common.hasGreaterThanMatch)(options, char)) {
                this.setState({
                  activeChars: ''
                });
                this.selectIndex((0, _common.getGreaterThanMatchIndex)(options, char));
              }
            }
          }
        }
      }
    }
  }, {
    key: "handleActiveOptionsKeyCode",
    value: function handleActiveOptionsKeyCode(event) {
      var keyCode = event.keyCode;
      switch (keyCode) {
        case 13:
          this.handleKeyEnter(event);
          break;
        case 27:
          this.handleKeyEscape(event);
          break;
        case 32:
          this.handleKeySpace(event);
          break;
        case 38:
          this.handleKeyArrowUp(event);
          break;
        case 40:
          this.handleKeyArrowDown(event);
          break;
      }
    }
  }, {
    key: "handleKeyCode",
    value: function handleKeyCode(_ref3) {
      var keyCode = _ref3.keyCode;
      if (keyCode === 32 || keyCode === 38 || keyCode === 40) {
        // space or arrow up or arrow down
        this.setState({
          hasActiveOptions: true
        });
      }
    }
  }, {
    key: "selectIndex",
    value: function selectIndex(index) {
      var selectIndex = this.state.selectIndex;

      /*
       * Is the index different to the index stored in state?
       */
      if (index !== selectIndex) {
        var onChange = this.props.onChange;

        /*
         *  Always invoke 'onChange' if it is available
         */
        if (onChange instanceof Function) onChange(index);

        /*
         *  Exit if 'index' is a prop. The component is not managing state
         */
        if ('index' in this.props) return;

        /*
         *  Otherwise, update the state
         */
        this.setState({
          selectIndex: index
        });
      }
    }
  }, {
    key: "activeIndex",
    value: function activeIndex(index) {
      var activeIndex = this.state.activeIndex;
      if (index !== activeIndex) {
        this.setState({
          activeIndex: index
        });
      }
    }
  }, {
    key: "decrementActiveIndex",
    value: function decrementActiveIndex() {
      var activeIndex = this.state.activeIndex;
      this.activeIndex(Math.max(activeIndex - 1, this.lowerBound));
    }
  }, {
    key: "incrementActiveIndex",
    value: function incrementActiveIndex() {
      var activeIndex = this.state.activeIndex;
      this.activeIndex(Math.min(activeIndex + 1, this.upperBound));
    }
  }, {
    key: "getSelectOption",
    value: function getSelectOption() {
      return this.selectOption.current;
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.options.current;
    }
  }, {
    key: "getActiveOption",
    value: function getActiveOption() {
      return this.activeOption.current;
    }
  }, {
    key: "getOptionsFirstChild",
    value: function getOptionsFirstChild() {
      return this.getOptions().firstChild || null;
    }
  }, {
    key: "getOptionsLastChild",
    value: function getOptionsLastChild() {
      return this.getOptions().lastChild || null;
    }
  }, {
    key: "getActiveOptionPreviousSibling",
    value: function getActiveOptionPreviousSibling() {
      return this.getActiveOption().previousSibling || null;
    }
  }, {
    key: "getActiveOptionNextSibling",
    value: function getActiveOptionNextSibling() {
      return this.getActiveOption().nextSibling || null;
    }
  }, {
    key: "getSelectedOptionDisabledClassName",
    value: function getSelectedOptionDisabledClassName() {
      return 'selected-option';
    }
  }, {
    key: "getSelectedOptionReadOnlyClassName",
    value: function getSelectedOptionReadOnlyClassName(index) {
      return 'selected-option';
    }
  }, {
    key: "getSelectedOptionClassName",
    value: function getSelectedOptionClassName() {
      return 'selected-option';
    }
  }, {
    key: "getSelectedOption",
    value: function getSelectedOption() {
      var _this$props$options5 = this.props.options,
        options = _this$props$options5 === void 0 ? [] : _this$props$options5;
      var selectIndex = this.state.selectIndex;
      return options[selectIndex] || {};
    }
  }, {
    key: "getOptionDisabledClassName",
    value: function getOptionDisabledClassName(index) {
      var selectIndex = this.state.selectIndex;
      return (0, _classnames.default)({
        selected: index === selectIndex
      }, 'option');
    }
  }, {
    key: "getOptionReadOnlyClassName",
    value: function getOptionReadOnlyClassName(index) {
      var selectIndex = this.state.selectIndex;
      return (0, _classnames.default)({
        selected: index === selectIndex
      }, 'option');
    }
  }, {
    key: "getOptionClassName",
    value: function getOptionClassName(index) {
      var _this$state = this.state,
        selectIndex = _this$state.selectIndex,
        activeIndex = _this$state.activeIndex;
      return (0, _classnames.default)({
        selected: index === selectIndex
      }, 'option', {
        active: index === activeIndex
      });
    }
  }, {
    key: "getOptionsClassName",
    value: function getOptionsClassName() {
      var hasActiveOptions = this.state.hasActiveOptions;
      return (0, _classnames.default)('options', {
        active: hasActiveOptions
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(props, state) {
      if (props !== this.props) return true;
      return state.selectIndex !== this.state.selectIndex || state.hasActiveOptions !== this.state.hasActiveOptions || state.activeEnter !== this.state.activeEnter || state.activeIndex !== this.state.activeIndex;
    }
  }, {
    key: "renderSelectedOptionText",
    value: function renderSelectedOptionText(_ref4) {
      var text = _ref4.text;
      return (0, _common.toOptionText)(text);
    }
  }, {
    key: "renderSelectedOptionDisabled",
    value: function renderSelectedOptionDisabled() {
      var children = this.props.children;
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: this.selectOption,
        className: this.getSelectedOptionDisabledClassName()
      }, children || this.renderSelectedOptionText(this.getSelectedOption()));
    }
  }, {
    key: "renderSelectedOptionReadOnly",
    value: function renderSelectedOptionReadOnly() {
      var children = this.props.children;
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: this.selectOption,
        className: this.getSelectedOptionReadOnlyClassName()
      }, children || this.renderSelectedOptionText(this.getSelectedOption()));
    }
  }, {
    key: "renderSelectedOption",
    value: function renderSelectedOption() {
      var _this$props = this.props,
        accessKey = _this$props.accessKey,
        _this$props$tabIndex = _this$props.tabIndex,
        tabIndex = _this$props$tabIndex === void 0 ? 0 : _this$props$tabIndex,
        children = _this$props.children;
      var _this$state2 = this.state,
        activeEnter = _this$state2.activeEnter,
        hasActiveOptions = _this$state2.hasActiveOptions;
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: this.selectOption,
        accessKey: accessKey,
        tabIndex: tabIndex,
        className: this.getSelectedOptionClassName(),
        onFocus: activeEnter ? this.handleActiveEnterFocus : this.handleFocus,
        onBlur: activeEnter ? this.handleActiveEnterBlur : this.handleBlur,
        onClick: this.handleClick,
        onKeyPress: hasActiveOptions ? this.handleActiveOptionsKeyPress : this.handleKeyPress,
        onKeyUp: hasActiveOptions ? this.handleActiveOptionsKeyUp : this.handleKeyUp,
        onKeyDown: hasActiveOptions ? this.handleActiveOptionsKeyDown : this.handleKeyDown
      }, children || this.renderSelectedOptionText(this.getSelectedOption()));
    }
  }, {
    key: "renderOptionText",
    value: function renderOptionText(_ref5) /* (option, index) */{
      var text = _ref5.text;
      return (0, _common.toOptionText)(text);
    }
  }, {
    key: "renderOptionsDisabled",
    value: function renderOptionsDisabled() {
      var _this$props$options6 = this.props.options,
        options = _this$props$options6 === void 0 ? [] : _this$props$options6;
      if (options.length) {
        var id = this.state.id;
        return /*#__PURE__*/_react.default.createElement("ul", {
          ref: this.options,
          className: "options",
          role: "listbox",
          "aria-hidden": true,
          id: id
        }, options.map(this.renderOptionDisabled));
      }
    }
  }, {
    key: "renderOptionsReadOnly",
    value: function renderOptionsReadOnly() {
      var _this$props$options7 = this.props.options,
        options = _this$props$options7 === void 0 ? [] : _this$props$options7;
      if (options.length) {
        var id = this.state.id;
        return /*#__PURE__*/_react.default.createElement("ul", {
          ref: this.options,
          className: "options",
          role: "listbox",
          "aria-hidden": true,
          id: id
        }, options.map(this.renderOptionReadOnly));
      }
    }
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      var _this$props$options8 = this.props.options,
        options = _this$props$options8 === void 0 ? [] : _this$props$options8;
      if (options.length) {
        var _this$state3 = this.state,
          hasActiveOptions = _this$state3.hasActiveOptions,
          id = _this$state3.id;
        return /*#__PURE__*/_react.default.createElement("ul", {
          ref: this.options,
          className: this.getOptionsClassName(),
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          role: "listbox",
          "aria-hidden": !hasActiveOptions,
          id: id
        }, options.map(this.renderOption));
      }
    }
  }, {
    key: "renderDisabled",
    value: function renderDisabled() {
      var id = this.state.id;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "react-select-element disabled",
        "aria-expanded": false,
        "aria-haspopup": "listbox",
        "aria-controls": id
      }, this.renderSelectedOptionDisabled(), this.renderOptionsDisabled());
    }
  }, {
    key: "renderReadOnly",
    value: function renderReadOnly() {
      var id = this.state.id;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "react-select-element readonly",
        "aria-expanded": false,
        "aria-haspopup": "listbox",
        "aria-controls": id
      }, this.renderSelectedOptionReadOnly(), this.renderOptionsReadOnly());
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$disabled = this.props.disabled,
        disabled = _this$props$disabled === void 0 ? false : _this$props$disabled;
      if (disabled) {
        return this.renderDisabled();
      }
      var _this$props$readOnly = this.props.readOnly,
        readOnly = _this$props$readOnly === void 0 ? false : _this$props$readOnly;
      if (readOnly) {
        return this.renderReadOnly();
      }
      var _this$state4 = this.state,
        hasActiveOptions = _this$state4.hasActiveOptions,
        id = _this$state4.id;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "react-select-element",
        "aria-expanded": hasActiveOptions,
        "aria-haspopup": "listbox",
        "aria-controls": id
      }, this.renderSelectedOption(), this.renderOptions());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      return 'index' in props ? {
        selectIndex: (0, _common.getSelectIndex)(props)
      } : null;
    }
  }]);
}(_react.Component);
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