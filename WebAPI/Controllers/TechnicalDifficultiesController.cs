using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class TechnicalDifficultiesController : ApiController
    {
        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("technicalDifficulties")]
        public IHttpActionResult GetTechnicalDifficulties()
        {
            PenOCDataContext db = new PenOCDataContext();

            var difficulties = from difficulty in db.lutTechnicals
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