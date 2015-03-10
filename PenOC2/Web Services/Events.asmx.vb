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
Public Class EventDetails
    Inherits System.Web.Services.WebService

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function EventDetails(eventID As Integer) As String
        Dim intEvent As Integer
        Dim qryEvent As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer
        intEvent = eventID

        Using db As New PenOC2.PenocEntities()
            qryEvent = (From OEvent In db.tblEvents
                       Group Join Controller In db.tblCompetitors On OEvent.intController Equals Controller.idCompetitor Into Controllers = Group
                       From Controller In Controllers.DefaultIfEmpty
                       Group Join Planner In db.tblCompetitors On OEvent.intPlanner Equals Planner.idCompetitor Into Planners = Group
                       From Planner In Planners.DefaultIfEmpty()
            Where (OEvent.idEvent = intEvent)
                    Select New With _
                    {.eventID = OEvent.idEvent,
                    .name = OEvent.strName,
                    .date = CDate(OEvent.dteDate),
                    .venueID = OEvent.intVenue,
                    .venue = OEvent.tblVenue.strName,
                    .controllerID = OEvent.intController,
                    .controller = Controller.strFirstName & " " & Controller.strSurname,
                    .plannerID = OEvent.intPlanner,
                     .planner = Planner.strFirstName & " " & Planner.strSurname,
                    .maxPoints = OEvent.intMaxPoints,
                    .directions = OEvent.strDirections,
                    .club = OEvent.lutClub.strShortName
                    }).Take(1)

            strReturn = serializer.Serialize(qryEvent)

        End Using

        Return strReturn

    End Function

    <WebMethod()> _
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function RecentEvents(intCount As Integer) As String
        Dim qryEvent As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryEvent = (From OEvent In db.tblEvents
                       Group Join Controller In db.tblCompetitors On OEvent.intController Equals Controller.idCompetitor Into Controllers = Group
                       From Controller In Controllers.DefaultIfEmpty
                       Group Join Planner In db.tblCompetitors On OEvent.intPlanner Equals Planner.idCompetitor Into Planners = Group
                       From Planner In Planners.DefaultIfEmpty()
                       Order By OEvent.dteDate Descending
            Where (OEvent.dteDate <= Today)
                    Select New With _
                    {.eventID = OEvent.idEvent,
                    .name = OEvent.strName,
                    .date = CDate(OEvent.dteDate),
                    .venueID = OEvent.intVenue,
                    .venue = OEvent.tblVenue.strName,
                    .controllerID = OEvent.intController,
                    .controller = Controller.strFirstName & " " & Controller.strSurname,
                    .plannerID = OEvent.intPlanner,
                     .planner = Planner.strFirstName & " " & Planner.strSurname,
                    .maxPoints = OEvent.intMaxPoints,
                    .directions = OEvent.strDirections,
                    .club = OEvent.lutClub.strShortName
                    }).Take(intCount)

            strReturn = serializer.Serialize(qryEvent)

        End Using

        Return strReturn

    End Function

    <WebMethod()> _
 <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function UpcomingEvents(intCount As Integer) As String
        Dim qryEvent As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryEvent = (From OEvent In db.tblEvents
                       Group Join Controller In db.tblCompetitors On OEvent.intController Equals Controller.idCompetitor Into Controllers = Group
                       From Controller In Controllers.DefaultIfEmpty
                       Group Join Planner In db.tblCompetitors On OEvent.intPlanner Equals Planner.idCompetitor Into Planners = Group
                       From Planner In Planners.DefaultIfEmpty()
                       Order By OEvent.dteDate Ascending
            Where (OEvent.dteDate >= Today)
                    Select New With _
                    {.eventID = OEvent.idEvent,
                    .name = OEvent.strName,
                    .date = CDate(OEvent.dteDate),
                    .venueID = OEvent.intVenue,
                    .venue = OEvent.tblVenue.strName,
                    .controllerID = OEvent.intController,
                    .controller = Controller.strFirstName & " " & Controller.strSurname,
                    .plannerID = OEvent.intPlanner,
                     .planner = Planner.strFirstName & " " & Planner.strSurname,
                    .maxPoints = OEvent.intMaxPoints,
                    .directions = OEvent.strDirections,
                    .club = OEvent.lutClub.strShortName
                    }).Take(intCount)

            strReturn = serializer.Serialize(qryEvent)

        End Using

        Return strReturn

    End Function

    <WebMethod()> _
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function EventCourses(eventID As Integer) As String
        Dim intEvent As Integer
        Dim qryCourses As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer
        intEvent = eventID

        Using db As New PenOC2.PenocEntities()

            qryCourses = From Course In db.tblCourses
                         Where Course.intEvent = intEvent
                         Select New With _
                                {.eventID = Course.intEvent,
                                .courseID = Course.idCourse,
                                 .name = Course.strName,
                                 .order = Course.intListOrder,
                                 .length = Course.intLength,
                                 .climb = Course.intClimb,
                                 .controls = Course.intControls,
                                 .difficulty = Course.lutTechnical.strTechnical
                                    }

            strReturn = serializer.Serialize(qryCourses)

        End Using

        Return strReturn

    End Function

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function CourseResults(courseID As Integer) As String
        Dim intEvent As Integer
        Dim qryResults As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer
        intEvent = courseID

        Using db As New PenOC2.PenocEntities()


            qryResults = From Result In db.tblResults
                     Join Competitor In db.tblCompetitors On Result.intCompetitor Equals Competitor.idCompetitor
                     Where Result.intCourse = courseID
                     Order By Result.intPosition
                     Select New With _
                            {.courseID = Result.intCourse,
                             .name = Competitor.strReadOnlyFullName,
                             .time = Result.dteTime,
                             .position = Result.intPosition}

            strReturn = serializer.Serialize(qryResults)

        End Using

        Return StrReturn

    End Function


    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function MostRecentEventID() As String

        Dim qryEvent As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer
        Using db As New PenOC2.PenocEntities()
            qryEvent = (From OEvent In db.tblEvents
            Where (OEvent.dteDate <= Date.Now)
            Order By OEvent.dteDate Descending
                    Select New With _
                    {.eventID = OEvent.idEvent
                    }).Take(1)

            strReturn = serializer.Serialize(qryEvent)

        End Using

        Return strReturn

    End Function

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function NextEventID() As String

        Dim qryEvent As System.Data.Objects.ObjectQuery
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer
        Using db As New PenOC2.PenocEntities()
            qryEvent = (From OEvent In db.tblEvents
            Where (OEvent.dteDate >= Date.Now)
            Order By OEvent.dteDate Ascending
                    Select New With _
                    {.eventID = OEvent.idEvent
                    }).Take(1)

            strReturn = serializer.Serialize(qryEvent)

        End Using

        Return strReturn

    End Function

End Class