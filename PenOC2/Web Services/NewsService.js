var NewsService = NewsService || {};

    //----------------------------------------------------------------------------
    NewsService.recentNews = function (intCount) {
        var result = '';

        $.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: 'Web Services/News.asmx/RecentNews',
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

