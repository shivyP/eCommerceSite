using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using eCommerceSite.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace eCommerceSite.Pages
{
    [Authorize(Roles= "Admin")]
    public class upDateItemModel : PageModel
    {
        [BindProperty(SupportsGet = true)]
        private string urlId { get; set; }
        [BindProperty]
        public products itemPro { get; set; }
        public readonly AccessDataContext _db;
        public bool isPrice(string cost) {
            string pattern = @"^[0-9]+([\.\,][0-9]{1,3})?$";
            Regex vRg = new Regex(pattern);
            ViewData["msg1"] = $"Error, user {vRg.IsMatch(cost)}\t alredy exist";
            return vRg.IsMatch(cost);
        }

        public void OnGet()
        {
            urlId = Request.Query["id"];
            itemPro = _db.Items.Find(Int32.Parse(urlId));
          //  ViewData["msg1"] = $"Error, user {urlId}\t alredy exist";
        }
        
        public upDateItemModel(AccessDataContext db)
        {
            _db = db;
        }
        public RedirectToPageResult OnPost()
        {
            //if value is diffrent than zero
            if (!itemPro.Price.ToString().Equals("0"))
            {
                //isPrice(itemPro.Price.ToString());
                
                if (!isPrice((itemPro.Price).ToString()))
                {
                    ViewData["msg1"] = $"Error, Invalid Price:{itemPro.Price}.";
                }
                else if (itemPro.Description == null || itemPro.Name==null || itemPro.ProductImage==null)
                {
                    ViewData["msg1"] = $"Error, the item must have all infromation.";
                }
                else if (!isPrice((itemPro.vat).ToString()) || itemPro.vat.ToString().Equals("0"))
                {
                    ViewData["msg1"] = $"Error, Invalid vat Provided.";
                }
                else
                {
                    _db.Items.Update(itemPro);
                    _db.SaveChanges();

                    return RedirectToPage("allItems");
                }
            }
            else {
                ViewData["msg1"] = $"Error, Invalid Price.";
            }

            return null;
        }

        public RedirectToPageResult OnGetDelete()
        {
            urlId = Request.Query["id"];
            products item = _db.Items.Find(Int32.Parse(urlId));
            item.isDeleted = true;
            _db.Items.Update(item);
            _db.SaveChanges();
            return RedirectToPage("index");
        }

    }
}
