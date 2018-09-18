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
    public class CompetitorsController : ApiController
    {
        //---------------------------------------------------------------------------------
        private static IQueryable<Competitor> QueryCompetitors(){
            PenocEntities db = new PenocEntities();

           return (from competitor in db.tblCompetitor      
                   orderby competitor.strReadOnlyFullName          
                                            select new Competitor
                                            {
                                                id = competitor.idCompetitor,
                                                firstName = competitor.strFirstName,
                                                surname = competitor.strSurname,
                                                fullName = competitor.strReadOnlyFullName,
                                                gender = competitor.lutGender.strGender,
                                                genderId = competitor.intGender,
                                                category = competitor.lutCategory.strCategory,
                                                categoryId = competitor.intCategory,
                                                emitNumber = competitor.intEmitNumber,
                                                email = competitor.strEmail,
                                                telephone1=competitor.strTelephone1,
                                                telephone2=competitor.strTelephone2
                                            });

        }

        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("competitors/{idCompetitor}")]
        public IHttpActionResult GetCompetitors(int idCompetitor)
        {
            IQueryable<Competitor> queryCompetitors;
            queryCompetitors = QueryCompetitors();

            queryCompetitors = queryCompetitors.Where(competitor => competitor.id == idCompetitor);

            return Ok(queryCompetitors);
        }

        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("competitors")]
        public IHttpActionResult GetCompetitors(int? idCompetitor=null, string name = null)
                    {
            try
            {
            IQueryable<Competitor> queryCompetitors;
            queryCompetitors = QueryCompetitors();

            if (idCompetitor > 0) { queryCompetitors = queryCompetitors.Where(competitor => competitor.id == idCompetitor); }
            if (name != null && name != "") { queryCompetitors = queryCompetitors.Where(competitor => competitor.fullName.Contains(name));}

            return Ok(queryCompetitors);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("competitors/individuals")]
        public IHttpActionResult Individuals(string name = null)
        {
            IQueryable<Competitor> queryCompetitors = QueryCompetitors().Where(competitor => competitor.genderId != 3 );
            if (name != null && name != "") { queryCompetitors = queryCompetitors.Where(competitor => competitor.fullName.Contains(name)); }

            return Ok(queryCompetitors);
        }

        //---------------------------------------------------------------------------------
        [HttpPut]
        [Authorize]
        [JwtAuthentication]
        [Route("competitors")]
        public IHttpActionResult UpdateCompetitor(Competitor competitor)
        {
            PenocEntities db = new PenocEntities();

            tblCompetitor competitorRecord = db.tblCompetitor.Single(c => c.idCompetitor == competitor.id);

            competitorRecord.strFirstName = competitor.firstName;
            competitorRecord.strSurname = competitor.surname;
            competitorRecord.intGender = competitor.genderId;
            competitorRecord.intCategory = competitor.categoryId;
            competitorRecord.intEmitNumber = competitor.emitNumber;
            competitorRecord.strEmail = competitor.email;
            competitorRecord.strTelephone1 = competitor.telephone1;
            competitorRecord.strTelephone2 = competitor.telephone2;

            db.SaveChanges();

            IQueryable<Competitor> queryCompetitors;
            queryCompetitors = QueryCompetitors();
            queryCompetitors = queryCompetitors.Where(competitorFromDB => competitorFromDB.id == competitorRecord.idCompetitor);

            return Ok(queryCompetitors);
        }

        //---------------------------------------------------------------------------------
        [HttpPost]
        [Authorize]
        [JwtAuthentication]
        [Route("competitors")]
        public IHttpActionResult InsertCompetitor(Competitor competitor)
        {
            PenocEntities db = new PenocEntities();

            try
            {
                tblCompetitor competitorRecord = new tblCompetitor
                {
                    strFirstName = competitor.firstName,
                    strSurname = competitor.surname,
                    intGender = competitor.genderId,
                };

                db.tblCompetitor.Add(competitorRecord);
                db.SaveChanges();

                IQueryable<Competitor> queryCompetitors;
                queryCompetitors = QueryCompetitors();
                queryCompetitors = queryCompetitors.Where(competitorFromDB => competitorFromDB.id == competitorRecord.idCompetitor);

                return Ok(queryCompetitors);

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        //---------------------------------------------------------------------------------
        [HttpDelete]
        [Authorize]
        [JwtAuthentication]
        [Route("competitors/{idCompetitor}")]
        public IHttpActionResult DeleteCompetitor(int idCompetitor)
        {
            PenocEntities db = new PenocEntities();

            IQueryable<tblCompetitor> queryCompetitors = db.tblCompetitor.Where(competitor => competitor.idCompetitor == idCompetitor);
            db.tblCompetitor.RemoveRange(queryCompetitors);
            db.SaveChanges();

            return Ok();

        }

        //---------------------------------------------------------------------------------
        [HttpPut]
        [Authorize]
        [JwtAuthentication]
        [Route("competitors/{id1}/merge/{id2}")]
        public IHttpActionResult UpdateCompetitor(int primaryId, int secondaryId)
        {
            PenocEntities db = new PenocEntities();

            // Find all results belonging to secondary Id, to be updated
            var results = (from result in db.tblResult where result.intCompetitor == secondaryId select new {
                intCompetitor = primaryId,
                intCategory = result.intCategory,
                blnDisqualified = result.blnDisqualified,
                dteTime = result.dteTime,
                intClub = result.intClub,
                intCourse = result.intCourse,
                intPoints = result.intPoints,
                intPosition = result.intPosition,
                strComment = result.strComment,
                strRaceNumber = result.strRaceNumber

            }).ToList();

            // For each result, insert a new result with the Primary ID
            foreach (var newResult in results)
            {
                tblResult result = new tblResult();
                result.intCompetitor = primaryId;
                result.intCategory = newResult.intCategory;
                result.blnDisqualified = newResult.blnDisqualified;
                result.dteTime = newResult.dteTime;
                result.intClub = newResult.intClub;
                result.intCourse = newResult.intCourse;
                result.intPoints = newResult.intPoints;
                result.intPosition = newResult.intPosition;
                result.strComment = newResult.strComment;
                result.strRaceNumber = newResult.strRaceNumber;
                db.tblResult.Add(result);
            }

            // Delete all results belonging to the secondary Id
            db.tblResult.RemoveRange(from result in db.tblResult where result.intCompetitor == secondaryId select result);

            // Update each event planned by the secondary Id
            var eventsPlanned = (from @event in db.tblEvent where @event.intPlanner == secondaryId select @event);
            foreach (var @event in eventsPlanned){
                @event.intPlanner = secondaryId;
            };

            // Update each event controlled by the secondary Id
            var eventsControlled = (from @event in db.tblEvent where @event.intController == secondaryId select @event);
            foreach (var @event in eventsControlled)
            {
                @event.intController = secondaryId;
            };
            
            // Delete the secondary competitor record
            db.tblCompetitor.RemoveRange(from competitor in db.tblCompetitor where competitor.idCompetitor == secondaryId select competitor);

            db.SaveChanges();

            return Ok();
        }
    }
    internal class ResultWrapper : tblResult { }
}
