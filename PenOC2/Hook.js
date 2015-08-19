var Hook = Hook || {};

Hook.eventResults = "eventResults";
Hook.eventDetails = "eventDetails";
Hook.courseResults = "courseResults";
Hook.competitorResults = "competitorResults";
Hook.logResults = "logResults";

Hook.respond = function () {
    var strParameters = Hook.UrlParameters();
    var intEvent;
    var intCourse;
    var intResult;
    var intCompetitor;
    var intLog;

    switch (true) {
        case (strParameters[Hook.eventDetails] > ""):
            intEvent = parseInt(strParameters[Hook.eventDetails]);
            EventDetails.showEvent(intEvent)
            break;
        case (strParameters[Hook.eventResults] > ""):
            intEvent = parseInt(strParameters[Hook.eventResults]);
            EventResults.showEvent(intEvent)
            break;
        case (strParameters[Hook.courseResults] > ""):
            intCourse = parseInt(strParameters[Hook.courseResults]);
            intEvent = EventsService.courseEvent(intCourse);
            EventResults.showEvent(intEvent, intCourse);
            break;
        case (strParameters[Hook.competitorResults] > ""):
            intCompetitor = parseInt(strParameters[Hook.competitorResults]);
            CompetitorResults.showCompetitor(intCompetitor);
            break;
        case (strParameters[Hook.logResults] > ""):
            intLog = parseInt(strParameters[Hook.logResults]);
            LogResults.showLog(intLog);
            break;
    };
};


// Read a page's GET URL variables and return them as an associative array.
Hook.UrlParameters = function () {
    var strParameters = [], hash;
    var strPairs = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < strPairs.length; i++) {
        strPair = strPairs[i].split('=');
        strParameters.push(strPair[0]);
        strParameters[strPair[0]] = strPair[1];
    }
    return strParameters;
}

Hook.createURL = function (strHookType, intHookID) {
    var strReturn = "";

    strReturn = "http://www.penoc.org.za/Home.aspx?"
    strReturn += strHookType;
    strReturn += "=";
    strReturn += intHookID;

    return strReturn;
}