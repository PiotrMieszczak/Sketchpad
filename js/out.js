/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("$(document).ready(()=>{\n\n        const canvas= document.querySelector('#canvas');\n        canvas.width = window.innerWidth;\n        canvas.height = window.innerHeight;\n\n        let ctx = canvas.getContext('2d');\n    \n   \n    // ctx.beginPath();\n    // ctx.moveTo(50,50); \n    // ctx.lineTo(300, 100);\n    // ctx.lineTo(400, 300);\n    // ctx.stroke(); //rysuje zewnetrzny obrys kształtu ; fill() <- wypełnia kształt\n\n    let paint= false; //true jezeli mysz jest nacisnieta\n    let radius = 5;\n    ctx.lineWidth = radius*2;\n\n    \n    \n    let engage = ( (e)=>{\n        paint = true;\n    })\n\n    let disangage = ( (e)=>{\n        paint = false;\n        ctx.beginPath(); //konczy punkt\n    })\n\n    let draw = ( e=>{\n        if(paint){ //if paint = true, czyli jezeli myszka jest nacisnieta rysuj linie\n            //console.log('X',e.clientX,'Y:',e.clientY)\n            ctx.lineTo(e.clientX, e.clientY-40)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(e.clientX, e.clientY-40, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(e.clientX,e.clientY-40)\n           \n        }\n    })\n\n    $('canvas').mousemove(draw);\n    $('canvas').mousedown(engage);\n    $('canvas').mouseup(disangage);\n\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0EseUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHFDQUFxQzs7QUFFekQscUJBQXFCO0FBQ3JCO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLEtBQUs7O0FBRUw7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLENBQUMiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KCgpPT57XG5cbiAgICAgICAgY29uc3QgY2FudmFzPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBcbiAgIFxuICAgIC8vIGN0eC5iZWdpblBhdGgoKTtcbiAgICAvLyBjdHgubW92ZVRvKDUwLDUwKTsgXG4gICAgLy8gY3R4LmxpbmVUbygzMDAsIDEwMCk7XG4gICAgLy8gY3R4LmxpbmVUbyg0MDAsIDMwMCk7XG4gICAgLy8gY3R4LnN0cm9rZSgpOyAvL3J5c3VqZSB6ZXduZXRyem55IG9icnlzIGtzenRhxYJ0dSA7IGZpbGwoKSA8LSB3eXBlxYJuaWEga3N6dGHFgnRcblxuICAgIGxldCBwYWludD0gZmFsc2U7IC8vdHJ1ZSBqZXplbGkgbXlzeiBqZXN0IG5hY2lzbmlldGFcbiAgICBsZXQgcmFkaXVzID0gNTtcbiAgICBjdHgubGluZVdpZHRoID0gcmFkaXVzKjI7XG5cbiAgICBcbiAgICBcbiAgICBsZXQgZW5nYWdlID0gKCAoZSk9PntcbiAgICAgICAgcGFpbnQgPSB0cnVlO1xuICAgIH0pXG5cbiAgICBsZXQgZGlzYW5nYWdlID0gKCAoZSk9PntcbiAgICAgICAgcGFpbnQgPSBmYWxzZTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL2tvbmN6eSBwdW5rdFxuICAgIH0pXG5cbiAgICBsZXQgZHJhdyA9ICggZT0+e1xuICAgICAgICBpZihwYWludCl7IC8vaWYgcGFpbnQgPSB0cnVlLCBjenlsaSBqZXplbGkgbXlzemthIGplc3QgbmFjaXNuaWV0YSByeXN1aiBsaW5pZVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnWCcsZS5jbGllbnRYLCdZOicsZS5jbGllbnRZKVxuICAgICAgICAgICAgY3R4LmxpbmVUbyhlLmNsaWVudFgsIGUuY2xpZW50WS00MClcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMoZS5jbGllbnRYLCBlLmNsaWVudFktNDAsIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oZS5jbGllbnRYLGUuY2xpZW50WS00MClcbiAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgJCgnY2FudmFzJykubW91c2Vtb3ZlKGRyYXcpO1xuICAgICQoJ2NhbnZhcycpLm1vdXNlZG93bihlbmdhZ2UpO1xuICAgICQoJ2NhbnZhcycpLm1vdXNldXAoZGlzYW5nYWdlKTtcblxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);