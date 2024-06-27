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
    [Authorize(Roles = "Admin")]
   
    public class addItemsModel : PageModel
    {
        public readonly AccessDataContext _db;
        [BindProperty]
        public products itemPro { get; set; }
  

        public addItemsModel(AccessDataContext db)
        {
            _db = db;
        }
        public IActionResult OnPost()
        {
            if (!itemPro.Price.ToString().Equals("0"))
            {
                //isPrice(itemPro.Price.ToString());

                if (!isPrice((itemPro.Price).ToString()))
                {
                    ViewData["msg1"] = $"Error, Invalid Price:{itemPro.Price}.";
                }
                else if (itemPro.Description == null || itemPro.Name == null || itemPro.ProductImage == null ||
                    itemPro.subCategory== null || itemPro.category==null)
                {
                    ViewData["msg1"] = $"Error, the item must have all infromation.";
                }
                else if (itemPro.Description.Length <= 1 || itemPro.Name.Length <= 1 || itemPro.ProductImage.Length <= 1 ||
                   itemPro.subCategory.Length <= 1 || itemPro.category.Length <= 1)
                {
                    ViewData["msg1"] = $"Error, Invalid infromation provided.";
                }
                else if (!isPrice((itemPro.vat).ToString()) || itemPro.vat.ToString().Equals("0"))
                {
                    ViewData["msg1"] = $"Error, Invalid vat Provided.";
                }

                else
                {
                    itemPro.isDeleted = false;
                    _db.Items.Add(itemPro);
                    _db.SaveChanges();

                    return RedirectToPage("allItems");
                }
            }
            else
            {
                ViewData["msg1"] = $"Error, Invalid Price.";
            }
            return Page();
            //return RedirectToPage("allItems");
        }

        public bool isPrice(string cost)
        {
            string pattern = @"^[0-9]+([\.\,][0-9]{1,3})?$";
            Regex vRg = new Regex(pattern);
            ViewData["msg1"] = $"Error, user {vRg.IsMatch(cost)}\t alredy exist";
            return vRg.IsMatch(cost);
        }
    }
}
