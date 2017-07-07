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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n//VARIABLES\n    const ctx = canvas.getContext('2d');\n    ctx.fillStyle = 'white';\n    ctx.fillRect(0,0,canvas.width,canvas.height);\n\n    let paint= false; //true, if the mouse is press down\n    let radius = $('select#lineWidth').val(); //radius of arc element\n    let color = 'black';\n    let penType = $('select#penType').val();\n    let intervalId = null;\n\n//FUNCTIONS\n\n    const changeColor = ( (e)=>{ \n        color = $(e.currentTarget).data('color');\n    });\n\n    const penDown = ( (e)=>{\n        paint = true;\n        if(penType === 'brush'){\n            drawLine(e);\n        }\n        if(penType === 'spray'){\n             drawSpray(e);\n            intervalId = setInterval( ()=>{\n                drawSpray(e)\n            },64)\n        }\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        ctx.beginPath();  //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n        clearInterval(intervalId)\n       \n    });\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight);\n        ctx.fillStyle = 'white';\n        ctx.fillRect(0,0,canvas.width,canvas.height);\n    });\n\n    const changeLineWidth = ( function(){\n        radius = this.value; //get current value of selector#lineWidth\n    });\n    const rubber = ( (e)=>{\n        color = 'white';\n    })\n\n    const changeType = (function(){\n        penType = this.value; //get current value of selector#penType\n    })\n\n    const getRandomOffset = radius => { \n\t\tlet random_angle = Math.random() * (2*Math.PI);\n\t\tlet random_radius = Math.random() * radius;\n\n        return{\n\t\t\tx: Math.cos(random_angle) * random_radius,\n\t\t\ty: Math.sin(random_angle) * random_radius    \n\t\t};\n    }\n\n    const drawLine = e=>{ \n            let offsetLeft = canvas.offsetLeft;\n            let offsetTop = canvas.offsetTop;\n            let mouseX = e.clientX;\n            let mouseY =e.clientY;\n\n            ctx.lineTo(mouseX-offsetLeft, mouseY-offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(mouseX-offsetLeft, mouseY-offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(mouseX-offsetLeft, mouseY-offsetTop)\n    }\n    const drawSpray =e=>{\n        for(let i=0; i< 50;i++){\n            var offset = getRandomOffset(radius);\n            ctx.fillRect((e.clientX-offset.x)-canvas.offsetLeft,(e.clientY-offset.y)-canvas.offsetTop, 1, 1);\n        }\n    }\n    //MAIN DRAW FN\n    const draw = ( e=>{ \n        clearInterval(intervalId); //if not interval would not stop on mouse move\n        if(paint){ \n            ctx.fillStyle = color;\n            ctx.strokeStyle = color;\n            ctx.lineWidth = radius*2;\n           // DRAW LINE\n            if(penType ==='brush'){\n            drawLine(e);\n            }\n          //DRAW SPRAY\n           if(penType ==='spray'){\n            drawSpray(e);\n           }\n        }\n    });\n    const saveImage =  function(){\n         var dataURL = canvas.toDataURL('image/png');\n         this.href = dataURL;\n         clearSketchpad();\n    }\n//EVENTS\n    $('canvas').mousemove(draw); \n    $('canvas').mousedown(penDown) \n    $('canvas').mouseup(penUp);\n    $('#clearSketch').click(clearSketchpad);\n    $('#rubber').click(rubber);\n    $('.colors_pallet div').click(changeColor);\n    $('select#lineWidth').change(changeLineWidth);\n    $('select#penType').change(changeType);\n    $('#save').click(saveImage);\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQiw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBOztBQUVBOztBQUVBLGdDO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBOztBQUVBLEtBQUs7O0FBRUwsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw0QkFBNEI7QUFDNUIsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNkJBQTZCO0FBQzdCLEtBQUs7O0FBRUwsdUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUI7QUFDQSxrQ0FBa0M7QUFDbEMsa0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoKCk9PntcblxuLy9DQU5WQVMgU0VUVVBcbiAgICBjb25zdCBjYW52YXM9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy9WQVJJQUJMRVNcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICBjdHguZmlsbFJlY3QoMCwwLGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KTtcblxuICAgIGxldCBwYWludD0gZmFsc2U7IC8vdHJ1ZSwgaWYgdGhlIG1vdXNlIGlzIHByZXNzIGRvd25cbiAgICBsZXQgcmFkaXVzID0gJCgnc2VsZWN0I2xpbmVXaWR0aCcpLnZhbCgpOyAvL3JhZGl1cyBvZiBhcmMgZWxlbWVudFxuICAgIGxldCBjb2xvciA9ICdibGFjayc7XG4gICAgbGV0IHBlblR5cGUgPSAkKCdzZWxlY3QjcGVuVHlwZScpLnZhbCgpO1xuICAgIGxldCBpbnRlcnZhbElkID0gbnVsbDtcblxuLy9GVU5DVElPTlNcblxuICAgIGNvbnN0IGNoYW5nZUNvbG9yID0gKCAoZSk9PnsgXG4gICAgICAgIGNvbG9yID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NvbG9yJyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwZW5Eb3duID0gKCAoZSk9PntcbiAgICAgICAgcGFpbnQgPSB0cnVlO1xuICAgICAgICBpZihwZW5UeXBlID09PSAnYnJ1c2gnKXtcbiAgICAgICAgICAgIGRyYXdMaW5lKGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHBlblR5cGUgPT09ICdzcHJheScpe1xuICAgICAgICAgICAgIGRyYXdTcHJheShlKTtcbiAgICAgICAgICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCggKCk9PntcbiAgICAgICAgICAgICAgICBkcmF3U3ByYXkoZSlcbiAgICAgICAgICAgIH0sNjQpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcGVuVXAgPSAoIChlKT0+e1xuICAgICAgICBwYWludCA9IGZhbHNlO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7ICAvL2VuZCBvZiBjdXJyZW50IHBlbiBwYXRoLCBhZnRlciBkaXNlbmdhZ2UgbW91c2UuIFxuICAgICAgICAvL2lmIG5vdCBsYXN0IHBhdGggcG9pbnQgd291bGQgYWx3YXlzIGNvbm5lY3QgdG8gbmV3IHBhdGggKGNyZWF0ZWQgb24gbmV4dCBtb3VzZWRvd24gZXZlbnQpXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZClcbiAgICAgICBcbiAgICB9KTtcblxuICAgIGNvbnN0IGNsZWFyU2tldGNocGFkID0gKCBlPT57IC8vY2xlYW4gc2tldGNocGFkXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2hhbmdlTGluZVdpZHRoID0gKCBmdW5jdGlvbigpe1xuICAgICAgICByYWRpdXMgPSB0aGlzLnZhbHVlOyAvL2dldCBjdXJyZW50IHZhbHVlIG9mIHNlbGVjdG9yI2xpbmVXaWR0aFxuICAgIH0pO1xuICAgIGNvbnN0IHJ1YmJlciA9ICggKGUpPT57XG4gICAgICAgIGNvbG9yID0gJ3doaXRlJztcbiAgICB9KVxuXG4gICAgY29uc3QgY2hhbmdlVHlwZSA9IChmdW5jdGlvbigpe1xuICAgICAgICBwZW5UeXBlID0gdGhpcy52YWx1ZTsgLy9nZXQgY3VycmVudCB2YWx1ZSBvZiBzZWxlY3RvciNwZW5UeXBlXG4gICAgfSlcblxuICAgIGNvbnN0IGdldFJhbmRvbU9mZnNldCA9IHJhZGl1cyA9PiB7IFxuXHRcdGxldCByYW5kb21fYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogKDIqTWF0aC5QSSk7XG5cdFx0bGV0IHJhbmRvbV9yYWRpdXMgPSBNYXRoLnJhbmRvbSgpICogcmFkaXVzO1xuXG4gICAgICAgIHJldHVybntcblx0XHRcdHg6IE1hdGguY29zKHJhbmRvbV9hbmdsZSkgKiByYW5kb21fcmFkaXVzLFxuXHRcdFx0eTogTWF0aC5zaW4ocmFuZG9tX2FuZ2xlKSAqIHJhbmRvbV9yYWRpdXMgICAgXG5cdFx0fTtcbiAgICB9XG5cbiAgICBjb25zdCBkcmF3TGluZSA9IGU9PnsgXG4gICAgICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgbGV0IG9mZnNldFRvcCA9IGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBsZXQgbW91c2VYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgbGV0IG1vdXNlWSA9ZS5jbGllbnRZO1xuXG4gICAgICAgICAgICBjdHgubGluZVRvKG1vdXNlWC1vZmZzZXRMZWZ0LCBtb3VzZVktb2Zmc2V0VG9wKVxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmFyYyhtb3VzZVgtb2Zmc2V0TGVmdCwgbW91c2VZLW9mZnNldFRvcCwgcmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhtb3VzZVgtb2Zmc2V0TGVmdCwgbW91c2VZLW9mZnNldFRvcClcbiAgICB9XG4gICAgY29uc3QgZHJhd1NwcmF5ID1lPT57XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCA1MDtpKyspe1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGdldFJhbmRvbU9mZnNldChyYWRpdXMpO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KChlLmNsaWVudFgtb2Zmc2V0LngpLWNhbnZhcy5vZmZzZXRMZWZ0LChlLmNsaWVudFktb2Zmc2V0LnkpLWNhbnZhcy5vZmZzZXRUb3AsIDEsIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vTUFJTiBEUkFXIEZOXG4gICAgY29uc3QgZHJhdyA9ICggZT0+eyBcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTsgLy9pZiBub3QgaW50ZXJ2YWwgd291bGQgbm90IHN0b3Agb24gbW91c2UgbW92ZVxuICAgICAgICBpZihwYWludCl7IFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gcmFkaXVzKjI7XG4gICAgICAgICAgIC8vIERSQVcgTElORVxuICAgICAgICAgICAgaWYocGVuVHlwZSA9PT0nYnJ1c2gnKXtcbiAgICAgICAgICAgIGRyYXdMaW5lKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIC8vRFJBVyBTUFJBWVxuICAgICAgICAgICBpZihwZW5UeXBlID09PSdzcHJheScpe1xuICAgICAgICAgICAgZHJhd1NwcmF5KGUpO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBzYXZlSW1hZ2UgPSAgZnVuY3Rpb24oKXtcbiAgICAgICAgIHZhciBkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgICAgICB0aGlzLmhyZWYgPSBkYXRhVVJMO1xuICAgICAgICAgY2xlYXJTa2V0Y2hwYWQoKTtcbiAgICB9XG4vL0VWRU5UU1xuICAgICQoJ2NhbnZhcycpLm1vdXNlbW92ZShkcmF3KTsgXG4gICAgJCgnY2FudmFzJykubW91c2Vkb3duKHBlbkRvd24pIFxuICAgICQoJ2NhbnZhcycpLm1vdXNldXAocGVuVXApO1xuICAgICQoJyNjbGVhclNrZXRjaCcpLmNsaWNrKGNsZWFyU2tldGNocGFkKTtcbiAgICAkKCcjcnViYmVyJykuY2xpY2socnViYmVyKTtcbiAgICAkKCcuY29sb3JzX3BhbGxldCBkaXYnKS5jbGljayhjaGFuZ2VDb2xvcik7XG4gICAgJCgnc2VsZWN0I2xpbmVXaWR0aCcpLmNoYW5nZShjaGFuZ2VMaW5lV2lkdGgpO1xuICAgICQoJ3NlbGVjdCNwZW5UeXBlJykuY2hhbmdlKGNoYW5nZVR5cGUpO1xuICAgICQoJyNzYXZlJykuY2xpY2soc2F2ZUltYWdlKTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);