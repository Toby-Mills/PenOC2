Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports System.Data.Linq.SqlClient

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
<ScriptService()> _
Public Class Autocomplete
    Inherits System.Web.Services.WebService

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function Venues() As String
        Dim qryVenues As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryVenues = From Venue In db.tblVenues
                         Select New With _
                                {.data = Venue.idVenue,
                                 .value = Venue.strName}

            strReturn = serializer.Serialize(qryVenues)
        End Using

        Return strReturn

    End Function

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function Competitors(strSearchString As String) As String
        Dim strNoPunctuation As String = ""
        Dim strNoKeywords As String = ""
        Dim qryCompetitors As IEnumerable(Of Object)
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String = ""

        strNoPunctuation = RemovePunctuation(strSearchString)
        strNoKeywords = RemoveCommonWords(strNoPunctuation)

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryCompetitors = (From Competitor In db.tblCompetitors
                             Where (String.Concat(Competitor.strReadOnlyFirstNameMatch, Competitor.strReadOnlySurnameMatch).ToLower.Contains(strNoPunctuation)) _
                        Or String.Concat(Competitor.strReadOnlyFirstNameMatch, Competitor.strReadOnlySurnameMatch).Contains(strNoKeywords) _
                        Or Competitor.strReadOnlyFullName.ToLower.Contains(strSearchString) _
                        Or Competitor.strReadOnlyFullName.ToLower.Contains(strNoPunctuation) _
                        Or Competitor.strReadOnlyFullName.ToLower.Contains(strNoKeywords)
                        Select New With _
                                {.competitorID = Competitor.idCompetitor,
                                    .competitorFullName = Competitor.strReadOnlyFullName}).Distinct
            strReturn = serializer.Serialize(qryCompetitors)
        End Using

        Return strReturn

    End Function

    Private Function RemovePunctuation(strSearchString As String) As String
        Dim strReturn As String

        strReturn = strSearchString.ToLower

        strReturn = strReturn.Replace("&", "")
        strReturn = strReturn.Replace(",", "")
        strReturn = strReturn.Replace("+", "")
        strReturn = strReturn.Replace("-", "")
        strReturn = strReturn.Replace("!", "")
        strReturn = strReturn.Replace("(", "")
        strReturn = strReturn.Replace(")", "")

        strReturn = strReturn.Replace(" ", "")

        Return strReturn

    End Function

    Private Function RemoveCommonWords(strSearchString As String) As String
        Dim strReturn As String

        strReturn = strSearchString.ToLower

        strReturn = strReturn.Replace("the", "")
        strReturn = strReturn.Replace("and", "")
        strReturn = strReturn.Replace("group", "")
        strReturn = strReturn.Replace("family", "")
        strReturn = strReturn.Replace("team", "")

        Return strReturn

    End Function
End Class