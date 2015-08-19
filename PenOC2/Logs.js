var Logs = Logs || {};

$(document).ready(function () {
    setCurrentTab('logs');
    setSocialButtons('http://www.penoc.org.za/logs', 'PenOC Website - Log Results');
    Logs.displayLogs();
    LogClickHandler();
    Logs.initialiseMasonryContainer();
});

/*----Initialise Masonry----*/
Logs.initialiseMasonryContainer = function () {
    var $container = $('#divBase');
    // initialize
    $container.masonry({
        columnWidth: '.card',
        gutter: 0,
        itemSelector: '.card'
    });
}

Logs.displayLogs = function () {
    var objLogs;
    var objLogResults;
    var strLogs = "";

    objLogs = LogsService.recentLogs(14);

    objLogs.forEach(function (Log) {
        strLogs = "<div idLog='" + Log.logID + "' class='card small-card log clickable'><div class='cardTitle' style='float: left;'><span class='clickable'>" + Log.name + " (" + Log.year + ")</span></div><div class='cardSubTitle' style='float: right;'>" + Log.eventCount + " events</div><div style='clear: both;'></div></div>"
        $("#divBase").append(strLogs)
    });

    objLogs.forEach(function (Log) {
        var strLogResults = "";
        var intPosition = 0;
        var result;

        Global.addLogResults(Log);

        while (intPosition < 3) {
            result = Log.results[intPosition];
            strLogResults += "<div>" + result.position + ".  " + result.competitorName + "</div>";
            intPosition++;
        }

        $("[idLog=" + Log.logID + "]").append(strLogResults);
    });

}

/*----Log Card Click Handler ---*/
function LogClickHandler() {

    $(".card.log").on("click", function (event) {
        var objTarget;

        event.preventDefault();
        objTarget = $(this);
        LogResults.showLog(objTarget.attr("idLog"));

    });
}