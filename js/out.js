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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n\n//VARIABLES\n    const ctx = canvas.getContext('2d');\n    let paint= false; //true, if the mouse is press down\n    let radius = $('select#lineWidth').val(); //radius of arc element\n    let color = 'black';\n    let penType = $('select#penType').val();\n    let spray = false;\n//FUNCTIONS\n    let help = false;\n    let intervalId = null;\n    \n    const changeColor = ( (e)=>{ \n        color = $(e.currentTarget).data('color');\n    });\n\n    const penDown = ( (e)=>{\n        paint = true;\n        if(penType === 'spray' || help){\n            intervalId = setInterval( ()=>{\n                console.log('test')\n                drawSpray(e)\n            },64)\n        }\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        ctx.beginPath(); \n        clearInterval(intervalId)\n        //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n    });\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)\n    });\n\n    const changeLineWidth = ( function(){\n        radius = this.value; //get current value of selector#lineWidth\n    });\n    const rubber = ( (e)=>{\n        color = 'white';\n    })\n\n    const changeType = (function(){\n        penType = this.value; //get current value of selector#penType\n    })\n\n    const getRandomOffset = radius => { \n\t\tlet random_angle = Math.random() * (2*Math.PI);\n\t\tlet random_radius = Math.random() * radius;\n\n        return{\n\t\t\tx: Math.cos(random_angle) * random_radius,\n\t\t\ty: Math.sin(random_angle) * random_radius    \n\t\t};\n    }\n\n    const drawLine = e=>{\n            let offsetLeft = canvas.offsetLeft;\n            let offsetTop = canvas.offsetTop;\n            let mouseX = e.clientX;\n            let mouseY =e.clientY;\n\n            ctx.lineTo(mouseX-offsetLeft, mouseY-offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(mouseX-offsetLeft, mouseY-offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(mouseX-offsetLeft, mouseY-offsetTop)\n    }\n\n    const drawSpray =e=>{\n        for(let i=0; i< 50;i++){\n            var offset = getRandomOffset(radius);\n            ctx.fillRect((e.clientX-offset.x)-canvas.offsetLeft,(e.clientY-offset.y)-canvas.offsetTop, 1, 1);\n        }\n    }\n\n    //MAIN DRAW FN\n    const draw = ( e=>{ \n        clearInterval(intervalId);\n        help = true;\n        if(paint){ \n            ctx.fillStyle = color;\n            ctx.strokeStyle = color;\n            ctx.lineWidth = radius*2;\n           // DRAW LINE\n            if(penType ==='line'){\n            drawLine(e);\n            }\n          //DRAW SPRAY\n           if(penType ==='spray'){\n            drawSpray(e);\n           }\n        }\n\n    });\n\n//EVENTS\n    $('canvas').mousemove(draw); \n    $('canvas').mousedown(penDown) \n    $('canvas').mouseup(penUp);\n    $('#clearSketch').click(clearSketchpad);\n    $('#rubber').click(rubber);\n    $('.colors_pallet div').click(changeColor);\n    $('select#lineWidth').change(changeLineWidth);\n    $('select#penType').change(changeType);\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0M7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0Esd0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLGlDQUFpQztBQUNqQztBQUNBLEtBQUs7O0FBRUw7QUFDQSw0QkFBNEI7QUFDNUIsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNkJBQTZCO0FBQzdCLEtBQUs7O0FBRUwsdUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QjtBQUNBO0FBQ0E7QUFDQSxrQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0EsZ0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KCgpPT57XG5cbi8vQ0FOVkFTIFNFVFVQXG4gICAgY29uc3QgY2FudmFzPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuLy9WQVJJQUJMRVNcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBsZXQgcGFpbnQ9IGZhbHNlOyAvL3RydWUsIGlmIHRoZSBtb3VzZSBpcyBwcmVzcyBkb3duXG4gICAgbGV0IHJhZGl1cyA9ICQoJ3NlbGVjdCNsaW5lV2lkdGgnKS52YWwoKTsgLy9yYWRpdXMgb2YgYXJjIGVsZW1lbnRcbiAgICBsZXQgY29sb3IgPSAnYmxhY2snO1xuICAgIGxldCBwZW5UeXBlID0gJCgnc2VsZWN0I3BlblR5cGUnKS52YWwoKTtcbiAgICBsZXQgc3ByYXkgPSBmYWxzZTtcbi8vRlVOQ1RJT05TXG4gICAgbGV0IGhlbHAgPSBmYWxzZTtcbiAgICBsZXQgaW50ZXJ2YWxJZCA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgY2hhbmdlQ29sb3IgPSAoIChlKT0+eyBcbiAgICAgICAgY29sb3IgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnY29sb3InKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBlbkRvd24gPSAoIChlKT0+e1xuICAgICAgICBwYWludCA9IHRydWU7XG4gICAgICAgIGlmKHBlblR5cGUgPT09ICdzcHJheScgfHwgaGVscCl7XG4gICAgICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoICgpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3QnKVxuICAgICAgICAgICAgICAgIGRyYXdTcHJheShlKVxuICAgICAgICAgICAgfSw2NClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBwZW5VcCA9ICggKGUpPT57XG4gICAgICAgIHBhaW50ID0gZmFsc2U7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTsgXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZClcbiAgICAgICAgLy9lbmQgb2YgY3VycmVudCBwZW4gcGF0aCwgYWZ0ZXIgZGlzZW5nYWdlIG1vdXNlLiBcbiAgICAgICAgLy9pZiBub3QgbGFzdCBwYXRoIHBvaW50IHdvdWxkIGFsd2F5cyBjb25uZWN0IHRvIG5ldyBwYXRoIChjcmVhdGVkIG9uIG5leHQgbW91c2Vkb3duIGV2ZW50KVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2xlYXJTa2V0Y2hwYWQgPSAoIGU9PnsgLy9jbGVhbiBza2V0Y2hwYWRcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgfSk7XG5cbiAgICBjb25zdCBjaGFuZ2VMaW5lV2lkdGggPSAoIGZ1bmN0aW9uKCl7XG4gICAgICAgIHJhZGl1cyA9IHRoaXMudmFsdWU7IC8vZ2V0IGN1cnJlbnQgdmFsdWUgb2Ygc2VsZWN0b3IjbGluZVdpZHRoXG4gICAgfSk7XG4gICAgY29uc3QgcnViYmVyID0gKCAoZSk9PntcbiAgICAgICAgY29sb3IgPSAnd2hpdGUnO1xuICAgIH0pXG5cbiAgICBjb25zdCBjaGFuZ2VUeXBlID0gKGZ1bmN0aW9uKCl7XG4gICAgICAgIHBlblR5cGUgPSB0aGlzLnZhbHVlOyAvL2dldCBjdXJyZW50IHZhbHVlIG9mIHNlbGVjdG9yI3BlblR5cGVcbiAgICB9KVxuXG4gICAgY29uc3QgZ2V0UmFuZG9tT2Zmc2V0ID0gcmFkaXVzID0+IHsgXG5cdFx0bGV0IHJhbmRvbV9hbmdsZSA9IE1hdGgucmFuZG9tKCkgKiAoMipNYXRoLlBJKTtcblx0XHRsZXQgcmFuZG9tX3JhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiByYWRpdXM7XG5cbiAgICAgICAgcmV0dXJue1xuXHRcdFx0eDogTWF0aC5jb3MocmFuZG9tX2FuZ2xlKSAqIHJhbmRvbV9yYWRpdXMsXG5cdFx0XHR5OiBNYXRoLnNpbihyYW5kb21fYW5nbGUpICogcmFuZG9tX3JhZGl1cyAgICBcblx0XHR9O1xuICAgIH1cblxuICAgIGNvbnN0IGRyYXdMaW5lID0gZT0+e1xuICAgICAgICAgICAgbGV0IG9mZnNldExlZnQgPSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGxldCBvZmZzZXRUb3AgPSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgbGV0IG1vdXNlWCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgIGxldCBtb3VzZVkgPWUuY2xpZW50WTtcblxuICAgICAgICAgICAgY3R4LmxpbmVUbyhtb3VzZVgtb2Zmc2V0TGVmdCwgbW91c2VZLW9mZnNldFRvcClcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMobW91c2VYLW9mZnNldExlZnQsIG1vdXNlWS1vZmZzZXRUb3AsIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8obW91c2VYLW9mZnNldExlZnQsIG1vdXNlWS1vZmZzZXRUb3ApXG4gICAgfVxuXG4gICAgY29uc3QgZHJhd1NwcmF5ID1lPT57XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCA1MDtpKyspe1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGdldFJhbmRvbU9mZnNldChyYWRpdXMpO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KChlLmNsaWVudFgtb2Zmc2V0LngpLWNhbnZhcy5vZmZzZXRMZWZ0LChlLmNsaWVudFktb2Zmc2V0LnkpLWNhbnZhcy5vZmZzZXRUb3AsIDEsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9NQUlOIERSQVcgRk5cbiAgICBjb25zdCBkcmF3ID0gKCBlPT57IFxuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgICAgICBoZWxwID0gdHJ1ZTtcbiAgICAgICAgaWYocGFpbnQpeyBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHJhZGl1cyoyO1xuICAgICAgICAgICAvLyBEUkFXIExJTkVcbiAgICAgICAgICAgIGlmKHBlblR5cGUgPT09J2xpbmUnKXtcbiAgICAgICAgICAgIGRyYXdMaW5lKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIC8vRFJBVyBTUFJBWVxuICAgICAgICAgICBpZihwZW5UeXBlID09PSdzcHJheScpe1xuICAgICAgICAgICAgZHJhd1NwcmF5KGUpO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4vL0VWRU5UU1xuICAgICQoJ2NhbnZhcycpLm1vdXNlbW92ZShkcmF3KTsgXG4gICAgJCgnY2FudmFzJykubW91c2Vkb3duKHBlbkRvd24pIFxuICAgICQoJ2NhbnZhcycpLm1vdXNldXAocGVuVXApO1xuICAgICQoJyNjbGVhclNrZXRjaCcpLmNsaWNrKGNsZWFyU2tldGNocGFkKTtcbiAgICAkKCcjcnViYmVyJykuY2xpY2socnViYmVyKTtcbiAgICAkKCcuY29sb3JzX3BhbGxldCBkaXYnKS5jbGljayhjaGFuZ2VDb2xvcik7XG4gICAgJCgnc2VsZWN0I2xpbmVXaWR0aCcpLmNoYW5nZShjaGFuZ2VMaW5lV2lkdGgpO1xuICAgICQoJ3NlbGVjdCNwZW5UeXBlJykuY2hhbmdlKGNoYW5nZVR5cGUpO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);