var draw = (function () {

    //Get the height and width of the main we will use this set canvas to the full
    //size of the main element.
    var mWidth = document.querySelector('main').offsetWidth;
    var mHeight = document.querySelector('main').offsetHeight;

    //Create canvas
    var canvas = document.createElement('canvas');

    //Create a context
    var ctx = canvas.getContext('2d');

    //Create the initial bounding rectangle
    var rect = canvas.getBoundingClientRect();

    //Current x,y position
    var x = 0;
    var y = 0;

    //starting x,y position
    var x1 = 0;
    var y1 = 0;

    //Ending x,y position
    var x2 = 0;
    var y2 = 0;

    //Last x,y
    var lx = false;
    var ly = false;

    //Set what shape we are drawing
    var shape = '';

    var isDrawing = false;

    return {//everything within the return statement is public and sent out to UI 
        //anything above is private code that is processed internally

        //set x.y cords based on current event data
        
        setIsDrawing: function(bool){
            isDrawing = bool;
        },

        getIsDrawing: function(){
            return isDrawing;
        },
        
        setXY: function (evt) {
            //Track the last x.y position before setting the current positon
            lx = x;
            ly = y;

            x = (evt.clientX - rect.left) - canvas.offsetLeft;
            y = (evt.clientY - rect.top) - canvas.offsetTop;
            // See it work
            console.log(x + ' ' + y);
        },

        //Write the x.y cords to the GUI
        writeXY: function () {
            document.getElementById('trackX').innerHTML = 'X: ' + x;
            document.getElementById('trackY').innerHTML = 'Y: ' + y;
        },

        //Set the starting cords
        setStart: function () {
            x1 = x;
            y1 = y;
        },

        //Set the ending cords
        setEnd: function () {
            x2 = x;
            y2 = y;
        },

        //Sets the shape to be drawn
        setShape: function (shp) {
            shape = shp;
        },

        getShape: function () {
            return shape;
        },

        draw: function () {
            ctx.restore();
            if (shape === 'rectangle') {
                this.drawRect();
            } else if (shape === 'line') {
                this.drawLine();
            } else if (shape === 'circle') {
                this.drawCircle();
            } else if (shape === 'path') {
                this.drawPath();
            } else {
                alert('Please choose a shape!');
            }
            ctx.save();
        },

        //Draw a path
        drawPath: function () {
            ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(x, y);
            ctx.stroke();
        },

        //Draw a circle
        drawCircle: function () {
            ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
            ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);

            let a = (x1 - x2);
            let b = (y1 - y2);
            let radius = Math.sqrt(a * a + b * b);

            ctx.beginPath();
            ctx.arc(x1, y1, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
        },

        //Draw a rectangle
        drawRect: function () {
            //Start by using random fill colors.
            ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
            ctx.fillRect(x1, y1, (x2 - x1), (y2 - y1));
        },

        //Draw a line
        drawLine: function () {
            ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        },

        getCanvas: function () {
            return canvas;
        },

        init: function () {
            canvas.width = mWidth;
            canvas.height = mHeight;
            document.querySelector('main').appendChild(canvas);

        }
    }

})();

draw.init();

//Add a mousemove listener to the canvas so when the mouse reports a change of
//position use the event data to set and report the x.y position of the mouse
draw.getCanvas().addEventListener('mousemove', function (evt) {
    draw.setXY(evt);
    draw.writeXY();
    if(draw.getShape() === 'path' && draw.getIsDrawing() === true){
        draw.draw();
    }
});

draw.getCanvas().addEventListener('mousedown', function () {
    draw.setStart();
    draw.setIsDrawing(true);
});

draw.getCanvas().addEventListener('mouseup', function () {
    draw.setEnd();
    draw.draw();
    draw.setIsDrawing(false);
});



document.getElementById('btnRect').addEventListener('click', function () {
    draw.setShape('rectangle');
});

document.getElementById('btnLine').addEventListener('click', function () {
    draw.setShape('line');
});

document.getElementById('btnCircle').addEventListener('click', function () {
    draw.setShape('circle');
});

document.getElementById('btnPath').addEventListener('click', function () {
    draw.setShape('path');
});

