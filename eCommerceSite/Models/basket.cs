using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerceSite.Models
{
    public class basket
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int productId { get; set; }
        public string userName { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int qunatity { get; set; }
        public string ProductImage { get; set; }
        public decimal vat { get; set; }


    }
}
