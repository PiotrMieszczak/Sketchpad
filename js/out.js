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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n//VARIABLES\n    const ctx = canvas.getContext('2d');\n    ctx.fillStyle = 'white';\n    ctx.fillRect(0,0,canvas.width,canvas.height);\n\n    let paint= false; //true, if the mouse is press down\n    let radius = $('select#lineWidth').val(); //radius of arc element\n    let color = 'black';\n    let penType = $('select#penType').val();\n    let intervalId = null;\n\n//FUNCTIONS\n\n    const changeColor = ( (e)=>{ \n        color = $(e.currentTarget).data('color');\n    });\n\n    const penDown = ( (e)=>{\n        paint = true;\n\n        if(penType === 'brush'){\n            drawLine(e);\n        }\n        if(penType === 'spray'){\n            //  drawSpray(e);\n            intervalId = setInterval( ()=>{\n                drawSpray(e)\n            },64)\n        }\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        ctx.beginPath();  //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n        clearInterval(intervalId)\n       \n    });\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight);\n        ctx.fillStyle = 'white';\n        ctx.fillRect(0,0,canvas.width,canvas.height);\n    });\n\n    const changeLineWidth = ( function(){\n        radius = this.value; //get current value of selector#lineWidth\n    });\n    const rubber = ( (e)=>{\n        color = 'white';\n    })\n\n    const changeType = (function(){\n        penType = this.value; //get current value of selector#penType\n    })\n\n    const getRandomOffset = radius => { \n\t\tlet random_angle = Math.random() * (2*Math.PI);\n\t\tlet random_radius = Math.random() * radius;\n\n        return{\n\t\t\tx: Math.cos(random_angle) * random_radius,\n\t\t\ty: Math.sin(random_angle) * random_radius    \n\t\t};\n    }\n\n    const drawLine = e=>{ \n            ctx.fillStyle = color;\n            let offsetLeft = canvas.offsetLeft;\n            let offsetTop = canvas.offsetTop;\n            let mouseX = e.clientX;\n            let mouseY =e.clientY;\n            \n            ctx.lineTo(mouseX-offsetLeft, mouseY-offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(mouseX-offsetLeft, mouseY-offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(mouseX-offsetLeft, mouseY-offsetTop)\n    }\n    const drawSpray =e=>{\n        ctx.fillStyle = color;\n        for(let i=0; i< 50;i++){\n            var offset = getRandomOffset(radius);\n            ctx.fillRect((e.clientX-offset.x)-canvas.offsetLeft,(e.clientY-offset.y)-canvas.offsetTop, 1, 1);\n        }\n    }\n    //MAIN DRAW FN\n    const draw = ( e=>{ \n        clearInterval(intervalId); //if not interval would not stop on mouse move\n        if(paint){ \n            ctx.fillStyle = color;\n            ctx.strokeStyle = color;\n            ctx.lineWidth = radius*2;\n           // DRAW LINE\n            if(penType ==='brush'){\n            drawLine(e);\n            }\n          //DRAW SPRAY\n           if(penType ==='spray'){\n            drawSpray(e);\n           }\n        }\n    });\n    const saveImage =  function(){\n         var dataURL = canvas.toDataURL('image/png');\n         this.href = dataURL;\n         clearSketchpad();\n    }\n//EVENTS\n    $('canvas').mousemove(draw); \n    $('canvas').mousedown(penDown) \n    $('canvas').mouseup(penUp);\n    $('#clearSketch').click(clearSketchpad);\n    $('#rubber').click(rubber);\n    $('.colors_pallet div').click(changeColor);\n    $('select#lineWidth').change(changeLineWidth);\n    $('select#penType').change(changeType);\n    $('#save').click(saveImage);\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQiw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBOztBQUVBOztBQUVBLGdDO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTs7QUFFQSxLQUFLOztBQUVMLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNEJBQTRCO0FBQzVCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZCQUE2QjtBQUM3QixLQUFLOztBQUVMLHVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QjtBQUNBLGtDQUFrQztBQUNsQyxrQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeSgoKT0+e1xuXG4vL0NBTlZBUyBTRVRVUFxuICAgIGNvbnN0IGNhbnZhcz0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4vL1ZBUklBQkxFU1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgIGN0eC5maWxsUmVjdCgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgbGV0IHBhaW50PSBmYWxzZTsgLy90cnVlLCBpZiB0aGUgbW91c2UgaXMgcHJlc3MgZG93blxuICAgIGxldCByYWRpdXMgPSAkKCdzZWxlY3QjbGluZVdpZHRoJykudmFsKCk7IC8vcmFkaXVzIG9mIGFyYyBlbGVtZW50XG4gICAgbGV0IGNvbG9yID0gJ2JsYWNrJztcbiAgICBsZXQgcGVuVHlwZSA9ICQoJ3NlbGVjdCNwZW5UeXBlJykudmFsKCk7XG4gICAgbGV0IGludGVydmFsSWQgPSBudWxsO1xuXG4vL0ZVTkNUSU9OU1xuXG4gICAgY29uc3QgY2hhbmdlQ29sb3IgPSAoIChlKT0+eyBcbiAgICAgICAgY29sb3IgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnY29sb3InKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBlbkRvd24gPSAoIChlKT0+e1xuICAgICAgICBwYWludCA9IHRydWU7XG5cbiAgICAgICAgaWYocGVuVHlwZSA9PT0gJ2JydXNoJyl7XG4gICAgICAgICAgICBkcmF3TGluZShlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihwZW5UeXBlID09PSAnc3ByYXknKXtcbiAgICAgICAgICAgIC8vICBkcmF3U3ByYXkoZSk7XG4gICAgICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoICgpPT57XG4gICAgICAgICAgICAgICAgZHJhd1NwcmF5KGUpXG4gICAgICAgICAgICB9LDY0KVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHBlblVwID0gKCAoZSk9PntcbiAgICAgICAgcGFpbnQgPSBmYWxzZTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAgLy9lbmQgb2YgY3VycmVudCBwZW4gcGF0aCwgYWZ0ZXIgZGlzZW5nYWdlIG1vdXNlLiBcbiAgICAgICAgLy9pZiBub3QgbGFzdCBwYXRoIHBvaW50IHdvdWxkIGFsd2F5cyBjb25uZWN0IHRvIG5ldyBwYXRoIChjcmVhdGVkIG9uIG5leHQgbW91c2Vkb3duIGV2ZW50KVxuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpXG4gICAgICAgXG4gICAgfSk7XG5cbiAgICBjb25zdCBjbGVhclNrZXRjaHBhZCA9ICggZT0+eyAvL2NsZWFuIHNrZXRjaHBhZFxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwwLGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNoYW5nZUxpbmVXaWR0aCA9ICggZnVuY3Rpb24oKXtcbiAgICAgICAgcmFkaXVzID0gdGhpcy52YWx1ZTsgLy9nZXQgY3VycmVudCB2YWx1ZSBvZiBzZWxlY3RvciNsaW5lV2lkdGhcbiAgICB9KTtcbiAgICBjb25zdCBydWJiZXIgPSAoIChlKT0+e1xuICAgICAgICBjb2xvciA9ICd3aGl0ZSc7XG4gICAgfSlcblxuICAgIGNvbnN0IGNoYW5nZVR5cGUgPSAoZnVuY3Rpb24oKXtcbiAgICAgICAgcGVuVHlwZSA9IHRoaXMudmFsdWU7IC8vZ2V0IGN1cnJlbnQgdmFsdWUgb2Ygc2VsZWN0b3IjcGVuVHlwZVxuICAgIH0pXG5cbiAgICBjb25zdCBnZXRSYW5kb21PZmZzZXQgPSByYWRpdXMgPT4geyBcblx0XHRsZXQgcmFuZG9tX2FuZ2xlID0gTWF0aC5yYW5kb20oKSAqICgyKk1hdGguUEkpO1xuXHRcdGxldCByYW5kb21fcmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIHJhZGl1cztcblxuICAgICAgICByZXR1cm57XG5cdFx0XHR4OiBNYXRoLmNvcyhyYW5kb21fYW5nbGUpICogcmFuZG9tX3JhZGl1cyxcblx0XHRcdHk6IE1hdGguc2luKHJhbmRvbV9hbmdsZSkgKiByYW5kb21fcmFkaXVzICAgIFxuXHRcdH07XG4gICAgfVxuXG4gICAgY29uc3QgZHJhd0xpbmUgPSBlPT57IFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgbGV0IG9mZnNldExlZnQgPSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGxldCBvZmZzZXRUb3AgPSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgbGV0IG1vdXNlWCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgIGxldCBtb3VzZVkgPWUuY2xpZW50WTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY3R4LmxpbmVUbyhtb3VzZVgtb2Zmc2V0TGVmdCwgbW91c2VZLW9mZnNldFRvcClcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMobW91c2VYLW9mZnNldExlZnQsIG1vdXNlWS1vZmZzZXRUb3AsIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8obW91c2VYLW9mZnNldExlZnQsIG1vdXNlWS1vZmZzZXRUb3ApXG4gICAgfVxuICAgIGNvbnN0IGRyYXdTcHJheSA9ZT0+e1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCA1MDtpKyspe1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGdldFJhbmRvbU9mZnNldChyYWRpdXMpO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KChlLmNsaWVudFgtb2Zmc2V0LngpLWNhbnZhcy5vZmZzZXRMZWZ0LChlLmNsaWVudFktb2Zmc2V0LnkpLWNhbnZhcy5vZmZzZXRUb3AsIDEsIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vTUFJTiBEUkFXIEZOXG4gICAgY29uc3QgZHJhdyA9ICggZT0+eyBcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTsgLy9pZiBub3QgaW50ZXJ2YWwgd291bGQgbm90IHN0b3Agb24gbW91c2UgbW92ZVxuICAgICAgICBpZihwYWludCl7IFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gcmFkaXVzKjI7XG4gICAgICAgICAgIC8vIERSQVcgTElORVxuICAgICAgICAgICAgaWYocGVuVHlwZSA9PT0nYnJ1c2gnKXtcbiAgICAgICAgICAgIGRyYXdMaW5lKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIC8vRFJBVyBTUFJBWVxuICAgICAgICAgICBpZihwZW5UeXBlID09PSdzcHJheScpe1xuICAgICAgICAgICAgZHJhd1NwcmF5KGUpO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBzYXZlSW1hZ2UgPSAgZnVuY3Rpb24oKXtcbiAgICAgICAgIHZhciBkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgICAgICB0aGlzLmhyZWYgPSBkYXRhVVJMO1xuICAgICAgICAgY2xlYXJTa2V0Y2hwYWQoKTtcbiAgICB9XG4vL0VWRU5UU1xuICAgICQoJ2NhbnZhcycpLm1vdXNlbW92ZShkcmF3KTsgXG4gICAgJCgnY2FudmFzJykubW91c2Vkb3duKHBlbkRvd24pIFxuICAgICQoJ2NhbnZhcycpLm1vdXNldXAocGVuVXApO1xuICAgICQoJyNjbGVhclNrZXRjaCcpLmNsaWNrKGNsZWFyU2tldGNocGFkKTtcbiAgICAkKCcjcnViYmVyJykuY2xpY2socnViYmVyKTtcbiAgICAkKCcuY29sb3JzX3BhbGxldCBkaXYnKS5jbGljayhjaGFuZ2VDb2xvcik7XG4gICAgJCgnc2VsZWN0I2xpbmVXaWR0aCcpLmNoYW5nZShjaGFuZ2VMaW5lV2lkdGgpO1xuICAgICQoJ3NlbGVjdCNwZW5UeXBlJykuY2hhbmdlKGNoYW5nZVR5cGUpO1xuICAgICQoJyNzYXZlJykuY2xpY2soc2F2ZUltYWdlKTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);