var EventResults = EventResults || {};

//--------------------------------------------------------
EventResults.buildEventResults = function (intEvent, intCourse, intCompetitor, objPromise) {
    var strCard = "";
    var strTabs = "";
    var strResults = "";
    var blnFirst = false;
    var divModalContent;
    var objEvent;

    objEvent = EventsService.eventDetails(intEvent);
    Global.addEventCourses(objEvent);
    Global.addCourseResults(objEvent.courses);

    strCard += "<div style='padding: 8px; float:left;'>" + objEvent.venueName + " : ";
    strCard += "" + Global.parseDate(objEvent.eventDate).displayDate();
    strCard += "</div>";

    if (objEvent.controllerFullName > "") {
        strCard += "<div class='pill' style='float:right;'><div class='left'>Controller:</div><div class='right'><span id='controller' class='edit-textbox'>" + objEvent.controllerFullName + "</span></div></div>";
    }

    if (objEvent.plannerFullName > "") {
        strCard += "<div class='pill' style='float:right;'><div class='left'>Planner:</div><div class='right'><span class='edit-textbox'>" + objEvent.plannerFullName + "</span></div></div>";
    }
    strCard += "<div style='clear:both;'></div>";

    strTabs = strTabs + "<div><ul class='nav nav-tabs'>"
    strResults = strResults + "<div class='tab-content'>"

    if (objEvent.plannerReport > "") {
        strTabs = strTabs + "<li><a data-toggle='tab' href='#plannerReport'>Planner's Report</a></li>";
        strResults = strResults + "<div id='plannerReport' class='tab-pane fade in'>"
        strResults = strResults + "<p>" + objEvent.plannerReport + "</p></div>";
    }

    if (objEvent.controllerReport > "") {
        strTabs = strTabs + "<li><a data-toggle='tab' href='#controllerReport'>Controller's Report</a></li>";
        strResults = strResults + "<div id='controllerReport' class='tab-pane fade in'><p>" + objEvent.controllerReport + "</p></div>";
    }

    blnFirst = true;
    objEvent.courses.forEach(function (course) {
        if (course.results.length > 0) {
            strTabs = strTabs + "<li";
            strResults = strResults + "<div id='course" + course.courseID + "' style='overflow: hidden;' class='tab-pane fade in";
            if (course.courseID == intCourse || blnFirst && intCourse == undefined) {
                strTabs = strTabs + " class='active'";
                strResults = strResults + " active";
            }
            strTabs = strTabs + "><a data-toggle='tab' href='#course" + course.courseID + "'>" + course.name + "</a></li>";
            strResults = strResults + "'><p>" + EventResults.courseResult(course, intCompetitor) + "</p></div>";
            blnFirst = false;
        }
    });
    strTabs = strTabs + "</ul>";
    strResults = strResults + "</div></div>"

    strCard = strCard + strTabs;
    strCard = strCard + strResults;

    Modal.setTitle(objEvent.eventName || objEvent.venueName);
    Modal.setBody(strCard);
    Modal.setSocialButtons(Hook.createURL(Hook.eventResults, intEvent), "PenOC Event Results");
    //Modal.setEditButtonVisible(true, EventResults.startEditing);

    Modal.show("event", { "intEvent": intEvent, "intCourse": intCourse, "intCompetitor": intCompetitor }, objEvent.eventName);

    ga('send', 'pageview', {
        page: '/EventResults',
        title: 'Event Results'
    });
}

//--------------------------------------------------------
EventResults.showEvent = function (intEvent, intCourse, intCompetitor, objPromise) {
    EventResults.buildEventResults(intEvent, intCourse, intCompetitor)

    EventResults.competitorClickHandler();

    if (objPromise != undefined) { objPromise() };
}


//--------------------------------------------------------
EventResults.editEvent = function (intEvent, objPromise) {
    EventResults.buildEventResults(intEvent)
    InlineEditing.startEditing($("body"));

    if (objPromise != undefined) { objPromise() };
}

//--------------------------------------------------------
EventResults.courseResult = function (course, intCompetitor) {
    var strReturn = "";

    strReturn = strReturn + "<div style='padding-bottom: 10px'>";
    strReturn = strReturn + course.name;
    if (course.length != null || course.climb != null) {
        strReturn += " (" + Global.displayDistance(course.length) + ", " + course.climb + "m climb)";
    }

    strReturn = strReturn + "</div>";

    strReturn = strReturn + ResultTable.createTable(course.results, ResultTable.enTableColumns_Event, intCompetitor);

    return strReturn;
}

//--------------------------------------------------------
EventResults.competitorClickHandler = function () {
    $(".resultTable tbody").on("click", "td.competitor span", function (event) {
        var objTarget;
        objTarget = $(this).closest("td.competitor");
        intCompetitor = objTarget.attr("idCompetitor");

        setTimeout(function () { CompetitorResults.showCompetitor(intCompetitor) }, 100);
    });
};

//--------------------------------------------------------
EventResults.startEditing = function () {
    InlineEditing.startEditing($("#divModalContainer"));
    Modal.setEditButtonVisible(false);
    Modal.setSaveButtonVisible(true, EventResults.saveEdits);
    Modal.setCancelButtonVisible(true, EventResults.cancelEdits);
    $("#controller").autocomplete({ source: Autocomplete.competitors, appendTo: "#divModalContainer" });
}

//--------------------------------------------------------
EventResults.saveEdits = function () {
    Modal.setEditButtonVisible(true, EventResults.startEditing);
    Modal.setSaveButtonVisible(false);
    Modal.setCancelButtonVisible(false);
}
//--------------------------------------------------------
EventResults.cancelEdits = function () {
    Modal.setEditButtonVisible(true, EventResults.startEditing);
    Modal.setSaveButtonVisible(false);
    Modal.setCancelButtonVisible(false);
}