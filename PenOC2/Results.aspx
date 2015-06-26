<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Results.aspx.vb" Inherits="PenOC2.Results" MasterPageFile="~/Site.Master" %>

<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div id="divEventFilter" class="input-group" style="margin:40px;">
        <label class="input-group-addon">
            Search:</label>
        <input id="txtSearch" type="text" class="form-control" placeholder="event name or venue" />
    </div>
    <div id="divEventList" class="eventList">
    </div>
</asp:Content>
