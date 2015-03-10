var EventService = EventService || {};

    //----------------------------------------------------------------------------
    EventService.loadResults = function (intCourse) {
        var result = '';

        $.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: 'Web Services/Events.asmx/CourseResults',
            data: '{"courseID": ' + intCourse + '}',
            dataType: 'json',
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            success: function (msg) {
                result = (eval(msg.d));
            }
        });
        return result;
    };

    //----------------------------------------------------------------------------
    EventService.recentEvents = function (intCount) {
        var result = '';

        $.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: 'Web Services/Events.asmx/RecentEvents',
            data: '{"intCount": ' + intCount + '}',
            dataType: 'json',
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            success: function (msg) {
                result = (eval(msg.d));
            }
        });
        return result;
    };

    //----------------------------------------------------------------------------
    EventService.upcomingEvents = function (intCount) {
        var result = '';

        $.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: 'Web Services/Events.asmx/UpcomingEvents',
            data: '{"intCount": ' + intCount + '}',
            dataType: 'json',
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            success: function (msg) {
                result = (eval(msg.d));
            }
        });
        return result;
    };

    //----------------------------------------------------------------------------
    EventService.loadEventCourses = function (intEvent) {
        var self = this;
        var result = '';

        $.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: 'Web Services/Events.asmx/EventCourses',
            data: '{"eventID": ' + intEvent + '}',
            dataType: 'json',
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            success: function (msg) {
                result = eval(msg.d);
//                result.forEach(function (objCourse) {
//                    objCourse.results = self.loadResults(objCourse.courseID);
//                })
            }
        });
        return result;
    };

    //----------------------------------------------------------------------------
    EventService.loadEvent = function (intEvent) {
        var self = this;
        var result = '';

        $.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: 'Web Services/Events.asmx/EventDetails',
            data: '{"eventID": ' + intEvent + '}',
            dataType: 'json',
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            success: function (msg) {
                result = eval(msg.d)[0];
                result.courses = self.loadEventCourses(intEvent);
            }
        });
        return result;
    };

    //----------------------------------------------------------------------------
    EventService.mostRecentEventID = function () {
        var result = '';

        $.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: 'Web Services/Events.asmx/MostRecentEventID',
            data: '{}',
            dataType: 'json',
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            success: function (msg) {
                result = (eval(msg.d)[0].eventID);
            }
        });
        return result;
    };
    //----------------------------------------------------------------------------
    EventService.nextEventID = function () {
        var result = '';

        $.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: 'Web Services/Events.asmx/NextEventID',
            data: '{}',
            dataType: 'json',
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            success: function (msg) {
                result = (eval(msg.d)[0].eventID);
            }
        });
        return result;
    };
    //----------------------------------------------------------------------------

