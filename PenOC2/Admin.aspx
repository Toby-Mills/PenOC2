<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Site.Master" CodeBehind="Admin.aspx.vb" Inherits="PenOC2.Admin" %>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div id="masonryContainer">
        <div id="divEvents" class="card small" style="overflow: hidden;">
            <span class="cardTitle">Events</span>
            <ul>
                <li><a>Create a new Event</a></li>
                <li><a>Edit an Event</a></li>
                <li><a>Import Results</a></li>
            </ul>
        </div>
        <div id="divNews" class="card small" style="overflow: hidden;">
            <span class="cardTitle">News</span>
            <ul>
                <li><a>Create a new News Item</a></li>
                <li><a>Edit a News Item</a></li>
            </ul>
        </div>
        <div id="divCompetitors" class="card small" style="overflow: hidden;">
            <span class="cardTitle">Competitors</span>
            <ul>
                <li><a>Create a Competitor</a></li>
                <li><a>Edit a Competitor</a></li>
            </ul>
        </div>
    </div>
</asp:Content>
