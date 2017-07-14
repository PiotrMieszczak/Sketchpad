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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n//VARIABLES\n    const ctx = canvas.getContext('2d');\n    ctx.fillStyle = 'white';\n    ctx.fillRect(0,0,canvas.width,canvas.height);\n\n    let paint= false; //true, if the mouse is press down\n    let radius = $('select#lineWidth').val(); //radius of arc element\n    let color = 'black';\n    let penType = $('select#penType').val();\n    let intervalId = null;\n \n//FUNCTIONS\n\n    const brushOrSpray = (e)=>{\n           // DRAW Brush\n            if(penType ==='brush'){\n            drawLine(e);\n            }\n          //DRAW SPRAY\n           if(penType ==='spray'){\n                drawSpray(e);\n                intervalId = setInterval( ()=>{ //\n                drawSpray(e);\n                },64);\n           }\n    }\n    const changeColor = ( (e)=>{ \n         color = $(e.currentTarget).data('color');\n         clearInterval(intervalId);\n          toggleMenu();\n    });\n    \n    const penDown = ( (e)=>{\n        paint = true;\n        ctx.fillStyle = color;\n        ctx.strokeStyle = color;\n        ctx.lineWidth = radius*2;\n\n       brushOrSpray(e);\n\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        clearInterval(intervalId);\n        ctx.beginPath();  //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n    });\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight);\n        ctx.fillStyle = 'white';\n        ctx.fillRect(0,0,canvas.width,canvas.height);\n        toggleMenu();\n    });\n\n    const changeLineWidth = ( function(){\n        radius = this.value; //get current value of selector#lineWidth\n        toggleMenu();\n    });\n    const rubber = ( (e)=>{\n        color = 'white';\n        toggleMenu();\n    })\n\n    const changeType = (function(){\n        penType = this.value; //get current value of selector#penType\n        toggleMenu();\n    })\n\n    const getRandomOffset = radius => { \n\t\tlet random_angle = Math.random() * (2*Math.PI);\n\t\tlet random_radius = Math.random() * radius;\n\n        return{\n\t\t\tx: Math.cos(random_angle) * random_radius,\n\t\t\ty: Math.sin(random_angle) * random_radius    \n\t\t};\n    }\n\n    const drawLine = e=>{ \n            \n            let offsetLeft = canvas.offsetLeft;\n            let offsetTop = canvas.offsetTop;\n            let mouseX = e.clientX;\n            let mouseY =e.clientY;\n            \n            ctx.lineTo(mouseX-offsetLeft, mouseY-offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(mouseX-offsetLeft, mouseY-offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(mouseX-offsetLeft, mouseY-offsetTop)\n    }\n    const drawSpray =e=>{\n        \n        for(let i=0; i< 50;i++){\n            var offset = getRandomOffset(radius);\n            ctx.fillRect((e.clientX-offset.x)-canvas.offsetLeft,(e.clientY-offset.y)-canvas.offsetTop, 1, 1);\n        }\n    }\n    //MAIN DRAW FN\n    const draw = ( e=>{ \n        clearInterval(intervalId); //if not interval would not stop on mouse move\n        \n        if(paint){ \n             brushOrSpray(e); \n        }\n    });\n    \n    const saveImage =  function(){\n         var dataURL = canvas.toDataURL('image/png');\n         this.href = dataURL;\n         clearSketchpad();\n         toggleMenu();\n    }\n\n\n    const windowResize = ()=>{ \n        //resizing widow will clear canvas, need to store current ctx as image when redraw it\n        let temp_ctx = ctx.getImageData(0,0,canvas.width,canvas.height);\n        canvas.width = window.innerWidth;\n        canvas.height = window.innerHeight;\n        ctx.putImageData(temp_ctx,0,0);\n    }\n\n    const container = $('.container');\n     container.hide();\n     \n     const toggleMenu = ()=>{\n         container.toggle();\n    }\n//EVENTS\n    $('header h1').click(toggleMenu);\n    $(canvas).on('vmousemove',draw); \n    $(canvas).on('vmousedown',penDown); \n    $(canvas).on('vmouseup',penUp);\n\n    $('#clearSketch').click(clearSketchpad);\n    $('#rubber').click(rubber);\n    \n    $('.colors_pallet div').click(changeColor);\n    \n    $('select#lineWidth').change(changeLineWidth);\n    $('select#penType').change(changeType);\n    \n    $('#save').click(saveImage);\n    $(window).on('resize', windowResize);\n    \n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQiw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0EsS0FBSzs7QUFFTCxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxLQUFLOztBQUVMLHVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUI7QUFDQSxrQ0FBa0M7O0FBRWxDLGtCO0FBQ0EsNkI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSw4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQztBQUNBLHVDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoKCk9PntcblxuLy9DQU5WQVMgU0VUVVBcbiAgICBjb25zdCBjYW52YXM9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy9WQVJJQUJMRVNcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICBjdHguZmlsbFJlY3QoMCwwLGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KTtcblxuICAgIGxldCBwYWludD0gZmFsc2U7IC8vdHJ1ZSwgaWYgdGhlIG1vdXNlIGlzIHByZXNzIGRvd25cbiAgICBsZXQgcmFkaXVzID0gJCgnc2VsZWN0I2xpbmVXaWR0aCcpLnZhbCgpOyAvL3JhZGl1cyBvZiBhcmMgZWxlbWVudFxuICAgIGxldCBjb2xvciA9ICdibGFjayc7XG4gICAgbGV0IHBlblR5cGUgPSAkKCdzZWxlY3QjcGVuVHlwZScpLnZhbCgpO1xuICAgIGxldCBpbnRlcnZhbElkID0gbnVsbDtcbiBcbi8vRlVOQ1RJT05TXG5cbiAgICBjb25zdCBicnVzaE9yU3ByYXkgPSAoZSk9PntcbiAgICAgICAgICAgLy8gRFJBVyBCcnVzaFxuICAgICAgICAgICAgaWYocGVuVHlwZSA9PT0nYnJ1c2gnKXtcbiAgICAgICAgICAgIGRyYXdMaW5lKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIC8vRFJBVyBTUFJBWVxuICAgICAgICAgICBpZihwZW5UeXBlID09PSdzcHJheScpe1xuICAgICAgICAgICAgICAgIGRyYXdTcHJheShlKTtcbiAgICAgICAgICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoICgpPT57IC8vXG4gICAgICAgICAgICAgICAgZHJhd1NwcmF5KGUpO1xuICAgICAgICAgICAgICAgIH0sNjQpO1xuICAgICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGNoYW5nZUNvbG9yID0gKCAoZSk9PnsgXG4gICAgICAgICBjb2xvciA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjb2xvcicpO1xuICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgcGVuRG93biA9ICggKGUpPT57XG4gICAgICAgIHBhaW50ID0gdHJ1ZTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHJhZGl1cyoyO1xuXG4gICAgICAgYnJ1c2hPclNwcmF5KGUpO1xuXG4gICAgfSlcblxuICAgIGNvbnN0IHBlblVwID0gKCAoZSk9PntcbiAgICAgICAgcGFpbnQgPSBmYWxzZTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAgLy9lbmQgb2YgY3VycmVudCBwZW4gcGF0aCwgYWZ0ZXIgZGlzZW5nYWdlIG1vdXNlLiBcbiAgICAgICAgLy9pZiBub3QgbGFzdCBwYXRoIHBvaW50IHdvdWxkIGFsd2F5cyBjb25uZWN0IHRvIG5ldyBwYXRoIChjcmVhdGVkIG9uIG5leHQgbW91c2Vkb3duIGV2ZW50KVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2xlYXJTa2V0Y2hwYWQgPSAoIGU9PnsgLy9jbGVhbiBza2V0Y2hwYWRcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsMCxjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNoYW5nZUxpbmVXaWR0aCA9ICggZnVuY3Rpb24oKXtcbiAgICAgICAgcmFkaXVzID0gdGhpcy52YWx1ZTsgLy9nZXQgY3VycmVudCB2YWx1ZSBvZiBzZWxlY3RvciNsaW5lV2lkdGhcbiAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgIH0pO1xuICAgIGNvbnN0IHJ1YmJlciA9ICggKGUpPT57XG4gICAgICAgIGNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgIH0pXG5cbiAgICBjb25zdCBjaGFuZ2VUeXBlID0gKGZ1bmN0aW9uKCl7XG4gICAgICAgIHBlblR5cGUgPSB0aGlzLnZhbHVlOyAvL2dldCBjdXJyZW50IHZhbHVlIG9mIHNlbGVjdG9yI3BlblR5cGVcbiAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgIH0pXG5cbiAgICBjb25zdCBnZXRSYW5kb21PZmZzZXQgPSByYWRpdXMgPT4geyBcblx0XHRsZXQgcmFuZG9tX2FuZ2xlID0gTWF0aC5yYW5kb20oKSAqICgyKk1hdGguUEkpO1xuXHRcdGxldCByYW5kb21fcmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIHJhZGl1cztcblxuICAgICAgICByZXR1cm57XG5cdFx0XHR4OiBNYXRoLmNvcyhyYW5kb21fYW5nbGUpICogcmFuZG9tX3JhZGl1cyxcblx0XHRcdHk6IE1hdGguc2luKHJhbmRvbV9hbmdsZSkgKiByYW5kb21fcmFkaXVzICAgIFxuXHRcdH07XG4gICAgfVxuXG4gICAgY29uc3QgZHJhd0xpbmUgPSBlPT57IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgbGV0IG9mZnNldFRvcCA9IGNhbnZhcy5vZmZzZXRUb3A7XG4gICAgICAgICAgICBsZXQgbW91c2VYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgbGV0IG1vdXNlWSA9ZS5jbGllbnRZO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjdHgubGluZVRvKG1vdXNlWC1vZmZzZXRMZWZ0LCBtb3VzZVktb2Zmc2V0VG9wKVxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmFyYyhtb3VzZVgtb2Zmc2V0TGVmdCwgbW91c2VZLW9mZnNldFRvcCwgcmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhtb3VzZVgtb2Zmc2V0TGVmdCwgbW91c2VZLW9mZnNldFRvcClcbiAgICB9XG4gICAgY29uc3QgZHJhd1NwcmF5ID1lPT57XG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGk9MDsgaTwgNTA7aSsrKXtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBnZXRSYW5kb21PZmZzZXQocmFkaXVzKTtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgoZS5jbGllbnRYLW9mZnNldC54KS1jYW52YXMub2Zmc2V0TGVmdCwoZS5jbGllbnRZLW9mZnNldC55KS1jYW52YXMub2Zmc2V0VG9wLCAxLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL01BSU4gRFJBVyBGTlxuICAgIGNvbnN0IGRyYXcgPSAoIGU9PnsgXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7IC8vaWYgbm90IGludGVydmFsIHdvdWxkIG5vdCBzdG9wIG9uIG1vdXNlIG1vdmVcbiAgICAgICAgXG4gICAgICAgIGlmKHBhaW50KXsgXG4gICAgICAgICAgICAgYnJ1c2hPclNwcmF5KGUpOyBcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IHNhdmVJbWFnZSA9ICBmdW5jdGlvbigpe1xuICAgICAgICAgdmFyIGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICAgICAgIHRoaXMuaHJlZiA9IGRhdGFVUkw7XG4gICAgICAgICBjbGVhclNrZXRjaHBhZCgpO1xuICAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgIH1cblxuXG4gICAgY29uc3Qgd2luZG93UmVzaXplID0gKCk9PnsgXG4gICAgICAgIC8vcmVzaXppbmcgd2lkb3cgd2lsbCBjbGVhciBjYW52YXMsIG5lZWQgdG8gc3RvcmUgY3VycmVudCBjdHggYXMgaW1hZ2Ugd2hlbiByZWRyYXcgaXRcbiAgICAgICAgbGV0IHRlbXBfY3R4ID0gY3R4LmdldEltYWdlRGF0YSgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YSh0ZW1wX2N0eCwwLDApO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQoJy5jb250YWluZXInKTtcbiAgICAgY29udGFpbmVyLmhpZGUoKTtcbiAgICAgXG4gICAgIGNvbnN0IHRvZ2dsZU1lbnUgPSAoKT0+e1xuICAgICAgICAgY29udGFpbmVyLnRvZ2dsZSgpO1xuICAgIH1cbi8vRVZFTlRTXG4gICAgJCgnaGVhZGVyIGgxJykuY2xpY2sodG9nZ2xlTWVudSk7XG4gICAgJChjYW52YXMpLm9uKCd2bW91c2Vtb3ZlJyxkcmF3KTsgXG4gICAgJChjYW52YXMpLm9uKCd2bW91c2Vkb3duJyxwZW5Eb3duKTsgXG4gICAgJChjYW52YXMpLm9uKCd2bW91c2V1cCcscGVuVXApO1xuXG4gICAgJCgnI2NsZWFyU2tldGNoJykuY2xpY2soY2xlYXJTa2V0Y2hwYWQpO1xuICAgICQoJyNydWJiZXInKS5jbGljayhydWJiZXIpO1xuICAgIFxuICAgICQoJy5jb2xvcnNfcGFsbGV0IGRpdicpLmNsaWNrKGNoYW5nZUNvbG9yKTtcbiAgICBcbiAgICAkKCdzZWxlY3QjbGluZVdpZHRoJykuY2hhbmdlKGNoYW5nZUxpbmVXaWR0aCk7XG4gICAgJCgnc2VsZWN0I3BlblR5cGUnKS5jaGFuZ2UoY2hhbmdlVHlwZSk7XG4gICAgXG4gICAgJCgnI3NhdmUnKS5jbGljayhzYXZlSW1hZ2UpO1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgd2luZG93UmVzaXplKTtcbiAgICBcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);