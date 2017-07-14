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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n//VARIABLES\n    const ctx = canvas.getContext('2d');\n    ctx.fillStyle = 'white';\n    ctx.fillRect(0,0,canvas.width,canvas.height);\n\n    let paint= false; //true, if the mouse is press down\n    let radius = $('select#lineWidth').val(); //radius of arc element\n    let color = 'black';\n    let penType = $('select#penType').val();\n    let intervalId = null;\n\n \n//FUNCTIONS\n\n    const changeColor = ( (e)=>{ \n         color = $(e.currentTarget).data('color');\n         clearInterval(intervalId);\n          toggleMenu();\n    });\n\n    const penDown = ( (e)=>{\n        paint = true;\n        ctx.fillStyle = color;\n        ctx.strokeStyle = color;\n        ctx.lineWidth = radius*2;\n\n        if(penType === 'brush'){\n            drawLine(e);\n        }\n        if(penType === 'spray'){\n            intervalId = setInterval( ()=>{\n                drawSpray(e);\n            },64);\n        }\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        clearInterval(intervalId);\n        ctx.beginPath();  //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n    });\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight);\n        ctx.fillStyle = 'white';\n        ctx.fillRect(0,0,canvas.width,canvas.height);\n        toggleMenu();\n    });\n\n    const changeLineWidth = ( function(){\n        radius = this.value; //get current value of selector#lineWidth\n        toggleMenu();\n    });\n    const rubber = ( (e)=>{\n        color = 'white';\n        toggleMenu();\n    })\n\n    const changeType = (function(){\n        penType = this.value; //get current value of selector#penType\n        toggleMenu();\n    })\n\n    const getRandomOffset = radius => { \n\t\tlet random_angle = Math.random() * (2*Math.PI);\n\t\tlet random_radius = Math.random() * radius;\n\n        return{\n\t\t\tx: Math.cos(random_angle) * random_radius,\n\t\t\ty: Math.sin(random_angle) * random_radius    \n\t\t};\n    }\n\n    const drawLine = e=>{ \n            \n            let offsetLeft = canvas.offsetLeft;\n            let offsetTop = canvas.offsetTop;\n            let mouseX = e.clientX;\n            let mouseY =e.clientY;\n            \n            ctx.lineTo(mouseX-offsetLeft, mouseY-offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(mouseX-offsetLeft, mouseY-offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(mouseX-offsetLeft, mouseY-offsetTop)\n    }\n    const drawSpray =e=>{\n        \n        for(let i=0; i< 50;i++){\n            var offset = getRandomOffset(radius);\n            ctx.fillRect((e.clientX-offset.x)-canvas.offsetLeft,(e.clientY-offset.y)-canvas.offsetTop, 1, 1);\n        }\n    }\n    //MAIN DRAW FN\n    const draw = ( e=>{ \n        clearInterval(intervalId); //if not interval would not stop on mouse move\n        if(paint){ \n           // DRAW LINE\n            if(penType ==='brush'){\n            drawLine(e);\n            }\n          //DRAW SPRAY\n           if(penType ==='spray'){\n                drawSpray(e);\n           }\n        }\n    });\n    const saveImage =  function(){\n         var dataURL = canvas.toDataURL('image/png');\n         this.href = dataURL;\n         clearSketchpad();\n         toggleMenu();\n    }\n\n\n    const windowResize = ()=>{ \n        //resizing widow will clear canvas, need to store current ctx as image when redraw it\n        let temp_ctx = ctx.getImageData(0,0,canvas.width,canvas.height);\n        canvas.width = window.innerWidth;\n        canvas.height = window.innerHeight;\n        ctx.putImageData(temp_ctx,0,0);\n    }\n\n    const container = $('.container');\n     container.hide();\n     \n     const toggleMenu = ()=>{\n         container.toggle();\n    }\n//EVENTS\n    $('header h1').click(toggleMenu);\n    $(canvas).on('vmousemove',draw); \n    $(canvas).on('vmousedown',penDown); \n    $(canvas).on('vmouseup',penUp);\n\n    $('#clearSketch').click(clearSketchpad);\n    $('#rubber').click(rubber);\n    \n    $('.colors_pallet div').click(changeColor);\n    \n    $('select#lineWidth').change(changeLineWidth);\n    $('select#penType').change(changeType);\n    \n    $('#save').click(saveImage);\n    $(window).on('resize', windowResize);\n    \n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQiw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxnQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLEtBQUs7O0FBRUwsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsS0FBSzs7QUFFTCx1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCO0FBQ0Esa0NBQWtDO0FBQ2xDLGtCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsOEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0M7QUFDQSx1QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUMiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KCgpPT57XG5cbi8vQ0FOVkFTIFNFVFVQXG4gICAgY29uc3QgY2FudmFzPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbi8vVkFSSUFCTEVTXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgY3R4LmZpbGxSZWN0KDAsMCxjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodCk7XG5cbiAgICBsZXQgcGFpbnQ9IGZhbHNlOyAvL3RydWUsIGlmIHRoZSBtb3VzZSBpcyBwcmVzcyBkb3duXG4gICAgbGV0IHJhZGl1cyA9ICQoJ3NlbGVjdCNsaW5lV2lkdGgnKS52YWwoKTsgLy9yYWRpdXMgb2YgYXJjIGVsZW1lbnRcbiAgICBsZXQgY29sb3IgPSAnYmxhY2snO1xuICAgIGxldCBwZW5UeXBlID0gJCgnc2VsZWN0I3BlblR5cGUnKS52YWwoKTtcbiAgICBsZXQgaW50ZXJ2YWxJZCA9IG51bGw7XG5cbiBcbi8vRlVOQ1RJT05TXG5cbiAgICBjb25zdCBjaGFuZ2VDb2xvciA9ICggKGUpPT57IFxuICAgICAgICAgY29sb3IgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnY29sb3InKTtcbiAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcGVuRG93biA9ICggKGUpPT57XG4gICAgICAgIHBhaW50ID0gdHJ1ZTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHJhZGl1cyoyO1xuXG4gICAgICAgIGlmKHBlblR5cGUgPT09ICdicnVzaCcpe1xuICAgICAgICAgICAgZHJhd0xpbmUoZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYocGVuVHlwZSA9PT0gJ3NwcmF5Jyl7XG4gICAgICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoICgpPT57XG4gICAgICAgICAgICAgICAgZHJhd1NwcmF5KGUpO1xuICAgICAgICAgICAgfSw2NCk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcGVuVXAgPSAoIChlKT0+e1xuICAgICAgICBwYWludCA9IGZhbHNlO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7ICAvL2VuZCBvZiBjdXJyZW50IHBlbiBwYXRoLCBhZnRlciBkaXNlbmdhZ2UgbW91c2UuIFxuICAgICAgICAvL2lmIG5vdCBsYXN0IHBhdGggcG9pbnQgd291bGQgYWx3YXlzIGNvbm5lY3QgdG8gbmV3IHBhdGggKGNyZWF0ZWQgb24gbmV4dCBtb3VzZWRvd24gZXZlbnQpXG4gICAgfSk7XG5cbiAgICBjb25zdCBjbGVhclNrZXRjaHBhZCA9ICggZT0+eyAvL2NsZWFuIHNrZXRjaHBhZFxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwwLGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2hhbmdlTGluZVdpZHRoID0gKCBmdW5jdGlvbigpe1xuICAgICAgICByYWRpdXMgPSB0aGlzLnZhbHVlOyAvL2dldCBjdXJyZW50IHZhbHVlIG9mIHNlbGVjdG9yI2xpbmVXaWR0aFxuICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfSk7XG4gICAgY29uc3QgcnViYmVyID0gKCAoZSk9PntcbiAgICAgICAgY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfSlcblxuICAgIGNvbnN0IGNoYW5nZVR5cGUgPSAoZnVuY3Rpb24oKXtcbiAgICAgICAgcGVuVHlwZSA9IHRoaXMudmFsdWU7IC8vZ2V0IGN1cnJlbnQgdmFsdWUgb2Ygc2VsZWN0b3IjcGVuVHlwZVxuICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfSlcblxuICAgIGNvbnN0IGdldFJhbmRvbU9mZnNldCA9IHJhZGl1cyA9PiB7IFxuXHRcdGxldCByYW5kb21fYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogKDIqTWF0aC5QSSk7XG5cdFx0bGV0IHJhbmRvbV9yYWRpdXMgPSBNYXRoLnJhbmRvbSgpICogcmFkaXVzO1xuXG4gICAgICAgIHJldHVybntcblx0XHRcdHg6IE1hdGguY29zKHJhbmRvbV9hbmdsZSkgKiByYW5kb21fcmFkaXVzLFxuXHRcdFx0eTogTWF0aC5zaW4ocmFuZG9tX2FuZ2xlKSAqIHJhbmRvbV9yYWRpdXMgICAgXG5cdFx0fTtcbiAgICB9XG5cbiAgICBjb25zdCBkcmF3TGluZSA9IGU9PnsgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0VG9wID0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGxldCBtb3VzZVggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICBsZXQgbW91c2VZID1lLmNsaWVudFk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGN0eC5saW5lVG8obW91c2VYLW9mZnNldExlZnQsIG1vdXNlWS1vZmZzZXRUb3ApXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHguYXJjKG1vdXNlWC1vZmZzZXRMZWZ0LCBtb3VzZVktb2Zmc2V0VG9wLCByYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgubW92ZVRvKG1vdXNlWC1vZmZzZXRMZWZ0LCBtb3VzZVktb2Zmc2V0VG9wKVxuICAgIH1cbiAgICBjb25zdCBkcmF3U3ByYXkgPWU9PntcbiAgICAgICAgXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCA1MDtpKyspe1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGdldFJhbmRvbU9mZnNldChyYWRpdXMpO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KChlLmNsaWVudFgtb2Zmc2V0LngpLWNhbnZhcy5vZmZzZXRMZWZ0LChlLmNsaWVudFktb2Zmc2V0LnkpLWNhbnZhcy5vZmZzZXRUb3AsIDEsIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vTUFJTiBEUkFXIEZOXG4gICAgY29uc3QgZHJhdyA9ICggZT0+eyBcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTsgLy9pZiBub3QgaW50ZXJ2YWwgd291bGQgbm90IHN0b3Agb24gbW91c2UgbW92ZVxuICAgICAgICBpZihwYWludCl7IFxuICAgICAgICAgICAvLyBEUkFXIExJTkVcbiAgICAgICAgICAgIGlmKHBlblR5cGUgPT09J2JydXNoJyl7XG4gICAgICAgICAgICBkcmF3TGluZShlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvL0RSQVcgU1BSQVlcbiAgICAgICAgICAgaWYocGVuVHlwZSA9PT0nc3ByYXknKXtcbiAgICAgICAgICAgICAgICBkcmF3U3ByYXkoZSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHNhdmVJbWFnZSA9ICBmdW5jdGlvbigpe1xuICAgICAgICAgdmFyIGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICAgICAgIHRoaXMuaHJlZiA9IGRhdGFVUkw7XG4gICAgICAgICBjbGVhclNrZXRjaHBhZCgpO1xuICAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgIH1cblxuXG4gICAgY29uc3Qgd2luZG93UmVzaXplID0gKCk9PnsgXG4gICAgICAgIC8vcmVzaXppbmcgd2lkb3cgd2lsbCBjbGVhciBjYW52YXMsIG5lZWQgdG8gc3RvcmUgY3VycmVudCBjdHggYXMgaW1hZ2Ugd2hlbiByZWRyYXcgaXRcbiAgICAgICAgbGV0IHRlbXBfY3R4ID0gY3R4LmdldEltYWdlRGF0YSgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YSh0ZW1wX2N0eCwwLDApO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQoJy5jb250YWluZXInKTtcbiAgICAgY29udGFpbmVyLmhpZGUoKTtcbiAgICAgXG4gICAgIGNvbnN0IHRvZ2dsZU1lbnUgPSAoKT0+e1xuICAgICAgICAgY29udGFpbmVyLnRvZ2dsZSgpO1xuICAgIH1cbi8vRVZFTlRTXG4gICAgJCgnaGVhZGVyIGgxJykuY2xpY2sodG9nZ2xlTWVudSk7XG4gICAgJChjYW52YXMpLm9uKCd2bW91c2Vtb3ZlJyxkcmF3KTsgXG4gICAgJChjYW52YXMpLm9uKCd2bW91c2Vkb3duJyxwZW5Eb3duKTsgXG4gICAgJChjYW52YXMpLm9uKCd2bW91c2V1cCcscGVuVXApO1xuXG4gICAgJCgnI2NsZWFyU2tldGNoJykuY2xpY2soY2xlYXJTa2V0Y2hwYWQpO1xuICAgICQoJyNydWJiZXInKS5jbGljayhydWJiZXIpO1xuICAgIFxuICAgICQoJy5jb2xvcnNfcGFsbGV0IGRpdicpLmNsaWNrKGNoYW5nZUNvbG9yKTtcbiAgICBcbiAgICAkKCdzZWxlY3QjbGluZVdpZHRoJykuY2hhbmdlKGNoYW5nZUxpbmVXaWR0aCk7XG4gICAgJCgnc2VsZWN0I3BlblR5cGUnKS5jaGFuZ2UoY2hhbmdlVHlwZSk7XG4gICAgXG4gICAgJCgnI3NhdmUnKS5jbGljayhzYXZlSW1hZ2UpO1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgd2luZG93UmVzaXplKTtcbiAgICBcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);