using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Course
    {
        public int id;
        public int? eventId;
        public string name;
        public short? length;
        public short? climb;
        public short? controls;
        public int? difficultyId;
        public string difficulty;
        public short listOrder;
    }
}