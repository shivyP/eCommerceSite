using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerceSite.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace eCommerceSite.Pages
{
    public class audioCategoryModel : PageModel
    {
        [BindProperty]
        public List<products> items { get; set; }
        public readonly AccessDataContext _db;
        [BindProperty(SupportsGet = true)]
        public string category { get; set; }

        

        public void OnGet()
        {

            category = Request.Query["category"];
            // items = _db.Items.Where(c => c.category == "watch").ToList();
            if (category != null && category != "all")
            {
                items = _db.Items.Where(c => c.subCategory == category).ToList();
            }
            else
            {
                items = _db.Items.Where(c => c.category == "audio").ToList();
            }

        }

        public audioCategoryModel(AccessDataContext db)
        {
            _db = db;
        }

      
    }
}

