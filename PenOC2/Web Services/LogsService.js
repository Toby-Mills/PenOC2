var LogsService = LogsService || {};

//----------------------------------------------------------------------------
LogsService.AllLogs = function () {
    var result = '';

    $.ajax({
        async: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: 'Web Services/Logs.asmx/AllLogs',
        data: '{}',
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
LogsService.LogDetails = function (intLogID) {
    var result = '';

    $.ajax({
        async: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: 'Web Services/Logs.asmx/LogDetails',
        data: '{"intLogID": ' + intLogID + '}',
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
LogsService.LogEvents = function (intLogID) {
    var result = '';

    $.ajax({
        async: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: 'Web Services/Logs.asmx/LogEvents',
        data: '{"intLogID": ' + intLogID + '}',
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
LogsService.LogResults = function (intLogID) {
    var result = '';

    $.ajax({
        async: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: 'Web Services/Logs.asmx/LogResults',
        data: '{"intLogID": ' + intLogID + '}',
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
