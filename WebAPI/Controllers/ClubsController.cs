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
    public class ClubsController : ApiController
    {
        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("clubs")]
        public IHttpActionResult GetClubs()
        {
            PenocEntities db = new PenocEntities();

            var clubs = from club in db.lutClub
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
        [Authorize]
        [JwtAuthentication]
        [Route("clubs")]
        public IHttpActionResult InsertClub(Club club)
        {
            PenocEntities db = new PenocEntities();

            lutClub clubRecord = new lutClub
            {
                strFullName = club.fullName,
                strShortName = club.shortName

            };

            db.lutClub.Add(clubRecord);
            db.SaveChanges();

            club.id = clubRecord.idClub;

            return Ok(club);
        }
        //---------------------------------------------------------------------------------
        [HttpPut]
        [Authorize]
        [JwtAuthentication]
        [Route("clubs")]
        public IHttpActionResult UpdateClub(Club club)
        {
            PenocEntities db = new PenocEntities();

            lutClub clubRecord = db.lutClub.Single(c => c.idClub == club.id);

            clubRecord.strFullName = club.fullName;
            clubRecord.strShortName = club.shortName;

            db.SaveChanges();

            return Ok(club);
        }
        //---------------------------------------------------------------------------------
        [HttpDelete]
        [Authorize]
        [JwtAuthentication]
        [Route("clubs/{clubId}")]
        public IHttpActionResult DeleteClub(int clubId)
        {
            PenocEntities db = new PenocEntities();

            IQueryable<lutClub> queryResults = db.lutClub.Where(club => club.idClub == clubId);
            db.lutClub.RemoveRange(queryResults);

            db.SaveChanges();

            return Ok();

        }
    }
}
