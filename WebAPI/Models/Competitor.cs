using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Competitor
    {
        public int id;
        public string firstName;
        public string surname;
        public string fullName;
        public int? genderId;
        public string gender;
        public int? categoryId;
        public string category;
        public long? emitNumber;
        public string email;
        public string telephone1;
        public string telephone2;
    }
}