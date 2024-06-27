using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerceSite.Models
{
    public class AccessDataContext :  IdentityDbContext<users>
    {
        public AccessDataContext(DbContextOptions<AccessDataContext> options) :
    base(options)
        { }
        public DbSet<access> Register { get; set; } //maps the table in the Database
        public DbSet<products> Items { get; set; }
        public DbSet<basket> Basket { get; set; }
        public DbSet<trendItem> trendItem { get; set; }

        
    }
    
}
