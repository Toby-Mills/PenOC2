using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ClubsController : ApiController
    {
        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("clubs")]
        public IHttpActionResult GetClubs()
        {
            PenOCDataContext db = new PenOCDataContext();

            var clubs = from club in db.lutClubs
                             select new Club
                             {
                                 fullName = club.strFullName,
                                 shortName = club.strShortName,
                                 id = club.idClub
                             };

            return Ok(clubs);
        }
        //---------------------------------------------------------------------------------
        [HttpPost]
        [Route("clubs")]
        public IHttpActionResult InsertClub(Club club)
        {
            PenOCDataContext db = new PenOCDataContext();

            lutClub clubRecord = new lutClub
            {
                strFullName = club.fullName,
                strShortName = club.shortName

            };

            db.lutClubs.InsertOnSubmit(clubRecord);
            db.SubmitChanges();

            club.id = clubRecord.idClub;

            return Ok(club);
        }
        //---------------------------------------------------------------------------------
        [HttpPut]
        [Route("clubs")]
        public IHttpActionResult UpdateClub(Club club)
        {
            PenOCDataContext db = new PenOCDataContext();

            lutClub clubRecord = db.lutClubs.Single(c => c.idClub == club.id);

            clubRecord.strFullName = club.fullName;
            clubRecord.strShortName = club.shortName;

            db.SubmitChanges();

            return Ok(club);
        }
        //---------------------------------------------------------------------------------
        [HttpDelete]
        [Route("clubs/{clubId}")]
        public IHttpActionResult DeleteClub(int clubId)
        {
            PenOCDataContext db = new PenOCDataContext();

            IQueryable<lutClub> queryResults = db.lutClubs.Where(club => club.idClub == clubId);
            db.lutClubs.DeleteAllOnSubmit(queryResults);

            db.SubmitChanges();

            return Ok();

        }
    }
}
