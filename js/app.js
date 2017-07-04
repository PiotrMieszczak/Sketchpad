$(document).ready(()=>{

//CANVAS SETUP
    const canvas= document.querySelector('#canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
//VARIABLES
    const ctx = canvas.getContext('2d');
    let paint= false; //true, if the mouse is press down
    let radius = $('select#lineWidth').val(); //radius of arc element
    let color = 'black';
    let penType = $('select#penType').val();

//FUNCTIONS
    let intervalId = null;
    
    const changeColor = ( (e)=>{ 
        color = $(e.currentTarget).data('color');
    });

    const penDown = ( (e)=>{
        paint = true;
        if(penType === 'spray'){
            intervalId = setInterval( ()=>{
                drawSpray(e)
            },64)
        }
    })

    const penUp = ( (e)=>{
        paint = false;
        ctx.beginPath(); 
        clearInterval(intervalId)
        //end of current pen path, after disengage mouse. 
        //if not last path point would always connect to new path (created on next mousedown event)
    });

    const clearSketchpad = ( e=>{ //clean sketchpad
        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    });

    const changeLineWidth = ( function(){
        radius = this.value; //get current value of selector#lineWidth
    });
    const rubber = ( (e)=>{
        color = 'white';
    })

    const changeType = (function(){
        penType = this.value; //get current value of selector#penType
    })

    const getRandomOffset = radius => { 
		let random_angle = Math.random() * (2*Math.PI);
		let random_radius = Math.random() * radius;

        return{
			x: Math.cos(random_angle) * random_radius,
			y: Math.sin(random_angle) * random_radius    
		};
    }

    const drawLine = e=>{ 
            let offsetLeft = canvas.offsetLeft;
            let offsetTop = canvas.offsetTop;
            let mouseX = e.clientX;
            let mouseY =e.clientY;

            ctx.lineTo(mouseX-offsetLeft, mouseY-offsetTop)
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(mouseX-offsetLeft, mouseY-offsetTop, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(mouseX-offsetLeft, mouseY-offsetTop)
    }

    const drawSpray =e=>{
        for(let i=0; i< 50;i++){
            var offset = getRandomOffset(radius);
            ctx.fillRect((e.clientX-offset.x)-canvas.offsetLeft,(e.clientY-offset.y)-canvas.offsetTop, 1, 1);
        }
    }

    //MAIN DRAW FN
    const draw = ( e=>{ 
        clearInterval(intervalId); //if not interval would not stop on mouse move
       
        if(paint){ 
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = radius*2;
           // DRAW LINE
            if(penType ==='line'){
            drawLine(e);
            }
          //DRAW SPRAY
           if(penType ==='spray'){
            drawSpray(e);
           }
        }

    });

    const saveImage =  function(){
         var dataURL = canvas.toDataURL('image/png');
         this.href = dataURL;
         alert('Plik zapisany')
         clearSketchpad();
    }
//EVENTS
    $('canvas').mousemove(draw); 
    $('canvas').mousedown(penDown) 
    $('canvas').mouseup(penUp);
    $('#clearSketch').click(clearSketchpad);
    $('#rubber').click(rubber);
    $('.colors_pallet div').click(changeColor);
    $('select#lineWidth').change(changeLineWidth);
    $('select#penType').change(changeType);
    $('#save').click(saveImage);
});
