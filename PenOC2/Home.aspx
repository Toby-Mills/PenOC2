<%@ Page Language="vb" MasterPageFile="~/Site.Master" AutoEventWireup="false" CodeBehind="Home.aspx.vb" Inherits="PenOC2.Home" %>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <script src="Home.js?44" type="text/javascript"></script>
    <div id="masonryContainer">
        <div class="card medium">
            <span class="cardTitle">About the club</span>
            <p>
                PenOC is the Peninsula Orienteering Club, based in Cape Town, South Africa</p>
            <a class="noDecoration" href="https://www.google.com/maps/place/Cape+Town/@-30.7798467,23.6903413,6z/data=!4m2!3m1!1s0x1dcc500f8826eed7:0x687fe1fc2828aa87"
                target="_blank">
                <img src="Images/CapeTownMap.png" class="thumbnailMap" style="float: left;" /></a> Orienteering events are held regularly throughout
            the year, and visitors are welcome.
        </div>
        <div id="divCardList">
        </div>
    </div>
</asp:Content>