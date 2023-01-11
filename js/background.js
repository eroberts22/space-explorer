///////////////////////////////////////////////////////////////////////////////////////////////////////
// Background Class
//      - adapted by Ethan Worth from code by Kent Jones
///////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateBackground(img, vx, vy) {
    var background = new GameObject();
    var background_pngs = [ img ];
    background.type = 'background';
    background.load_images( background_pngs );
    background.loc.x = background.imgArray[background.curImg].width/2;
    background.loc.y = height/2;
    background.v.x = vx;
    background.v.y = vy;

    // hacky way of making background 100% height by default, we also do this in a more robust way in the draw function
    background.scaling = 900/550;

    background.super_draw = background.draw;

    background.draw = function(ctx) {
        // make sure background is 100% height
        background.scaling = height/background.imgArray[background.curImg].height;
        // draw background
        drawRotatedScaledImage(
            ctx,
            background.imgArray[background.curImg], 
            background.loc.x, 
            background.loc.y,
            background.rotation,
            background.scaling
        );
        // draw extension background
        drawRotatedScaledImage(
            ctx,
            background.imgArray[background.curImg], 
            background.loc.x + background.scaling*background.imgArray[background.curImg].width, 
            background.loc.y,
            background.rotation,
            background.scaling
        );
    };

    background.move = function( ftr ) {
        // move background
        background.loc.x += background.v.x * ftr;
        background.loc.y += background.v.y * ftr;
        // check for edge
        //console.log("calc:" + background.loc.x + " + " + background.imgArray[background.curImg].width + " = " + background.loc.x + background.imgArray[background.curImg] + " < " + width);
        if(background.loc.x + background.scaling*background.imgArray[background.curImg].width/2 <= 0) {
            background.loc.x = background.scaling*background.imgArray[background.curImg].width/2;
        }
    };

    return background;
};