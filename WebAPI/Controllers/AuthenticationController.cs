using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class AuthenticationController : ApiController
    {
        [HttpPost]
        [Route("authenticate")]
        public IHttpActionResult authenticate(Models.Credentials credentials)
        {
            if (this.authenticateUser(credentials.username, credentials.password) != null)
            {
                var token = JwtManager.GenerateToken(credentials.username);

                return Ok(token);
            }else{
                return Unauthorized();
            }
        }

        public User authenticateUser(string username, string password)
        {
            PenOCDataContext db = new PenOCDataContext();

            var users = from user in db.tblUsers
                        where (user.strUserName == username && user.strPassword == password)
                        select new User
                        {
                            competitorId = user.intCompetitor,
                            username = user.strUserName,
                            password = user.strPassword,
                            enabled = user.blnEnabled,
                            administrator = user.blnAdministrator
                        };

            return users.FirstOrDefault();
        }
    }
}
