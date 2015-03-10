<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Events.aspx.vb" Inherits="PenOC2.Events" MasterPageFile="~/Site.Master" %>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <script>        setCurrentTab('events');</script>
    <div class="card">
        <div>
            <div ng-controller="EventSummary">
                <input type="button" value="previous" ng-click="previousEvent();" /><input type="button" value="next" ng-click="nextEvent();" /><br />
                <span class="cardTitle">{{ event.name }}</span><br />
                <span class="fieldName">Venue:</span> {{ event.venue }}<br />
                <span class="fieldName">Date:</span> {{ event.date | jsonDate:'dd MMM yyyy'}}<br />
                <span class="fieldName">Club:</span> {{ event.club}}<br />
                <span class="fieldName">Planner:</span> {{ event.planner }}<br />
                <span class="fieldName">Controller:</span> {{ event.controller }}<br />
                <event-results eventid="{{event.eventID}}" />
<%--                <div ng-repeat="course in event.courses">
                    <br />
                    <span class="fieldName">{{ course.order }} {{ course.name }}</span> ({{ course.length }}m, {{ course.climb }}m climb)<br />
                    {{ course.difficulty }}<br />
                    {{ course.controls }}controls<br />
                    <result-list courseid="{{course.courseID}}" />
                </div>--%>
            </div>
        </div>
    </div>
</asp:Content>
