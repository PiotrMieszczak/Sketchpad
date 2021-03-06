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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n//VARIABLES\n    const ctx = canvas.getContext('2d');\n    ctx.fillStyle = 'white';\n    ctx.fillRect(0,0,canvas.width,canvas.height);\n\n    let paint= false; //true, if the mouse is press down\n    let radius = $('select#lineWidth').val(); //radius of arc element\n    let color = 'black';\n    let penType = $('select#penType').val();\n    let intervalId = null;\n \n//FUNCTIONS\n\n    const brushOrSpray = (e)=>{\n           // DRAW Brush\n            if(penType ==='brush'){\n                drawLine(e);\n            }\n          //DRAW SPRAY\n           if(penType ==='spray'){\n                drawSpray(e);\n                intervalId = setInterval( ()=>{\n                    drawSpray(e);\n                },64);\n           }\n    }\n    const changeColor = ( (e)=>{ \n         color = $(e.currentTarget).data('color');\n         clearInterval(intervalId);\n          toggleMenu();\n    });\n    \n    const penDown = ( (e)=>{\n        paint = true;\n        ctx.fillStyle = color;\n        ctx.strokeStyle = color;\n        ctx.lineWidth = radius*2;\n\n        brushOrSpray(e);\n\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        clearInterval(intervalId);\n        ctx.beginPath();  //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n    });\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight);\n        ctx.fillStyle = 'white';\n        ctx.fillRect(0,0,canvas.width,canvas.height);\n        toggleMenu();\n    });\n\n    const changeLineWidth = ( function(){\n        radius = this.value; //get current value of selector#lineWidth\n        toggleMenu();\n    });\n    const rubber = ( (e)=>{\n        color = 'white';\n        toggleMenu();\n    })\n\n    const changeType = (function(){\n        penType = this.value; //get current value of selector#penType\n        toggleMenu();\n    })\n\n    const getRandomOffset = radius => { \n\t\tlet random_angle = Math.random() * (2*Math.PI);\n\t\tlet random_radius = Math.random() * radius;\n\n        return{\n\t\t\tx: Math.cos(random_angle) * random_radius,\n\t\t\ty: Math.sin(random_angle) * random_radius    \n\t\t};\n    }\n\n    const drawLine = e=>{ \n            \n            let offsetLeft = canvas.offsetLeft;\n            let offsetTop = canvas.offsetTop;\n            let mouseX = e.clientX;\n            let mouseY =e.clientY;\n            \n            ctx.lineTo(mouseX-offsetLeft, mouseY-offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(mouseX-offsetLeft, mouseY-offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(mouseX-offsetLeft, mouseY-offsetTop)\n    }\n    const drawSpray =e=>{\n        \n        for(let i=0; i< 50;i++){\n            var offset = getRandomOffset(radius);\n            ctx.fillRect((e.clientX-offset.x)-canvas.offsetLeft,(e.clientY-offset.y)-canvas.offsetTop, 1, 1);\n        }\n    }\n    //MAIN DRAW FN\n    const draw = ( e=>{ \n        clearInterval(intervalId); //if not interval would not stop on mouse move\n        \n        if(paint){ \n             brushOrSpray(e); \n        }\n    });\n\n    const saveImage =  function(){\n         var dataURL = canvas.toDataURL('image/png');\n         this.href = dataURL;\n         clearSketchpad();\n         toggleMenu();\n    }\n\n\n    const windowResize = ()=>{ \n        //resizing widow will clear canvas, need to store current ctx as image when redraw it\n        let temp_ctx = ctx.getImageData(0,0,canvas.width,canvas.height);\n        canvas.width = window.innerWidth;\n        canvas.height = window.innerHeight;\n        ctx.putImageData(temp_ctx,0,0);\n    }\n\n    const container = $('.container');\n     container.hide();\n     \n     const toggleMenu = ()=>{\n         container.toggle();\n    }\n//EVENTS\n    $('header h1').click(toggleMenu);\n    $(canvas).on('vmousemove',draw); \n    $(canvas).on('vmousedown',penDown); \n    $(canvas).on('vmouseup',penUp);\n\n    $('#clearSketch').click(clearSketchpad);\n    $('#rubber').click(rubber);\n    \n    $('.colors_pallet div').click(changeColor);\n    \n    $('select#lineWidth').change(changeLineWidth);\n    $('select#penType').change(changeType);\n    \n    $('#save').click(saveImage);\n    $(window).on('resize', windowResize);\n    \n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQiw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxnQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLEtBQUs7O0FBRUwsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsS0FBSzs7QUFFTCx1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCO0FBQ0Esa0NBQWtDOztBQUVsQyxrQjtBQUNBLDZCO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsOEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0M7QUFDQSx1QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUMiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KCgpPT57XG5cbi8vQ0FOVkFTIFNFVFVQXG4gICAgY29uc3QgY2FudmFzPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbi8vVkFSSUFCTEVTXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgY3R4LmZpbGxSZWN0KDAsMCxjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodCk7XG5cbiAgICBsZXQgcGFpbnQ9IGZhbHNlOyAvL3RydWUsIGlmIHRoZSBtb3VzZSBpcyBwcmVzcyBkb3duXG4gICAgbGV0IHJhZGl1cyA9ICQoJ3NlbGVjdCNsaW5lV2lkdGgnKS52YWwoKTsgLy9yYWRpdXMgb2YgYXJjIGVsZW1lbnRcbiAgICBsZXQgY29sb3IgPSAnYmxhY2snO1xuICAgIGxldCBwZW5UeXBlID0gJCgnc2VsZWN0I3BlblR5cGUnKS52YWwoKTtcbiAgICBsZXQgaW50ZXJ2YWxJZCA9IG51bGw7XG4gXG4vL0ZVTkNUSU9OU1xuXG4gICAgY29uc3QgYnJ1c2hPclNwcmF5ID0gKGUpPT57XG4gICAgICAgICAgIC8vIERSQVcgQnJ1c2hcbiAgICAgICAgICAgIGlmKHBlblR5cGUgPT09J2JydXNoJyl7XG4gICAgICAgICAgICAgICAgZHJhd0xpbmUoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLy9EUkFXIFNQUkFZXG4gICAgICAgICAgIGlmKHBlblR5cGUgPT09J3NwcmF5Jyl7XG4gICAgICAgICAgICAgICAgZHJhd1NwcmF5KGUpO1xuICAgICAgICAgICAgICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCggKCk9PntcbiAgICAgICAgICAgICAgICAgICAgZHJhd1NwcmF5KGUpO1xuICAgICAgICAgICAgICAgIH0sNjQpO1xuICAgICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGNoYW5nZUNvbG9yID0gKCAoZSk9PnsgXG4gICAgICAgICBjb2xvciA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjb2xvcicpO1xuICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgcGVuRG93biA9ICggKGUpPT57XG4gICAgICAgIHBhaW50ID0gdHJ1ZTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHJhZGl1cyoyO1xuXG4gICAgICAgIGJydXNoT3JTcHJheShlKTtcblxuICAgIH0pXG5cbiAgICBjb25zdCBwZW5VcCA9ICggKGUpPT57XG4gICAgICAgIHBhaW50ID0gZmFsc2U7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTsgIC8vZW5kIG9mIGN1cnJlbnQgcGVuIHBhdGgsIGFmdGVyIGRpc2VuZ2FnZSBtb3VzZS4gXG4gICAgICAgIC8vaWYgbm90IGxhc3QgcGF0aCBwb2ludCB3b3VsZCBhbHdheXMgY29ubmVjdCB0byBuZXcgcGF0aCAoY3JlYXRlZCBvbiBuZXh0IG1vdXNlZG93biBldmVudClcbiAgICB9KTtcblxuICAgIGNvbnN0IGNsZWFyU2tldGNocGFkID0gKCBlPT57IC8vY2xlYW4gc2tldGNocGFkXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjaGFuZ2VMaW5lV2lkdGggPSAoIGZ1bmN0aW9uKCl7XG4gICAgICAgIHJhZGl1cyA9IHRoaXMudmFsdWU7IC8vZ2V0IGN1cnJlbnQgdmFsdWUgb2Ygc2VsZWN0b3IjbGluZVdpZHRoXG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9KTtcbiAgICBjb25zdCBydWJiZXIgPSAoIChlKT0+e1xuICAgICAgICBjb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9KVxuXG4gICAgY29uc3QgY2hhbmdlVHlwZSA9IChmdW5jdGlvbigpe1xuICAgICAgICBwZW5UeXBlID0gdGhpcy52YWx1ZTsgLy9nZXQgY3VycmVudCB2YWx1ZSBvZiBzZWxlY3RvciNwZW5UeXBlXG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9KVxuXG4gICAgY29uc3QgZ2V0UmFuZG9tT2Zmc2V0ID0gcmFkaXVzID0+IHsgXG5cdFx0bGV0IHJhbmRvbV9hbmdsZSA9IE1hdGgucmFuZG9tKCkgKiAoMipNYXRoLlBJKTtcblx0XHRsZXQgcmFuZG9tX3JhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiByYWRpdXM7XG5cbiAgICAgICAgcmV0dXJue1xuXHRcdFx0eDogTWF0aC5jb3MocmFuZG9tX2FuZ2xlKSAqIHJhbmRvbV9yYWRpdXMsXG5cdFx0XHR5OiBNYXRoLnNpbihyYW5kb21fYW5nbGUpICogcmFuZG9tX3JhZGl1cyAgICBcblx0XHR9O1xuICAgIH1cblxuICAgIGNvbnN0IGRyYXdMaW5lID0gZT0+eyBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG9mZnNldExlZnQgPSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGxldCBvZmZzZXRUb3AgPSBjYW52YXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgbGV0IG1vdXNlWCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgIGxldCBtb3VzZVkgPWUuY2xpZW50WTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY3R4LmxpbmVUbyhtb3VzZVgtb2Zmc2V0TGVmdCwgbW91c2VZLW9mZnNldFRvcClcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5hcmMobW91c2VYLW9mZnNldExlZnQsIG1vdXNlWS1vZmZzZXRUb3AsIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8obW91c2VYLW9mZnNldExlZnQsIG1vdXNlWS1vZmZzZXRUb3ApXG4gICAgfVxuICAgIGNvbnN0IGRyYXdTcHJheSA9ZT0+e1xuICAgICAgICBcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8IDUwO2krKyl7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gZ2V0UmFuZG9tT2Zmc2V0KHJhZGl1cyk7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoKGUuY2xpZW50WC1vZmZzZXQueCktY2FudmFzLm9mZnNldExlZnQsKGUuY2xpZW50WS1vZmZzZXQueSktY2FudmFzLm9mZnNldFRvcCwgMSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9NQUlOIERSQVcgRk5cbiAgICBjb25zdCBkcmF3ID0gKCBlPT57IFxuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpOyAvL2lmIG5vdCBpbnRlcnZhbCB3b3VsZCBub3Qgc3RvcCBvbiBtb3VzZSBtb3ZlXG4gICAgICAgIFxuICAgICAgICBpZihwYWludCl7IFxuICAgICAgICAgICAgIGJydXNoT3JTcHJheShlKTsgXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHNhdmVJbWFnZSA9ICBmdW5jdGlvbigpe1xuICAgICAgICAgdmFyIGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICAgICAgIHRoaXMuaHJlZiA9IGRhdGFVUkw7XG4gICAgICAgICBjbGVhclNrZXRjaHBhZCgpO1xuICAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgIH1cblxuXG4gICAgY29uc3Qgd2luZG93UmVzaXplID0gKCk9PnsgXG4gICAgICAgIC8vcmVzaXppbmcgd2lkb3cgd2lsbCBjbGVhciBjYW52YXMsIG5lZWQgdG8gc3RvcmUgY3VycmVudCBjdHggYXMgaW1hZ2Ugd2hlbiByZWRyYXcgaXRcbiAgICAgICAgbGV0IHRlbXBfY3R4ID0gY3R4LmdldEltYWdlRGF0YSgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YSh0ZW1wX2N0eCwwLDApO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQoJy5jb250YWluZXInKTtcbiAgICAgY29udGFpbmVyLmhpZGUoKTtcbiAgICAgXG4gICAgIGNvbnN0IHRvZ2dsZU1lbnUgPSAoKT0+e1xuICAgICAgICAgY29udGFpbmVyLnRvZ2dsZSgpO1xuICAgIH1cbi8vRVZFTlRTXG4gICAgJCgnaGVhZGVyIGgxJykuY2xpY2sodG9nZ2xlTWVudSk7XG4gICAgJChjYW52YXMpLm9uKCd2bW91c2Vtb3ZlJyxkcmF3KTsgXG4gICAgJChjYW52YXMpLm9uKCd2bW91c2Vkb3duJyxwZW5Eb3duKTsgXG4gICAgJChjYW52YXMpLm9uKCd2bW91c2V1cCcscGVuVXApO1xuXG4gICAgJCgnI2NsZWFyU2tldGNoJykuY2xpY2soY2xlYXJTa2V0Y2hwYWQpO1xuICAgICQoJyNydWJiZXInKS5jbGljayhydWJiZXIpO1xuICAgIFxuICAgICQoJy5jb2xvcnNfcGFsbGV0IGRpdicpLmNsaWNrKGNoYW5nZUNvbG9yKTtcbiAgICBcbiAgICAkKCdzZWxlY3QjbGluZVdpZHRoJykuY2hhbmdlKGNoYW5nZUxpbmVXaWR0aCk7XG4gICAgJCgnc2VsZWN0I3BlblR5cGUnKS5jaGFuZ2UoY2hhbmdlVHlwZSk7XG4gICAgXG4gICAgJCgnI3NhdmUnKS5jbGljayhzYXZlSW1hZ2UpO1xuICAgICQod2luZG93KS5vbigncmVzaXplJywgd2luZG93UmVzaXplKTtcbiAgICBcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);