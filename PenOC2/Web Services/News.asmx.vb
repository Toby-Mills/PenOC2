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

    Private Class NewsItem
        Public Property idNewsItem As Integer
        Public Property newsItemDate As DateTime
        Public Property newsItemTitle As String
        Public Property newsItemText As String
    End Class

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function GetNewsItem(idNewsItem As Integer) As String
        Dim qryNews As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryNews = (From News In db.tblNews
                       Where (News.idNews = idNewsItem)
                       Select New NewsItem With _
                              {.idNewsItem = News.idNews,
                                .newsItemDate = News.dteDate,
                                .newsItemTitle = News.strTitle,
                                .newsItemText = News.strNews
                                })
            strReturn = serializer.Serialize(qryNews)

        End Using

        Return strReturn
    End Function

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function RecentNews(intCount As Integer) As String
        Dim qryNews As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryNews = (From News In db.tblNews
                       Order By News.dteDate Descending
                       Select New NewsItem With _
                              {.idNewsItem = News.idNews,
                                .newsItemDate = News.dteDate,
                                .newsItemTitle = News.strTitle,
                                .newsItemText = News.strNews
                                }).Take(intCount)

            strReturn = serializer.Serialize(qryNews)

        End Using

        Return strReturn
    End Function

End Class