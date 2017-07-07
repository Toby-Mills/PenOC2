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
    [JwtAuthentication]
    [Authorize]
    public class UsersController : ApiController
    {
        
    }
}