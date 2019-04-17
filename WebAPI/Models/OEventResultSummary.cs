using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class OEventResultSummary
    {
        public OEvent oEvent;
        public List<CourseResultSummary> courseResults;
    }
}