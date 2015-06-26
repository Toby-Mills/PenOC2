//generate a dropdown list of links to display instead of menu on narrow screens
$(document).ready(function () {
    buildMenuDropdownList();
    populateNextEvent();
    NextEventClickHandler();
    DetectTouch();
});

function setCurrentTab(selectedTab) {
    $('a').removeClass('selected');
    $('#' + selectedTab).addClass('selected');
}

function buildMenuDropdownList() {
    // Create the dropdown base
    $("<select />").appendTo(".menu");

    // Create default option "Go to..."
    $("<option />", {
        "selected": "selected",
        "value": "",
        "text": "Go to..."
    }).appendTo(".menu select");

    // Populate dropdown with menu items
    $(".menu a").each(function () {
        var el = $(this);
        $("<option />", {
            "value": el.attr("href"),
            "text": el.text()
        }).appendTo(".menu select");
    });

    $(".menu select").change(function () {
        window.location = $(this).find("option:selected").val();
    });
}

function populateNextEvent() {
    var objEvent;
    var objControl;

    objEvent = EventsService.nextEvent();

    objControl = $("#divNextEventBox")
    objControl.attr("idEvent", objEvent.eventID);
    objControl = $("#spanNextEventName");
    objControl.text(objEvent.eventName);
    if (objEvent.eventName.doesNotContain(objEvent.venueName)) {
        objControl = $("#spanNextEventVenue");
        objControl.text(" (" + objEvent.venueName + ")");
    }
    objControl = $("#spanNextEventDate");
    objControl.text(Global.parseDate(objEvent.eventDate).displayDate());
}

/*----Next Event Box Click Handler ---*/
function NextEventClickHandler() {
    var divNextEventBox;

    $("#divNextEventBox").on("click", function (event) {
        var objTarget;

        objTarget = $(this);
        EventDetails.showEvent(objTarget.attr("idEvent"));

    });
}

function DetectTouch() {
    $("body").addClass(("ontouchstart" in document.documentElement) ? 'touch' : 'no-touch');
}