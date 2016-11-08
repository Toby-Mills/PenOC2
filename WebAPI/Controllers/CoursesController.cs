using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class CoursesController : ApiController
    {
        //---------------------------------------------------------------------------------
        private static IQueryable<Course> QueryCourses()
        {
            PenOCDataContext db = new PenOCDataContext();

            return (from course in db.tblCourses
                    orderby course.intListOrder
                    select new Course
                    {
                        id = course.idCourse,
                        eventId = course.intEvent,
                        name = course.strName,
                        length = course.intLength,
                        climb = course.intClimb,
                        controls = course.intControls,
                        difficultyId = course.intTechnical,
                        difficulty = course.lutTechnical.strTechnical,
                        listOrder = course.intListOrder
                    });

        }

        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("courses/{idCourse}")]
        public IHttpActionResult GetCourse(int idCourse)
        {
            IQueryable<Course> queryCourses = QueryCourses().Where(c => c.id == idCourse);

            return Ok(queryCourses);
        }

        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("oevents/{idEvent}/courses")]
        public IHttpActionResult GetEventCourses(int idEvent)
        {
            IQueryable<Course> queryCourses = QueryCourses().Where(c => c.eventId == idEvent);

            return Ok(queryCourses);
        }

        //---------------------------------------------------------------------------------
        [HttpPut]
        [Route("courses")]
        public IHttpActionResult UpdateCourse(Course course)
        {
            PenOCDataContext db = new PenOCDataContext();

            tblCourse theCourse = db.tblCourses.Single(c => c.idCourse == course.id);
            
            theCourse.intEvent = course.eventId;
            theCourse.strName = course.name;
            theCourse.intLength = course.length;
            theCourse.intClimb = course.climb;
            theCourse.intControls = course.controls;
            theCourse.intTechnical = course.difficultyId;
            theCourse.intListOrder = course.listOrder;
            
            db.SubmitChanges();

            return Ok(course);
        }

        //---------------------------------------------------------------------------------
        [HttpPost]
        [Route("courses")]
        public IHttpActionResult InsertCourse(Course course)
        {
            PenOCDataContext db = new PenOCDataContext();

            tblCourse courseRecord = new tblCourse
            {
                strName = course.name,
                intEvent = course.eventId,
                intLength = course.length,
                intClimb = course.climb,
                intControls = course.controls,
                intTechnical = course.difficultyId,
                intListOrder = course.listOrder
            };

            db.tblCourses.InsertOnSubmit(courseRecord);
            db.SubmitChanges();

            course.id = courseRecord.idCourse;

            return Ok(course);

        }

        //---------------------------------------------------------------------------------
        [HttpDelete]
        [Route("courses/{courseId}")]
        public IHttpActionResult DeleteCourse(int courseId)
        {
            PenOCDataContext db = new PenOCDataContext();

            IQueryable<tblResult> queryResults = db.tblResults.Where(result => result.intCourse == courseId);
            db.tblResults.DeleteAllOnSubmit(queryResults);

            IQueryable<tblCourse> queryCourses = db.tblCourses.Where(course => course.idCourse == courseId);
            db.tblCourses.DeleteAllOnSubmit(queryCourses);

            db.SubmitChanges();

            return Ok();

        }
    }
}