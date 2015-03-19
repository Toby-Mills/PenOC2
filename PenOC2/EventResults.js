var EventResults = EventResults || {};

EventResults.showEvent = function (intEvent) {
    var strCard = "";
    var strTabs = "";
    var strResults = "";
    var blnFirst = false;
    var divModalContainer;
    var objEvent;

    objEvent = EventsService.eventDetails(intEvent);
    Global.addEventCourses(objEvent);
    Global.addCourseResults(objEvent.courses);

    divModalContainer = Global.modalContainer();

    strCard += "<div class='modal-dialog large'>";
    strCard += "<div class='modal-content'>";
    strCard += "<div class='modal-header title'>";
    strCard += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>";
    strCard += "<h4 class='modal-title'>" + objEvent.name + "</h4>";
    strCard += "</div>";
    strCard += "<div class='modal-body'>" + objEvent.venue + " : ";
    strCard += "" + Global.displayDate(Global.parseDate(objEvent.date));
    strCard += "</div>";

    strTabs = strTabs + "<div><ul class='nav nav-tabs'>"
    strResults = strResults + "<div class='tab-content' style='padding-left: 30px; padding-right: 30px;'>"

    blnFirst = true;
    objEvent.courses.forEach(function (course) {
        if (course.results.length > 0) {
            strTabs = strTabs + "<li";
            strResults = strResults + "<div id='course" + course.courseID + "' class='tab-pane fade in";
            if (blnFirst) {
                strTabs = strTabs + " class='active'";
                strResults = strResults + " active";
            }
            strTabs = strTabs + "><a data-toggle='tab' href='#course" + course.courseID + "'>" + course.name + "</a></li>";
            strResults = strResults + "'><p>" + EventResults.courseResult(course) + "</p></div>";
            blnFirst = false;
        }
    });
    strTabs = strTabs + "</ul>";
    strResults = strResults + "</div></div>"

    strCard = strCard + strTabs;
    strCard = strCard + strResults;

    strCard += "<div class='modal-footer'>";
    strCard += "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";
    strCard += "</div>";
    strCard += "</div>";
    strCard += "</div>";

    divModalContainer.html(strCard);

    $('#divModalContainer').modal('show');


}

EventResults.courseResult = function (course) {
    var strTable = "";

    strTable = strTable + "<div style='padding-bottom: 10px'>";
    strTable = strTable + course.name + " (" + Global.displayDistance(course.length) + ", " + course.climb + "m climb)";
    strTable = strTable + "</div>";

    strTable = strTable + "<table class='resultTable table-striped'>";
    strTable = strTable + "<tr>";
    strTable = strTable + "<th>Pos.</th>";
    strTable = strTable + "<th>Competitor</th>";
    strTable = strTable + "<th class='number'>Time</th>";
    strTable = strTable + "<th class='number'>Points</th>";
    strTable = strTable + "<th>Race Num.</th>";
    strTable = strTable + "<th>Comments</th>";
    strTable = strTable + "</tr>";

    course.results.forEach(function (result) {

        if (result.dsq) {
            strTable = strTable + "<tr class='dsq'>";
            strTable = strTable + "<td>DSQ</td>";
        } else {
            strTable = strTable + "<tr>";
            strTable = strTable + "<td>" + result.position + "</td>";
        }
        
        strTable = strTable + "<td>" + result.name + "</td>";
        strTable = strTable + "<td class='number'>" + Global.displayTime(Global.parseDate(result.time)) + "</td>";
        strTable = strTable + "<td class='number'>" + result.points + "</td>";
        strTable = strTable + "<td>" + result.raceNumber + "</td>";
        strTable = strTable + "<td>" + result.comments + "</td>";
        strTable = strTable + "</tr>";
    });
    strTable = strTable + "</table>";

    return strTable;
}