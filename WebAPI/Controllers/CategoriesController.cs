using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class CategoriesController : ApiController
    {
        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("categories")]
        public IHttpActionResult GetCategories()
        {
            PenOCDataContext db = new PenOCDataContext();

            var categories = from category in db.lutCategories
                         select new LookupValue
                         {
                             name = category.strCategory,
                             id = category.idCategory
                         };

            return Ok(categories);
        }
        //---------------------------------------------------------------------------------
    }
}
