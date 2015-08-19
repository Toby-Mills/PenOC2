<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Results.aspx.vb" Inherits="PenOC2.Results" MasterPageFile="~/Site.Master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <meta property="og:url" content="http://www.penoc.org.za/Results.aspx" />
    <meta property="og:title" content="PenOC Event Results" />
    <meta property="og:description" content="Peninsula Orienteering Club event Results" />
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <div id="divEventFilter" class="input-group" style="margin:40px;">
        <label class="input-group-addon">
            Search:</label>
        <input id="txtSearch" type="text" class="form-control" placeholder="event name or venue" />
    </div>
</asp:Content>
