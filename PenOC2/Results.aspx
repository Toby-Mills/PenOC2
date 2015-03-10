<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Results.aspx.vb" Inherits="PenOC2.Results" MasterPageFile="~/Site.Master" %>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div>
        <div ng-controller="EventResults">
            <input type="button" value="previous" ng-click="previousEvent();" /><input type="button" value="next" ng-click="nextEvent();" /><br />
            <span class="eventTitle">{{ event.name }}</span><br />
            <span class="fieldName">Venue:</span> {{ event.venue }}<br />
            <span class="fieldName">Date:</span> {{ event.date | jsonDate:'dd MMM yyyy'}}<br />
            <span class="fieldName">Club:</span> {{ event.club}}<br />
            <span class="fieldName">Planner:</span> {{ event.planner }}<br />
            <span class="fieldName">Controller:</span> {{ event.controller }}<br />
            <div ng-repeat="course in event.courses">
                <br />
                <span class="fieldName">{{ course.order }} {{ course.name }}</span> ({{ course.length }}m, {{ course.climb }}m climb)<br />
                {{ course.difficulty }}<br />
                {{ course.controls }}controls<br />
                <div ng-repeat="result in course.results">
                <span>{{ result.position }} {{ result.name }} ({{ result.time | jsonDate:'HH:mm:ss'}})</span>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
