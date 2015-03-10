<%@ Page Language="vb" MasterPageFile="~/Site.Master" AutoEventWireup="false" CodeBehind="NewsEditor.aspx.vb" Inherits="PenOC2.NewsEditor" %>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
<script>setCurrentTab('news');</script>
    <script src="//tinymce.cachefly.net/4.0/tinymce.min.js"></script>
    <script src="Directives/TinyMceDirective.js" type="text/javascript"></script>
    <div ng-controller="NewsEditor">
        <div class="structure TwoThirds">
            <h2>Editor:</h2>
            <h4>Title:</h4><input type="text" ng-model="NewsTitle"></input>
            <h4>Date:</h4><input type="text" ng-model="NewsDate"></input>
            <h4>Body:</h4>
            <textarea data-ui-tinymce id="tinymce1" data-ng-model="NewsBody"></textarea>
        <div style="clear: both;" />
        </div>
        <hr />
        <div class="structure TwoThirds">
            <h2>
                Preview:</h2>
            <div id="divPreviewCard" class="card">
                <span class="cardTitle">{{ NewsTitle }}</span><br />
                <span>{{ NewsDate }}</span>
                <div id="divPreview" ng-bind-html="NewsBody | unsafe">
                </div>
            </div>
        </div>
    </div>
</asp:Content>
