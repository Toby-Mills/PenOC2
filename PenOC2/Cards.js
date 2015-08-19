var Cards = Cards || {};

/*---Next Events Card----*/
Cards.nextEventsCard = function () {
    var jsonEvents;
    var dateEvent;
    var strCard;
    var strEventLI;

    strCard = "<div id='divNextEvents' class='card small-card eventlist'><span class='cardTitle'>Upcoming Events</span><div style='clear:both;'></div>"
    jsonEvents = EventsService.upcomingEvents(5000);
    jsonEvents.forEach(function (event) {
        dateEvent = Global.parseDate(event.eventDate);
        strEventLI = "<div style='margin-top:4px;margin-bottom:-1px;'>" + dateEvent.displayDate() + " : </div><div style=''><span class=''> <a href='' idEvent='" + event.eventID + "'>";
        strEventLI += event.eventName;
        strEventLI += "</a></span></div>"
        strCard = strCard + strEventLI;
    });
    strCard = strCard + "</div>"

    return strCard;
}

/*----News Card----*/
Cards.newsCard = function (newsItem, options) {
    var jsonNews;
    var dateItem;
    var strItemDate;
    var strCard;
    var intTruncateLength = 0;

    options = options || { truncate: true };

    dateItem = Global.parseDate(newsItem.newsItemDate);
    strItemDate = dateItem.displayDate();
    strCard = "<div class='card news  ";

    if (options.truncate) {
        switch (true) {
            case (Global.isPhone && newsItem.newsItemText.length > 400):
                intTruncateLength = 300;
                break;
            case (Global.isTablet && newsItem.newsItemText.length > 1000):
                intTruncateLength = 800;
                break;
            case (newsItem.newsItemText.length > 1600):
                intTruncateLength = 1200;
                break;
        }
    }

    if (newsItem.newsItemText.length > 800 || newsItem.newsItemTitle.length > 40) {
        strCard = strCard + "large-card";
    } else if (newsItem.newsItemText.length > 400 || newsItem.newsItemTitle.length > 20) {
        strCard = strCard + "medium-card";
    } else {
        strCard = strCard + "small-card";
    }

    strCard += "' idNewsItem='" + newsItem.idNewsItem + "'";
    strCard += "><div style='float:right;'><span class='cardDate' style='white-space: nowrap;'>";
    strCard = strCard + strItemDate;
    strCard = strCard + "</span></div><img src='Styles/Images/NewsCard.png' class='cardIcon' title='News' /><div><span class='cardTitle'>";
    strCard = strCard + newsItem.newsItemTitle;
    strCard = strCard + "</span></div><div style='clear:both;'>"

    if (intTruncateLength > 0) {
        strCard += $.truncate(newsItem.newsItemText, {
            length: intTruncateLength,
            words: true
        });

    } else {
        strCard += newsItem.newsItemText;
    }
    strCard = strCard + "</div>";

    if (intTruncateLength > 0) {
        strCard += "<div class='news-more'><span class='clickable'> Read the full article</span></div>";
    }
    strCard = strCard + "</div>";
    return { date: dateItem, card: strCard };
}


/*----News Cards----*/
Cards.newsCards = function (cardStack) {
    var jsonNews;
    var dateItem;
    var strItemDate;
    var strCard;

    jsonNews = NewsService.recentNews(10);
    jsonNews.forEach(function (newsItem) {
        cardStack.push(Cards.newsCard(newsItem));
    });
}

/*----Results Cards----*/
Cards.resultsCards = function (cardStack) {
    var jsonEvents;
    var event;
    var dateEvent;
    var strEventDate;
    var strCard;

    jsonNews = EventsService.recentEventsWithResults(10);
    jsonNews.forEach(function (recentEvent) {
        event = EventsService.eventDetails(recentEvent.eventID);
        Global.addEventCourses(event);
        //Global.addCourseResults(event.courses);
        dateEvent = Global.parseDate(event.eventDate);
        strEventDate = dateEvent.displayDate();
        strCard = "<div class='card small-card clickable results' idEvent='" + event.eventID + "'>";
        strCard = strCard + "<div style='float:right;'><span class='cardDate' style='white-space: nowrap;'>";
        strCard = strCard + strEventDate;
        strCard = strCard + "</span></div><img src='Styles/Images/ResultsCard.png' class='cardIcon' title='Results'/><div><span class='cardTitle'>";
        strCard = strCard + event.eventName;
        strCard = strCard + "</span></div>"
        strCard = strCard + "<table class='resultSummary'>";
        strCard = strCard + "<thead>";
        strCard = strCard + "<tr>";
        strCard = strCard + "<th>Course</th>";
        strCard = strCard + "<th>Winner</th>";
        strCard = strCard + "<th>Time</th>";
        strCard = strCard + "</tr>"
        strCard = strCard + "</thead>";

        strCard = strCard + "<tbody>";
        event.courses.forEach(function (course) {
            strCard = strCard + "<tr class='course' courseId='" + course.courseID + "'>";
            strCard = strCard + "<td>" + course.name + "</td>";
            strCard = strCard + "<td>" + course.winnerFullName + "</td>";
            strCard = strCard + "<td>" + Global.parseDate(course.winnerTime).displayTime() + "</td>";
            strCard = strCard + "</tr>"
        });
        strCard = strCard + "</tbody>";
        strCard = strCard + "</table>";
        strCard = strCard + "</div>";
        cardStack.push({ date: dateEvent, card: strCard });
    });
}