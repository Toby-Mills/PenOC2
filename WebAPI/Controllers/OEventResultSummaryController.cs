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
        private static IQueryable<OEventResultSummary> QueryResultSummary(){
            PenocEntities db = new PenocEntities();

            return (from @event in db.tblEvent
                    select new OEventResultSummary
                    {
                        oEvent = new OEvent
                        {
                            id = @event.idEvent,
                            name = @event.strName,
                            date = @event.dteDate,
                            venue = @event.tblVenue.strName

                        },
                        courseResults = (from @course in db.tblCourse
                                         orderby @course.intListOrder
                                         where @course.intEvent == @event.idEvent
                                         select new CourseResultSummary
                                         {
                                             course = new Course
                                             {
                                                 name = @course.strName
                                             },
                                             topResults = (from @result in db.tblResult
                                                        orderby @result.intPosition
                                                        where @result.intCourse == @course.idCourse
                                                        select new Result
                                                        {
                                                            competitor = @result.tblCompetitor.strReadOnlyFullName,
                                                            courseId = @result.intCourse,
                                                            position = @result.intPosition,
                                                            time = @result.dteTime
                                                        }).Take(3).ToList()
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