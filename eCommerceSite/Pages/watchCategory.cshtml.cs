using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerceSite.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace eCommerceSite.Pages
{
    public class watchCategoryModel : PageModel
    {
        //get eveything from the database 
        [BindProperty]
        public List<products> items { get; set; }
        public readonly AccessDataContext _db;
        [BindProperty(SupportsGet = true)]
        public string category { get; set; }

       

        public void OnGet()
        {
          
            category = Request.Query["category"];
           // items = _db.Items.Where(c => c.category == "watch").ToList();
            if (category!=null && category!="all")
            {
                items = _db.Items.Where(c => c.subCategory == category).ToList();
            }
            else {
                items = _db.Items.Where(c => c.category == "watch").ToList();
            }

        }
       
        public watchCategoryModel(AccessDataContext db)
        {
            _db = db;
        }
    }
}
    
