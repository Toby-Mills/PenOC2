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
    public class VenuesController : ApiController
    {
        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("venues")]
        public IHttpActionResult GetVenues()
        {
            PenocEntities db = new PenocEntities();

            var venues = from venue in db.tblVenue
                         select new LookupValue
                         {
                             name = venue.strName,
                             id = venue.idVenue
                         };

            return Ok(venues);
        }
        //---------------------------------------------------------------------------------
        [HttpPost]
        [Authorize]
        [JwtAuthentication]
        [Route("venues")]
        public IHttpActionResult InsertVenue(Venue venue)
        {
            PenocEntities db = new PenocEntities();

            tblVenue venueRecord = new tblVenue
            {
                strName = venue.name,

            };

            db.tblVenue.Add(venueRecord);
            db.SaveChanges();

            venue.id = venueRecord.idVenue;

            return Ok(venue);
        }
        //---------------------------------------------------------------------------------
        [HttpPut]
        [Authorize]
        [JwtAuthentication]
        [Route("venues")]
        public IHttpActionResult UpdateVenue(Venue venue)
        {
            PenocEntities db = new PenocEntities();

            tblVenue venueRecord = db.tblVenue.Single(v => v.idVenue == venue.id);

            venueRecord.strName = venue.name;

            db.SaveChanges();

            return Ok(venue);
        }

        //---------------------------------------------------------------------------------
        [HttpDelete]
        [Authorize]
        [JwtAuthentication]
        [Route("venues/{venueId}")]
        public IHttpActionResult DeleteVenue(int venueId)
        {
            PenocEntities db = new PenocEntities();

            IQueryable<tblVenue> queryResults = db.tblVenue.Where(venue => venue.idVenue == venueId);
            db.tblVenue.RemoveRange(queryResults);

            db.SaveChanges();

            return Ok();

        }
    }
}