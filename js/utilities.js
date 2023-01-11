//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Utility functions
//   - Designed by Kent Jones
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var TO_RADIANS = Math.PI/180; 
function drawRotatedScaledImage(ctx, image, x, y, angle, scale) { 
 
	// save the current co-ordinate system 
	// before we screw with it
	ctx.save(); 
 
	// move to the middle of where we want to draw our image
	ctx.translate(x, y);
 
	// rotate around that point, converting our 
	// angle from degrees to radians 
	ctx.rotate(angle * TO_RADIANS);
 
	// scale around that point
	ctx.scale(scale, scale);
 
	// draw it up and to the left by half the width
	// and height of the image 
	ctx.drawImage(image, -(image.width/2), -(image.height/2));
 
	// and restore the co-ords to how they were when we began
	ctx.restore(); 
}

// Object.create is a function that will create an object from a prototype object.
// this check only needed for backwards compatibility
if (typeof Object.create !== 'function') {
  Object.create = function( o ) {
    var F = function(){};
    F.prototype = o;
    return new F();
  }
}

// Allows a member function to be registered as an eventlistner
// Usage: canvas.addEventListener( 'event_type', bind( member_function_to_call, this ) , false );
function bind(aHandler, aBind) {
    var handler = aHandler;
    var bind = aBind;
    return function(event) {
        return handler.call(bind, event);
    }
}


// A 2D vector object
var Vec2d = {
	x : 0,
    y : 0,
    setxy : function( x, y ) { this.x = x; this.y = y  },   
    setv : function( vec ) { this.x = vec.x; this.y = vec.y  },
    addv : function( vec ) { this.x += vec.x; this.y += vec.y },
    subv : function( vec ) { this.x -= vec.x; this.y -= vec.y }, 
    scale : function( scale_factor ) { this.x *= scale_factor; this.y *= scale_factor },
    add_scaled_vec : function( vec, scale_factor ) { this.x += vec.x*scale_factor; this.y += vec.y*scale_factor },
    dot : function( vec ) { return ( this.x*vec.x+this.y*vec.y ) },
    mag : function() { return Math.sqrt( this.x*this.x + this.y*this.y)}
};

// Check two rectangles for intersection
function intersectRect(r1, r2) {
    collides = !( r2.left > (r1.left+r1.width) || (r2.left+r2.width) < r1.left || 
              r2.top > (r1.top+r1.height) || (r2.top+r2.height) < r1.top );
    return collides;
}

function randomv(  x )
{
    return ( (0.5 * x) - (Math.random() * 0.90 * x)) + x;
}


var sin45 = Math.sin(Math.PI/4);

/////////////////////////////////////////////////////////////////////////////////////////////////////
