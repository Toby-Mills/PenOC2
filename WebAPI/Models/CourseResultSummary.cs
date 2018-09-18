using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class CourseResultSummary
    {
        public Course course;
        public List<Result> topResults;
    }
}