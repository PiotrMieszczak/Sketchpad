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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n\n//VARIABLES\n    const ctx = canvas.getContext('2d');\n    let paint= false; //true, if the mouse is press down\n    let radius = $('select').val(); //radius of arc element\n    let color = 'black';\n\n//FUNCTIONS\n    const changeColor = ( (e)=>{ \n        color = $(e.currentTarget).data('color');\n    });\n\n    const penDown = ( (e)=>{\n        paint = true;\n    });\n\n    const penUp = ( (e)=>{\n        paint = false;\n        ctx.beginPath(); //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n    });\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)\n    });\n\n    const changeLineWidth = ( function(){\n        radius = this.value;\n    });\n    const rubber = ( (e)=>{\n        color = 'white';\n    })\n\n    const getRandomOffset = radius=> {\n\t\tlet random_angle = Math.random() * (2*Math.PI);\n\t\tlet random_radius = Math.random() * radius;\n\n\n        return{\n\t\t\tx: Math.cos(random_angle) * random_radius,\n\t\t\ty: Math.sin(random_angle) * random_radius    \n\t\t};\n    }\n\n    const drawLine = e=>{\n        ctx.lineTo(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(e.clientX-canvas.offsetLeft,e.clientY-canvas.offsetTop)\n    }\n\n    const drawSpray =e=>{\n        for(let i=0; i< 30;i++){\n            var offset = getRandomOffset(10);\n            console.log('x:',offset.x,'y: ',offset.y);\n            ctx.fillRect((e.clientX+offset.x)-canvas.offsetLeft,(e.clientY+offset.y)-canvas.offsetTop, 1, 1);\n        }\n    }\n    const draw = ( e=>{\n        if(paint){ \n            ctx.fillStyle = color;\n            ctx.strokeStyle = color;\n            ctx.lineWidth = radius*2;\n            //DRAW LINE\n            // drawLine(e);\n           //DRAW SPRAY\n           drawSpray(e)\n        }\n    });\n\n//EVENTS\n    $('canvas').mousemove(draw); \n    $('canvas').mousedown(penDown); \n    $('canvas').mouseup(penUp);\n    $('#clearSketch').click(clearSketchpad);\n    $('.colors_pallet div').click(changeColor);\n    $('select').change(changeLineWidth);\n    $('#rubber').click(rubber);\n\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBLGdDO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSxLQUFLOztBQUVMLGlDQUFpQztBQUNqQztBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLGdDO0FBQ0EsbUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KCgpPT57XG5cbi8vQ0FOVkFTIFNFVFVQXG4gICAgY29uc3QgY2FudmFzPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuLy9WQVJJQUJMRVNcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBsZXQgcGFpbnQ9IGZhbHNlOyAvL3RydWUsIGlmIHRoZSBtb3VzZSBpcyBwcmVzcyBkb3duXG4gICAgbGV0IHJhZGl1cyA9ICQoJ3NlbGVjdCcpLnZhbCgpOyAvL3JhZGl1cyBvZiBhcmMgZWxlbWVudFxuICAgIGxldCBjb2xvciA9ICdibGFjayc7XG5cbi8vRlVOQ1RJT05TXG4gICAgY29uc3QgY2hhbmdlQ29sb3IgPSAoIChlKT0+eyBcbiAgICAgICAgY29sb3IgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnY29sb3InKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBlbkRvd24gPSAoIChlKT0+e1xuICAgICAgICBwYWludCA9IHRydWU7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwZW5VcCA9ICggKGUpPT57XG4gICAgICAgIHBhaW50ID0gZmFsc2U7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTsgLy9lbmQgb2YgY3VycmVudCBwZW4gcGF0aCwgYWZ0ZXIgZGlzZW5nYWdlIG1vdXNlLiBcbiAgICAgICAgLy9pZiBub3QgbGFzdCBwYXRoIHBvaW50IHdvdWxkIGFsd2F5cyBjb25uZWN0IHRvIG5ldyBwYXRoIChjcmVhdGVkIG9uIG5leHQgbW91c2Vkb3duIGV2ZW50KVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2xlYXJTa2V0Y2hwYWQgPSAoIGU9PnsgLy9jbGVhbiBza2V0Y2hwYWRcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgfSk7XG5cbiAgICBjb25zdCBjaGFuZ2VMaW5lV2lkdGggPSAoIGZ1bmN0aW9uKCl7XG4gICAgICAgIHJhZGl1cyA9IHRoaXMudmFsdWU7XG4gICAgfSk7XG4gICAgY29uc3QgcnViYmVyID0gKCAoZSk9PntcbiAgICAgICAgY29sb3IgPSAnd2hpdGUnO1xuICAgIH0pXG5cbiAgICBjb25zdCBnZXRSYW5kb21PZmZzZXQgPSByYWRpdXM9PiB7XG5cdFx0bGV0IHJhbmRvbV9hbmdsZSA9IE1hdGgucmFuZG9tKCkgKiAoMipNYXRoLlBJKTtcblx0XHRsZXQgcmFuZG9tX3JhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiByYWRpdXM7XG5cblxuICAgICAgICByZXR1cm57XG5cdFx0XHR4OiBNYXRoLmNvcyhyYW5kb21fYW5nbGUpICogcmFuZG9tX3JhZGl1cyxcblx0XHRcdHk6IE1hdGguc2luKHJhbmRvbV9hbmdsZSkgKiByYW5kb21fcmFkaXVzICAgIFxuXHRcdH07XG4gICAgfVxuXG4gICAgY29uc3QgZHJhd0xpbmUgPSBlPT57XG4gICAgICAgIGN0eC5saW5lVG8oZS5jbGllbnRYLWNhbnZhcy5vZmZzZXRMZWZ0LCBlLmNsaWVudFktY2FudmFzLm9mZnNldFRvcClcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMoZS5jbGllbnRYLWNhbnZhcy5vZmZzZXRMZWZ0LCBlLmNsaWVudFktY2FudmFzLm9mZnNldFRvcCwgcmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhlLmNsaWVudFgtY2FudmFzLm9mZnNldExlZnQsZS5jbGllbnRZLWNhbnZhcy5vZmZzZXRUb3ApXG4gICAgfVxuXG4gICAgY29uc3QgZHJhd1NwcmF5ID1lPT57XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCAzMDtpKyspe1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGdldFJhbmRvbU9mZnNldCgxMCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygneDonLG9mZnNldC54LCd5OiAnLG9mZnNldC55KTtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgoZS5jbGllbnRYK29mZnNldC54KS1jYW52YXMub2Zmc2V0TGVmdCwoZS5jbGllbnRZK29mZnNldC55KS1jYW52YXMub2Zmc2V0VG9wLCAxLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBkcmF3ID0gKCBlPT57XG4gICAgICAgIGlmKHBhaW50KXsgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSByYWRpdXMqMjtcbiAgICAgICAgICAgIC8vRFJBVyBMSU5FXG4gICAgICAgICAgICAvLyBkcmF3TGluZShlKTtcbiAgICAgICAgICAgLy9EUkFXIFNQUkFZXG4gICAgICAgICAgIGRyYXdTcHJheShlKVxuICAgICAgICB9XG4gICAgfSk7XG5cbi8vRVZFTlRTXG4gICAgJCgnY2FudmFzJykubW91c2Vtb3ZlKGRyYXcpOyBcbiAgICAkKCdjYW52YXMnKS5tb3VzZWRvd24ocGVuRG93bik7IFxuICAgICQoJ2NhbnZhcycpLm1vdXNldXAocGVuVXApO1xuICAgICQoJyNjbGVhclNrZXRjaCcpLmNsaWNrKGNsZWFyU2tldGNocGFkKTtcbiAgICAkKCcuY29sb3JzX3BhbGxldCBkaXYnKS5jbGljayhjaGFuZ2VDb2xvcik7XG4gICAgJCgnc2VsZWN0JykuY2hhbmdlKGNoYW5nZUxpbmVXaWR0aCk7XG4gICAgJCgnI3J1YmJlcicpLmNsaWNrKHJ1YmJlcik7XG5cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);