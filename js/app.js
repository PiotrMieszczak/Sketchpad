$(document).ready(()=>{

        const canvas= document.querySelector('#canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let ctx = canvas.getContext('2d');
    
   
    // ctx.beginPath();
    // ctx.moveTo(50,50); 
    // ctx.lineTo(300, 100);
    // ctx.lineTo(400, 300);
    // ctx.stroke(); //rysuje zewnetrzny obrys kształtu ; fill() <- wypełnia kształt

    let paint= false; //true jezeli mysz jest nacisnieta
    let radius = 5;
    ctx.lineWidth = radius*2;

    
    
    let engage = ( (e)=>{
        paint = true;
    })

    let disengage = ( (e)=>{
        paint = false;
        ctx.beginPath(); //konczy punkt
    })

    let draw = ( e=>{
        if(paint){ //if paint = true, czyli jezeli myszka jest nacisnieta rysuj linie
            //console.log('X',e.clientX,'Y:',e.clientY)
            ctx.lineTo(e.clientX, e.clientY-40)
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(e.clientX, e.clientY-40, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(e.clientX,e.clientY-40)
           
        }
    })

    $('canvas').mousemove(draw);
    $('canvas').mousedown(engage);
    $('canvas').mouseup(disengage);

});
