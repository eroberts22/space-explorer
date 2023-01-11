///////////////////////////////////////////////////////////////////////////////////////////////////////
// HTML Builder for resources used in the project
//      - designed by Kent Jones
//      - adapted by Ethan Worth, Owen Foster, and Elizabeth Roberts
///////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

// list of resources to be added to page
var resourceList = [
    "https://htmlcolorcodes.com/tutorials/html-text-color/",
    "https://www.edureka.co/blog/background-image-in-html/",
    "https://wallpaperaccess.com/4k-space",
    "https://commons.wikimedia.org/wiki/File:Pink_Opaque.jpg",
    "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container",
    "https://css-tricks.com/perfect-full-page-background-image/",
    "https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/",
    "https://stackoverflow.com/a/34913701",
    "https://stackoverflow.com/a/13640097",
    "https://getbootstrap.com/docs/4.0/components/progress/",
    "https://stackoverflow.com/a/42252877",
    "https://stackoverflow.com/a/9622873",
    "https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript"
];

// load resources into the box
$(function() {
    var $resources = $("#resource-box");

    // reference for iterating over dict: https://stackoverflow.com/a/34913701
    for(var resource of resourceList) {
        $resources.append("<p><a href=\"" + resource + "\">" + resource + "</a></p>");
    }
});