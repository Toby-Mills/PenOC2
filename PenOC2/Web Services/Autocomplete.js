var Autocomplete = Autocomplete || {};

//----------------------------------------------------------------------------
Autocomplete.venues = function () {
    var result = '';

    $.ajax({
        async: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: 'Web Services/Autocomplete.asmx/Venues',
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
Autocomplete.competitors = function (obSearchTerm, objCallback) {
    var result;
    
    $.ajax({
        async: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: 'Web Services/Autocomplete.asmx/Competitors',
        dataType: 'json',
        data: '{"strSearchString": "' + obSearchTerm.term + '"}',
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        },
        success: function (msg) {
            result = (eval(msg.d));
        }
    });
    $.each(result, function (_, item) {
        item.label = item.competitorFullName;
    });
    
    objCallback(result);
};
