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
Public Class Logs1
    Inherits System.Web.Services.WebService

    <WebMethod()> _
       <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function AllLogs() As String
        Dim qryLog As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryLog = (From Log In db.tblLogs
                      Group Join LogEvent In (
                            From Course In db.tblCourses
                            Select New With {.intLog = Course.intLog, .intEvent = Course.intEvent}
                        ).Distinct() On Log.idLog Equals LogEvent.intLog Into LogEvents = Group
                    Order By Log.intYear Descending, Log.strLog Ascending
                    Where LogEvents.Count > 0
                    Select New With _
                    {.logID = Log.idLog,
                    .name = Log.strLog,
                    .year = Log.intYear,
                    .disregardWorst = Log.intDisregardWorst,
                    .courseCount = Log.tblCourses.Count,
                    .eventCount = LogEvents.Count
                    })

            strReturn = serializer.Serialize(qryLog)

        End Using

        Return strReturn
    End Function

    <WebMethod()> _
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function LogDetails(intLogID As Integer) As String
        Dim qryLog As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryLog = (From Log In db.tblLogs
                      Where Log.idLog = intLogID
                      Group Join LogEvent In (
                            From Course In db.tblCourses
                            Select New With {.intLog = Course.intLog, .intEvent = Course.intEvent}
                        ).Distinct() On Log.idLog Equals LogEvent.intLog Into LogEvents = Group
                    Order By Log.intYear Descending, Log.strLog Ascending
            Where (LogEvents.Count > 0)
                    Select New With _
                    {.logID = Log.idLog,
                    .name = Log.strLog,
                    .year = Log.intYear,
                    .disregardWorst = Log.intDisregardWorst,
                    .courseCount = Log.tblCourses.Count,
                    .eventCount = LogEvents.Count
                    }).Take(1)

            strReturn = serializer.Serialize(qryLog)

        End Using

        Return strReturn
    End Function

    <WebMethod()> _
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function LogResults(intLogID As Integer) As String
        Dim qryLogResults As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()

            qryLogResults = (From Competitor In db.tblCompetitors
                             Where Competitor.intGender <> 3
                            Group Join Resultx In _
                            (From Result In db.tblResults
                             Join Course In db.tblCourses On Result.intCourse Equals Course.idcourse
                             Where Course.intLog = intLogID
                             Select New With {
                                .competitorID = Result.intCompetitor,
                                .eventID = Course.intEvent,
                                .points = Result.intPoints
                             })
                     On Resultx.competitorID Equals Competitor.idCompetitor Into CompetitorResults = Group
                     Where CompetitorResults.Count > 0
                    Select New With {
                        .competitorID = Competitor.idCompetitor,
                        .categoryID = Competitor.intCategory,
                        .competitorName = Competitor.strFirstName & " " & Competitor.strSurname,
                        .results = CompetitorResults
                    })

            strReturn = serializer.Serialize(qryLogResults)

        End Using

        Return strReturn
    End Function


    <WebMethod()> _
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function LogEvents(intLogID As Integer) As String
        Dim qryLogResults As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()

            qryLogResults = (From Course In db.tblCourses
                            Where (Course.intLog = intLogID)
                            Join OEvent In db.tblEvents On Course.intEvent Equals OEvent.idEvent
                            Join Venue In db.tblVenues On OEvent.intVenue Equals Venue.idVenue
                            Select New With {
                                .eventID = OEvent.idEvent,
                                .eventName = OEvent.strName,
                                .eventDate = OEvent.dteDate,
                                .venueName = Venue.strName,
                                .plannerID = OEvent.intPlanner,
                                .controllerID = OEvent.intController
                            }).Distinct.OrderBy(Function(OEvent) OEvent.eventDate)


            strReturn = serializer.Serialize(qryLogResults)

        End Using

        Return strReturn
    End Function

End Class