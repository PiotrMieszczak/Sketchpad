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

eval("$(document).ready(()=>{\n\n        const canvas= document.querySelector('#canvas');\n        canvas.width = window.innerWidth;\n        canvas.height = window.innerHeight;\n\n        let ctx = canvas.getContext('2d');\n\n    let paint= false; //true, if the mouse is press down\n    let radius = 5; //radius of arc element\n    ctx.lineWidth = radius*2; //lineWidth\n\n    \n    \n    const penDown = ( (e)=>{\n        paint = true;\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        ctx.beginPath(); //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next draw)\n    })\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)\n    })\n\n    let draw = ( e=>{\n        if(paint){ \n            ctx.fillStyle = 'red';\n            ctx.strokeStyle = 'red';\n            ctx.lineTo(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(e.clientX-canvas.offsetLeft,e.clientY-canvas.offsetTop)\n        }\n    })\n\n    $('canvas').mousemove(draw);\n    $('canvas').mousedown(penDown);\n    $('canvas').mouseup(penUp);\n    $('#clearSketch').click(clearSketchpad);\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCO0FBQ3JCLG1CQUFtQjtBQUNuQiw2QkFBNkI7Ozs7QUFJN0I7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLEtBQUs7O0FBRUwsaUNBQWlDO0FBQ2pDO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLGtCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoKCk9PntcblxuICAgICAgICBjb25zdCBjYW52YXM9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgbGV0IHBhaW50PSBmYWxzZTsgLy90cnVlLCBpZiB0aGUgbW91c2UgaXMgcHJlc3MgZG93blxuICAgIGxldCByYWRpdXMgPSA1OyAvL3JhZGl1cyBvZiBhcmMgZWxlbWVudFxuICAgIGN0eC5saW5lV2lkdGggPSByYWRpdXMqMjsgLy9saW5lV2lkdGhcblxuICAgIFxuICAgIFxuICAgIGNvbnN0IHBlbkRvd24gPSAoIChlKT0+e1xuICAgICAgICBwYWludCA9IHRydWU7XG4gICAgfSlcblxuICAgIGNvbnN0IHBlblVwID0gKCAoZSk9PntcbiAgICAgICAgcGFpbnQgPSBmYWxzZTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL2VuZCBvZiBjdXJyZW50IHBlbiBwYXRoLCBhZnRlciBkaXNlbmdhZ2UgbW91c2UuIFxuICAgICAgICAvL2lmIG5vdCBsYXN0IHBhdGggcG9pbnQgd291bGQgYWx3YXlzIGNvbm5lY3QgdG8gbmV3IHBhdGggKGNyZWF0ZWQgb24gbmV4dCBkcmF3KVxuICAgIH0pXG5cbiAgICBjb25zdCBjbGVhclNrZXRjaHBhZCA9ICggZT0+eyAvL2NsZWFuIHNrZXRjaHBhZFxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICB9KVxuXG4gICAgbGV0IGRyYXcgPSAoIGU9PntcbiAgICAgICAgaWYocGFpbnQpeyBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZWQnO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhlLmNsaWVudFgtY2FudmFzLm9mZnNldExlZnQsIGUuY2xpZW50WS1jYW52YXMub2Zmc2V0VG9wKVxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmFyYyhlLmNsaWVudFgtY2FudmFzLm9mZnNldExlZnQsIGUuY2xpZW50WS1jYW52YXMub2Zmc2V0VG9wLCByYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgubW92ZVRvKGUuY2xpZW50WC1jYW52YXMub2Zmc2V0TGVmdCxlLmNsaWVudFktY2FudmFzLm9mZnNldFRvcClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAkKCdjYW52YXMnKS5tb3VzZW1vdmUoZHJhdyk7XG4gICAgJCgnY2FudmFzJykubW91c2Vkb3duKHBlbkRvd24pO1xuICAgICQoJ2NhbnZhcycpLm1vdXNldXAocGVuVXApO1xuICAgICQoJyNjbGVhclNrZXRjaCcpLmNsaWNrKGNsZWFyU2tldGNocGFkKTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);