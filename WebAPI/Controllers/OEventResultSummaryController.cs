using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
using System.Web.Http.Cors;
using WebAPI.Filters;

namespace WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OEventResultSummaryController : ApiController
    {
        private static IQueryable<OEventResultSummary> QueryResultSummary()
        {
            PenocEntities db = new PenocEntities();

            return (from @event in db.tblEvent
                    select new OEventResultSummary
                    {
                        oEvent = new OEvent
                        {
                            id = @event.idEvent,
                            name = @event.strName,
                            date = @event.dteDate,
                            venue = @event.tblVenue.strName,
                            plannerReport = @event.strPlannerReport,
                            controllerReport = @event.strControllerReport,
                            planner = @event.tblCompetitor_Planner.strReadOnlyFullName,
                            controller = @event.tblCompetitor_Controller.strReadOnlyFullName
                        },
                        courseResults = (from @course in db.tblCourse
                                         orderby @course.intListOrder
                                         where @course.intEvent == @event.idEvent
                                         select new CourseResultSummary
                                         {
                                             course = new Course
                                             {
                                                 name = @course.strName,
                                                 length = @course.intLength,
                                                 climb = @course.intClimb,
                                                 difficulty = @course.lutTechnical.strTechnical
                                             },
                                             results = (from @result in db.tblResult
                                                        orderby @result.intPosition
                                                        where @result.intCourse == @course.idCourse
                                                        select new Result
                                                        {
                                                            competitor = @result.tblCompetitor.strReadOnlyFullName,
                                                            courseId = @result.intCourse,
                                                            position = @result.intPosition,
                                                            time = @result.dteTime,
                                                            points = @result.intPoints,
                                                            comment = @result.strComment,
                                                            disqualified = @result.blnDisqualified
                                                        }).ToList()
                                         }).ToList()
                    });
        }

        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("oevents/{idEvent}/resultsummary")]
        public IHttpActionResult GetOEventResultSummary(int idEvent)
        {
            IQueryable<OEventResultSummary> queryResultSummary = QueryResultSummary().Where(r => r.oEvent.id == idEvent);

            return Ok(queryResultSummary);
        }
    }
}