///////////////////////////////////////////////////////////////////////////////////////////////////////
// Portal class
//      - adapted by Elizabeth Roberts from code by Kent Jones and Ethan Worth
///////////////////////////////////////////////////////////////////////////////////////////////////////

// the end goal is to reach this portal to win the game
// it is generated at the end of the level
function CreatePortal() {
    var portal = new GameObject();
    var portal_png = ["img/assets/portal-end.png"];
    portal.type = 'portal';
    portal.load_images( portal_png );
    portal.loc.x = width*3;
    portal.loc.y = height/2;
    portal.v.x = -5;
    portal.v.y = 0;
    portal.scaling = 1;

    // move portal with negative x velocity towards ship
    portal.move = function(ftr) {
        portal.loc.x += portal.v.x * ftr;
    };

    // has to handle the portal collision with ship here,
    // since the portal object is pushed to object array 
    // before the ship, it can't be handled by the ship object
    portal.handle_collision = function( other ) {
        if(portal.collides(other)) {
            if (other.type === 'ship') {
                portal.istate = 3;
            }
        }
    }

    return portal;
};