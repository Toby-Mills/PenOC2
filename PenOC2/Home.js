var Home = Home || {};


Home.cards = new Array();

/*----Document Ready----*/
$(document).ready(function () {

    setCurrentTab('home');
    Cards.newsCards(Home.cards);
    Cards.resultsCards(Home.cards);
    Home.displayCards();
    Home.initialiseMasonryContainer();

})


/*----Initialise Masonry----*/
Home.initialiseMasonryContainer = function () {
    var $container = $('#masonryContainer');
    // initialize
    $container.masonry({
        columnWidth: '.card.small',
        gutter: 0,
        itemSelector: '.card'
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
}

/*---Resive NextEvents Card------*/
Home.resizeNextEventCard = function () {
    divNextEvents = $("#divNextEvents");
    divAbout = $("#divAbout")
    divNextEvents.css("min-height", divAbout.outerHeight() + 1);
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
         var objTarget;

         event.preventDefault();
         objTarget = $(this);
         Processing.display(objTarget);
         setTimeout(function () { EventResults.showEvent(objTarget.attr("idEvent"), undefined , undefined , function () { Processing.hide(); }) }, 100);
     });
 }

