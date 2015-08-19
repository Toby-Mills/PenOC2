var NewsItem = NewsItem || {};

NewsItem.showNewsItem = function (intNewsItem) {
    var objNewsItem;

    objNewsItem = NewsService.getNewsItem(intNewsItem);




    Modal.setTitle(objNewsItem.newsItemTitle);
    Modal.setBody(objNewsItem.newsItemText);
    Modal.show();
}