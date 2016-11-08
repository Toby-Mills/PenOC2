using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class CompetitorsController : ApiController
    {
        //---------------------------------------------------------------------------------
        private static IQueryable<Competitor> QueryCompetitors(){
             PenOCDataContext db = new PenOCDataContext();

           return (from competitor in db.tblCompetitors      
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
        [Route("competitors")]
        public IHttpActionResult UpdateCompetitor(Competitor competitor)
        {
            PenOCDataContext db = new PenOCDataContext();

            tblCompetitor competitorRecord = db.tblCompetitors.Single(c => c.idCompetitor == competitor.id);

            competitorRecord.strFirstName = competitor.firstName;
            competitorRecord.strSurname = competitor.surname;
            competitorRecord.intGender = competitor.genderId;
            competitorRecord.intCategory = competitor.categoryId;
            competitorRecord.intEmitNumber = competitor.emitNumber;
            competitorRecord.strEmail = competitor.email;
            competitorRecord.strTelephone1 = competitor.telephone1;
            competitorRecord.strTelephone2 = competitor.telephone2;

            db.SubmitChanges();

            return Ok(competitor);
        }

        //---------------------------------------------------------------------------------
        [HttpPost]
        [Route("competitors")]
        public IHttpActionResult InsertCompetitor(Competitor competitor)
        {
            PenOCDataContext db = new PenOCDataContext();

            try
            {
                tblCompetitor competitorRecord = new tblCompetitor
                {
                    strFirstName = competitor.firstName,
                    strSurname = competitor.surname,
                    intGender = competitor.genderId,
                };

                db.tblCompetitors.InsertOnSubmit(competitorRecord);
                db.SubmitChanges();

                competitor.id = competitorRecord.idCompetitor;

                return Ok(competitor);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
    }
}
