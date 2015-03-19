//generate a dropdown list of links to display instead of menu on narrow screens
$(document).ready(function () {
    // Create the dropdown base
    $("<select />").appendTo(".menu");

    // Create default option "Go to..."
    $("<option />", {
        "selected": "selected",
        "value": "",
        "text": "Go to..."
    }).appendTo(".menu select");

    // Populate dropdown with menu items
    $(".menu a").each(function () {
        var el = $(this);
        $("<option />", {
            "value": el.attr("href"),
            "text": el.text()
        }).appendTo(".menu select");
    });

    $(".menu select").change(function () {
        window.location = $(this).find("option:selected").val();
    });

});

function setCurrentTab(selectedTab) {
    $('a').removeClass('selected');
    $('#' + selectedTab).addClass('selected');
}