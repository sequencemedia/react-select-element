"use strict";function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj;}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;},_typeof(obj);}require("core-js/modules/es.array.iterator.js");require("core-js/modules/es.object.to-string.js");require("core-js/modules/es.string.iterator.js");require("core-js/modules/es.weak-map.js");require("core-js/modules/web.dom-collections.iterator.js");require("core-js/modules/es.object.get-own-property-descriptor.js");require("core-js/modules/es.symbol.js");require("core-js/modules/es.symbol.description.js");require("core-js/modules/es.symbol.iterator.js");Object.defineProperty(exports,"__esModule",{value:true});exports.default=SelectedOptionDisabled;var _react=_interopRequireWildcard(require("react"));var _propTypes=_interopRequireDefault(require("prop-types"));var _index=require("../common/index.js");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _getRequireWildcardCache(nodeInterop){if(typeof WeakMap!=="function")return null;var cacheBabelInterop=new WeakMap();var cacheNodeInterop=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule){return obj;}if(obj===null||_typeof(obj)!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(key!=="default"&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}function SelectedOptionDisabled(_ref){var selectOptionRef=_ref.selectOptionRef,options=_ref.options,selectIndex=_ref.selectIndex,children=_ref.children;var _useMemo=(0,_react.useMemo)(function(){return options[selectIndex]||{};},[options,selectIndex]),text=_useMemo.text;return _react.default.createElement("div",{ref:selectOptionRef,className:"selected-option"},children||(0,_index.toOptionText)(text));}SelectedOptionDisabled.propTypes={selectOptionRef:_propTypes.default.oneOfType([_propTypes.default.func,_propTypes.default.shape({current:_propTypes.default.shape()})]).isRequired,options:_propTypes.default.arrayOf(_propTypes.default.shape({text:_propTypes.default.oneOfType([_propTypes.default.number,_propTypes.default.string,_propTypes.default.bool])})).isRequired,selectIndex:_propTypes.default.number.isRequired,children:_propTypes.default.node};