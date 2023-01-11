///////////////////////////////////////////////////////////////////////////////////////////////////////
// End Screen Class
//      - designed by Kent Jones
//      - adapted by Elizabeth Roberts
///////////////////////////////////////////////////////////////////////////////////////////////////////

// CreateEnd is called for a win or lose state
// takes an image which aligns with game state
function CreateEnd(img) {
    var end = new GameObject();
    var end_png = [ img ];
    end.type = 'end';
    end.load_images(end_png);
    end.loc.x = width/2;
    end.loc.y = width/5;
    end.scaling = 0.5;
    
    // scale text to the size of the screen
    end.scale_attributes(screen_scale_factor);
    
    end.move = function(ftr) {};

    return end;
};