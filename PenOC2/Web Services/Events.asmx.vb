Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization


<System.Web.Services.WebService(Namespace:="http://penoc.org.za/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
<ScriptService()> _
Public Class EventDetails
    Inherits System.Web.Services.WebService


    Private Class OEvent
        Public Property eventID As Integer
        Public Property eventName As String
        Public Property eventDate As DateTime
        Public Property venueID As Nullable(Of Integer)
        Public Property venueName As String
        Public Property controllerID As Nullable(Of Integer)
        Public Property controllerFullName As String
        Public Property controllerReport As String
        Public Property plannerID As Nullable(Of Integer)
        Public Property plannerFullName As String
        Public Property plannerReport As String
        Public Property eventMaximumPoints As Nullable(Of Integer)
        Public Property eventDirections As String
        Public Property eventStarts As String
        Public Property eventClub As String
        Public Property eventCourseDescriptions As String
        Public Property eventCost As String
        Public Property eventNotes As String
        Public Property eventLatitude As Nullable(Of Decimal)
        Public Property eventLongitude As Nullable(Of Decimal)

    End Class

    Private Class Course
        Public Property eventID As Integer
        Public Property courseID As Integer
        Public Property name As String
        Public Property order As Integer
        Public Property length As Nullable(Of Integer)
        Public Property climb As Nullable(Of Integer)
        Public Property controls As Nullable(Of Integer)
        Public Property difficulty As String
        Public Property winnerFullName As String
        Public Property winnerTime As Nullable(Of DateTime)
    End Class

    Private Class CourseResult
        Public Property competitorID As Integer
        Public Property competitorName As String
        Public Property eventID As Integer
        Public Property eventName As String
        Public Property eventDate As Nullable(Of DateTime)
        Public Property venueName As String
        Public Property courseID As Integer
        Public Property courseName As String
        Public Property name As String
        Public Property time As Nullable(Of DateTime)
        Public Property position As Integer
        Public Property points As Integer
        Public Property comments As String
        Public Property raceNumber As String
        Public Property dsq As Boolean
    End Class

    Private Function EventsQuery(funcWhere As System.Func(Of OEvent, Boolean), funcSort As System.Func(Of OEvent, Long), objComparer As IComparer(Of Long), intMaxRecords As Integer) As String
        Dim qryEvent As IEnumerable(Of OEvent)
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryEvent = (From OEvent In db.tblEvents
                       Group Join Controller In db.tblCompetitors On OEvent.intController Equals Controller.idCompetitor Into Controllers = Group
                       From Controller In Controllers.DefaultIfEmpty
                       Group Join Planner In db.tblCompetitors On OEvent.intPlanner Equals Planner.idCompetitor Into Planners = Group
                       From Planner In Planners.DefaultIfEmpty
                    Select New OEvent With _
                    {.eventID = OEvent.idEvent,
                                .eventName = OEvent.strName,
                                .eventDate = CDate(OEvent.dteDate),
                                .venueID = OEvent.intVenue,
                                .venueName = OEvent.tblVenue.strName,
                                .controllerID = OEvent.intController,
                                .controllerFullName = Controller.strFirstName & " " & Controller.strSurname,
                                .controllerReport = OEvent.strControllerReport,
                                .plannerID = Planner.idCompetitor,
                                .plannerFullName = Planner.strFirstName & " " & Planner.strSurname,
                                .plannerReport = OEvent.strPlannerReport,
                                .eventMaximumPoints = OEvent.intMaxPoints,
                                .eventDirections = OEvent.strDirections,
                                .eventStarts = OEvent.strStarts,
                                .eventClub = OEvent.lutClub.strShortName,
                                .eventCourseDescriptions = OEvent.strCourses,
                                .eventCost = OEvent.strCost,
                                .eventNotes = OEvent.strSpecialNote,
                                .eventLatitude = OEvent.decCoordinateLat,
                                .eventLongitude = OEvent.decCoordinateLong
                    }).Where(funcWhere).OrderBy(funcSort, objComparer).Take(intMaxRecords)

            strReturn = serializer.Serialize(qryEvent)

        End Using

        Return strReturn

    End Function

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function EventDetails(eventID As Integer) As String
        Dim strReturn As String

        Dim objWhere As System.Func(Of OEvent, Boolean)
        Dim objSort As System.Func(Of OEvent, Long)

        objWhere = Function(objOEvent As OEvent) objOEvent.eventID = eventID
        objSort = Function(objOEvent As OEvent) Convert.ToDateTime(objOEvent.eventDate).Ticks

        strReturn = EventsQuery(objWhere, objSort, New ASC, 1)

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
    Public Function RecentEventsWithResults(intCount As Integer) As String
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
                       Let courses = (From OCourse In db.tblCourses Join OResult In db.tblResults On OCourse.idCourse Equals OResult.intCourse Select OCourse.intEvent)
            Where (courses.Contains(OEvent.idEvent))
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

        Dim strReturn As String

        Dim objWhere As System.Func(Of OEvent, Boolean)
        Dim objSort As System.Func(Of OEvent, Long)

        objWhere = Function(objOEvent As OEvent) objOEvent.eventDate >= Today
        objSort = Function(objOEvent As OEvent) Convert.ToDateTime(objOEvent.eventDate).Ticks

        strReturn = EventsQuery(objWhere, objSort, New ASC, intCount)

        Return strReturn
    End Function

    Private Function CoursesQuery(funcWhere As System.Func(Of Course, Boolean), funcSort As System.Func(Of Course, Long), objComparer As IComparer(Of Long)) As String
        Dim qryCourse As IEnumerable(Of Course)
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()
            qryCourse = (From Course In db.tblCourses
                        Group Join CourseResult In db.tblResults On CourseResult.intCourse Equals Course.idCourse Into Results = Group
                        From Result In Results.OrderBy(Function(myResult) myResult.intPosition).Take(1)
                        Join Competitor In db.tblCompetitors On Competitor.idCompetitor Equals Result.intCompetitor
                        Select New Course() With _
                               {.eventID = Course.intEvent,
                               .courseID = Course.idCourse,
                                .name = Course.strName,
                                .order = Course.intListOrder,
                                .length = Course.intLength,
                                .climb = Course.intClimb,
                                .controls = Course.intControls,
                                .difficulty = Course.lutTechnical.strTechnical,
                               .winnerFullName = Competitor.strReadOnlyFullName,
                                .winnerTime = Result.dteTime
                                   }).Where(funcWhere).OrderBy(funcSort, objComparer)

            strReturn = serializer.Serialize(qryCourse)

        End Using

        Return strReturn

    End Function

    <WebMethod()> _
   <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function EventCourses(eventID As Integer) As String
        Dim strReturn As String

        Dim objWhere As System.Func(Of Course, Boolean)
        Dim objSort As System.Func(Of Course, Long)

        objWhere = Function(objCourse As Course) objCourse.eventID = eventID
        objSort = Function(objCourse As Course) objCourse.order

        strReturn = CoursesQuery(objWhere, objSort, New ASC)

        Return strReturn

    End Function

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function CourseDetails(courseID As Integer) As String
        Dim strReturn As String

        Dim objWhere As System.Func(Of Course, Boolean)
        Dim objSort As System.Func(Of Course, Long)

        objWhere = Function(objCourse As Course) objCourse.courseID = courseID
        objSort = Function(objCourse As Course) 1

        strReturn = CoursesQuery(objWhere, objSort, New ASC)

        Return strReturn

    End Function

    Private Function ResultsQuery(funcWhere As System.Func(Of CourseResult, Boolean), funcSort As System.Func(Of CourseResult, Long), objComparer As IComparer(Of Long)) As String
        Dim qryResults As IEnumerable(Of CourseResult)
        Dim serializer As JavaScriptSerializer
        Dim strReturn As String

        serializer = New JavaScriptSerializer

        Using db As New PenOC2.PenocEntities()


            qryResults = (From Result In db.tblResults
                     Join Competitor In db.tblCompetitors On Result.intCompetitor Equals Competitor.idCompetitor
                     Join Course In db.tblCourses On Result.intCourse Equals Course.idCourse
                     Join OEvent In db.tblEvents On Course.intEvent Equals OEvent.idEvent
                     Join Venue In db.tblVenues On OEvent.intVenue Equals Venue.idVenue
                     Select New CourseResult With _
                            {.eventID = OEvent.idEvent,
                             .eventName = OEvent.strName,
                             .eventDate = OEvent.dteDate,
                             .venueName = Venue.strName,
                             .courseName = Course.strName,
                             .courseID = Result.intCourse,
                             .competitorID = Competitor.idCompetitor,
                             .competitorName = Competitor.strReadOnlyFullName,
                             .time = Result.dteTime,
                             .position = Result.intPosition,
                             .points = Result.intPoints,
                             .comments = Result.strComment,
                             .raceNumber = Result.strRaceNumber,
                             .dsq = Result.blnDisqualified}).Where(funcWhere).OrderBy(funcSort, objComparer)

            strReturn = serializer.Serialize(qryResults)

        End Using

        Return strReturn

    End Function

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function CourseResults(courseID As Integer) As String
        Dim strReturn As String
        Dim objWhere As System.Func(Of CourseResult, Boolean)
        Dim objSort As System.Func(Of CourseResult, Long)

        objWhere = Function(objCourseResult As CourseResult) objCourseResult.courseID = courseID
        objSort = Function(objCourseResult As CourseResult) objCourseResult.position

        strReturn = ResultsQuery(objWhere, objSort, New ASC)

        Return strReturn

    End Function

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function CourseWinner(courseID As Integer) As String
        Dim strReturn As String
        Dim objWhere As System.Func(Of CourseResult, Boolean)
        Dim objSort As System.Func(Of CourseResult, Long)

        objWhere = Function(objCourseResult As CourseResult) objCourseResult.courseID = courseID AndAlso objCourseResult.position = 1
        objSort = Function(objCourseResult As CourseResult) objCourseResult.position

        strReturn = ResultsQuery(objWhere, objSort, New ASC)

        Return strReturn

    End Function

    <WebMethod()> _
<ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function CompetitorResults(competitorID As Integer) As String
        Dim strReturn As String
        Dim objWhere As System.Func(Of CourseResult, Boolean)
        Dim objSort As System.Func(Of CourseResult, Long)

        objWhere = Function(objCourseResult As CourseResult) objCourseResult.competitorID = competitorID
        objSort = Function(objCourseResult As CourseResult) Convert.ToDateTime(objCourseResult.eventDate).Ticks

        strReturn = ResultsQuery(objWhere, objSort, New DESC)

        Return strReturn

    End Function

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function MostRecentEventID() As String
        Dim strReturn As String

        Dim objWhere As System.Func(Of OEvent, Boolean)
        Dim objSort As System.Func(Of OEvent, Long)

        objWhere = Function(objOEvent As OEvent) objOEvent.eventDate <= Today
        objSort = Function(objOEvent As OEvent) Convert.ToDateTime(objOEvent.eventDate).Ticks

        strReturn = EventsQuery(objWhere, objSort, New DESC, 1)

        Return strReturn
    End Function

    <WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Function NextEvent() As String
        Dim strReturn As String

        Dim objWhere As System.Func(Of OEvent, Boolean)
        Dim objSort As System.Func(Of OEvent, Long)

        objWhere = Function(objOEvent As OEvent) objOEvent.eventDate >= Today
        objSort = Function(objOEvent As OEvent) Convert.ToDateTime(objOEvent.eventDate).Ticks

        strReturn = EventsQuery(objWhere, objSort, New ASC, 1)

        Return strReturn
    End Function

    Private Class ASC
        Implements IComparer(Of Long)

        Public Function Compare(x As Long, y As Long) As Integer Implements System.Collections.Generic.IComparer(Of Long).Compare
            If x > y Then
                Return 1
            ElseIf x = y Then
                Return 0
            Else
                Return -1
            End If
        End Function
    End Class

    Private Class DESC
        Implements IComparer(Of Long)

        Public Function Compare(x As Long, y As Long) As Integer Implements System.Collections.Generic.IComparer(Of Long).Compare
            If x < y Then
                Return 1
            ElseIf x = y Then
                Return 0
            Else
                Return -1
            End If
        End Function
    End Class
End Class