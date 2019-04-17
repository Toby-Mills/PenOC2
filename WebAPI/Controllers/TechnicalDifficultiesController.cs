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
    public class TechnicalDifficultiesController : ApiController
    {
        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("technicalDifficulties")]
        public IHttpActionResult GetTechnicalDifficulties()
        {
            PenocEntities db = new PenocEntities();

            var difficulties = from difficulty in db.lutTechnical
                         select new LookupValue
                         {
                             name = difficulty.strTechnical,
                             id = difficulty.idTechnical
                         };

            return Ok(difficulties);
        }

        //---------------------------------------------------------------------------------
    }
}