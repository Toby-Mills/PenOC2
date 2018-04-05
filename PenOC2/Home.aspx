<%@ Page Language="vb" MasterPageFile="~/Site.Master" AutoEventWireup="false" CodeBehind="Home.aspx.vb" Inherits="PenOC2.Home" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <meta property="og:url" content="http://www.penoc.org.za/Home.aspx" />
    <meta property="og:title" content="PenOC Home Page" />
    <meta property="og:description" content="Peninsula Orienteering Club" />
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <!--<div id="masonryContainer">-->
    <div id="divAbout" class="card medium-card" style="overflow: hidden;">
        <span class="cardTitle">About the club</span>
        <p>
            PenOC is the Peninsula Orienteering Club, based in Cape Town, South Africa</p>
        <div id="divMap">
        </div>
        <p>
            Orienteering events are held regularly throughout the year, and visitors are welcome.</p>
        <span class="cardTitle" style="white-space: nowrap;">What is Orienteering?</span>
        <p>
            An exciting outdoor adventure sport which involves walking or running whilst navigating around a course using a detailed map and sometimes
            a compass.</p>
        <p>
            The aim is to navigate between a set of control points, deciding on the best route to complete the course in the quickest time.</p>
        <p>
            It does not matter how young, old or fit you are - you can run, walk or jog the course and progress at your own pace.</p>
        <span id='spanWhatIs' class='clickable'>read more...</span></p> <span class="cardTitle">Stay in touch</span>
        <p>
            Our email list will keep you informed of event details and results as they become available. Subscribe to the <a href='https://penoc.us18.list-manage.com/subscribe/post?u=930cfaff6a9f183c90d5a414b&amp;id=ac40b7f57f' target="_blank">
                Mailing List</a>
        </p>
        <p>
            <a href="https://www.facebook.com/PeninsulaOrienteeringClub/" target="_blank">
                <img src="Images/socialIcons/facebook.svg" style="height: 2em; margin-right: 5px;" /></a>Join us to discuss results and other topics
            on <a href="https://www.facebook.com/PeninsulaOrienteeringClub/" target="_blank">facebook</a></p>
    </div>
    <div id="divCardList">
    </div>
    <!--</div>-->
</asp:Content>
