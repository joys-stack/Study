(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["exercise"] = factory();
	else
		root["exercise"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
var add = function add(a, b) {
  return a + b;
};

console.log(add(10, 15));
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=exercise.js.map