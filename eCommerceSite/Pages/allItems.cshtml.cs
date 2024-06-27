using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerceSite.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace eCommerceSite.Pages
{
    public class allItemsModel : PageModel
    {
       
        public readonly AccessDataContext _db;
        public SignInManager<users> SignInManager;
        public UserManager<users> UserManager;
        public RoleManager<IdentityRole> RoleManager;

        public List<products> allItems;
        [BindProperty(SupportsGet = true)]
        public string search { get; set; }
        private List<string>categories= new List<string>(new string[] { "computer","watch","audio","camera" });
        private List<string> subCategory = new List<string>(new string[] { "desktop", "laptop", "lens", "camera","headphone","speaker","analog","digital"});
        private string selCategory="", selSubCategory="";
        public string urlId;


       /* public void OnGet()
        {
            allItems = _db.Items.ToList();
            ViewData["msg"] = $"allItems:{allItems.Count}";
            search = Request.Query["search"];
            ViewData["msg"] = $":{search}!";

        }
       */

        public void OnGet()
        {
            
            search = Request.Query["search"];
           // ViewData["msg"] = $":{search}!";
            if (search != null)
                        {
                            foreach (var category in categories)
                            {
                                if (search.Contains(category))
                                {
                                    selCategory = category;
                                    search.Replace("category", "");


                                }
                                ViewData["msg"] = $":{category}!";
                            }

                            foreach (var sub in subCategory)
                            {
                                if (search.Contains(sub))
                                 {
                                    selSubCategory = sub;  
                                }
                            }
                            //so  check if they are actually there 
                            if (selCategory != "" && selSubCategory != "")
                            {
                                search.Replace("selCategory", "");
                                search.Replace("selSubCategory", "");
                                allItems = _db.Items.Where(d => (d.category == selCategory && d.subCategory == selSubCategory) ||
                                 d.Description.Contains(search) || d.Name.Contains(search)).ToList();
                            }
                            else if (selCategory != "")
                            {
                                search.Replace("selCategory", "");

                                allItems = _db.Items.Where(d => (d.category == selCategory) || d.Description.Contains(search) || d.Name.Contains(search)).ToList();
                            }
                            else if (selSubCategory != "")
                            {
                                search.Replace("selSubCategory", "");
                                allItems = _db.Items.Where(d => (d.subCategory == selSubCategory) || d.Description.Contains(search) || d.Name.Contains(search)).ToList();
                            }
                            else {
                                allItems = _db.Items.Where(d => d.Description.Contains(search) && d.Name.Contains(search)).ToList();
                            }
                        }
                        else {

                            allItems = _db.Items.ToList();
                        }
            
           // return Redirect("/allItems");
        }//end of onGet
      
       
        public allItemsModel(AccessDataContext db)
        {
            _db = db;
        }
        public IActionResult OnPost()
        {
            return RedirectToPage("upDateItem");

        }
        public IActionResult OnGetDelete()
        {
            urlId = Request.Query["id"];
           // ViewData["msg"] = $":{urlId}!";
            //set isdelte to true where the id is found
            products itemDelete = _db.Items.Find(Int32.Parse(urlId));
            itemDelete.isDeleted = true;
            _db.Items.Update(itemDelete);
            _db.SaveChanges();
            return RedirectToPage("allItems");

        }
      

    }

}
