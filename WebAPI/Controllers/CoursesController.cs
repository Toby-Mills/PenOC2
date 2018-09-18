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
    public class CoursesController : ApiController
    {
        //---------------------------------------------------------------------------------
        private static IQueryable<Course> QueryCourses()
        {
            PenocEntities db = new PenocEntities();

            return (from course in db.tblCourse
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
        [Authorize]
        [JwtAuthentication]
        [Route("courses")]
        public IHttpActionResult UpdateCourse(Course course)
        {
            PenocEntities db = new PenocEntities();

            tblCourse theCourse = db.tblCourse.Single(c => c.idCourse == course.id);
            
            theCourse.intEvent = course.eventId;
            theCourse.strName = course.name;
            theCourse.intLength = course.length;
            theCourse.intClimb = course.climb;
            theCourse.intControls = course.controls;
            theCourse.intTechnical = course.difficultyId;
            theCourse.intListOrder = course.listOrder;
            
            db.SaveChanges();

            return Ok(course);
        }

        //---------------------------------------------------------------------------------
        [HttpPost]
        [Authorize]
        [JwtAuthentication]
        [Route("courses")]
        public IHttpActionResult InsertCourse(Course course)
        {
            PenocEntities db = new PenocEntities();

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

            db.tblCourse.Add(courseRecord);
            db.SaveChanges();

            course.id = courseRecord.idCourse;

            return Ok(course);

        }

        //---------------------------------------------------------------------------------
        [HttpDelete]
        [Authorize]
        [JwtAuthentication]
        [Route("courses/{courseId}")]
        public IHttpActionResult DeleteCourse(int courseId)
        {
            PenocEntities db = new PenocEntities();

            IQueryable<tblResult> queryResults = db.tblResult.Where(result => result.intCourse == courseId);
            db.tblResult.RemoveRange(queryResults);

            IQueryable<tblCourse> queryCourses = db.tblCourse.Where(course => course.idCourse == courseId);
            db.tblCourse.RemoveRange(queryCourses);

            db.SaveChanges();

            return Ok();

        }
    }
}