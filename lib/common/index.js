"use strict";

require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGreaterThanMatchIndex = exports.getGreaterThanMatch = exports.getExactMatchIndex = exports.getExactMatch = exports.forwardByOptionText = exports.forward = exports.exactMatchFor = void 0;
exports.getSelectIndex = getSelectIndex;
exports.toOptionText = exports.startMatchFor = exports.smallerThanFor = exports.reverseByOptionText = exports.reverse = exports.match = exports.isKeySpace = exports.isKeyEnter = exports.isEventClickLike = exports.hasStartMatch = exports.hasSmallerThanMatch = exports.hasGreaterThanMatch = exports.hasExactMatch = exports.greaterThanFor = exports.getStartMatchIndex = exports.getStartMatch = exports.getSmallerThanMatchIndex = exports.getSmallerThanMatch = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.starts-with.js");
var ENTER = 'Enter';
var SPACE = String.fromCharCode(32);
var isKeyEnter = exports.isKeyEnter = function isKeyEnter(_ref) {
  var key = _ref.key;
  return key === ENTER;
};
var isKeySpace = exports.isKeySpace = function isKeySpace(_ref2) {
  var key = _ref2.key;
  return key === SPACE;
};

/**
 *  'accesskey' events are raised as clicks with all-zero co-ordinates. All-zero
 *  coordinates are (of course) possible, but unlikely. This is a woolly way of
 *  identifying 'accesskey' events
 */
var isEventClickLike = exports.isEventClickLike = function isEventClickLike(_ref3) {
  var pageX = _ref3.pageX,
    pageY = _ref3.pageY,
    screenX = _ref3.screenX,
    screenY = _ref3.screenY;
  return !(pageX || pageY || screenX || screenY);
};
var toOptionText = exports.toOptionText = function toOptionText(t) {
  return t !== undefined ? String(t) : "\uFEFF";
};
var forward = exports.forward = function forward(alpha, omega) {
  return alpha < omega ? -1 : alpha > omega ? 1 : 0;
};
var reverse = exports.reverse = function reverse(alpha, omega) {
  return alpha < omega ? 1 : alpha > omega ? -1 : 0;
};
var forwardByOptionText = exports.forwardByOptionText = function forwardByOptionText(_ref4, _ref5) {
  var alpha = _ref4.text;
  var omega = _ref5.text;
  return forward(toOptionText(alpha).toLowerCase(), toOptionText(omega).toLowerCase());
};
var reverseByOptionText = exports.reverseByOptionText = function reverseByOptionText(_ref6, _ref7) {
  var alpha = _ref6.text;
  var omega = _ref7.text;
  return reverse(toOptionText(alpha).toLowerCase(), toOptionText(omega).toLowerCase());
};
var exactMatchFor = exports.exactMatchFor = function exactMatchFor(chars) {
  return function (_ref8) {
    var text = _ref8.text;
    return toOptionText(text).toLowerCase() === chars // `chars` is lower case
    ;
  };
};
var startMatchFor = exports.startMatchFor = function startMatchFor(chars) {
  return function (_ref9) {
    var text = _ref9.text;
    return toOptionText(text).toLowerCase().startsWith(chars) // `chars` is lower case
    ;
  };
};
var match = exports.match = function match(alpha) {
  return function (omega) {
    return alpha === omega;
  };
};
var greaterThanFor = exports.greaterThanFor = function greaterThanFor(chars) {
  return function (_ref0) {
    var text = _ref0.text;
    return (
      // find in the duplicated, sorted array
      toOptionText(text).toLowerCase() // the smallest match greater than the chars?
      .localeCompare(chars) > 0
    );
  };
};
var smallerThanFor = exports.smallerThanFor = function smallerThanFor(chars) {
  return function (_ref1) {
    var text = _ref1.text;
    return (
      // find in the duplicated, sorted array
      toOptionText(text).toLowerCase() // the largest match smaller than the chars?
      .localeCompare(chars) < 0
    );
  };
};

/**
 *  Matches exactly
 */
var getExactMatch = exports.getExactMatch = function getExactMatch(options, chars) {
  return options.find(exactMatchFor(chars));
};

/**
 *  Matches exactly
 */
var hasExactMatch = exports.hasExactMatch = function hasExactMatch(options, chars) {
  return options.some(exactMatchFor(chars));
};

/**
 *  Matches exactly
 */
var getExactMatchIndex = exports.getExactMatchIndex = function getExactMatchIndex(options, chars) {
  return options.findIndex(match(getExactMatch(options, chars)));
};

/**
 *  Match from the start of the string
 */
var getStartMatch = exports.getStartMatch = function getStartMatch(options, chars) {
  return options.find(startMatchFor(chars));
};

/**
 *  Match from the start of the string
 */
var hasStartMatch = exports.hasStartMatch = function hasStartMatch(options, chars) {
  return options.some(startMatchFor(chars));
};

/**
 *  Match from the start of the string
 */
var getStartMatchIndex = exports.getStartMatchIndex = function getStartMatchIndex(options, chars) {
  return options.findIndex(match(getStartMatch(options, chars)));
};

/**
 *  Find the the smallest match greater than the chars!
 */
var getGreaterThanMatch = exports.getGreaterThanMatch = function getGreaterThanMatch(options, chars) {
  return options.find(greaterThanFor(chars));
};

/**
 *  Find the the smallest match greater than the chars!
 */
var hasGreaterThanMatch = exports.hasGreaterThanMatch = function hasGreaterThanMatch(options, chars) {
  return options.some(greaterThanFor(chars));
};
var getGreaterThanMatchIndex = exports.getGreaterThanMatchIndex = function getGreaterThanMatchIndex(options, chars) {
  return options.findIndex(match(getGreaterThanMatch(Array.from(options).sort(forwardByOptionText), chars)));
};

/**
 *  Find the the largest match smaller than the chars!
 */
var getSmallerThanMatch = exports.getSmallerThanMatch = function getSmallerThanMatch(options, chars) {
  return options.find(smallerThanFor(chars));
};

/**
 *  Find the the largest match smaller than the chars!
 */
var hasSmallerThanMatch = exports.hasSmallerThanMatch = function hasSmallerThanMatch(options, chars) {
  return options.some(smallerThanFor(chars));
};
var getSmallerThanMatchIndex = exports.getSmallerThanMatchIndex = function getSmallerThanMatchIndex(options, chars) {
  return options.findIndex(match(getSmallerThanMatch(Array.from(options).sort(reverseByOptionText), chars)));
};
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