"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Disabled;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _SelectedOptionDisabled = _interopRequireDefault(require("./SelectedOptionDisabled"));
var _OptionsDisabled = _interopRequireDefault(require("./OptionsDisabled"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Disabled(_ref) {
  var selectOptionRef = _ref.selectOptionRef,
    optionsRef = _ref.optionsRef,
    activeOptionRef = _ref.activeOptionRef,
    options = _ref.options,
    selectIndex = _ref.selectIndex,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    activeIndex = _ref.activeIndex,
    id = _ref.id;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "react-select-element disabled",
    "aria-expanded": false,
    "aria-haspopup": "listbox",
    "aria-controls": id
  }, /*#__PURE__*/_react.default.createElement(_SelectedOptionDisabled.default, {
    selectOptionRef: selectOptionRef,
    options: options,
    selectIndex: selectIndex
  }, children), /*#__PURE__*/_react.default.createElement(_OptionsDisabled.default, {
    optionsRef: optionsRef,
    activeOptionRef: activeOptionRef,
    options: options,
    selectIndex: selectIndex,
    activeIndex: activeIndex,
    id: id
  }));
}
Disabled.propTypes = {
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
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    text: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool])
  })).isRequired,
  selectIndex: _propTypes.default.number.isRequired,
  activeIndex: _propTypes.default.number.isRequired,
  children: _propTypes.default.node
};