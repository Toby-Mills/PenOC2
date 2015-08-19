var Global = Global || {};

var phoneWidth = 640;
var monitorWidth = 768;
var widemonitorWidth = 1024;
var superwidemonitorWidth = 1366;

Global.isSuperwidemonitor = window.matchMedia("only screen and (min-width: " + superwidemonitorWidth + "}px)").matches;
Global.isWidemonitor = window.matchMedia("only screen and (min-width:" + widemonitorWidth + "px) and (max-width: " + superwidemonitorWidth + "px)").matches;
Global.isMonitor = window.matchMedia("only screen and (min-width:" + monitorWidth + "px) and (max-width: " + widemonitorWidth + "px)").matches;
Global.isTablet = window.matchMedia("only screen and (min-width:" + phoneWidth + "px) and (max-width: " + monitorWidth + "px)").matches;
Global.isPhone = window.matchMedia("only screen and (max-width: " + phoneWidth + "px)").matches;

Global.months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
Global.days = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

Global.recentPast = new Date().setMonth(new Date().getMonth() - 6);
Global.nearFuture = new Date().setMonth(new Date().getMonth() + 6);

/*---Number.pad---*/
Number.prototype.pad = function (size) {
    var strReturn = String(this);
    while (strReturn.length < (size || 2)) { strReturn = "0" + strReturn; }
    return strReturn;
}

/*----Parse Date----*/
Global.parseDate = function parseDate(dteDate) {
    var dateReturn;

    if (dteDate != null) {
        dateReturn = new Date(parseInt(dteDate.substring(6)));
    } else {
        dateReturn = new Date(0);
    }
    return dateReturn;
}


/*----Display Date----*/
Date.prototype.displayDate = function displayDate() {
    var strReturn;

    if (this < Global.recentPast || this > Global.nearFuture) {
        strReturn = this.displayDateLong();
    } else {
        strReturn = this.displayDateShort();
    }

    return strReturn;
}

Date.prototype.displayDateShort = function displayDateShort() {
    var strReturn;
    strReturn = Global.days[this.getDay()] + " " + this.getDate() + " " + Global.months[this.getMonth()];
    return strReturn;
}

Date.prototype.displayDateLong = function displayDateLong() {
    var strReturn;
    strReturn = this.getDate() + " " + Global.months[this.getMonth()] + " '" + ((this.getFullYear() - 2000).pad(2));
    return strReturn;
}

/*----Display Time----*/
Date.prototype.displayTime = function displayTime() {
    var strReturn;

    //dateDate.setHours(dateDate.getHours + 2);//Time Zone adjustment
    strReturn = this.getHours() + ":" + this.getMinutes().pad(2) + ":" + this.getSeconds().pad(2);

    return strReturn;
}

/*---Add Event Courses---*/
Global.addEventCourses = function (objEvent) {
    objEvent.courses = EventsService.eventCourses(objEvent.eventID);
}

/*---Add Course Winners---*/
Global.addCourseResults = function (objCourses) {
    objCourses.forEach(function (objCourse) {
        objCourse.results = EventsService.courseWinner(objCourse.courseID);
    })
}

/*---Add Course Results---*/
Global.addCourseResults = function (objCourses) {
    objCourses.forEach(function (objCourse) {
        objCourse.results = EventsService.courseResults(objCourse.courseID);
    })
}

/*---Add Event Courses---*/
Global.addEventCourses = function (objEvent) {
    objEvent.courses = EventsService.eventCourses(objEvent.eventID);
}

/*---Add Course Results---*/
Global.displayDistance = function (intMetres) {

    var strReturn = "";

    if (intMetres > 1000) {
        strReturn = (intMetres / 1000) + " km";
    } else {
        strReturn = intMetres + " m";
    }

    return strReturn;
}

String.prototype.doesNotContain = function (arg) {
    return this.indexOf(arg) == -1;
};

//--------------------------------------------------------
Global.addLogResults = function (objLog) {
    var objLogResults;
    var intMaxResults = 0;
    var intPosition = 0;

    intMaxResults = objLog.eventCount - objLog.disregardWorst;
    objLogResults = LogsService.LogResults(objLog.logID);

    //Add events
    if (objLog.events == undefined) {
        objLog.events = LogsService.LogEvents(objLog.logID);
    };

    //insert points for planners & controllers
    objLog.events.forEach(function (objEvent) {
        objLogResults.forEach(function (objCompetitor) {
            if (objEvent.plannerID === objCompetitor.competitorID || objEvent.controllerID === objCompetitor.competitorID) {
                //calculate the average points of results already recorded
                var intTotalPoints = 0;
                var intTotalEvents = 0;
                //sort descending to find top 3 results
                objCompetitor.results.sort(function (result1, result2) { return result1.points > result2.points ? -1 : result1.points < result2.points ? 1 : 0; });
                objCompetitor.results.forEach(function (courseResult) {
                    if (intTotalEvents < 3) {
                        intTotalPoints += courseResult.points;
                        intTotalEvents++;
                    }
                });
                //add average of best 3 results to organiser
                if (intTotalEvents > 0) {
                    intOrganiserPoints = Math.round(intTotalPoints / intTotalEvents)
                    objCompetitor.results.push({ "eventID": objEvent.eventID, "points": intOrganiserPoints, "organiser": true });
                }
            }
        });
    });

    objLogResults.forEach(function (objCompetitor) {
        var intResultsToIgnore = 0;
        var intPointsToDeduct = 0;
        var intTotalPoints = 0;

        //flag results to be ignored
        if (objCompetitor.results.length > intMaxResults) {
            //check how many results to ignore for this competitor
            intResultsToIgnore = objCompetitor.results.length - intMaxResults;
            //sort the results from smallest to greatest number of points
            objCompetitor.results.sort(function (result1, result2) { return result1.points < result2.points ? -1 : result1.points > result2.points ? 1 : 0; });
            for (i = 0; i < intResultsToIgnore; i++) {
                objCompetitor.results[i].deduct = true;
                intPointsToDeduct += objCompetitor.results[i].points;
            }
        }

        objCompetitor.results.forEach(function (result) {
            intTotalPoints += result.points;
        });
        intTotalPoints = intTotalPoints - intPointsToDeduct;
        objCompetitor.totalPoints = intTotalPoints;

    });

    objLogResults.sort(function (objCompetitor1, objCompetitor2) {
        if (objCompetitor1.totalPoints > objCompetitor2.totalPoints) {
            return -1;
        }
        if (objCompetitor1.totalPoints < objCompetitor2.totalPoints) {
            return 1;
        }
        return 0;
    });

    objLogResults.forEach(function (objCompetitor) {
        intPosition++;
        objCompetitor.position = intPosition;
    });

    objLog.results = objLogResults;
}

Global.CompetitorCategory = function CompetitorCategory(intGender, dteDateOfBirth) {
    var strReturn = "";
    var intYears;

    if (dteDateOfBirth !== undefined) {
        intYears = (new Date().getFullYear() - dteDateOfBirth.getFullYear())
        switch (intGender) {
            case 1: //male
                if (intYears <= 12) { strReturn = "M12" }
                else if (intYears <= 16) { strReturn = "M16" }
                else if (intYears <= 20) { strReturn = "M20" }
                else if (intYears < 40) { strReturn = "M21" }
                else if (intYears < 50) { strReturn = "M40" }
                else if (intYears < 60) { strReturn = "M50" }
                else if (intYears < 70) { strReturn = "M60" }
                else if (intYears < 80) { strReturn = "M70" }
                else if (intYears < 90) { strReturn = "M80" }
                else if (intYears < 100) { strReturn = "M90" }
            case 2: //female
                if (intYears <= 12) { strReturn = "W12" }
                else if (intYears <= 16) { strReturn = "W16" }
                else if (intYears <= 20) { strReturn = "W20" }
                else if (intYears < 35) { strReturn = "W21" }
                else if (intYears < 45) { strReturn = "W35" }
                else if (intYears < 55) { strReturn = "W45" }
                else if (intYears < 65) { strReturn = "W55" }
                else if (intYears < 75) { strReturn = "W65" }
                else if (intYears < 85) { strReturn = "W75" }
                else if (intYears < 95) { strReturn = "W85" }
            case 3: //group
                strReturn = "Group";
            default:
                strReturn = "";
        }
    } else {
        strReturn = "";
    }

    return strReturn;

}

Global.stripMarkup = function (strHTML) {
    var strReturn = strHTML;
    var objNews;
    var objImages;
    var objFirstImage;

    objNews = $("<div class='newsSummary'>" + strHTML + "</div>");
    objImages = objNews.find("img");

    if (objImages.length > 0) {
        objFirstImage = objImages[0];
        objImages.remove();
        objNews.prepend(objFirstImage);
    }
    strReturn = objNews[0].outerHTML;

    return strReturn;
}

/*---ExtendToBottom
------------------------------------*/
Global.extendToBottom = function (objDiv) {

    var funcExtend = function () {
        objDiv.height(function (index, height) {
            objDiv.height("");
            var current_height = objDiv.height();
            var new_height = window.innerHeight - objDiv.offset().top - parseInt(objDiv.css('padding-top')) - parseInt(objDiv.css('padding-bottom'));
            if (new_height > current_height) return new_height;
        });

    }
    
    funcExtend();
    $(window).on("resize", funcExtend);
};