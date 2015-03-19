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

    $("#divCardList").append(Cards.nextEventsCard);
    NextEventsClickHandler("divNextEvents");

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

/*----Next Events Card Click Handler ---*/
function NextEventsClickHandler(strContainerID) {

    $("#" + strContainerID).on("click", "a", function (event) {
        var objTarget;

        event.preventDefault();
        objTarget = $(this);
        EventDetails.showEvent(objTarget.attr("idEvent"));

    });
 }


 /*----Next Events Card Click Handler ---*/
 function ResultsClickHandler() {

     $(".card.results").on("click", function (event) {
         var objTarget;

         event.preventDefault();
         objTarget = $(this);
         EventResults.showEvent(objTarget.attr("idEvent"));

     });
 }

