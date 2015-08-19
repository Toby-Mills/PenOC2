var Calendar = Calendar || {};

/*----Document Ready----*/
$(document).ready(function () {

    setCurrentTab('calendar');
    setSocialButtons('http://www.penoc.org.za/calendar', 'PenOC Website - Event Calendar');
    Calendar.displayEvents();
    EventsClickHandler();
    MapLinkClickHandler();

})

Calendar.displayEvents = function () {
    var objEvents;
    var objEvent;
    var strCard;

    objEvents = EventsService.upcomingEvents(1000);

    objEvents.forEach(function (objEvent) {
        strCard = "<div class='card'";
        strCard += " idEvent='" + objEvent.eventID + "'";
        strCard += ">";
        strCard += "<div style='float: left;'>" + CalendarIcon(Global.parseDate(objEvent.eventDate)) + "</div>";
        strCard += "<div style='float: left;'>"
        strCard += "<span class='cardTitle clickable' style='min-width:200ch;'>" + objEvent.eventName + "</span>";
        
        if (objEvent.venueName != undefined) {
            strCard += "<div>" + objEvent.venueName + "</div>";
        }

        if (objEvent.eventStarts.length > 0) {
            strCard += "<div style='float: left;'>Starts: " + objEvent.eventStarts + "</div>";
        }

        strCard += "</div>";

        if (!Global.isPhone && objEvent.eventLatitude != undefined) {
            var mapOptions = { "centerLat": objEvent.eventLatitude, "centerLong": objEvent.eventLongitude, "zoom": 10, "height": 100, "width": 100, "addMarker": true };
            strCard += "<div class='map' style='float:right;'>";
            strCard += "<a target='_blank' href='" + GoogleMaps.mapURL(mapOptions) + "'>";
            strCard += GoogleMaps.staticMapImage(mapOptions);
            strCard += "</a></div>";
        }

        strCard += "</div>"
        strCard += "</div>";
        $("#divBase").append(strCard);
    })

}

/*----Calendar Icon ---*/
function CalendarIcon(dteDate) {
    var strReturn = "";
    
    strReturn += "<div class='calendar-date'>";
    strReturn += "<div class='calendar-icon'>";
    strReturn += "<div class='calendar-icon-month'>";
    strReturn += Global.months[dteDate.getMonth()] + " '" + ((dteDate.getFullYear() - 2000).pad(2));
    strReturn += "</div>";
    strReturn += "<div class='calendar-icon-date'>";
    strReturn += dteDate.getDate();
    strReturn += "</div>";
    strReturn += "</div>";
    strReturn += "<div class='calendar-date-day'>";
    strReturn += Global.days[dteDate.getDay()];
    strReturn += "</div>";
    strReturn += "</div>";

    return strReturn;
}

/*----Event list Click Handler ---*/
function EventsClickHandler() {

    $(".card").on("click" , function (event) {
        var objTarget;

        event.preventDefault();
        objTarget = $(this);
        EventDetails.showEvent(objTarget.attr("idEvent"));
    });
}

/*----Map Link Click Handler ---*/
function MapLinkClickHandler() {

    $("a").on("click", function (event) {
        //prevent propgation to stop the Events Click Handler from overriding
        event.stopPropagation();
    });
}