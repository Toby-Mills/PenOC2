var CompetitorsService = CompetitorsService || {};

//----------------------------------------------------------------------------
CompetitorsService.competitorDetails = function (intCompetitor) {
    var result = '';

    $.ajax({
        async: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: 'Web Services/Competitors.asmx/CompetitorDetails',
        data: '{"competitorID": ' + intCompetitor + '}',
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