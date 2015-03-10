Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://penoc.org.za/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
<ScriptService()> _
Public Class News
    Inherits System.Web.Services.WebService

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function RecentNews(intCount As Integer) As String
        Dim qryNews As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryNews = (From NewsItem In db.tblNews
                       Order By NewsItem.dteDate Descending
                       Select New With _
                              {
                                .date = NewsItem.dteDate,
                                .title = NewsItem.strTitle,
                                .news = NewsItem.strNews
                                }).Take(intCount)

            strReturn = serializer.Serialize(qryNews)

        End Using

        Return strReturn
    End Function

End Class