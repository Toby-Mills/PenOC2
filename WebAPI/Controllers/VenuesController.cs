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
        [HttpPost]
        [Authorize]
        [JwtAuthentication]
        [Route("venues")]
        public IHttpActionResult InsertVenue(Venue venue)
        {
            PenOCDataContext db = new PenOCDataContext();

            tblVenue venueRecord = new tblVenue
            {
                strName = venue.name,

            };

            db.tblVenues.InsertOnSubmit(venueRecord);
            db.SubmitChanges();

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
            PenOCDataContext db = new PenOCDataContext();

            tblVenue venueRecord = db.tblVenues.Single(v => v.idVenue == venue.id);

            venueRecord.strName = venue.name;

            db.SubmitChanges();

            return Ok(venue);
        }

        //---------------------------------------------------------------------------------
        [HttpDelete]
        [Authorize]
        [JwtAuthentication]
        [Route("venues/{venueId}")]
        public IHttpActionResult DeleteVenue(int venueId)
        {
            PenOCDataContext db = new PenOCDataContext();

            IQueryable<tblVenue> queryResults = db.tblVenues.Where(venue => venue.idVenue == venueId);
            db.tblVenues.DeleteAllOnSubmit(queryResults);

            db.SubmitChanges();

            return Ok();

        }
    }
}