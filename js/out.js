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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n//VARIABLES\n    const ctx = canvas.getContext('2d');\n    ctx.fillStyle = 'white';\n    ctx.fillRect(0,0,canvas.width,canvas.height);\n\n    let paint= false; //true, if the mouse is press down\n    let radius = $('select#lineWidth').val(); //radius of arc element\n    let color = 'black';\n    let penType = $('select#penType').val();\n    let intervalId = null;\n\n \n//FUNCTIONS\n\n    const changeColor = ( (e)=>{ \n        color = $(e.currentTarget).data('color');\n    });\n\n    const penDown = ( (e)=>{\n        paint = true;\n\n        if(penType === 'brush'){\n            drawLine(e);\n        }\n        if(penType === 'spray'){\n            //  drawSpray(e);\n            intervalId = setInterval( ()=>{\n                drawSpray(e)\n            },64)\n        }\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        ctx.beginPath();  //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n        clearInterval(intervalId)\n       \n    });\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight);\n        ctx.fillStyle = 'white';\n        ctx.fillRect(0,0,canvas.width,canvas.height);\n    });\n\n    const changeLineWidth = ( function(){\n        radius = this.value; //get current value of selector#lineWidth\n\n    });\n    const rubber = ( (e)=>{\n        color = 'white';\n    })\n\n    const changeType = (function(){\n        penType = this.value; //get current value of selector#penType\n\n    })\n\n    const getRandomOffset = radius => { \n\t\tlet random_angle = Math.random() * (2*Math.PI);\n\t\tlet random_radius = Math.random() * radius;\n\n        return{\n\t\t\tx: Math.cos(random_angle) * random_radius,\n\t\t\ty: Math.sin(random_angle) * random_radius    \n\t\t};\n    }\n\n    const drawLine = e=>{ \n            ctx.fillStyle = color;\n            let offsetLeft = canvas.offsetLeft;\n            let offsetTop = canvas.offsetTop;\n            let mouseX = e.clientX;\n            let mouseY =e.clientY;\n            \n            ctx.lineTo(mouseX-offsetLeft, mouseY-offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(mouseX-offsetLeft, mouseY-offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(mouseX-offsetLeft, mouseY-offsetTop)\n    }\n    const drawSpray =e=>{\n        ctx.fillStyle = color;\n        for(let i=0; i< 50;i++){\n            var offset = getRandomOffset(radius);\n            ctx.fillRect((e.clientX-offset.x)-canvas.offsetLeft,(e.clientY-offset.y)-canvas.offsetTop, 1, 1);\n        }\n    }\n    //MAIN DRAW FN\n    const draw = ( e=>{ \n        clearInterval(intervalId); //if not interval would not stop on mouse move\n        if(paint){ \n            ctx.fillStyle = color;\n            ctx.strokeStyle = color;\n            ctx.lineWidth = radius*2;\n           // DRAW LINE\n            if(penType ==='brush'){\n            drawLine(e);\n            }\n          //DRAW SPRAY\n           if(penType ==='spray'){\n            drawSpray(e);\n           }\n        }\n    });\n    const saveImage =  function(){\n         var dataURL = canvas.toDataURL('image/png');\n         this.href = dataURL;\n         clearSketchpad();\n    }\n//EVENTS\n\n    canvas.mousemove(draw); \n    canvas.on('vmousemove',draw); \n\n    canvas.mousedown(penDown) \n    canvas.on('vmousedown',penDown); \n    \n    canvas.mouseup(penUp);\n    canvas.on('vmouseout',penUp);\n\n\n    $('#clearSketch').click(clearSketchpad);\n    $('#rubber').click(rubber);\n    \n    $('.colors_pallet div').click(changeColor);\n    \n    $('select#lineWidth').change(changeLineWidth);\n    $('select#penType').change(changeType);\n    \n    $('#save').click(saveImage);\n\n    \n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQiw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxnQztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTCxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDRCQUE0Qjs7QUFFNUIsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNkJBQTZCOztBQUU3QixLQUFLOztBQUVMLHVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QjtBQUNBLGtDQUFrQztBQUNsQyxrQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkI7QUFDQSxpQzs7QUFFQTtBQUNBLG9DOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0EsQ0FBQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoKCk9PntcblxuLy9DQU5WQVMgU0VUVVBcbiAgICBjb25zdCBjYW52YXM9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy9WQVJJQUJMRVNcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICBjdHguZmlsbFJlY3QoMCwwLGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KTtcblxuICAgIGxldCBwYWludD0gZmFsc2U7IC8vdHJ1ZSwgaWYgdGhlIG1vdXNlIGlzIHByZXNzIGRvd25cbiAgICBsZXQgcmFkaXVzID0gJCgnc2VsZWN0I2xpbmVXaWR0aCcpLnZhbCgpOyAvL3JhZGl1cyBvZiBhcmMgZWxlbWVudFxuICAgIGxldCBjb2xvciA9ICdibGFjayc7XG4gICAgbGV0IHBlblR5cGUgPSAkKCdzZWxlY3QjcGVuVHlwZScpLnZhbCgpO1xuICAgIGxldCBpbnRlcnZhbElkID0gbnVsbDtcblxuIFxuLy9GVU5DVElPTlNcblxuICAgIGNvbnN0IGNoYW5nZUNvbG9yID0gKCAoZSk9PnsgXG4gICAgICAgIGNvbG9yID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NvbG9yJyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwZW5Eb3duID0gKCAoZSk9PntcbiAgICAgICAgcGFpbnQgPSB0cnVlO1xuXG4gICAgICAgIGlmKHBlblR5cGUgPT09ICdicnVzaCcpe1xuICAgICAgICAgICAgZHJhd0xpbmUoZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYocGVuVHlwZSA9PT0gJ3NwcmF5Jyl7XG4gICAgICAgICAgICAvLyAgZHJhd1NwcmF5KGUpO1xuICAgICAgICAgICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCAoKT0+e1xuICAgICAgICAgICAgICAgIGRyYXdTcHJheShlKVxuICAgICAgICAgICAgfSw2NClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBwZW5VcCA9ICggKGUpPT57XG4gICAgICAgIHBhaW50ID0gZmFsc2U7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTsgIC8vZW5kIG9mIGN1cnJlbnQgcGVuIHBhdGgsIGFmdGVyIGRpc2VuZ2FnZSBtb3VzZS4gXG4gICAgICAgIC8vaWYgbm90IGxhc3QgcGF0aCBwb2ludCB3b3VsZCBhbHdheXMgY29ubmVjdCB0byBuZXcgcGF0aCAoY3JlYXRlZCBvbiBuZXh0IG1vdXNlZG93biBldmVudClcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKVxuICAgICAgIFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2xlYXJTa2V0Y2hwYWQgPSAoIGU9PnsgLy9jbGVhbiBza2V0Y2hwYWRcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsMCxjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjaGFuZ2VMaW5lV2lkdGggPSAoIGZ1bmN0aW9uKCl7XG4gICAgICAgIHJhZGl1cyA9IHRoaXMudmFsdWU7IC8vZ2V0IGN1cnJlbnQgdmFsdWUgb2Ygc2VsZWN0b3IjbGluZVdpZHRoXG5cbiAgICB9KTtcbiAgICBjb25zdCBydWJiZXIgPSAoIChlKT0+e1xuICAgICAgICBjb2xvciA9ICd3aGl0ZSc7XG4gICAgfSlcblxuICAgIGNvbnN0IGNoYW5nZVR5cGUgPSAoZnVuY3Rpb24oKXtcbiAgICAgICAgcGVuVHlwZSA9IHRoaXMudmFsdWU7IC8vZ2V0IGN1cnJlbnQgdmFsdWUgb2Ygc2VsZWN0b3IjcGVuVHlwZVxuXG4gICAgfSlcblxuICAgIGNvbnN0IGdldFJhbmRvbU9mZnNldCA9IHJhZGl1cyA9PiB7IFxuXHRcdGxldCByYW5kb21fYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogKDIqTWF0aC5QSSk7XG5cdFx0bGV0IHJhbmRvbV9yYWRpdXMgPSBNYXRoLnJhbmRvbSgpICogcmFkaXVzO1xuXG4gICAgICAgIHJldHVybntcblx0XHRcdHg6IE1hdGguY29zKHJhbmRvbV9hbmdsZSkgKiByYW5kb21fcmFkaXVzLFxuXHRcdFx0eTogTWF0aC5zaW4ocmFuZG9tX2FuZ2xlKSAqIHJhbmRvbV9yYWRpdXMgICAgXG5cdFx0fTtcbiAgICB9XG5cbiAgICBjb25zdCBkcmF3TGluZSA9IGU9PnsgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgbGV0IG9mZnNldFRvcCA9IGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBsZXQgbW91c2VYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgbGV0IG1vdXNlWSA9ZS5jbGllbnRZO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjdHgubGluZVRvKG1vdXNlWC1vZmZzZXRMZWZ0LCBtb3VzZVktb2Zmc2V0VG9wKVxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmFyYyhtb3VzZVgtb2Zmc2V0TGVmdCwgbW91c2VZLW9mZnNldFRvcCwgcmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhtb3VzZVgtb2Zmc2V0TGVmdCwgbW91c2VZLW9mZnNldFRvcClcbiAgICB9XG4gICAgY29uc3QgZHJhd1NwcmF5ID1lPT57XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8IDUwO2krKyl7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gZ2V0UmFuZG9tT2Zmc2V0KHJhZGl1cyk7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoKGUuY2xpZW50WC1vZmZzZXQueCktY2FudmFzLm9mZnNldExlZnQsKGUuY2xpZW50WS1vZmZzZXQueSktY2FudmFzLm9mZnNldFRvcCwgMSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9NQUlOIERSQVcgRk5cbiAgICBjb25zdCBkcmF3ID0gKCBlPT57IFxuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpOyAvL2lmIG5vdCBpbnRlcnZhbCB3b3VsZCBub3Qgc3RvcCBvbiBtb3VzZSBtb3ZlXG4gICAgICAgIGlmKHBhaW50KXsgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSByYWRpdXMqMjtcbiAgICAgICAgICAgLy8gRFJBVyBMSU5FXG4gICAgICAgICAgICBpZihwZW5UeXBlID09PSdicnVzaCcpe1xuICAgICAgICAgICAgZHJhd0xpbmUoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLy9EUkFXIFNQUkFZXG4gICAgICAgICAgIGlmKHBlblR5cGUgPT09J3NwcmF5Jyl7XG4gICAgICAgICAgICBkcmF3U3ByYXkoZSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHNhdmVJbWFnZSA9ICBmdW5jdGlvbigpe1xuICAgICAgICAgdmFyIGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICAgICAgIHRoaXMuaHJlZiA9IGRhdGFVUkw7XG4gICAgICAgICBjbGVhclNrZXRjaHBhZCgpO1xuICAgIH1cbi8vRVZFTlRTXG5cbiAgICBjYW52YXMubW91c2Vtb3ZlKGRyYXcpOyBcbiAgICBjYW52YXMub24oJ3Ztb3VzZW1vdmUnLGRyYXcpOyBcblxuICAgIGNhbnZhcy5tb3VzZWRvd24ocGVuRG93bikgXG4gICAgY2FudmFzLm9uKCd2bW91c2Vkb3duJyxwZW5Eb3duKTsgXG4gICAgXG4gICAgY2FudmFzLm1vdXNldXAocGVuVXApO1xuICAgIGNhbnZhcy5vbigndm1vdXNlb3V0JyxwZW5VcCk7XG5cblxuICAgICQoJyNjbGVhclNrZXRjaCcpLmNsaWNrKGNsZWFyU2tldGNocGFkKTtcbiAgICAkKCcjcnViYmVyJykuY2xpY2socnViYmVyKTtcbiAgICBcbiAgICAkKCcuY29sb3JzX3BhbGxldCBkaXYnKS5jbGljayhjaGFuZ2VDb2xvcik7XG4gICAgXG4gICAgJCgnc2VsZWN0I2xpbmVXaWR0aCcpLmNoYW5nZShjaGFuZ2VMaW5lV2lkdGgpO1xuICAgICQoJ3NlbGVjdCNwZW5UeXBlJykuY2hhbmdlKGNoYW5nZVR5cGUpO1xuICAgIFxuICAgICQoJyNzYXZlJykuY2xpY2soc2F2ZUltYWdlKTtcblxuICAgIFxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);