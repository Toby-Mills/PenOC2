using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class OEvent
    {
        public int id;
        public DateTime? date;
        public string name;
        public string venue;
        public int? venueId;
        public string courses;
        public string planner;
        public int? plannerId;
        public string controller;
        public int? controllerId;
        public string plannerReport;
        public string controllerReport;
        public string specialNote;
        public string registrationTime;
        public string startTime;
        public string close;
        public string directions;
        public int? maxPoints;
        public string organizingClub;
        public int? organizingClubId;
        public string cost;
        public decimal? coordinateLatitude;
        public decimal? coordinateLongitude;
    }
}