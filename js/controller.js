///////////////////////////////////////////////////////////////////////////////////////////////////////
// Main Game Controller
//      - designed by Kent Jones
//      - adapted by Ethan Worth, Owen Foster, and Elizabeth Roberts
///////////////////////////////////////////////////////////////////////////////////////////////////////


var objects = [];	           // Array of objects in the game
var browsertype = (navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i))[1];
var width;	                   // height of canvas
var height;	                   // width of canvas
var canvas;
var screen_scale_factor = 0;
var x_buffer = 0;
var y_buffer = 64;
var keys = [false, false, false, false];

function gameController() {

    var FPS = 60;                  // Frames per Second
    var TGT_FRAME_TIME = 1000/FPS; // Milliseconds per Frame
    
    var ctx; 	                   // context for the canvas
    var t = new Date();            // the date object for getting the frame time
    var last = t.getTime();        // last time the draw function was called

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // Functions to create and manage the objects in the game
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    function createObjects()  {
        var o;
        objects.push(CreateBackground("img/assets/space-planets-back.png", -2.5, 0));
        objects.push(CreateBackground("img/assets/space-planets-front.png", -7.5, 0));
        objects.push(CreatePortal());
        objects.push(CreateShip());
        for ( o = 0; o < 15; o++ ) {
            objects.push( CreateAsteroid() );
        }
        for(var obj of objects) {
            obj.scale_attributes(screen_scale_factor);
        }
    };
     
    // Function to move the objects passes a frame time ratio argument
    function moveObjects( frame_time_ratio )  {
        var i;
        for ( i in objects ) {
            objects[i].move( frame_time_ratio );
        }
    };
    
    // Function to check for and handle collisions between objects
    function collideObjects( )  { 
        var a, i;
        var b, j;        
        for ( i=0; i<objects.length; i++ )
        { 
            if ( objects[i].handle_collision  ) {
                for ( j=i+1; j<objects.length; j++ )
                {    objects[i].handle_collision(objects[j]);  // Deal with collisions (if they occur)
                }
            }
        }
    }
    
    function cleanupObjects()
    {   var i;
        for ( i in objects )
        {   var a = objects[i];
            // remove all objects that have died permanently
            if ( a.state() === 'dead' ) {
                // if ship is 'dead' generate lose screen
                if ( a.type === 'ship' ) {
                    generateLoseScreen();
                    break;
                }
                objects.splice(i,1);
            }
            // generate win screen if an object has this state
            else if ( a.state() === 'win') {
                generateWinScreen();
                break;
            }
        }
    }

    // Function to draw all the objects passes the drawing context
    function drawObjects(ctx) {
        var i;
        for ( i in objects ) {
            objects[i].draw(ctx);
        }
    };

    // function to show you won the game
    function generateWinScreen() {
        // remove all objects from game except background
        objects = objects.filter(function(i){return i.type === "background";});
        objects.push(CreateEnd("img/assets/win.png"));
        
    }

    // function to show you lost the game
    function generateLoseScreen() {
        // remove all objects from game except background
        objects = objects.filter(function(i){return i.type === "background";});
        objects.push(CreateEnd("img/assets/lose.png"));
      
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // Functions to manage drawing in the canvas and request an animation frame
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // Attempt to use browser based HTML5 animation frame function, else use a timeout callback function
    requestAnimFrame = (function(){
        if (window.requestAnimationFrame) return window.requestAnimationFrame;
        if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame;            
        if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame;
        if (window.oRequestAnimationFrame) return window.oRequestAnimationFrame; 
        if (window.msRequestAnimationFrame) return window.msRequestAnimationFrame; 
        else return  function( callback, element ){
                         window.setTimeout(callback, TGT_FRAME_TIME);
                     };
    })();
    
    // function to clear the canvas
    function clearCanvas( context )
    {         
        if ( context !== undefined )
            context.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    function getWidthHeight()
    {
        if (window.innerWidth && window.innerHeight) {
            width = window.innerWidth - x_buffer;
            height = window.innerHeight - y_buffer;
            var temp = screen_scale_factor;
            screen_scale_factor = height/900;
            if(temp === 0) {
                console.log("First scale factor: " + screen_scale_factor);
            }
            else if(temp !== screen_scale_factor) {
                console.log("New scale factor: " + screen_scale_factor);
                for(var obj of objects) {
                    obj.scale_attributes(screen_scale_factor/temp);
                }
            }
        }  
    }
    

    // The draw callback
    function draw()
    {   requestAnimFrame(draw, canvas); 

        t = new Date();
        curtime = t.getTime();
        actual_frame_time = curtime - last;
        var frame_time_ratio = actual_frame_time/TGT_FRAME_TIME;
        
        // Get the width and height of the canvas
        getWidthHeight();
        canvas.width = width;
        canvas.height = height;
        
        // Clear the canvas and re-draw the game elements
        clearCanvas( ctx );
        
        // Move all the objects in the game
        moveObjects(frame_time_ratio);
        
        // Handle collisions between objects in the game
        collideObjects();
        
        // Draw all the objects in the game
        drawObjects(ctx);
   
        // Delete all the objecs that died last time
        cleanupObjects();
        
        // Keep the time to compute the frame rate
        last = curtime;
    };
    
    //  left = 0, up = 1, right = 2, down = 3, A = 4, W = 5, D = 6, S = 7
    function convert_key(code) {
        if(code >= 37 && code <= 40) {
            return code - 37;
        }
        else if(code == 65) {
            return 4;
        }
        else if(code == 87) {
            return 5;
        }
        else if(code == 68) {
            return 6;
        }
        else if(code == 83) {
            return 7;
        }

        return -1;
    }

    function ev_keydown (ev) {
        // credit to https://stackoverflow.com/a/13640097 for this method of tracking pressed keys
        var code = convert_key(ev.which);
        if(code >= 0) {
            keys[code] = true;
            update_v();
        }
    }
    function ev_keyup (ev) {
        // credit to https://stackoverflow.com/a/13640097 for this method of tracking pressed keys
        var code = convert_key(ev.which);
        if(code >= 0) {
            keys[code] = false;
            update_v();
        }
    }

    function update_v() {
        var vx = 0;
        var vy = 0;

        // update x veloc (down takes prio)
        if(keys[0] || keys[4]) {
            vx = -1;
        }
        else if(keys[2] || keys[6]) {
            vx = 1;
        }
        // update y veloc (back takes prio)
        if(keys[1] || keys[5]) {
            vy = -1;
        }
        else if(keys[3] || keys[7]) {
            vy = 1;
        }

        // update veloc
        for(var obj of objects) {
            if(obj.type === 'ship') {
                obj.setV(vx, vy);
            }
        }
    }

    function setupContext() {
            
        getWidthHeight();
       
        // Set the global canvas_dimensions object to width and height
        // set up the canvas and register game-events on the canvas
        canvas = document.getElementById("canvas");
        canvas.setAttribute('width',width);
        canvas.setAttribute('height',height);         
        ctx = canvas.getContext("2d");
        window.addEventListener( 'keydown', bind( ev_keydown, this ) , false );  
        window.addEventListener( 'keyup', bind( ev_keyup, this ) , false );   
    }; 
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // Code to set up the game and start the animation going
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get canvas size and set context
    setupContext();
    
    // Create the objects for the game
    createObjects();
    
    // Start the animation by calling draw(). Draw will set a timer
    // that calls draw() again after the timer expires
    if ( ctx !== 'undefined' ) draw();
    
};

// Register the onload callback function
window.onload = gameController;