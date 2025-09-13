"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forward = forward;
exports.forwardByOptionText = forwardByOptionText;
exports.getExactMatch = getExactMatch;
exports.getExactMatchIndex = getExactMatchIndex;
exports.getGreaterThanMatch = getGreaterThanMatch;
exports.getGreaterThanMatchIndex = getGreaterThanMatchIndex;
exports.getSelectIndex = getSelectIndex;
exports.getSmallerThanMatch = getSmallerThanMatch;
exports.getSmallerThanMatchIndex = getSmallerThanMatchIndex;
exports.getStartMatch = getStartMatch;
exports.getStartMatchIndex = getStartMatchIndex;
exports.hasExactMatch = hasExactMatch;
exports.hasExactMatchFor = hasExactMatchFor;
exports.hasGreaterThanFor = hasGreaterThanFor;
exports.hasGreaterThanMatch = hasGreaterThanMatch;
exports.hasMatch = hasMatch;
exports.hasSmallerThanFor = hasSmallerThanFor;
exports.hasSmallerThanMatch = hasSmallerThanMatch;
exports.hasStartMatch = hasStartMatch;
exports.hasStartMatchFor = hasStartMatchFor;
exports.isEventClickLike = isEventClickLike;
exports.isKeyEnter = isKeyEnter;
exports.isKeySpace = isKeySpace;
exports.reverse = reverse;
exports.reverseByOptionText = reverseByOptionText;
exports.toOptionText = toOptionText;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.starts-with.js");
/**
 *  @typedef {object} OptionType
 *  @property {string} text
 */

var ENTER = 'Enter';
var SPACE = String.fromCharCode(32);

/**
 *  @param {{ key?: string }} event
 *  @returns {boolean}
 */
function isKeyEnter(_ref) {
  var key = _ref.key;
  return key === ENTER;
}

/**
 *  @param {{ key?: string }} event
 *  @returns {boolean}
 */
function isKeySpace(_ref2) {
  var key = _ref2.key;
  return key === SPACE;
}

/**
 *  'accesskey' events are raised as clicks with all-zero co-ordinates. All-zero
 *  coordinates are (of course) possible, but unlikely. This is a woolly way of
 *  identifying 'accesskey' events
 */
function isEventClickLike(_ref3) {
  var pageX = _ref3.pageX,
    pageY = _ref3.pageY,
    screenX = _ref3.screenX,
    screenY = _ref3.screenY;
  return !(pageX || pageY || screenX || screenY);
}

/**
 *  @param {string | number | boolean | null} [t]
 *  @returns {string}
 */
function toOptionText(t) {
  return t !== undefined ? String(t) : "\uFEFF";
}

/**
 *  @param {string} alpha
 *  @param {omega} omega
 *  @returns {number}
 */
function forward(alpha, omega) {
  return alpha < omega ? -1 : alpha > omega ? 1 : 0;
}

/**
 *  @param {string} alpha
 *  @param {omega} omega
 *  @returns {number}
 */
function reverse(alpha, omega) {
  return alpha < omega ? 1 : alpha > omega ? -1 : 0;
}

/**
 *  @param {OptionType} alpha
 *  @param {OptionType} omega
 *  @returns {number}
 */
function forwardByOptionText(_ref4, _ref5) {
  var alpha = _ref4.text;
  var omega = _ref5.text;
  return forward(toOptionText(alpha).toLowerCase(), toOptionText(omega).toLowerCase());
}

/**
 *  @param {OptionType} alpha
 *  @param {OptionType} omega
 *  @returns {number}
 */
function reverseByOptionText(_ref6, _ref7) {
  var alpha = _ref6.text;
  var omega = _ref7.text;
  return reverse(toOptionText(alpha).toLowerCase(), toOptionText(omega).toLowerCase());
}

/**
 *  @param {string} chars
 *  @returns {(option: OptionType) => boolean}
 */
function hasExactMatchFor(chars) {
  return function isMatch(_ref8) {
    var text = _ref8.text;
    return toOptionText(text).toLowerCase() === chars // `chars` is lower case
    ;
  };
}

/**
 *  @param {string} chars
 *  @returns {(option: OptionType) => boolean}
 */
function hasStartMatchFor(chars) {
  return function isMatch(_ref9) {
    var text = _ref9.text;
    return toOptionText(text).toLowerCase().startsWith(chars) // `chars` is lower case
    ;
  };
}

/**
 *  @param {string} alpha
 *  @returns {(omega: string) => boolean}
 */
function hasMatch(alpha) {
  return function isMatch(omega) {
    return alpha === omega;
  };
}

/**
 *  @param {string} chars
 *  @returns {(option: OptionType) => boolean}
 */
function hasGreaterThanFor(chars) {
  return function isGreaterThan(_ref0) {
    var text = _ref0.text;
    return (
      // find in the duplicated, sorted array
      toOptionText(text).toLowerCase() // the smallest match greater than the chars?
      .localeCompare(chars) > 0
    );
  };
}

/**
 *  @param {string} chars
 *  @returns {(option: OptionType) => boolean}
 */
function hasSmallerThanFor(chars) {
  return function isSmallerThan(_ref1) {
    var text = _ref1.text;
    return (
      // find in the duplicated, sorted array
      toOptionText(text).toLowerCase() // the largest match smaller than the chars?
      .localeCompare(chars) < 0
    );
  };
}

/**
 *  Matches exactly
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {OptionType}
 */
function getExactMatch(options, chars) {
  return options.find(hasExactMatchFor(chars));
}

/**
 *  Matches exactly
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {boolean}
 */
function hasExactMatch(options, chars) {
  return options.some(hasExactMatchFor(chars));
}

/**
 *  Matches exactly
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {number}
 */
function getExactMatchIndex(options, chars) {
  return options.findIndex(hasMatch(getExactMatch(options, chars)));
}

/**
 *  Match from the start of the string
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {OptionType}
 */
function getStartMatch(options, chars) {
  return options.find(hasStartMatchFor(chars));
}

/**
 *  Match from the start of the string
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {boolean}
 */
function hasStartMatch(options, chars) {
  return options.some(hasStartMatchFor(chars));
}

/**
 *  Match from the start of the string
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {number}
 */
function getStartMatchIndex(options, chars) {
  return options.findIndex(hasMatch(getStartMatch(options, chars)));
}

/**
 *  Find the the smallest match greater than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {OptionType}
 */
function getGreaterThanMatch(options, chars) {
  return options.find(hasGreaterThanFor(chars));
}

/**
 *  Find the the smallest match greater than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {boolean}
 */
function hasGreaterThanMatch(options, chars) {
  return options.some(hasGreaterThanFor(chars));
}

/**
 *  Find the the smallest match greater than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {number}
 */
function getGreaterThanMatchIndex(options, chars) {
  var forwardOptions = options.toSorted(forwardByOptionText);
  return options.findIndex(hasMatch(getGreaterThanMatch(forwardOptions, chars)));
}

/**
 *  Find the the largest match smaller than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {OptionType}
 */
function getSmallerThanMatch(options, chars) {
  return options.find(hasSmallerThanFor(chars));
}

/**
 *  Find the the largest match smaller than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {boolean}
 */
function hasSmallerThanMatch(options, chars) {
  return options.some(hasSmallerThanFor(chars));
}

/**
 *  Find the the largest match smaller than the chars!
 *
 *  @param {OptionType[]} options
 *  @param {string} chars
 *  @returns {number}
 */
function getSmallerThanMatchIndex(options, chars) {
  var reverseOptions = options.toSorted(reverseByOptionText);
  return options.findIndex(hasMatch(getSmallerThanMatch(reverseOptions, chars)));
}

/**
 *  @param {{ index?: number, defaultIndex?: number }} props
 *  @returns {number | NaN}
 */
function getSelectIndex(_ref10) {
  var index = _ref10.index,
    defaultIndex = _ref10.defaultIndex;
  var i = Number(index);
  if (!isNaN(i)) return i;else {
    var d = Number(defaultIndex);
    if (!isNaN(d)) return d;
  }
  return NaN;
}