using eCommerceSite.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;


namespace eCommerceSite.Pages
{
    public class IndexModel : PageModel
    {
        public List<trendItem> trend;
        public readonly AccessDataContext _db;
        public void OnGet()
        {
            trend = _db.trendItem.ToList();
        }
        public IndexModel(AccessDataContext db)
        {
            _db = db;
        }



    }
}
