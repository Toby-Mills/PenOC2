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
                             select new LookupValue
                             {
                                 name = club.strShortName,
                                 id = club.idClub
                             };

            return Ok(clubs);
        }
        //---------------------------------------------------------------------------------
    }
}
