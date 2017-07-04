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

eval("$(document).ready(()=>{\n\n        const canvas= document.querySelector('#canvas');\n        canvas.width = window.innerWidth;\n        canvas.height = window.innerHeight;\n\n        let ctx = canvas.getContext('2d');\n\n    let paint= false; //true, if the mouse is press down\n    let radius = 5; //radius of arc element\n    ctx.lineWidth = radius*2; //lineWidth\n\n    let color = 'black';\n    const colors = $('.colors_pallet div');\n\n    colors.click( (e)=>{\n        color = $(e.currentTarget).data('color');\n        console.log(color);\n    });\n\n    const penDown = ( (e)=>{\n        paint = true;\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        ctx.beginPath(); //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next draw)\n    })\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)\n    })\n    let draw = ( e=>{\n        if(paint){ \n            ctx.fillStyle = color;\n            ctx.strokeStyle = color;\n            ctx.lineTo(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(e.clientX-canvas.offsetLeft,e.clientY-canvas.offsetTop)\n        }\n    })\n\n    \n\n\n    \n    $('canvas').mousemove(draw);\n    $('canvas').mousedown(penDown);\n    $('canvas').mouseup(penUp);\n    $('#clearSketch').click(clearSketchpad);\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCO0FBQ3JCLG1CQUFtQjtBQUNuQiw2QkFBNkI7O0FBRTdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0EsS0FBSzs7QUFFTCxpQ0FBaUM7QUFDakM7QUFDQSxLQUFLO0FBQ0w7QUFDQSxrQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7Ozs7O0FBTUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeSgoKT0+e1xuXG4gICAgICAgIGNvbnN0IGNhbnZhcz0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpO1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICBsZXQgcGFpbnQ9IGZhbHNlOyAvL3RydWUsIGlmIHRoZSBtb3VzZSBpcyBwcmVzcyBkb3duXG4gICAgbGV0IHJhZGl1cyA9IDU7IC8vcmFkaXVzIG9mIGFyYyBlbGVtZW50XG4gICAgY3R4LmxpbmVXaWR0aCA9IHJhZGl1cyoyOyAvL2xpbmVXaWR0aFxuXG4gICAgbGV0IGNvbG9yID0gJ2JsYWNrJztcbiAgICBjb25zdCBjb2xvcnMgPSAkKCcuY29sb3JzX3BhbGxldCBkaXYnKTtcblxuICAgIGNvbG9ycy5jbGljayggKGUpPT57XG4gICAgICAgIGNvbG9yID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NvbG9yJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbG9yKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBlbkRvd24gPSAoIChlKT0+e1xuICAgICAgICBwYWludCA9IHRydWU7XG4gICAgfSlcblxuICAgIGNvbnN0IHBlblVwID0gKCAoZSk9PntcbiAgICAgICAgcGFpbnQgPSBmYWxzZTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAvL2VuZCBvZiBjdXJyZW50IHBlbiBwYXRoLCBhZnRlciBkaXNlbmdhZ2UgbW91c2UuIFxuICAgICAgICAvL2lmIG5vdCBsYXN0IHBhdGggcG9pbnQgd291bGQgYWx3YXlzIGNvbm5lY3QgdG8gbmV3IHBhdGggKGNyZWF0ZWQgb24gbmV4dCBkcmF3KVxuICAgIH0pXG5cbiAgICBjb25zdCBjbGVhclNrZXRjaHBhZCA9ICggZT0+eyAvL2NsZWFuIHNrZXRjaHBhZFxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICB9KVxuICAgIGxldCBkcmF3ID0gKCBlPT57XG4gICAgICAgIGlmKHBhaW50KXsgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oZS5jbGllbnRYLWNhbnZhcy5vZmZzZXRMZWZ0LCBlLmNsaWVudFktY2FudmFzLm9mZnNldFRvcClcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMoZS5jbGllbnRYLWNhbnZhcy5vZmZzZXRMZWZ0LCBlLmNsaWVudFktY2FudmFzLm9mZnNldFRvcCwgcmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhlLmNsaWVudFgtY2FudmFzLm9mZnNldExlZnQsZS5jbGllbnRZLWNhbnZhcy5vZmZzZXRUb3ApXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgXG5cblxuICAgIFxuICAgICQoJ2NhbnZhcycpLm1vdXNlbW92ZShkcmF3KTtcbiAgICAkKCdjYW52YXMnKS5tb3VzZWRvd24ocGVuRG93bik7XG4gICAgJCgnY2FudmFzJykubW91c2V1cChwZW5VcCk7XG4gICAgJCgnI2NsZWFyU2tldGNoJykuY2xpY2soY2xlYXJTa2V0Y2hwYWQpO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);