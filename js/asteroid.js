///////////////////////////////////////////////////////////////////////////////////////////////////////
// Asteroid Class
//      - adapted by Ethan Worth from code by Kent Jones
///////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateAsteroid() {
    // randomly generate asteroid
    var asteroid = new GameObject();
    var asteroid_pngs = [ "img/assets/asteroid1.png", "img/assets/asteroid2.png"];
    asteroid.curImg = Math.floor(Math.random()*asteroid_pngs.length); // randomly select an image to display
    asteroid.type = 'asteroid';
    asteroid.load_images( asteroid_pngs );
    asteroid.loc.x = width + Math.random() * 5*width/2;
    asteroid.loc.y = Math.random() * height;
    asteroid.v.x = -5-Math.random()*5;
    asteroid.v.y = Math.random()*3 - 1.5;
    asteroid.rotation = 0;
    asteroid.rv = Math.random()*10 - 5; // rotation velocity
    if(asteroid_pngs[asteroid.curImg] === "img/assets/comet.png") {
        asteroid.rv = 0; // make sure comets dont rotate
    }
    asteroid.scaling = 0.15+Math.random()*0.20;

    asteroid.move = function( ftr ) {
        // move asteroid
        asteroid.loc.x += asteroid.v.x * ftr;
        asteroid.loc.y += asteroid.v.y * ftr;
        // rotate
        asteroid.rotation += asteroid.rv;

        // wrap vertical edge
        var margin_y = asteroid.imgArray[asteroid.curImg].height*(asteroid.scaling)/2;
        if(asteroid.loc.y + margin_y <= 0) {
            asteroid.loc.y += height + margin_y*2;
        }
        if(asteroid.loc.y - margin_y >= height) {
            asteroid.loc.y -= height + margin_y*2;
        }
    };

    return asteroid;
};
