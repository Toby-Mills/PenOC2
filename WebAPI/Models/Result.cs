using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Result
    {
        public int competitorId;
        public string competitor;
        public int courseId;
        public int? position;
        public DateTime? time;
        public int? categoryId;
        public int? clubId;
        public int? points;
        public bool disqualified;
        public string comment;
        public string raceNumber;

    }
}