var Global = Global || {};

Global.months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
Global.days = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

/*---Modal Container---*/
Global.modalContainer = function () {
    var divModalContainer;

    divModalContainer = $("#divModalContainer");

    if (!divModalContainer.length > 0) {
        strElement = "<div class='modal fade' id='divModalContainer' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'></div>";
        $("body").append(strElement);
        divModalContainer = $("#divModalContainer");
    }

    return divModalContainer;
}

/*---Number.pad---*/
Number.prototype.pad = function (size) {
    var strReturn = String(this);
    while (strReturn.length < (size || 2)) { strReturn = "0" + strReturn; }
    return strReturn;
}

/*----Parse Date----*/
Global.parseDate = function parseDate(strDate) {
    var dateReturn;

    if (strDate != null) {
        dateReturn = new Date(parseInt(strDate.substring(6)));
    }else{
        dateReturn = new Date(0);
    }
    return dateReturn;
}


/*----Display Date----*/
Global.displayDate = function displayDate(dateDate) {
    var dateNow;
    var dateFuture;
    var datePast;
    var strReturn;
    var blnLongDate = true;

    dateNow = new Date();

    dateFuture = new Date();
    dateFuture.setMonth(dateNow.getMonth() + 9);

    datePast = new Date;
    datePast.setMonth(dateNow.getMonth() - 9);

    if (dateDate < datePast || dateDate > dateFuture) {
        blnLongDate = true;
    } else {
        blnLongDate = false;
    }

    if (blnLongDate == true) {
        strReturn = dateDate.getDate() + " " + Global.months[dateDate.getMonth()] + " " + dateDate.getFullYear();
    } else {
        strReturn = Global.days[dateDate.getDay()] + " " + dateDate.getDate() + " " + Global.months[dateDate.getMonth()];
    }


    return strReturn;
}

/*----Display Time----*/
Global.displayTime = function displayTime(dateDate) {
    var strReturn;

    //dateDate.setHours(dateDate.getHours + 2);//Time Zone adjustment
    strReturn = dateDate.getHours() + ":" + dateDate.getMinutes().pad(2) + ":" + dateDate.getSeconds().pad(2);

    return strReturn;
}

/*---Add Event Courses---*/
Global.addEventCourses = function (objEvent) {
    objEvent.courses = EventsService.eventCourses(objEvent.eventID);
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