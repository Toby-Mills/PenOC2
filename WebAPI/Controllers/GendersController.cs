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
    public class GendersController : ApiController
    {
        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("genders")]
        public IHttpActionResult GetVenues()
        {
            PenocEntities db = new PenocEntities();

            var genders = from gender in db.lutGender
                         select new LookupValue
                         {
                             name = gender.strGender,
                             id = gender.idGender
                         };

            return Ok(genders);
        }
        //---------------------------------------------------------------------------------
    }
}
