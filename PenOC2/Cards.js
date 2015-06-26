var Cards = Cards || {};

/*---Next Events Card----*/
Cards.nextEventsCard = function () {
    var jsonEvents;
    var dateEvent;
    var strCard;
    var strEventLI;

    strCard = "<div id='divNextEvents' class='card small eventlist'><span class='cardTitle'>Upcoming Events</span><ul>"
    jsonEvents = EventsService.upcomingEvents(5000);
    jsonEvents.forEach(function (event) {
        dateEvent =Global.parseDate( event.eventDate);
        strEventLI = "<li><a href='' idEvent='" + event.eventID + "'>" + dateEvent.displayDate() + " : " + event.venueName + "</a></li>"
        strCard = strCard + strEventLI;
    });
    strCard = strCard + "</ul></div>"

    return strCard;
}

/*----News Cards----*/
Cards.newsCards = function (cardStack) {
    var jsonNews;
    var dateItem;
    var strItemDate;
    var strCard;

    jsonNews = NewsService.recentNews(20);
    jsonNews.forEach(function (newsItem) {

        dateItem = Global.parseDate(newsItem.date);
        strItemDate = dateItem.displayDate();
        strCard = "<div class='card ";
        if (newsItem.news.length > 800) {
            strCard = strCard + "large";
        } else if (newsItem.news.length > 400) {
            strCard = strCard + "medium";
        } else {
            strCard = strCard + "small";
        }
        strCard = strCard + "'><div style='float:right;'><span class='cardDate' style='white-space: nowrap;'>";
        strCard = strCard + strItemDate;
        strCard = strCard + "</span></div><img src='Styles/Images/NewsCard.png' class='cardIcon' title='News' /><div><span class='cardTitle'>";
        strCard = strCard + newsItem.title;
        strCard = strCard + "</span></div><div style='clear:both;'>"
        if (newsItem.news.length > 2000) {
            strCard = strCard + newsItem.news.substring(0, 1499) + "... more...";
        } else {
            strCard = strCard + newsItem.news;
        }
        strCard = strCard + "</div></div>";
        cardStack.push({ date: dateItem, card: strCard });
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
        Global.addCourseResults(event.courses);
        dateEvent = Global.parseDate(event.eventDate);
        strEventDate = dateEvent.displayDate();
        strCard = "<div class='card small clickable results' idEvent='" + event.eventID + "'>";
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
            if (course.results.length > 0) {
                strCard = strCard + "<tr>";
                strCard = strCard + "<td>" + course.name + "</td>";
                strCard = strCard + "<td>" + course.results[0].competitorName + "</td>";
                strCard = strCard + "<td>" + Global.parseDate(course.results[0].time).displayTime() + "</td>";
                strCard = strCard + "</tr>"
            }
        });
        strCard = strCard + "</tbody>";
        strCard = strCard + "</table>";
        strCard = strCard + "</div>";
        cardStack.push({ date: dateEvent, card: strCard });
    });
}