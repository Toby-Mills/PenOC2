

/*----Google Anaytics--*/
(function (i, s, o, g, r, a, m) {
i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
(i[r].q = i[r].q || []).push(arguments)
}, i[r].l = 1 * new Date(); a = s.createElement(o),
m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-17068661-1', 'auto');
ga('send', 'pageview');


$(document).ready(function () {
    buildMenuDropdownList();
    populateNextEvent();
    NextEventClickHandler();
    DetectTouch();
    Global.extendToBottom($("#divBase"));
    randomBackground();
});

function setCurrentTab(selectedTab) {
$('a').removeClass('selected');
$('#' + selectedTab).addClass('selected');
}

function setSocialButtons(strUrl, strDescription) { 
Social.addSocialBar($("#divSocial"), strUrl, strDescription);
}

function randomBackground() {
    //$("body").css("background-image", "url('Images/Background/background-0" + Math.floor(Math.random() * 10) + ".JPG')");
    $("body").css("background-image", "url('Images/Background/background-02.JPG')");
}

function buildMenuDropdownList() {
//generate a dropdown list of links to display instead of menu on narrow screens
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

    if (objEvent) {
        objControl.attr("idEvent", objEvent.eventID);
        objControl = $("#spanNextEventName");
        objControl.text(objEvent.eventName);
        if (objEvent.eventName.doesNotContain(objEvent.venueName)) {
            objControl = $("#spanNextEventVenue");
            objControl.text(" (" + objEvent.venueName + ")");
        }
        objControl = $("#spanNextEventDate");
        objControl.text(Global.parseDate(objEvent.eventDate).displayDate());
    } else {
        objControl = $("#spanNextEventName");
        objControl.text('To be confirmed');
    }
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