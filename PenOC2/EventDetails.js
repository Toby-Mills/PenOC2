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
    if (objEvent.eventDirections > "") {
        strElement += objEvent.eventDirections;
    } else {
        strElement += EventDetails.NoDetailsYet
    }
    strElement += "</div>"

    Modal.setTitle(objEvent.eventName);
    Modal.setBody(strElement);
    Modal.show();

}