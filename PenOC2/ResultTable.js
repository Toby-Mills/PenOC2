var ResultTable = ResultTable || {};

ResultTable.enumTableColumn = {
    eventDate: 1,
    eventName: 2,
    courseName: 4,
    position: 8,
    competitorName: 16,
    time: 32,
    points: 64,
    raceNumber: 128,
    comments: 256
}

ResultTable.enTableColumns_Event = ResultTable.enumTableColumn.position | ResultTable.enumTableColumn.competitorName | ResultTable.enumTableColumn.time | ResultTable.enumTableColumn.raceNumber | ResultTable.enumTableColumn.points | ResultTable.enumTableColumn.comments;
ResultTable.enTableColumns_Competitor = ResultTable.enumTableColumn.eventDate | ResultTable.enumTableColumn.eventName | ResultTable.enumTableColumn.courseName | ResultTable.enumTableColumn.position | ResultTable.enumTableColumn.time | ResultTable.enumTableColumn.comments;

ResultTable.createTable = function createTable(objResults, enColumns, intCompetitor) {
    var strReturn = "";
    var strHeader = "";
    var strRow = "";
    var strRowAttributes = "";
    var strRowClass = "";

    var strRows = "";

    if (enColumns === undefined) {
        enColumns = EventResults.enTableColumns_Event;
    }

    strHeader = "<thead>";
    strHeader = strHeader + "<tr>";

    if (enColumns & ResultTable.enumTableColumn.eventDate) {
        strHeader += "<th class='date'>Date</th>";
    }
    if (enColumns & ResultTable.enumTableColumn.eventName) {
        strHeader += "<th>Event</th>";
    }
    if (enColumns & ResultTable.enumTableColumn.courseName) {
        strHeader += "<th>Course</th>";
    }
    if (enColumns & ResultTable.enumTableColumn.position) {
        strHeader += "<th>Pos.</th>";
    }
    if (enColumns & ResultTable.enumTableColumn.competitorName) {
        strHeader += "<th>Competitor</th>";
    }
    if (enColumns & ResultTable.enumTableColumn.time) {
        strHeader += "<th class='number'>Time</th>";
    }
    if (enColumns & ResultTable.enumTableColumn.points) {
        strHeader += "<th class='number'>Points</th>";
    }
    if (enColumns & ResultTable.enumTableColumn.raceNumber) {
        strHeader += "<th>Race Num.</th>";
    }
    if (enColumns & ResultTable.enumTableColumn.comments) {
        strHeader += "<th>Comments</th>";
    }

    strHeader += "</tr>";
    strHeader += "</thead>";

    objResults.forEach(function (result) {
        strRow = "";
        strRowClass = "";
        strRowAttributes = "";

        strRowClass += "result ";
        if (intCompetitor !== undefined && intCompetitor == result.competitorID) {
            strRowClass += "selected  ";
        }

        strRowAttributes = "idCompetitor='" + result.competitorID + "'";
        strRowAttributes += " idCourse='" + result.courseID + "'";
        strRowAttributes += " idEvent='" + result.eventID + "'";

        // Event Date
        if (enColumns & ResultTable.enumTableColumn.eventDate) {
            strRow += "<td class='date'>" + Global.parseDate(result.eventDate).displayDateLong() + "</td>";
        }

        // Event Name
        if (enColumns & ResultTable.enumTableColumn.eventName) {
            strRow += "<td class='event' idEvent = '" + result.eventID + "'><span class='clickable'>"; 
            if (result.eventName == null) {
                strRow += result.venueName;
            } else {
                strRow += result.eventName;
            }
            strRow += "</span></td>"
        }

        // Course Name
        if (enColumns & ResultTable.enumTableColumn.courseName) {
            strRow += "<td>" + result.courseName + "</td>";
        }

        //Position
        if (enColumns & ResultTable.enumTableColumn.position) {
            if (result.dsq) {
                strRowClass += 'dsq ';
                strRow += "<td>DSQ</td>";
            } else {
                strRow += "<td>" + result.position + "</td>";
            }
        }

        //Competitor Name
        if (enColumns & ResultTable.enumTableColumn.competitorName) {
            strRow += "<td class='competitor' idCompetitor='" + result.competitorID + "'><span class='clickable edit-textbox'>" + result.competitorName + "</span></td>";
        }

        //Time
        if (enColumns & ResultTable.enumTableColumn.time) {
            strRow += "<td class='number'><span class='edit-textbox'>" + Global.parseDate(result.time).displayTime() + "</span></td>";
        }

        //Points
        if (enColumns & ResultTable.enumTableColumn.points) {
            strRow += "<td class='number'><span class='edit-textbox'>"
            if (result.points > 0) { strRow += result.points }
            strRow += "</span></td>";
        }

        //Race Number
        if (enColumns & ResultTable.enumTableColumn.raceNumber) {
            strRow += "<td><span class='edit-textbox'>"
            if (result.raceNumber != null) {
                strRow += result.raceNumber;
            }
            strRow += "</span></td>";
        }

        //Comments
        if (enColumns & ResultTable.enumTableColumn.comments) {
            strRow += "<td><span class='edit-textbox'>"
            if (result.comments != null) {
                strRow += result.comments;
            }
            strRow += "</span></td>";
        }


        if (strRowClass > "") {
            strRow = "<tr " + strRowAttributes + " class='" + strRowClass + "'>" + strRow + "</tr>";
        } else {
            strRow = "<tr " + strRowAttributes + ">" + strRow + "</tr>";
        }

        strRows += strRow;
    });

    strReturn = "<table class='resultTable table-striped'>";
    strReturn += strHeader;
    strReturn += strRows;
    strReturn += "</table>";

    return strReturn;
}
