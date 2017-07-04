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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n\n//VARIABLES\n    const ctx = canvas.getContext('2d');\n    let paint= false; //true, if the mouse is press down\n    let radius = 5; //radius of arc element\n    ctx.lineWidth = radius*2; //lineWidth\n    let color = 'black';\n    const list = $('ul li'); //list of changeWidth elements\n\n//FUNCTIONS\n\n    const changeColor = ( (e)=>{ \n        color = $(e.currentTarget).data('color');\n    });\n\n    const penDown = ( (e)=>{\n        paint = true;\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        ctx.beginPath(); //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n    })\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)\n    })\n\n    const changeLineWidth = ( e=>{\n        radius = $()\n    })\n\n    const draw = ( e=>{\n        if(paint){ \n            ctx.fillStyle = color;\n            ctx.strokeStyle = color;\n            ctx.lineTo(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(e.clientX-canvas.offsetLeft,e.clientY-canvas.offsetTop)\n        }\n    })\n\n//List SETUP & FUNCTIONS\n    $.each( list, (key,li)=>{ //hide all list elements \n            $(li).addClass('hidden');\n        })\n\n    const hideList = ( ()=>{\n        console.log('test');\n        $.each( list, (key,li)=>{ //hide all list elements \n            $(li).removeClass('show'); \n            $(li).addClass('hidden');\n        })\n    })\n   \n\n    const showList = ( ()=>{\n        $.each( list, (key, li)=>{ //show all list elements\n             $(li).removeClass('hidden'); \n             $(li).addClass('show');\n        })\n    })\n\n//EVENTS\n    $('canvas').mousemove(draw); \n    $('canvas').mousedown(penDown); \n    $('canvas').mouseup(penUp);\n    $('#clearSketch').click(clearSketchpad);\n    $('.colors_pallet div').click(changeColor);\n    $('ul').mouseover(showList);\n    $('ul').mouseleave(hideList);\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLG1CQUFtQjtBQUNuQiw2QkFBNkI7QUFDN0I7QUFDQSw0QkFBNEI7O0FBRTVCOztBQUVBLGdDO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSxLQUFLOztBQUVMLGlDQUFpQztBQUNqQztBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxrQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxzQztBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7OztBQUdMO0FBQ0Esa0NBQWtDO0FBQ2xDLHlDO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBLGdDO0FBQ0EsbUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoKCk9PntcblxuLy9DQU5WQVMgU0VUVVBcbiAgICBjb25zdCBjYW52YXM9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4vL1ZBUklBQkxFU1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGxldCBwYWludD0gZmFsc2U7IC8vdHJ1ZSwgaWYgdGhlIG1vdXNlIGlzIHByZXNzIGRvd25cbiAgICBsZXQgcmFkaXVzID0gNTsgLy9yYWRpdXMgb2YgYXJjIGVsZW1lbnRcbiAgICBjdHgubGluZVdpZHRoID0gcmFkaXVzKjI7IC8vbGluZVdpZHRoXG4gICAgbGV0IGNvbG9yID0gJ2JsYWNrJztcbiAgICBjb25zdCBsaXN0ID0gJCgndWwgbGknKTsgLy9saXN0IG9mIGNoYW5nZVdpZHRoIGVsZW1lbnRzXG5cbi8vRlVOQ1RJT05TXG5cbiAgICBjb25zdCBjaGFuZ2VDb2xvciA9ICggKGUpPT57IFxuICAgICAgICBjb2xvciA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjb2xvcicpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcGVuRG93biA9ICggKGUpPT57XG4gICAgICAgIHBhaW50ID0gdHJ1ZTtcbiAgICB9KVxuXG4gICAgY29uc3QgcGVuVXAgPSAoIChlKT0+e1xuICAgICAgICBwYWludCA9IGZhbHNlO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7IC8vZW5kIG9mIGN1cnJlbnQgcGVuIHBhdGgsIGFmdGVyIGRpc2VuZ2FnZSBtb3VzZS4gXG4gICAgICAgIC8vaWYgbm90IGxhc3QgcGF0aCBwb2ludCB3b3VsZCBhbHdheXMgY29ubmVjdCB0byBuZXcgcGF0aCAoY3JlYXRlZCBvbiBuZXh0IG1vdXNlZG93biBldmVudClcbiAgICB9KVxuXG4gICAgY29uc3QgY2xlYXJTa2V0Y2hwYWQgPSAoIGU9PnsgLy9jbGVhbiBza2V0Y2hwYWRcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgfSlcblxuICAgIGNvbnN0IGNoYW5nZUxpbmVXaWR0aCA9ICggZT0+e1xuICAgICAgICByYWRpdXMgPSAkKClcbiAgICB9KVxuXG4gICAgY29uc3QgZHJhdyA9ICggZT0+e1xuICAgICAgICBpZihwYWludCl7IFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjdHgubGluZVRvKGUuY2xpZW50WC1jYW52YXMub2Zmc2V0TGVmdCwgZS5jbGllbnRZLWNhbnZhcy5vZmZzZXRUb3ApXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHguYXJjKGUuY2xpZW50WC1jYW52YXMub2Zmc2V0TGVmdCwgZS5jbGllbnRZLWNhbnZhcy5vZmZzZXRUb3AsIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oZS5jbGllbnRYLWNhbnZhcy5vZmZzZXRMZWZ0LGUuY2xpZW50WS1jYW52YXMub2Zmc2V0VG9wKVxuICAgICAgICB9XG4gICAgfSlcblxuLy9MaXN0IFNFVFVQICYgRlVOQ1RJT05TXG4gICAgJC5lYWNoKCBsaXN0LCAoa2V5LGxpKT0+eyAvL2hpZGUgYWxsIGxpc3QgZWxlbWVudHMgXG4gICAgICAgICAgICAkKGxpKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0pXG5cbiAgICBjb25zdCBoaWRlTGlzdCA9ICggKCk9PntcbiAgICAgICAgY29uc29sZS5sb2coJ3Rlc3QnKTtcbiAgICAgICAgJC5lYWNoKCBsaXN0LCAoa2V5LGxpKT0+eyAvL2hpZGUgYWxsIGxpc3QgZWxlbWVudHMgXG4gICAgICAgICAgICAkKGxpKS5yZW1vdmVDbGFzcygnc2hvdycpOyBcbiAgICAgICAgICAgICQobGkpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfSlcbiAgICB9KVxuICAgXG5cbiAgICBjb25zdCBzaG93TGlzdCA9ICggKCk9PntcbiAgICAgICAgJC5lYWNoKCBsaXN0LCAoa2V5LCBsaSk9PnsgLy9zaG93IGFsbCBsaXN0IGVsZW1lbnRzXG4gICAgICAgICAgICAgJChsaSkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpOyBcbiAgICAgICAgICAgICAkKGxpKS5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgICB9KVxuICAgIH0pXG5cbi8vRVZFTlRTXG4gICAgJCgnY2FudmFzJykubW91c2Vtb3ZlKGRyYXcpOyBcbiAgICAkKCdjYW52YXMnKS5tb3VzZWRvd24ocGVuRG93bik7IFxuICAgICQoJ2NhbnZhcycpLm1vdXNldXAocGVuVXApO1xuICAgICQoJyNjbGVhclNrZXRjaCcpLmNsaWNrKGNsZWFyU2tldGNocGFkKTtcbiAgICAkKCcuY29sb3JzX3BhbGxldCBkaXYnKS5jbGljayhjaGFuZ2VDb2xvcik7XG4gICAgJCgndWwnKS5tb3VzZW92ZXIoc2hvd0xpc3QpO1xuICAgICQoJ3VsJykubW91c2VsZWF2ZShoaWRlTGlzdCk7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ })
/******/ ]);