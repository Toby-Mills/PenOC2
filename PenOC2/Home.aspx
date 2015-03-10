<%@ Page Language="vb" MasterPageFile="~/Site.Master" AutoEventWireup="false" CodeBehind="Home.aspx.vb" Inherits="PenOC2.Home" %>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <script>
        var strMonth = new Array("Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        setCurrentTab('home');

        $(document).ready(function () {
            var jsonNews;
            var dateItem;
            var strItemDate;
            jsonNews = NewsService.recentNews(5);

            jsonNews.forEach(function (newsItem) {

                dateItem = new Date(parseInt(newsItem.date.substring(6, 19)));
                strItemDate = dateItem.getDay() + " " + strMonth[dateItem.getMonth()] + " " + dateItem.getFullYear();
                $("#divNewsList").append("<div class='card'><div style='float:right;'><span class='cardDate' style='white-space: nowrap;'>" + strItemDate + "</span></div><div style='float:left;'><span class='cardTitle'>" + newsItem.title + "</span></div><div style='clear:both;'>" + newsItem.news + "</div></div>");
            });
        })

    </script>
    <div id="divLeft" class="structure TwoThirds">
        <div class="card">
            <span class="cardTitle">About the club</span>
            <p>
                PenOC is the Peninsula Orienteering Club, based in Cape Town, South Africa</p>
            <a class="noDecoration" href="https://www.google.com/maps/place/Cape+Town/@-30.7798467,23.6903413,6z/data=!4m2!3m1!1s0x1dcc500f8826eed7:0x687fe1fc2828aa87"
                target="_blank">
                <img src="Images/CapeTownMap.png" class="thumbnailMap" style="float: left;" /></a> Orienteering events are held regularly throughout
            the year, and visitors are welcome.
        </div>
        <div id="divNewsList">       
        </div>
    </div>
    <div id="divRight" class="structure OneThird">
        <div class="card">
            <span class="cardTitle">Results of Recent Events</span>
        </div>
        <div class="card">
            <span class="cardTitle">Coming Events</span>
        </div>
    </div>
</asp:Content>
