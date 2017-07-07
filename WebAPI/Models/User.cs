using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class User
    {
        public int competitorId;
        public string username;
        public string password;
        public bool enabled;
        public bool administrator;
    }
}