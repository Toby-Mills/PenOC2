using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;


namespace WebAPI.Controllers
{
    public class VenuesController : ApiController
    {
        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("venues")]
        public IHttpActionResult GetVenues()
        {
            PenOCDataContext db = new PenOCDataContext();

            var venues = from venue in db.tblVenues
                         select new LookupValue
                         {
                             name = venue.strName,
                             id = venue.idVenue
                         };

            return Ok(venues);
        }

        //---------------------------------------------------------------------------------
    }
}