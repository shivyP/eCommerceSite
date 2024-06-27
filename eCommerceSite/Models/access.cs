using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerceSite.Models
{
    public class access
    {
      
       
        public string fname { get; set; }
      
        public string lname { get; set; }
        [Key]
        public string email { get; set; }
   
        public string password { get; set; }
  
        public string pass1 { get; set; }
    
        public string dob { get; set; }
        public bool isAdmin { get; set; }
    }
}
