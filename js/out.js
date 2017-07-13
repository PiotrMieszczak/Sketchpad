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

eval("$(document).ready(()=>{\n\n//CANVAS SETUP\n    const canvas= document.querySelector('#canvas');\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n//VARIABLES\n    const ctx = canvas.getContext('2d');\n    ctx.fillStyle = 'white';\n    ctx.fillRect(0,0,canvas.width,canvas.height);\n\n    let paint= false; //true, if the mouse is press down\n    let radius = $('select#lineWidth').val(); //radius of arc element\n    let color = 'black';\n    let penType = $('select#penType').val();\n    let intervalId = null;\n\n \n//FUNCTIONS\n\n    const changeColor = ( (e)=>{ \n        color = $(e.currentTarget).data('color');\n    });\n\n    const penDown = ( (e)=>{\n        paint = true;\n\n        if(penType === 'brush'){\n            drawLine(e);\n        }\n        if(penType === 'spray'){\n            //  drawSpray(e);\n            intervalId = setInterval( ()=>{\n                drawSpray(e)\n            },64)\n        }\n    })\n\n    const penUp = ( (e)=>{\n        paint = false;\n        ctx.beginPath();  //end of current pen path, after disengage mouse. \n        //if not last path point would always connect to new path (created on next mousedown event)\n        clearInterval(intervalId)\n       \n    });\n\n    const clearSketchpad = ( e=>{ //clean sketchpad\n        ctx.clearRect(0,0, window.innerWidth, window.innerHeight);\n        ctx.fillStyle = 'white';\n        ctx.fillRect(0,0,canvas.width,canvas.height);\n        toggleMenu();\n    });\n\n    const changeLineWidth = ( function(){\n        radius = this.value; //get current value of selector#lineWidth\n        toggleMenu();\n    });\n    const rubber = ( (e)=>{\n        color = 'white';\n        toggleMenu();\n    })\n\n    const changeType = (function(){\n        penType = this.value; //get current value of selector#penType\n        toggleMenu();\n    })\n\n    const getRandomOffset = radius => { \n\t\tlet random_angle = Math.random() * (2*Math.PI);\n\t\tlet random_radius = Math.random() * radius;\n\n        return{\n\t\t\tx: Math.cos(random_angle) * random_radius,\n\t\t\ty: Math.sin(random_angle) * random_radius    \n\t\t};\n    }\n\n    const drawLine = e=>{ \n            ctx.fillStyle = color;\n            let offsetLeft = canvas.offsetLeft;\n            let offsetTop = canvas.offsetTop;\n            let mouseX = e.clientX;\n            let mouseY =e.clientY;\n            \n            ctx.lineTo(mouseX-offsetLeft, mouseY-offsetTop)\n            ctx.stroke();\n            ctx.beginPath();\n            ctx.arc(mouseX-offsetLeft, mouseY-offsetTop, radius, 0, Math.PI * 2);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.moveTo(mouseX-offsetLeft, mouseY-offsetTop)\n    }\n    const drawSpray =e=>{\n        ctx.fillStyle = color;\n        for(let i=0; i< 50;i++){\n            var offset = getRandomOffset(radius);\n            ctx.fillRect((e.clientX-offset.x)-canvas.offsetLeft,(e.clientY-offset.y)-canvas.offsetTop, 1, 1);\n        }\n    }\n    //MAIN DRAW FN\n    const draw = ( e=>{ \n        event.preventDefault();\n        clearInterval(intervalId); //if not interval would not stop on mouse move\n        if(paint){ \n            ctx.fillStyle = color;\n            ctx.strokeStyle = color;\n            ctx.lineWidth = radius*2;\n           // DRAW LINE\n            if(penType ==='brush'){\n            drawLine(e);\n            }\n          //DRAW SPRAY\n           if(penType ==='spray'){\n            drawSpray(e);\n           }\n        }\n    });\n    const saveImage =  function(){\n         var dataURL = canvas.toDataURL('image/png');\n         this.href = dataURL;\n         clearSketchpad();\n         toggleMenu();\n    }\n\n\n    const windowResize = ()=>{ \n        //resizing widow will clear canvas, need to store current ctx as image when redraw it\n        let temp_ctx = ctx.getImageData(0,0,canvas.width,canvas.height);\n        canvas.width = window.innerWidth;\n        canvas.height = window.innerHeight;\n        ctx.putImageData(temp_ctx,0,0);\n    }\n\n    const container = $('.container');\n     container.hide();\n     \n     const toggleMenu = ()=>{\n         container.toggle();\n    }\n//EVENTS\n    $('header h1').click(toggleMenu);\n    $(canvas).mousemove(draw); \n    $(canvas).on('vmousemove',draw); \n\n    $(canvas).mousedown(penDown) \n    $(canvas).on('vmousedown',penDown); \n    \n    $(canvas).mouseup(penUp);\n    $(canvas).on('vmouseout',penUp);\n\n\n    $('#clearSketch').click(clearSketchpad);\n    $('#rubber').click(rubber);\n    \n    $('.colors_pallet div').click(changeColor);\n    \n    $('select#lineWidth').change(changeLineWidth);\n    $('select#penType').change(changeType);\n    \n    $('#save').click(saveImage);\n    $(window).on('resize', windowResize);\n    \n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQiw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxnQztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTCxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxLQUFLOztBQUVMLHVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QjtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLGtCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsOEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQSxvQzs7QUFFQTtBQUNBLHVDOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUMiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KCgpPT57XG5cbi8vQ0FOVkFTIFNFVFVQXG4gICAgY29uc3QgY2FudmFzPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbi8vVkFSSUFCTEVTXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgY3R4LmZpbGxSZWN0KDAsMCxjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodCk7XG5cbiAgICBsZXQgcGFpbnQ9IGZhbHNlOyAvL3RydWUsIGlmIHRoZSBtb3VzZSBpcyBwcmVzcyBkb3duXG4gICAgbGV0IHJhZGl1cyA9ICQoJ3NlbGVjdCNsaW5lV2lkdGgnKS52YWwoKTsgLy9yYWRpdXMgb2YgYXJjIGVsZW1lbnRcbiAgICBsZXQgY29sb3IgPSAnYmxhY2snO1xuICAgIGxldCBwZW5UeXBlID0gJCgnc2VsZWN0I3BlblR5cGUnKS52YWwoKTtcbiAgICBsZXQgaW50ZXJ2YWxJZCA9IG51bGw7XG5cbiBcbi8vRlVOQ1RJT05TXG5cbiAgICBjb25zdCBjaGFuZ2VDb2xvciA9ICggKGUpPT57IFxuICAgICAgICBjb2xvciA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjb2xvcicpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcGVuRG93biA9ICggKGUpPT57XG4gICAgICAgIHBhaW50ID0gdHJ1ZTtcblxuICAgICAgICBpZihwZW5UeXBlID09PSAnYnJ1c2gnKXtcbiAgICAgICAgICAgIGRyYXdMaW5lKGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHBlblR5cGUgPT09ICdzcHJheScpe1xuICAgICAgICAgICAgLy8gIGRyYXdTcHJheShlKTtcbiAgICAgICAgICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCggKCk9PntcbiAgICAgICAgICAgICAgICBkcmF3U3ByYXkoZSlcbiAgICAgICAgICAgIH0sNjQpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcGVuVXAgPSAoIChlKT0+e1xuICAgICAgICBwYWludCA9IGZhbHNlO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7ICAvL2VuZCBvZiBjdXJyZW50IHBlbiBwYXRoLCBhZnRlciBkaXNlbmdhZ2UgbW91c2UuIFxuICAgICAgICAvL2lmIG5vdCBsYXN0IHBhdGggcG9pbnQgd291bGQgYWx3YXlzIGNvbm5lY3QgdG8gbmV3IHBhdGggKGNyZWF0ZWQgb24gbmV4dCBtb3VzZWRvd24gZXZlbnQpXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZClcbiAgICAgICBcbiAgICB9KTtcblxuICAgIGNvbnN0IGNsZWFyU2tldGNocGFkID0gKCBlPT57IC8vY2xlYW4gc2tldGNocGFkXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjaGFuZ2VMaW5lV2lkdGggPSAoIGZ1bmN0aW9uKCl7XG4gICAgICAgIHJhZGl1cyA9IHRoaXMudmFsdWU7IC8vZ2V0IGN1cnJlbnQgdmFsdWUgb2Ygc2VsZWN0b3IjbGluZVdpZHRoXG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9KTtcbiAgICBjb25zdCBydWJiZXIgPSAoIChlKT0+e1xuICAgICAgICBjb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9KVxuXG4gICAgY29uc3QgY2hhbmdlVHlwZSA9IChmdW5jdGlvbigpe1xuICAgICAgICBwZW5UeXBlID0gdGhpcy52YWx1ZTsgLy9nZXQgY3VycmVudCB2YWx1ZSBvZiBzZWxlY3RvciNwZW5UeXBlXG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9KVxuXG4gICAgY29uc3QgZ2V0UmFuZG9tT2Zmc2V0ID0gcmFkaXVzID0+IHsgXG5cdFx0bGV0IHJhbmRvbV9hbmdsZSA9IE1hdGgucmFuZG9tKCkgKiAoMipNYXRoLlBJKTtcblx0XHRsZXQgcmFuZG9tX3JhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiByYWRpdXM7XG5cbiAgICAgICAgcmV0dXJue1xuXHRcdFx0eDogTWF0aC5jb3MocmFuZG9tX2FuZ2xlKSAqIHJhbmRvbV9yYWRpdXMsXG5cdFx0XHR5OiBNYXRoLnNpbihyYW5kb21fYW5nbGUpICogcmFuZG9tX3JhZGl1cyAgICBcblx0XHR9O1xuICAgIH1cblxuICAgIGNvbnN0IGRyYXdMaW5lID0gZT0+eyBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGxldCBvZmZzZXRMZWZ0ID0gY2FudmFzLm9mZnNldExlZnQ7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0VG9wID0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGxldCBtb3VzZVggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICBsZXQgbW91c2VZID1lLmNsaWVudFk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGN0eC5saW5lVG8obW91c2VYLW9mZnNldExlZnQsIG1vdXNlWS1vZmZzZXRUb3ApXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHguYXJjKG1vdXNlWC1vZmZzZXRMZWZ0LCBtb3VzZVktb2Zmc2V0VG9wLCByYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgubW92ZVRvKG1vdXNlWC1vZmZzZXRMZWZ0LCBtb3VzZVktb2Zmc2V0VG9wKVxuICAgIH1cbiAgICBjb25zdCBkcmF3U3ByYXkgPWU9PntcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBmb3IobGV0IGk9MDsgaTwgNTA7aSsrKXtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBnZXRSYW5kb21PZmZzZXQocmFkaXVzKTtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgoZS5jbGllbnRYLW9mZnNldC54KS1jYW52YXMub2Zmc2V0TGVmdCwoZS5jbGllbnRZLW9mZnNldC55KS1jYW52YXMub2Zmc2V0VG9wLCAxLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL01BSU4gRFJBVyBGTlxuICAgIGNvbnN0IGRyYXcgPSAoIGU9PnsgXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7IC8vaWYgbm90IGludGVydmFsIHdvdWxkIG5vdCBzdG9wIG9uIG1vdXNlIG1vdmVcbiAgICAgICAgaWYocGFpbnQpeyBcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHJhZGl1cyoyO1xuICAgICAgICAgICAvLyBEUkFXIExJTkVcbiAgICAgICAgICAgIGlmKHBlblR5cGUgPT09J2JydXNoJyl7XG4gICAgICAgICAgICBkcmF3TGluZShlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvL0RSQVcgU1BSQVlcbiAgICAgICAgICAgaWYocGVuVHlwZSA9PT0nc3ByYXknKXtcbiAgICAgICAgICAgIGRyYXdTcHJheShlKTtcbiAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3Qgc2F2ZUltYWdlID0gIGZ1bmN0aW9uKCl7XG4gICAgICAgICB2YXIgZGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICAgICAgICAgdGhpcy5ocmVmID0gZGF0YVVSTDtcbiAgICAgICAgIGNsZWFyU2tldGNocGFkKCk7XG4gICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfVxuXG5cbiAgICBjb25zdCB3aW5kb3dSZXNpemUgPSAoKT0+eyBcbiAgICAgICAgLy9yZXNpemluZyB3aWRvdyB3aWxsIGNsZWFyIGNhbnZhcywgbmVlZCB0byBzdG9yZSBjdXJyZW50IGN0eCBhcyBpbWFnZSB3aGVuIHJlZHJhdyBpdFxuICAgICAgICBsZXQgdGVtcF9jdHggPSBjdHguZ2V0SW1hZ2VEYXRhKDAsMCxjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKHRlbXBfY3R4LDAsMCk7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGFpbmVyID0gJCgnLmNvbnRhaW5lcicpO1xuICAgICBjb250YWluZXIuaGlkZSgpO1xuICAgICBcbiAgICAgY29uc3QgdG9nZ2xlTWVudSA9ICgpPT57XG4gICAgICAgICBjb250YWluZXIudG9nZ2xlKCk7XG4gICAgfVxuLy9FVkVOVFNcbiAgICAkKCdoZWFkZXIgaDEnKS5jbGljayh0b2dnbGVNZW51KTtcbiAgICAkKGNhbnZhcykubW91c2Vtb3ZlKGRyYXcpOyBcbiAgICAkKGNhbnZhcykub24oJ3Ztb3VzZW1vdmUnLGRyYXcpOyBcblxuICAgICQoY2FudmFzKS5tb3VzZWRvd24ocGVuRG93bikgXG4gICAgJChjYW52YXMpLm9uKCd2bW91c2Vkb3duJyxwZW5Eb3duKTsgXG4gICAgXG4gICAgJChjYW52YXMpLm1vdXNldXAocGVuVXApO1xuICAgICQoY2FudmFzKS5vbigndm1vdXNlb3V0JyxwZW5VcCk7XG5cblxuICAgICQoJyNjbGVhclNrZXRjaCcpLmNsaWNrKGNsZWFyU2tldGNocGFkKTtcbiAgICAkKCcjcnViYmVyJykuY2xpY2socnViYmVyKTtcbiAgICBcbiAgICAkKCcuY29sb3JzX3BhbGxldCBkaXYnKS5jbGljayhjaGFuZ2VDb2xvcik7XG4gICAgXG4gICAgJCgnc2VsZWN0I2xpbmVXaWR0aCcpLmNoYW5nZShjaGFuZ2VMaW5lV2lkdGgpO1xuICAgICQoJ3NlbGVjdCNwZW5UeXBlJykuY2hhbmdlKGNoYW5nZVR5cGUpO1xuICAgIFxuICAgICQoJyNzYXZlJykuY2xpY2soc2F2ZUltYWdlKTtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSk7XG4gICAgXG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ })
/******/ ]);