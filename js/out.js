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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n//VARIABLES\n    let ctx = canvas.getContext('2d');\n    ctx.fillStyle = 'white';\n    ctx.fillRect(0,0,canvas.width,canvas.height);\n\n    let paint= false; //true, if the mouse is press down\n    let radius = $('select#lineWidth').val(); //radius of arc element\n    let color = 'black';\n    let penType = $('select#penType').val();\n    let intervalId = null;\n\n    \n//FUNCTIONS\n\n    const changeColor = ( (e)=>{ \n        color = $(e.currentTarget).data('color');\n    });\n\n    const penDown = ( (e)=>{\n        paint = true;\n\n        if(penType === 'brush'){\n            drawLine(e);\n        }\n        if(penType === 'spray'){\n            //  drawSpray(e);\n            intervalId = setInterval( ()=>{\n                drawSpray(e)\n            },64)\n        }\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        ctx.beginPath();  //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n        clearInterval(intervalId);\n    });\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight);\n        ctx.fillStyle = 'white';\n        ctx.fillRect(0,0,canvas.width,canvas.height);\n    });\n\n    const changeLineWidth = ( function(){\n        radius = this.value; //get current value of selector#lineWidth\n\n    });\n    const rubber = ( (e)=>{\n        color = 'white';\n    })\n\n    const changeType = (function(){\n        penType = this.value; //get current value of selector#penType\n\n    })\n\n    const getRandomOffset = radius => { \n\t\tlet random_angle = Math.random() * (2*Math.PI);\n\t\tlet random_radius = Math.random() * radius;\n\n        return{\n\t\t\tx: Math.cos(random_angle) * random_radius,\n\t\t\ty: Math.sin(random_angle) * random_radius    \n\t\t};\n    }\n\n    const drawLine = e=>{ \n            ctx.fillStyle = color;\n            let offsetLeft = canvas.offsetLeft;\n            let offsetTop = canvas.offsetTop;\n            let mouseX = e.clientX;\n            let mouseY =e.clientY;\n            \n            ctx.lineTo(mouseX-offsetLeft, mouseY-offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(mouseX-offsetLeft, mouseY-offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(mouseX-offsetLeft, mouseY-offsetTop)\n    }\n    const drawSpray =e=>{\n        ctx.fillStyle = color;\n        for(let i=0; i< 50;i++){\n            var offset = getRandomOffset(radius);\n            ctx.fillRect((e.clientX-offset.x)-canvas.offsetLeft,(e.clientY-offset.y)-canvas.offsetTop, 1, 1);\n        }\n    }\n    //MAIN DRAW Fn\n    const draw = ( e=>{ \n        clearInterval(intervalId); //if not interval would not stop on mouse move\n        if(paint){ \n            ctx.fillStyle = color;\n            ctx.strokeStyle = color;\n            ctx.lineWidth = radius*2;\n           // DRAW LINE\n            if(penType ==='brush'){\n            drawLine(e);\n            }\n          //DRAW SPRAY\n           if(penType ==='spray'){\n            drawSpray(e);\n           }\n        }\n    });\n    const saveImage =  function(){\n         var dataURL = canvas.toDataURL('image/png');\n         this.href = dataURL;\n         clearSketchpad();\n    }\n\n    const windowResize = ()=>{ \n        //resizing widow will clear canvas, need to store current ctx as image when redraw it\n        let temp_ctx = ctx.getImageData(0,0,canvas.width,canvas.height);\n        canvas.width = window.innerWidth;\n        canvas.height = window.innerHeight;\n        ctx.putImageData(temp_ctx,0,0);\n    }\n\n    const container =$('.container');\n    container.hide();\n    const toggleMenu = ()=>{\n        container.toggle();\n    }\n//EVENTS\n    $('header h1').click(toggleMenu);\n\n    $('canvas').mousemove(draw); \n    $('canvas').on('vmousemove',draw); \n\n    $('canvas').mousedown(penDown) \n    $('canvas').on('vmousedown',penDown); \n    \n    $('canvas').on('mouseup',penUp);\n    $('canvas').on('vmouseout',penUp);\n\n    $('#clearSketch').click(clearSketchpad);\n    $('#rubber').click(rubber);\n    \n    $('.colors_pallet div').click(changeColor);\n    \n    $('select#lineWidth').change(changeLineWidth);\n    $('select#penType').change(changeType);\n    \n    $('#save').click(saveImage);\n\n    $(window).on('resize', windowResize);\n    \n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQiw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxnQztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxLQUFLOztBQUVMLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNEJBQTRCOztBQUU1QixLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2QkFBNkI7O0FBRTdCLEtBQUs7O0FBRUwsdUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCO0FBQ0Esa0NBQWtDO0FBQ2xDLGtCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0M7QUFDQSxzQzs7QUFFQTtBQUNBLHlDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KCgpPT57XG5cbi8vQ0FOVkFTIFNFVFVQXG4gICAgY29uc3QgY2FudmFzPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbi8vVkFSSUFCTEVTXG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgIGN0eC5maWxsUmVjdCgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgbGV0IHBhaW50PSBmYWxzZTsgLy90cnVlLCBpZiB0aGUgbW91c2UgaXMgcHJlc3MgZG93blxuICAgIGxldCByYWRpdXMgPSAkKCdzZWxlY3QjbGluZVdpZHRoJykudmFsKCk7IC8vcmFkaXVzIG9mIGFyYyBlbGVtZW50XG4gICAgbGV0IGNvbG9yID0gJ2JsYWNrJztcbiAgICBsZXQgcGVuVHlwZSA9ICQoJ3NlbGVjdCNwZW5UeXBlJykudmFsKCk7XG4gICAgbGV0IGludGVydmFsSWQgPSBudWxsO1xuXG4gICAgXG4vL0ZVTkNUSU9OU1xuXG4gICAgY29uc3QgY2hhbmdlQ29sb3IgPSAoIChlKT0+eyBcbiAgICAgICAgY29sb3IgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnY29sb3InKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBlbkRvd24gPSAoIChlKT0+e1xuICAgICAgICBwYWludCA9IHRydWU7XG5cbiAgICAgICAgaWYocGVuVHlwZSA9PT0gJ2JydXNoJyl7XG4gICAgICAgICAgICBkcmF3TGluZShlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihwZW5UeXBlID09PSAnc3ByYXknKXtcbiAgICAgICAgICAgIC8vICBkcmF3U3ByYXkoZSk7XG4gICAgICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoICgpPT57XG4gICAgICAgICAgICAgICAgZHJhd1NwcmF5KGUpXG4gICAgICAgICAgICB9LDY0KVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHBlblVwID0gKCAoZSk9PntcbiAgICAgICAgcGFpbnQgPSBmYWxzZTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAgLy9lbmQgb2YgY3VycmVudCBwZW4gcGF0aCwgYWZ0ZXIgZGlzZW5nYWdlIG1vdXNlLiBcbiAgICAgICAgLy9pZiBub3QgbGFzdCBwYXRoIHBvaW50IHdvdWxkIGFsd2F5cyBjb25uZWN0IHRvIG5ldyBwYXRoIChjcmVhdGVkIG9uIG5leHQgbW91c2Vkb3duIGV2ZW50KVxuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2xlYXJTa2V0Y2hwYWQgPSAoIGU9PnsgLy9jbGVhbiBza2V0Y2hwYWRcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsMCxjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjaGFuZ2VMaW5lV2lkdGggPSAoIGZ1bmN0aW9uKCl7XG4gICAgICAgIHJhZGl1cyA9IHRoaXMudmFsdWU7IC8vZ2V0IGN1cnJlbnQgdmFsdWUgb2Ygc2VsZWN0b3IjbGluZVdpZHRoXG5cbiAgICB9KTtcbiAgICBjb25zdCBydWJiZXIgPSAoIChlKT0+e1xuICAgICAgICBjb2xvciA9ICd3aGl0ZSc7XG4gICAgfSlcblxuICAgIGNvbnN0IGNoYW5nZVR5cGUgPSAoZnVuY3Rpb24oKXtcbiAgICAgICAgcGVuVHlwZSA9IHRoaXMudmFsdWU7IC8vZ2V0IGN1cnJlbnQgdmFsdWUgb2Ygc2VsZWN0b3IjcGVuVHlwZVxuXG4gICAgfSlcblxuICAgIGNvbnN0IGdldFJhbmRvbU9mZnNldCA9IHJhZGl1cyA9PiB7IFxuXHRcdGxldCByYW5kb21fYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogKDIqTWF0aC5QSSk7XG5cdFx0bGV0IHJhbmRvbV9yYWRpdXMgPSBNYXRoLnJhbmRvbSgpICogcmFkaXVzO1xuXG4gICAgICAgIHJldHVybntcblx0XHRcdHg6IE1hdGguY29zKHJhbmRvbV9hbmdsZSkgKiByYW5kb21fcmFkaXVzLFxuXHRcdFx0eTogTWF0aC5zaW4ocmFuZG9tX2FuZ2xlKSAqIHJhbmRvbV9yYWRpdXMgICAgXG5cdFx0fTtcbiAgICB9XG5cbiAgICBjb25zdCBkcmF3TGluZSA9IGU9PnsgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgbGV0IG9mZnNldFRvcCA9IGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBsZXQgbW91c2VYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgbGV0IG1vdXNlWSA9ZS5jbGllbnRZO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjdHgubGluZVRvKG1vdXNlWC1vZmZzZXRMZWZ0LCBtb3VzZVktb2Zmc2V0VG9wKVxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmFyYyhtb3VzZVgtb2Zmc2V0TGVmdCwgbW91c2VZLW9mZnNldFRvcCwgcmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhtb3VzZVgtb2Zmc2V0TGVmdCwgbW91c2VZLW9mZnNldFRvcClcbiAgICB9XG4gICAgY29uc3QgZHJhd1NwcmF5ID1lPT57XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8IDUwO2krKyl7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gZ2V0UmFuZG9tT2Zmc2V0KHJhZGl1cyk7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoKGUuY2xpZW50WC1vZmZzZXQueCktY2FudmFzLm9mZnNldExlZnQsKGUuY2xpZW50WS1vZmZzZXQueSktY2FudmFzLm9mZnNldFRvcCwgMSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9NQUlOIERSQVcgRm5cbiAgICBjb25zdCBkcmF3ID0gKCBlPT57IFxuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpOyAvL2lmIG5vdCBpbnRlcnZhbCB3b3VsZCBub3Qgc3RvcCBvbiBtb3VzZSBtb3ZlXG4gICAgICAgIGlmKHBhaW50KXsgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSByYWRpdXMqMjtcbiAgICAgICAgICAgLy8gRFJBVyBMSU5FXG4gICAgICAgICAgICBpZihwZW5UeXBlID09PSdicnVzaCcpe1xuICAgICAgICAgICAgZHJhd0xpbmUoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLy9EUkFXIFNQUkFZXG4gICAgICAgICAgIGlmKHBlblR5cGUgPT09J3NwcmF5Jyl7XG4gICAgICAgICAgICBkcmF3U3ByYXkoZSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHNhdmVJbWFnZSA9ICBmdW5jdGlvbigpe1xuICAgICAgICAgdmFyIGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICAgICAgIHRoaXMuaHJlZiA9IGRhdGFVUkw7XG4gICAgICAgICBjbGVhclNrZXRjaHBhZCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHdpbmRvd1Jlc2l6ZSA9ICgpPT57IFxuICAgICAgICAvL3Jlc2l6aW5nIHdpZG93IHdpbGwgY2xlYXIgY2FudmFzLCBuZWVkIHRvIHN0b3JlIGN1cnJlbnQgY3R4IGFzIGltYWdlIHdoZW4gcmVkcmF3IGl0XG4gICAgICAgIGxldCB0ZW1wX2N0eCA9IGN0eC5nZXRJbWFnZURhdGEoMCwwLGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEodGVtcF9jdHgsMCwwKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250YWluZXIgPSQoJy5jb250YWluZXInKTtcbiAgICBjb250YWluZXIuaGlkZSgpO1xuICAgIGNvbnN0IHRvZ2dsZU1lbnUgPSAoKT0+e1xuICAgICAgICBjb250YWluZXIudG9nZ2xlKCk7XG4gICAgfVxuLy9FVkVOVFNcbiAgICAkKCdoZWFkZXIgaDEnKS5jbGljayh0b2dnbGVNZW51KTtcblxuICAgICQoJ2NhbnZhcycpLm1vdXNlbW92ZShkcmF3KTsgXG4gICAgJCgnY2FudmFzJykub24oJ3Ztb3VzZW1vdmUnLGRyYXcpOyBcblxuICAgICQoJ2NhbnZhcycpLm1vdXNlZG93bihwZW5Eb3duKSBcbiAgICAkKCdjYW52YXMnKS5vbigndm1vdXNlZG93bicscGVuRG93bik7IFxuICAgIFxuICAgICQoJ2NhbnZhcycpLm9uKCdtb3VzZXVwJyxwZW5VcCk7XG4gICAgJCgnY2FudmFzJykub24oJ3Ztb3VzZW91dCcscGVuVXApO1xuXG4gICAgJCgnI2NsZWFyU2tldGNoJykuY2xpY2soY2xlYXJTa2V0Y2hwYWQpO1xuICAgICQoJyNydWJiZXInKS5jbGljayhydWJiZXIpO1xuICAgIFxuICAgICQoJy5jb2xvcnNfcGFsbGV0IGRpdicpLmNsaWNrKGNoYW5nZUNvbG9yKTtcbiAgICBcbiAgICAkKCdzZWxlY3QjbGluZVdpZHRoJykuY2hhbmdlKGNoYW5nZUxpbmVXaWR0aCk7XG4gICAgJCgnc2VsZWN0I3BlblR5cGUnKS5jaGFuZ2UoY2hhbmdlVHlwZSk7XG4gICAgXG4gICAgJCgnI3NhdmUnKS5jbGljayhzYXZlSW1hZ2UpO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCB3aW5kb3dSZXNpemUpO1xuICAgIFxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);