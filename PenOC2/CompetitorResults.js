var CompetitorResults = CompetitorResults || {};

CompetitorResults.showCompetitor = function (intCompetitor, objPromise) {
    var strResults = "";
    var objCompetitor;
    var objCompetitorResults;

    objCompetitor = CompetitorsService.competitorDetails(intCompetitor);
    objCompetitor.results = EventsService.competitorResults(intCompetitor);

    strResults += "<div style='float: left; padding: 10px;'>";
    strResults += "<img height='86px' src='images/competitor.png' />";
    strResults += "</div>";

    strResults += "<div style='float: left; padding: 10px;'>";
    strResults += "<span style='font-weight: bold;'>" + objCompetitor.fullName + "</span><br />";
    if (objCompetitor.gender !== null) {
        strResults += "<span>" + objCompetitor.gender + "</span><br />";
    };
    strResults += "<span>" + Global.CompetitorCategory(objCompetitor.genderID, Global.parseDate(objCompetitor.dateOfBirth)) + "</span>";

    strResults += "</div>";

    strResults += "<div style='float: right;'>";
    strResults += "<div class='pill'><div class='left'><span class='eventCount'>" + objCompetitor.results.length.toString() + "</span></div><div class='right'><div class='inner'> results</div></div></div>";
    strResults += "</div>";

    strResults += "<div style='clear: both;' />";
    strResults += "<div class='tab-content'>";

    strResults += ResultTable.createTable(objCompetitor.results, ResultTable.enTableColumns_Competitor);

    strResults += "</div>";

    Modal.setTitle(objCompetitor.fullName);
    Modal.setBody(strResults);

    CompetitorResults.ResultClickHandler();

    Modal.show("competitor", { "intCompetitor": intCompetitor }, objCompetitor.fullName);

    if (objPromise != undefined) { objPromise() };
};


//--------------------------------------------------------
CompetitorResults.ResultClickHandler = function () {
    $(".resultTable tbody").on("click", "td.event span", function (event) {

        var objTarget;
        objTarget = $(this).closest("tr");

        intEvent = objTarget.attr("idEvent");
        intCourse = objTarget.attr("idCourse");
        intCompetitor = objTarget.attr("idCompetitor");
        setTimeout(function(){EventResults.showEvent(intEvent, intCourse, intCompetitor)}, 100);

    });
};