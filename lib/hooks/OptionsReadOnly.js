"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OptionsReadOnly;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _OptionReadOnly = _interopRequireDefault(require("./OptionReadOnly"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function OptionsReadOnly(_ref) {
  var options = _ref.options,
    optionsRef = _ref.optionsRef,
    activeOptionRef = _ref.activeOptionRef,
    selectIndex = _ref.selectIndex,
    activeIndex = _ref.activeIndex,
    id = _ref.id;
  if (options.length) {
    return /*#__PURE__*/_react.default.createElement("ul", {
      ref: optionsRef,
      className: "options",
      role: "listbox",
      "aria-hidden": true,
      id: id
    }, options.map(function (option, index) {
      return /*#__PURE__*/_react.default.createElement(_OptionReadOnly.default, {
        activeOptionRef: activeOptionRef,
        option: option,
        index: index,
        selectIndex: selectIndex,
        activeIndex: activeIndex,
        key: index
      });
    }));
  }
}
OptionsReadOnly.propTypes = {
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
  id: _propTypes.default.string.isRequired
};