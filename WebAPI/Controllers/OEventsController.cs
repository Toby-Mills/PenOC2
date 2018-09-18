using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebAPI.Models;
using System.Web.Http.Cors;
using WebAPI.Filters;

namespace WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OEventsController : ApiController

    {
        //---------------------------------------------------------------------------------
        public static IQueryable<OEvent> QueryOEvents()
        {
            PenocEntities db = new PenocEntities();

            return (from @event in db.tblEvent
                    select new OEvent
                    {
                        id = @event.idEvent,
                        date = @event.dteDate,
                        name = @event.strName,
                        venue = @event.tblVenue.strName,
                        venueId = @event.intVenue,
                        courses = @event.strCourses,
                        plannerId = @event.intPlanner,
                        planner = @event.tblCompetitor_Planner.strReadOnlyFullName,
                        controllerId = @event.intController,
                        controller = @event.tblCompetitor_Controller.strReadOnlyFullName,
                        plannerReport = @event.strPlannerReport,
                        controllerReport = @event.strControllerReport,
                        specialNote = @event.strSpecialNote,
                        registrationTime = @event.strRegTime,
                        startTime = @event.strStarts,
                        close = @event.strClose,
                        directions = @event.strDirections,
                        maxPoints = @event.intMaxPoints,
                        organizingClubId = @event.intOrganisingClub,
                        organizingClub = @event.lutClub.strShortName,
                        cost = @event.strCost,
                        coordinateLatitude = @event.decCoordinateLat,
                        coordinateLongitude = @event.decCoordinateLong
                    }).OrderBy(@event => @event.date); //
        }

        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("oevents/{idEvent}")]
        public IHttpActionResult GetOEvents(int idEvent)
        {
            PenocEntities db = new PenocEntities();

            IQueryable<OEvent> queryEvents = QueryOEvents().Where(@event => @event.id == idEvent);
            
            return Ok(queryEvents.Take(1));
        }

        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("oevents")]
        public IHttpActionResult GetOEvents(int? id = null, string name = null, string venue = null, DateTime? dateFrom = null, DateTime? dateTo = null)
        {
            IQueryable<OEvent> queryEvents;

            queryEvents = QueryOEvents();

            if (id > 0){queryEvents = queryEvents.Where(@event => @event.id == id); }
            if (name != null && name != "") { queryEvents = queryEvents.Where(@event => @event.name.Contains(name)); }
            if (venue != null && venue != "") { queryEvents = queryEvents.Where(@event => @event.venue.Contains(venue)); }
            if (dateFrom != null) { queryEvents = queryEvents.Where(@event => @event.date >= dateFrom); }
            if (dateTo != null) { queryEvents = queryEvents.Where(@event => @event.date <= dateTo); }

            return Ok(queryEvents);
        }

        //---------------------------------------------------------------------------------
        [HttpPost]
        [Authorize]
        [JwtAuthentication]
        [Route("oevents")]
        public IHttpActionResult InsertOEvent(OEvent oevent)
        {
            PenocEntities db = new PenocEntities();

            tblEvent eventRecord = new tblEvent
            {
            strName = oevent.name,
            strControllerReport = oevent.controllerReport,
            intVenue = oevent.venueId,
            strCourses = oevent.courses,
            dteDate = oevent.date,
            strDirections = oevent.directions,
            intPlanner = oevent.plannerId,
            intController = oevent.controllerId,
            strRegTime = oevent.registrationTime,
            strStarts = oevent.startTime,
            strClose = oevent.close,
            strSpecialNote = oevent.specialNote,
            decCoordinateLat = oevent.coordinateLatitude,
            decCoordinateLong = oevent.coordinateLongitude,
            strCost = oevent.cost,
            intMaxPoints = oevent.maxPoints,
            strPlannerReport = oevent.plannerReport,
            intOrganisingClub = oevent.organizingClubId
        };

            db.tblEvent.Add(eventRecord);
            db.SaveChanges();

            oevent.id = eventRecord.idEvent;

            return Ok(oevent);
        }

        //---------------------------------------------------------------------------------
        [HttpPut]
        [Authorize]
        [JwtAuthentication]
        [Route("oevents")]
        public IHttpActionResult UpdateOEvent(OEvent oevent)
        {
            PenocEntities db = new PenocEntities();

            tblEvent eventRecord = db.tblEvent.Single(e => e.idEvent == oevent.id);

            eventRecord.strName = oevent.name;
            eventRecord.intVenue = oevent.venueId;
            eventRecord.strCourses = oevent.courses;
            eventRecord.dteDate = oevent.date;
            eventRecord.strDirections = oevent.directions;
            eventRecord.intPlanner = oevent.plannerId;
            eventRecord.intController = oevent.controllerId;
            eventRecord.strRegTime = oevent.registrationTime;
            eventRecord.strStarts = oevent.startTime;
            eventRecord.strClose = oevent.close;
            eventRecord.strSpecialNote = oevent.specialNote;
            eventRecord.decCoordinateLat = oevent.coordinateLatitude;
            eventRecord.decCoordinateLong = oevent.coordinateLongitude;
            eventRecord.strCost = oevent.cost;
            eventRecord.intMaxPoints = oevent.maxPoints;
            eventRecord.strPlannerReport = oevent.plannerReport;
            eventRecord.strControllerReport = oevent.controllerReport;
            eventRecord.intOrganisingClub = oevent.organizingClubId;

            db.SaveChanges();

            return Ok(oevent);
        }

        //---------------------------------------------------------------------------------
    }
}
 