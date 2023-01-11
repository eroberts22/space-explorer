///////////////////////////////////////////////////////////////////////////////////////////////////////
// Game Object Class
//      - adapted by Ethan Worth and Elizabeth Roberts from code by Kent Jones
///////////////////////////////////////////////////////////////////////////////////////////////////////

// The states that an object can be in
var States = [ 'dead', 'alive', 'exploding','win' ];

// A Game Object
var GameObject = function( ) {   
    this.type = 'object';                           // The type of object
    this.loc = Object.create(Vec2d);                // Location
    this.v = Object.create(Vec2d);                  // Velocity
    this.rotation = 0;                              // Rotation    
    this.rv = 0;                                    // rotation velocity
    this.scaling = 1;                               // scaling
    this.istate = 1;                                // Current State index, start out alive
    this.state = function() {                       // State
        return States[this.istate];
    };
    this.curImg = 0;                                // Current Image Id
    this.imgArray = [];                             // Array of images
    this.load_images = function( image_names ) {    // Load Images
        var i;
        for ( i in image_names )
        {   this.imgArray[i] = new Image();
            this.imgArray[i].src = image_names[i];
        }
    };
    this.draw = function( ctx ) {                   // Draw Method
        drawRotatedScaledImage(
            ctx,
            this.imgArray[this.curImg], 
            this.loc.x, 
            this.loc.y,
            this.rotation,
            this.scaling
        );
    };
    
    this.scale_attributes = function( factor ) {
        this.v.x *= factor;
        this.v.y *= factor;
        this.scaling *= factor;
        console.log("Scaled: " + this.type);
    }

    this.bounds = function() {
        return { left: this.loc.x, top: this.loc.y, width: this.imgArray[this.curImg].width*this.scaling, height: this.imgArray[this.curImg].height*this.scaling };
    };
    
    this.collides = function( other )
    {   if ( other.state() === 'dead' ) return; // The other object has died!
        if ( this.state() === 'dead' ) return; // The other object has died!        
    	// return true if this object collides with another object
    	return intersectRect( this.bounds(), other.bounds() );
    };
};
