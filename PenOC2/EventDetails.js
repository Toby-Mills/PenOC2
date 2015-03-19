var EventDetails = EventDetails || {};

EventDetails.NoDetailsYet = "No details yet..."

EventDetails.showEvent = function (intEvent) {
    var strElement="";
    var divModalContainer;
    var objEvent;

    objEvent = EventsService.eventDetails(intEvent);

    divModalContainer = Global.modalContainer();

    strElement += "<div class='modal-dialog large'>";
    strElement += "<div class='modal-content'>";
    strElement += "<div class='modal-header title'>";
    strElement += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
    strElement += "<h4 class='modal-title'>" + objEvent.name + "</h4>";
    strElement += "</div>";
    strElement += "<div class='modal-body'>" + objEvent.venue + " : ";
    strElement += "" + Global.displayDate(Global.parseDate(objEvent.date));
    strElement += "</div>";
    if (objEvent.notes > "") {
        strElement += "<div class='modal-header'>";
        strElement += "<h4 class='modal-title'>Special Note:</h4>";
        strElement += "</div>";
        strElement += "<div class='modal-body highlight'>" + objEvent.notes + "</div>";
    }

    strElement += "<div class='modal-header'>";
    strElement += "<h4 class='modal-title'>Courses:</h4>";
    strElement += "</div>";
    strElement += "<div class='modal-body'>"
    if (objEvent.courseDescriptions > "") {
        strElement += objEvent.courseDescriptions;
    } else {
        strElement += EventDetails.NoDetailsYet
    }
    strElement += "</div>"


    strElement += "<div class='modal-header'>";
    strElement += "<h4 class='modal-title'>Cost:</h4>";
    strElement += "</div>";
    strElement += "<div class='modal-body'>"
    if (objEvent.cost > "") {
        strElement += objEvent.cost;
    } else {
        strElement += EventDetails.NoDetailsYet
    }
    strElement += "</div>"

    strElement += "<div class='modal-header'>";
    strElement += "<h4 class='modal-title'>Directions:</h4>";
    strElement += "</div>";
    strElement += "<div class='modal-body'>"
    if (objEvent.directions > "") {
        strElement += objEvent.directions;
    } else {
        strElement += EventDetails.NoDetailsYet
    }
    strElement += "</div>"

    strElement += "<div class='modal-footer'>";
    strElement += "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";
    strElement += "</div>";
    strElement += "</div>";
    strElement += "</div>";

    divModalContainer.html(strElement);

    $('#divModalContainer').modal('show');

}