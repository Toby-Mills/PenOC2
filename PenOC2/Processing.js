var Processing = Processing || {};

Processing.display = function (objElement) {
    var divOverlay;

    divOverlay = $("#divProcessing");

    if (divOverlay.length == 0) {
        $("body").append("<div id='divProcessing'><span class='helper'></span><img src='images/processing.gif' /></div>");
        divOverlay = $("#divProcessing");
    }
    divOverlay.addClass("processing");
    divOverlay.css("top", objElement.offset().top);
    divOverlay.css("left", objElement.offset().left);
    divOverlay.css("width", objElement.outerWidth());
    divOverlay.css("height", objElement.outerHeight());
}

Processing.hide = function () {
    var divOverlay;

    divOverlay = $("#divProcessing");

    if (divOverlay.length > 0) {
        divOverlay.remove();
    }
}