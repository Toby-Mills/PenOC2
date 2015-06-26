var EventsService = EventsService || {};

    //----------------------------------------------------------------------------
    EventsService.courseResults = function (intCourse) {
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
    EventsService.recentEvents = function (intCount) {
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
    EventsService.recentEventsWithResults = function (intCount) {
        var result = '';

        $.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: 'Web Services/Events.asmx/RecentEventsWithResults',
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
    EventsService.upcomingEvents = function (intCount) {
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
    EventsService.eventCourses = function (intEvent) {
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
            }
        });
        return result;
    };

    //----------------------------------------------------------------------------
    EventsService.eventDetails = function (intEvent) {
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
            }
        });
        return result;
    };

    //----------------------------------------------------------------------------
    EventsService.mostRecentEventID = function () {
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
    EventsService.nextEvent= function () {
        var result = '';

        $.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: 'Web Services/Events.asmx/NextEvent',
            data: '{}',
            dataType: 'json',
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText);
            },
            success: function (msg) {
                result = (eval(msg.d)[0]);
            }
        });
        return result;
    };
    //----------------------------------------------------------------------------

    EventsService.competitorResults = function (intCompetitor) {
        var result = '';

        $.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: 'Web Services/Events.asmx/CompetitorResults',
            data: '{"competitorID": ' + intCompetitor + '}',
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
