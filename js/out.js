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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n//VARIABLES\n    const ctx = canvas.getContext('2d');\n    ctx.fillStyle = 'white';\n    ctx.fillRect(0,0,canvas.width,canvas.height);\n\n    let paint= false; //true, if the mouse is press down\n    let radius = $('select#lineWidth').val(); //radius of arc element\n    let color = 'black';\n    let penType = $('select#penType').val();\n    let intervalId = null;\n\n \n//FUNCTIONS\n\n    const changeColor = ( (e)=>{ \n        color = $(e.currentTarget).data('color');\n    });\n\n    const penDown = ( (e)=>{\n        paint = true;\n\n        if(penType === 'brush'){\n            drawLine(e);\n        }\n        if(penType === 'spray'){\n            //  drawSpray(e);\n            intervalId = setInterval( ()=>{\n                drawSpray(e)\n            },64)\n        }\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        ctx.beginPath();  //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n        clearInterval(intervalId)\n       \n    });\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight);\n        ctx.fillStyle = 'white';\n        ctx.fillRect(0,0,canvas.width,canvas.height);\n    });\n\n    const changeLineWidth = ( function(){\n        radius = this.value; //get current value of selector#lineWidth\n\n    });\n    const rubber = ( (e)=>{\n        color = 'white';\n    })\n\n    const changeType = (function(){\n        penType = this.value; //get current value of selector#penType\n\n    })\n\n    const getRandomOffset = radius => { \n\t\tlet random_angle = Math.random() * (2*Math.PI);\n\t\tlet random_radius = Math.random() * radius;\n\n        return{\n\t\t\tx: Math.cos(random_angle) * random_radius,\n\t\t\ty: Math.sin(random_angle) * random_radius    \n\t\t};\n    }\n\n    const drawLine = e=>{ \n            ctx.fillStyle = color;\n            let offsetLeft = canvas.offsetLeft;\n            let offsetTop = canvas.offsetTop;\n            let mouseX = e.clientX;\n            let mouseY =e.clientY;\n            \n            ctx.lineTo(mouseX-offsetLeft, mouseY-offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(mouseX-offsetLeft, mouseY-offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(mouseX-offsetLeft, mouseY-offsetTop)\n    }\n    const drawSpray =e=>{\n        ctx.fillStyle = color;\n        for(let i=0; i< 50;i++){\n            var offset = getRandomOffset(radius);\n            ctx.fillRect((e.clientX-offset.x)-canvas.offsetLeft,(e.clientY-offset.y)-canvas.offsetTop, 1, 1);\n        }\n    }\n    //MAIN DRAW FN\n    const draw = ( e=>{ \n        clearInterval(intervalId); //if not interval would not stop on mouse move\n        if(paint){ \n            ctx.fillStyle = color;\n            ctx.strokeStyle = color;\n            ctx.lineWidth = radius*2;\n           // DRAW LINE\n            if(penType ==='brush'){\n            drawLine(e);\n            }\n          //DRAW SPRAY\n           if(penType ==='spray'){\n            drawSpray(e);\n           }\n        }\n    });\n    const saveImage =  function(){\n         var dataURL = canvas.toDataURL('image/png');\n         this.href = dataURL;\n         clearSketchpad();\n    }\n//EVENTS\n    $('canvas').mousemove(draw); \n    $('canvas').on('vmousemove',draw); \n\n    $('canvas').mousedown(penDown) \n    $('canvas').on('vmousedown',penDown); \n    \n    $('canvas').mouseup(penUp);\n    $('canvas').on('vmouseout',penUp);\n\n\n    $('#clearSketch').click(clearSketchpad);\n    $('#rubber').click(rubber);\n    \n    $('.colors_pallet div').click(changeColor);\n    \n    $('select#lineWidth').change(changeLineWidth);\n    $('select#penType').change(changeType);\n    \n    $('#save').click(saveImage);\n\n    \n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQiw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxnQztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTCxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDRCQUE0Qjs7QUFFNUIsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNkJBQTZCOztBQUU3QixLQUFLOztBQUVMLHVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QjtBQUNBLGtDQUFrQztBQUNsQyxrQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQztBQUNBLHNDOztBQUVBO0FBQ0EseUM7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQSxDQUFDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeSgoKT0+e1xuXG4vL0NBTlZBUyBTRVRVUFxuICAgIGNvbnN0IGNhbnZhcz0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4vL1ZBUklBQkxFU1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgIGN0eC5maWxsUmVjdCgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgbGV0IHBhaW50PSBmYWxzZTsgLy90cnVlLCBpZiB0aGUgbW91c2UgaXMgcHJlc3MgZG93blxuICAgIGxldCByYWRpdXMgPSAkKCdzZWxlY3QjbGluZVdpZHRoJykudmFsKCk7IC8vcmFkaXVzIG9mIGFyYyBlbGVtZW50XG4gICAgbGV0IGNvbG9yID0gJ2JsYWNrJztcbiAgICBsZXQgcGVuVHlwZSA9ICQoJ3NlbGVjdCNwZW5UeXBlJykudmFsKCk7XG4gICAgbGV0IGludGVydmFsSWQgPSBudWxsO1xuXG4gXG4vL0ZVTkNUSU9OU1xuXG4gICAgY29uc3QgY2hhbmdlQ29sb3IgPSAoIChlKT0+eyBcbiAgICAgICAgY29sb3IgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnY29sb3InKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBlbkRvd24gPSAoIChlKT0+e1xuICAgICAgICBwYWludCA9IHRydWU7XG5cbiAgICAgICAgaWYocGVuVHlwZSA9PT0gJ2JydXNoJyl7XG4gICAgICAgICAgICBkcmF3TGluZShlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihwZW5UeXBlID09PSAnc3ByYXknKXtcbiAgICAgICAgICAgIC8vICBkcmF3U3ByYXkoZSk7XG4gICAgICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoICgpPT57XG4gICAgICAgICAgICAgICAgZHJhd1NwcmF5KGUpXG4gICAgICAgICAgICB9LDY0KVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHBlblVwID0gKCAoZSk9PntcbiAgICAgICAgcGFpbnQgPSBmYWxzZTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyAgLy9lbmQgb2YgY3VycmVudCBwZW4gcGF0aCwgYWZ0ZXIgZGlzZW5nYWdlIG1vdXNlLiBcbiAgICAgICAgLy9pZiBub3QgbGFzdCBwYXRoIHBvaW50IHdvdWxkIGFsd2F5cyBjb25uZWN0IHRvIG5ldyBwYXRoIChjcmVhdGVkIG9uIG5leHQgbW91c2Vkb3duIGV2ZW50KVxuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpXG4gICAgICAgXG4gICAgfSk7XG5cbiAgICBjb25zdCBjbGVhclNrZXRjaHBhZCA9ICggZT0+eyAvL2NsZWFuIHNrZXRjaHBhZFxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwwLGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNoYW5nZUxpbmVXaWR0aCA9ICggZnVuY3Rpb24oKXtcbiAgICAgICAgcmFkaXVzID0gdGhpcy52YWx1ZTsgLy9nZXQgY3VycmVudCB2YWx1ZSBvZiBzZWxlY3RvciNsaW5lV2lkdGhcblxuICAgIH0pO1xuICAgIGNvbnN0IHJ1YmJlciA9ICggKGUpPT57XG4gICAgICAgIGNvbG9yID0gJ3doaXRlJztcbiAgICB9KVxuXG4gICAgY29uc3QgY2hhbmdlVHlwZSA9IChmdW5jdGlvbigpe1xuICAgICAgICBwZW5UeXBlID0gdGhpcy52YWx1ZTsgLy9nZXQgY3VycmVudCB2YWx1ZSBvZiBzZWxlY3RvciNwZW5UeXBlXG5cbiAgICB9KVxuXG4gICAgY29uc3QgZ2V0UmFuZG9tT2Zmc2V0ID0gcmFkaXVzID0+IHsgXG5cdFx0bGV0IHJhbmRvbV9hbmdsZSA9IE1hdGgucmFuZG9tKCkgKiAoMipNYXRoLlBJKTtcblx0XHRsZXQgcmFuZG9tX3JhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiByYWRpdXM7XG5cbiAgICAgICAgcmV0dXJue1xuXHRcdFx0eDogTWF0aC5jb3MocmFuZG9tX2FuZ2xlKSAqIHJhbmRvbV9yYWRpdXMsXG5cdFx0XHR5OiBNYXRoLnNpbihyYW5kb21fYW5nbGUpICogcmFuZG9tX3JhZGl1cyAgICBcblx0XHR9O1xuICAgIH1cblxuICAgIGNvbnN0IGRyYXdMaW5lID0gZT0+eyBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0VG9wID0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGxldCBtb3VzZVggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICBsZXQgbW91c2VZID1lLmNsaWVudFk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGN0eC5saW5lVG8obW91c2VYLW9mZnNldExlZnQsIG1vdXNlWS1vZmZzZXRUb3ApXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHguYXJjKG1vdXNlWC1vZmZzZXRMZWZ0LCBtb3VzZVktb2Zmc2V0VG9wLCByYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgubW92ZVRvKG1vdXNlWC1vZmZzZXRMZWZ0LCBtb3VzZVktb2Zmc2V0VG9wKVxuICAgIH1cbiAgICBjb25zdCBkcmF3U3ByYXkgPWU9PntcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBmb3IobGV0IGk9MDsgaTwgNTA7aSsrKXtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBnZXRSYW5kb21PZmZzZXQocmFkaXVzKTtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgoZS5jbGllbnRYLW9mZnNldC54KS1jYW52YXMub2Zmc2V0TGVmdCwoZS5jbGllbnRZLW9mZnNldC55KS1jYW52YXMub2Zmc2V0VG9wLCAxLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL01BSU4gRFJBVyBGTlxuICAgIGNvbnN0IGRyYXcgPSAoIGU9PnsgXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7IC8vaWYgbm90IGludGVydmFsIHdvdWxkIG5vdCBzdG9wIG9uIG1vdXNlIG1vdmVcbiAgICAgICAgaWYocGFpbnQpeyBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHJhZGl1cyoyO1xuICAgICAgICAgICAvLyBEUkFXIExJTkVcbiAgICAgICAgICAgIGlmKHBlblR5cGUgPT09J2JydXNoJyl7XG4gICAgICAgICAgICBkcmF3TGluZShlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvL0RSQVcgU1BSQVlcbiAgICAgICAgICAgaWYocGVuVHlwZSA9PT0nc3ByYXknKXtcbiAgICAgICAgICAgIGRyYXdTcHJheShlKTtcbiAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3Qgc2F2ZUltYWdlID0gIGZ1bmN0aW9uKCl7XG4gICAgICAgICB2YXIgZGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICAgICAgICAgdGhpcy5ocmVmID0gZGF0YVVSTDtcbiAgICAgICAgIGNsZWFyU2tldGNocGFkKCk7XG4gICAgfVxuLy9FVkVOVFNcbiAgICAkKCdjYW52YXMnKS5tb3VzZW1vdmUoZHJhdyk7IFxuICAgICQoJ2NhbnZhcycpLm9uKCd2bW91c2Vtb3ZlJyxkcmF3KTsgXG5cbiAgICAkKCdjYW52YXMnKS5tb3VzZWRvd24ocGVuRG93bikgXG4gICAgJCgnY2FudmFzJykub24oJ3Ztb3VzZWRvd24nLHBlbkRvd24pOyBcbiAgICBcbiAgICAkKCdjYW52YXMnKS5tb3VzZXVwKHBlblVwKTtcbiAgICAkKCdjYW52YXMnKS5vbigndm1vdXNlb3V0JyxwZW5VcCk7XG5cblxuICAgICQoJyNjbGVhclNrZXRjaCcpLmNsaWNrKGNsZWFyU2tldGNocGFkKTtcbiAgICAkKCcjcnViYmVyJykuY2xpY2socnViYmVyKTtcbiAgICBcbiAgICAkKCcuY29sb3JzX3BhbGxldCBkaXYnKS5jbGljayhjaGFuZ2VDb2xvcik7XG4gICAgXG4gICAgJCgnc2VsZWN0I2xpbmVXaWR0aCcpLmNoYW5nZShjaGFuZ2VMaW5lV2lkdGgpO1xuICAgICQoJ3NlbGVjdCNwZW5UeXBlJykuY2hhbmdlKGNoYW5nZVR5cGUpO1xuICAgIFxuICAgICQoJyNzYXZlJykuY2xpY2soc2F2ZUltYWdlKTtcblxuICAgIFxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ })
/******/ ]);