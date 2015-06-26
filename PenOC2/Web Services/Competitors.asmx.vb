Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization


<System.Web.Services.WebService(Namespace:="http://penoc.org.za/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
<ScriptService()> _
Public Class Competitors
    Inherits System.Web.Services.WebService

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function CompetitorDetails(competitorID As Integer) As String

        Dim qryCompetitor As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryCompetitor = (From Competitor In db.tblCompetitors
            Where (Competitor.idCompetitor = competitorID)
                            Select New With {
                                .firstName = Competitor.strFirstName,
                                .surname = Competitor.strSurname,
                                .fullName = Competitor.strFirstName + " " + Competitor.strSurname,
                                .genderID = Competitor.intGender,
                                .gender = Competitor.lutGender.strGender,
                                .dateOfBirth = Competitor.dteBirthDate
                            }).Take(1)

            strReturn = serializer.Serialize(qryCompetitor)

        End Using

        Return strReturn

    End Function

End Class