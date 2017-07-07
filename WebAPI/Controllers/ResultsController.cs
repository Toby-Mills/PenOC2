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
    [JwtAuthentication]
    [Authorize]
    public class ResultsController : ApiController
    {
        //---------------------------------------------------------------------------------
        private static IQueryable<Result> QueryResults()
        {
            PenOCDataContext db = new PenOCDataContext();

            return (from result in db.tblResults
                    orderby result.intPosition
                    select new Result
                    {
                        courseId = result.intCourse,
                        competitorId = result.intCompetitor,
                        competitor = result.tblCompetitor.strReadOnlyFullName,
                        categoryId = result.intCategory,
                        clubId = result.intClub,
                        comment = result.strComment,
                        disqualified = result.blnDisqualified,
                        points = result.intPoints,
                        position = result.intPosition,
                        raceNumber = result.strRaceNumber,
                        time = result.dteTime
                    });


        }

        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("courses/{idCourse}/results")]
        public IHttpActionResult GetCourseResults(int idCourse)
        {
            IQueryable<Result> queryResults = QueryResults().Where(r => r.courseId == idCourse);

            return Ok(queryResults);
        }

        //---------------------------------------------------------------------------------
        [HttpDelete]
        [Route("courses/{idCourse}/results")]
        public IHttpActionResult DeleteCourseResults(int idCourse)
        {
            PenOCDataContext db = new PenOCDataContext();

            IQueryable<tblResult> queryResults = db.tblResults.Where(r => r.intCourse == idCourse);

            db.tblResults.DeleteAllOnSubmit(queryResults);

            // Ask the DataContext to save all the changes.
            db.SubmitChanges();
            return Ok();
        }

        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("courses/{idCourse}/results/{idCompetitor}")]
        public IHttpActionResult GetResult(int idCourse, int idCompetitor)
        {
            IQueryable<Result> queryResults = QueryResults().Where(r => r.courseId == idCourse && r.competitorId == idCompetitor);

            return Ok(queryResults.First());
        }


        //---------------------------------------------------------------------------------
        [HttpPut]
        [Route("results")]
        public IHttpActionResult UpdateResult(Result result)
        {
            PenOCDataContext db = new PenOCDataContext();

            tblResult resultRecord = db.tblResults.Single(r => r.intCourse == result.courseId && r.intCompetitor == result.competitorId);

            resultRecord.intCategory = result.categoryId;
            resultRecord.intClub = result.clubId;
            resultRecord.intPoints = result.points;
            resultRecord.intPosition = result.position;
            resultRecord.strComment = result.comment;
            resultRecord.strRaceNumber = result.raceNumber;
            resultRecord.blnDisqualified = result.disqualified;
            resultRecord.dteTime = result.time;

            db.SubmitChanges();

            return Ok(result);
        }

        //---------------------------------------------------------------------------------
        [HttpPut]
        [Route("courses/{courseId}/results")]
        public IHttpActionResult UpdateResult(int courseId, Result[] courseResults)
        {

            PenOCDataContext db = new PenOCDataContext();

            IQueryable<tblResult> queryResults = db.tblResults.Where(r => r.intCourse == courseId);
            db.tblResults.DeleteAllOnSubmit(queryResults);

            foreach (Result courseResult in courseResults) {
                tblResult resultRecord = new tblResult
                {
                    intCourse = courseId,
                    intPosition = courseResult.position,
                    intCompetitor = courseResult.competitorId,
                    intClub = courseResult.clubId,
                    intCategory = courseResult.categoryId,
                    strRaceNumber = courseResult.raceNumber,
                    dteTime = courseResult.time,
                    intPoints = courseResult.points,
                    blnDisqualified = courseResult.disqualified,
                    strComment = courseResult.comment
                };

                db.tblResults.InsertOnSubmit(resultRecord);
                db.SubmitChanges();
            };
            
            return Ok();
        }

    }

}
