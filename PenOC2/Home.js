var Home = Home || {};


Home.cards = new Array();

/*----Document Ready----*/
$(document).ready(function () {

    setCurrentTab('home');
    setSocialButtons('http://www.penoc.org.za', 'PenOC Website');
    Cards.newsCards(Home.cards);
    Cards.resultsCards(Home.cards);
    Home.displayCards();
    $("#divMap").append(GoogleMaps.linkImage({ "centerLat": -30.77, "centerLong": 23.69, "zoom": 4, "width": 200, "height": 200, "addMarker": true, "markerLat": -33.925804, "markerLong": 18.427486 }));
    WhatIsClickHandler();
    Hook.respond();
    Home.initialiseMasonryContainer();
})

/*----Initialise Masonry----*/
Home.initialiseMasonryContainer = function () {
    var $container = $('#divBase');
    // initialize
    $container.masonry({
        columnWidth: '.card.small-card',
        gutter: 0,
        itemSelector: '.card'
    });
    $container.imagesLoaded().always(function () {
       Home.resizeNextEventCard();
         $container.masonry('layout');
    });
}

/*----Display Cards----*/
Home.displayCards = function () {
    var blnFirst;
    var divAbout;
    var divNextEvents;

    $("#divCardList").append(Cards.nextEventsCard);
    Home.resizeNextEventCard();
    Home.nextEventsPageResizeHandler();
    Home.nextEventsClickHandler();

    Home.cards.sort(function (cardA, cardB) { return cardA.date > cardB.date ? -1 : cardA.date < cardB.date ? 1 : 0; });
    blnFirst = true;
    Home.cards.forEach(function (card) {
        var card = $(card.card).appendTo("#divCardList");
        if (blnFirst) {
            blnFirst = false;
            card.addClass("first");
        }
    });

    ResultsClickHandler();
    NewsClickHandler();
}

/*---Resive NextEvents Card------*/
Home.resizeNextEventCard = function () {
    divNextEvents = $("#divNextEvents");
    if (!Global.isPhone) {
        divAbout = $("#divAbout")
        divNextEvents.css("min-height", divAbout.outerHeight() + 1);
    } else {
        divNextEvents.css("min-height", "");
    }
}

/*----Next Events Card Click Handler ---*/
Home.nextEventsClickHandler = function() {

    $("#divNextEvents").on("click", "a", function (event) {
        var objTarget;

        event.preventDefault();
        objTarget = $(this);
        EventDetails.showEvent(objTarget.attr("idEvent"));

    });
 }

/*----Next Events Card Page Resize Handler ---*/
Home.nextEventsPageResizeHandler = function () {

    $(window).resize(Home.resizeNextEventCard);

}


 /*----Next Events Card Click Handler ---*/
 function ResultsClickHandler() {

     $(".card.results").on("click", function (event) {
         var objResultsCard;
         var objCourseRow;
         var intCourse;

         event.preventDefault();
         objCourseRow = $(event.target).closest(".course");
         if (objCourseRow.length > 0) {
             intCourse = objCourseRow.attr("courseId");
         }
         objResultsCard = $(this);
         Processing.display(objResultsCard);
         setTimeout(function () { EventResults.showEvent(objResultsCard.attr("idEvent"), intCourse, undefined, function () { Processing.hide(); }) }, 100);
     });
 }

 /*----Next Events Card Click Handler ---*/
 function NewsClickHandler() {

     $(".card.news").delegate(".news-more", "click", function (event) {
         var objTarget;
         var objCard;

         event.preventDefault();
         objTarget = $(this);
         objCard = objTarget.closest(".card.news");
         NewsItem.showNewsItem(objCard.attr("idNewsItem"));
     });
 }

 /*----WhatIs Click Handler ---*/
 function WhatIsClickHandler() {
     $("#spanWhatIs").click(function () {
         WhatIs.show();
     });
 }