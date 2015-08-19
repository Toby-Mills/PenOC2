var GoogleMaps = GoogleMaps || {};

GoogleMaps.staticMapImage = function (objOptions) {
    var strReturn = ""

    strReturn += "<img src='http://maps.google.com/maps/api/staticmap?center=";
    strReturn += objOptions.centerLat + "," + objOptions.centerLong;
    if (objOptions.addMarker) {
        strReturn += "&markers=";
        strReturn += objOptions.markerLat || objOptions.centerLat;
        strReturn += ",";
        strReturn += objOptions.markerLong || objOptions.centerLong;
    }
    strReturn += "&zoom=" + objOptions.zoom + "&size=" + objOptions.height + "x" + objOptions.width + "'>"

    return strReturn;
}

GoogleMaps.mapURL = function (objOptions) {
    var strReturn = "";

    strReturn += "https://maps.google.com/maps/place?z=" + objOptions.zoom;
    strReturn += "&q=loc:"
    strReturn += objOptions.markerLat || objOptions.centerLat;
    if (objOptions.centerLong > 0) { strReturn += "+" };
    strReturn += objOptions.markerLong || objOptions.centerLong;

    return strReturn;
}

GoogleMaps.linkImage = function (objOptions) {
    var strReturn = "";
    var objLink;
    var objImage;

    objLink = $("<a></a>");
    objLink.attr("target", "_blank");
    objLink.attr("href", GoogleMaps.mapURL(objOptions));
    objLink.append(GoogleMaps.staticMapImage(objOptions));

    strReturn = objLink[0].outerHTML;
    return strReturn;
}