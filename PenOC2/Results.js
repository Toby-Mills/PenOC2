var Results = Results || {};

Results.venues = Autocomplete.venues();

$(document).ready(function () {
    setCurrentTab('results');
    $("#divEventList").append(Results.EventsList());
    EventsClickHandler();
    FilterChangeHandler();
});

Results.EventsList = function () {
    var objResults;
    var strReturn = "";
    var strDivResult = "";

    objResults = EventsService.recentEventsWithResults(9999);
    objResults.forEach(function (PastEvent) {
        strDivResult = "<div class='event card clickable' idEvent = '" + PastEvent.eventID + "'>";
        strDivResult += "<div class='cardTitle'>";
        strDivResult += "<span>"
        if (PastEvent.name != null) {
            strDivResult += PastEvent.name;
        } else {
            strDivResult += PastEvent.venue;
        }
        strDivResult += "</span>";
        strDivResult += "</div>";
        strDivResult += "<div class='date'>";
        strDivResult += "<span>" + Global.parseDate(PastEvent.date).displayDate() + "</span>";
        strDivResult += "</div>";
        strDivResult += "<div class='cardSubTitle'>";
        strDivResult += "<span>" + PastEvent.venue + "</span>";
        strDivResult += "</div>";
        strDivResult += "</div>";

        strReturn += strDivResult;
    });

    return strReturn;
}

/*----Event list Click Handler ---*/
function EventsClickHandler() {

    $("div.event").on("click", function (event) {
        var objTarget;

        event.preventDefault();
        objTarget = $(this);
        Processing.display(objTarget);

        setTimeout(function () { EventResults.showEvent(objTarget.attr("idEvent"), undefined, undefined, function () { Processing.hide() }) }, 100);

    });
}

/*---Filter Change Handler ---*/
function FilterChangeHandler() {

    $("#txtSearch").on("keydown", function (event) {

        if (event.keyCode == 13) {
            event.preventDefault();
        }

    });

    $("#txtSearch").on("keyup", function (event) {
        var objTarget;

            objTarget = $(this);
            Results.filterEvents(objTarget.val());

    });
}

Results.filterEvents = function (strFilterText) {
    var matches;
    var events;

    if (strFilterText > "") {

        matches = $("span:containsCI('" + strFilterText + "')");
        events = matches.closest(".event");
        events.removeClass("hidden");

        matches = $(".event").not(events);
        matches.addClass("hidden");

    } else {
        events = $(".event");
        events.removeClass("hidden");
    }


}