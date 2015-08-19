var EventDetails = EventDetails || {};

EventDetails.NoDetailsYet = "No details yet..."

EventDetails.showEvent = function (intEvent) {
    var strElement = "";
    var objEvent;

    objEvent = EventsService.eventDetails(intEvent);

    if (objEvent.eventNotes > "") {
        strElement += "<div class='modal-header'>";
        strElement += "<h4 class='modal-title'>Special Note:</h4>";
        strElement += "</div>";
        strElement += "<div class='modal-body highlight'>" + objEvent.eventNotes + "</div>";
    }

    strElement += "<div class='modal-header'>";
    strElement += "<h4 class='modal-title'>Date & Time:</h4>";
    strElement += "</div>";
    strElement += "<div class='modal-body'><b>Date</b>: "
    strElement += Global.parseDate(objEvent.eventDate).displayDate();
    strElement += "<br />"
    strElement += "<b>Starts</b>: "
    if (objEvent.eventStarts > "") {
        strElement += objEvent.eventStarts;
    } else {
        strElement += EventDetails.NoDetailsYet
    }
    strElement += "</div>"

    strElement += "<div class='modal-header'>";
    strElement += "<h4 class='modal-title'>Courses:</h4>";
    strElement += "</div>";
    strElement += "<div class='modal-body'>"
    if (objEvent.eventCourseDescriptions > "") {
        strElement += objEvent.eventCourseDescriptions;
    } else {
        strElement += EventDetails.NoDetailsYet
    }
    strElement += "</div>"


    strElement += "<div class='modal-header'>";
    strElement += "<h4 class='modal-title'>Cost:</h4>";
    strElement += "</div>";
    strElement += "<div class='modal-body'>"
    if (objEvent.eventCost > "") {
        strElement += objEvent.eventCost;
    } else {
        strElement += EventDetails.NoDetailsYet
    }
    strElement += "</div>"

    strElement += "<div class='modal-header'>";
    strElement += "<h4 class='modal-title'>Directions:</h4>";
    strElement += "</div>";
    strElement += "<div class='modal-body'>"
    if (objEvent.eventLatitude != undefined) {
        var mapOptions = { "centerLat": objEvent.eventLatitude, "centerLong": objEvent.eventLongitude, "zoom": 10, "height": 100, "width": 100, "addMarker": true };
        strElement += "<div class='map' style='float:left;margin-right:3ch; margin-bottom: 3ch;'>";
        strElement += "<a target='_blank' href='" + GoogleMaps.mapURL(mapOptions) + "'>";
        strElement += GoogleMaps.staticMapImage(mapOptions);
        strElement += "</a>";
        strElement += "</div>";
    }
    if (objEvent.eventDirections > "") {
        strElement += objEvent.eventDirections;
    } else {
        strElement += EventDetails.NoDetailsYet
    }
    strElement += "</div>"

    Modal.setTitle(objEvent.eventName + ' (' + Global.parseDate(objEvent.eventDate).displayDate() + ')');
    Modal.setBody(strElement);
    Modal.setSocialButtons(Hook.createURL(Hook.eventDetails, intEvent), "PenOC Event Details");
    Modal.show();

    ga('send', 'pageview', {
        page: '/EventDetails',
        title: 'Event Details'
    });
}