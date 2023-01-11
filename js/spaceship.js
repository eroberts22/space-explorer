///////////////////////////////////////////////////////////////////////////////////////////////////////
// Spaceship Class
//      - adapted by Ethan Worth and Owen Foster from code by Kent Jones
///////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateShip() {
    var ship = new GameObject();
    var ship_pngs = [ "img/assets/rocket300pix.png", "img/assets/rocket_dmg.png" ];
    ship.shield_max = 100;                      
    ship.shield_decrement = 2;                  
    ship.shield = ship.shield_max;              
    ship.fuel_max = 100;
    ship.fuel_decrement = 0.25;
    ship.fuel = ship.fuel_max;
    ship.type = 'ship';
    ship.load_images( ship_pngs );
    ship.loc.x = 200;
    ship.loc.y = height/2;
    ship.v.x = 0;
    ship.v.y = 0;

    ship.scaling = 0.7;

    ship.max_speed = 8;
    ship.collide_time = 0;

    ship.scale_attributes = function( factor ) {
        ship.v.x *= factor;
        ship.v.y *= factor;
        ship.scaling *= factor;
        ship.max_speed *= factor;
    }

    ship.super_draw = ship.draw;

    ship.draw = function( ctx ) {
        // check if ship is currently colliding
        var curtime = (new Date()).getTime();
        // if colliding switch to damage image and damage shields
        if(curtime - ship.collide_time <= 16) {
            ship.curImg = 1;
            ship.update_shields(-ship.shield_decrement);
        }
        // if not colliding, use undamaged image
        else {
            ship.curImg = 0;
        }
        // Draw ship
        drawRotatedScaledImage(
            ctx,
            ship.imgArray[ship.curImg], 
            ship.loc.x, 
            ship.loc.y,
            ship.rotation,
            ship.scaling
        );
        // draw wrapped ships
        drawRotatedScaledImage(
            ctx,
            ship.imgArray[ship.curImg], 
            ship.loc.x, 
            ship.loc.y + height + ship.imgArray[ship.curImg].height/2,
            ship.rotation,
            ship.scaling
        );
        drawRotatedScaledImage(
            ctx,
            ship.imgArray[ship.curImg], 
            ship.loc.x, 
            ship.loc.y - height - ship.imgArray[ship.curImg].height/2,
            ship.rotation,
            ship.scaling
        );
    };

    ship.setV = function ( x_sign, y_sign ) {
        ship.v.x = ship.max_speed * x_sign;
        ship.v.y = ship.max_speed * y_sign;
        // add extra max_speed backwards
        if(x_sign < 0) {
            ship.v.x *= 1.5;
        }
    }

    ship.move = function( ftr ) {
        // move ship
        ship.loc.x += ship.v.x * ftr;
        ship.loc.y += ship.v.y * ftr;
        // if we are moving, expend fuel
        if(ship.v.x != 0 || ship.v.y != 0) {
            ship.update_fuel(-ship.fuel_decrement);
        }

        // wrap vertical edge
        if(ship.loc.y >= height) {
            ship.loc.y -= height + ship.imgArray[ship.curImg].height/2;
        }
        if(ship.loc.y <= 0) {
            ship.loc.y += height + ship.imgArray[ship.curImg].height/2;
        }
        // stop on front/back edge
        if(ship.loc.x + ship.imgArray[ship.curImg].width/2 >= width) {
            ship.loc.x = width - ship.imgArray[ship.curImg].width/2;
        }
        if(ship.loc.x - ship.imgArray[ship.curImg].width/2 <= 0) {
            ship.loc.x = ship.imgArray[ship.curImg].width/2;
        }
    };

    ship.bounds = function() {
        return { left: ship.loc.x, top: ship.loc.y, width: ship.imgArray[ship.curImg].width*ship.scaling*0.8, height: ship.imgArray[ship.curImg].height*ship.scaling*0.8 };
    };

    ship.handle_collision = function( other ) {
        if(other.type === 'asteroid') {
            if(ship.collides(other)) {
                ship.collide_time = (new Date()).getTime();
                if(ship.shield === 0) { // only call explode if the shields are zero
                    ship.explode();
                }
            }
        }
    };

    ship.update_shields = function( diff ) {
        ship.shield += diff;
        // calculate new percentage
        $("#shield-lvl").css({"width": ship.shield/ship.shield_max*100 + "%"})
    }

    ship.update_fuel = function( diff ) {
        ship.fuel += diff;
        // calculate new percentage
        $("#fuel-lvl").css({"width": ship.fuel/ship.fuel_max*100 + "%"})
        // handle running out of fuel
        if(ship.fuel <= 0) {
            ship.max_speed = 0;
        }
    }

    ship.explode = function() {
        ship.max_speed = 0;
        // buffer death with promise
        ship.istate = 0;//2;
    };

    return ship;
};