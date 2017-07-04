$(document).ready(()=>{

//CANVAS SETUP
    const canvas= document.querySelector('#canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

//VARIABLES
    const ctx = canvas.getContext('2d');
    let paint= false; //true, if the mouse is press down
    let radius = 5; //radius of arc element
    ctx.lineWidth = radius*2; //lineWidth
    let color = 'black';

//FUNCTIONS
    const changeColor = ( (e)=>{ 
        color = $(e.currentTarget).data('color');
    });

    const penDown = ( (e)=>{
        paint = true;
    });

    const penUp = ( (e)=>{
        paint = false;
        ctx.beginPath(); //end of current pen path, after disengage mouse. 
        //if not last path point would always connect to new path (created on next mousedown event)
    });

    const clearSketchpad = ( e=>{ //clean sketchpad
        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    });

    const changeLineWidth = ( e=>{
        radius = $(e.event.currentTarget).data('lineWidth');
    });

    const draw = ( e=>{
        if(paint){ 
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineTo(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop)
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(e.clientX-canvas.offsetLeft,e.clientY-canvas.offsetTop)
        }
    });

//EVENTS
    $('canvas').mousemove(draw); 
    $('canvas').mousedown(penDown); 
    $('canvas').mouseup(penUp);
    $('#clearSketch').click(clearSketchpad);
    $('.colors_pallet div').click(changeColor);
});
