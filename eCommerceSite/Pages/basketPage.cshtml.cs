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
    public class basketPageModel : PageModel
    {
        public SignInManager<users> SignInManager;
        public UserManager<users> UserManager;

        public List<products> prod { get; set; }
        public readonly AccessDataContext _db;
        public List<basket> basket;
        bool isAuthenticated;

        [BindProperty]
        public string name { get; set; }
        [BindProperty]
        public string address { get; set; }
        [BindProperty]
        public string nameCard { get; set; }
        [BindProperty]
        public int cardNum { get; set; }
        [BindProperty]
        public string expMonth { get; set; }
        [BindProperty]
        public string cvv { get; set; }
        [BindProperty]
        public string expYear { get; set; }




        public basket findItem { get; set; }


        public products ItemPro { get; set; }
        public List<basket> basketItem { get; set; }
        public List<basket> allBasketItem { get; set; }

        public decimal totalCost { get; set; }
        private string urlId { get; set; }

        public string uName;
        private string returnUrl = "";
        public RedirectResult OnGetAdd()
        {

            returnUrl = Request.Headers["Referer"].ToString();
            urlId = Request.Query["id"];
            isAuthenticated = User.Identity.IsAuthenticated;
            uName = User.Identity.Name;

           
            if (isAuthenticated)
                if (urlId != null)
                {

                    basketItem = _db.Basket.ToList();

                    if (basketItem.Count != 0)
                    {
                        //check if in the basket 
                        bool added = upDateBasket("add");

                        if (!added)
                            addTobasket();
                        // ViewData["msg"] = $"after for:{uName}!";  
                      

                        //  basketItem = _db.Basket.Where(b => b.productName == ItemPro.Name);


                        // _db.Basket.Add(basketItem);
                        //  _db.SaveChanges();
                    }
                     //else {
                        //addTobasket();
                    // }

                    //get all the items in 

                }
            getTotal();
            return Redirect(returnUrl);


           // return Redirect("basketPage");
        }

        public void OnGet()
        {
            isAuthenticated = User.Identity.IsAuthenticated;
            if (isAuthenticated)
            {
                uName = User.Identity.Name;
                allBasketItem = _db.Basket.Where(b => b.userName.Equals(uName) && b.qunatity > 0).ToList();
                getTotal();

            }



        }


        public RedirectResult OnGetReduce()
        {
            //returnUrl = Request.Headers["Referer"].ToString();
            urlId = Request.Query["id"];

            basketItem = _db.Basket.Where(b => b.userName.Equals(uName)).ToList(); //gets the item from the basket 
            upDateBasket("remove");
            getTotal();
            return Redirect("/basketPage");
        }

        public RedirectResult OnGetUpdate()
        {
            //returnUrl = Request.Headers["Referer"].ToString();
            urlId = Request.Query["id"];
           

            basketItem = _db.Basket.Where(b => b.userName.Equals(uName)).ToList(); //gets the item from the basket 
            upDateBasket("add");
            getTotal();
            return Redirect("/basketPage");
        }




        public basketPageModel(AccessDataContext db)
        {
            _db = db;
        }


        bool upDateBasket(string type)
        {
            uName = User.Identity.Name;
            basketItem = _db.Basket.Where(b => b.userName.Equals(uName)).ToList();
           
            foreach (var item1 in basketItem)
            {
                if (item1.userName.Equals(uName) && item1.productId.Equals((Int32.Parse(urlId))))
                {

                    if (type.Equals("add"))
                        item1.qunatity += 1;
                    else if (type.Equals("remove"))
                    {
                        item1.qunatity -= 1;
                        item1.qunatity = (item1.qunatity < 0) ? 0 : item1.qunatity;
                    }

                    _db.Basket.Update(item1);
                    _db.SaveChanges();
                    return true;
                }
            }
            return false;
        }

        void addTobasket()
        {
            ItemPro = _db.Items.Find(Int32.Parse(urlId));
            findItem = new basket
            {
                productId = ItemPro.Id,
                userName = uName,
                Name = ItemPro.Name,
                Price = ItemPro.Price,
                qunatity = 1,
                ProductImage = ItemPro.ProductImage,
                vat = ItemPro.vat

            };
            _db.Basket.Add(findItem);
            _db.SaveChanges();

        }//end of function

        void getTotal()
        {
           
            uName = User.Identity.Name;
            List<basket> forTotal = _db.Basket.Where(b => b.userName.Equals(uName)).ToList();
            foreach (var item in forTotal)
            {
                //Math.Round((1 + item.vat) * (item.Price * item.qunatity), 2, MidpointRounding.ToEven)
                totalCost += Math.Round((1 + item.vat) * (item.Price * item.qunatity), 2, MidpointRounding.ToEven);
            }
        }

       
        public RedirectResult OnGetCheckout()
        {
            ViewData["msg"] = "in here";
          
            //Redirect("basketPage");
            //check if all details are provided 
            /* if (name.Length == 0 || name.Equals(null))
                 ViewData["msg"] = $"The name can not be empty.";
             else if (address.Length == 0 || address.Equals(null))
                 ViewData["msg"] = $"The address can not be empty.";
             else if (nameCard.Length == 0 || nameCard.Equals(null))
                 ViewData["msg"] = $"Please enter the name of the crad.";
             else if (nameCard.Length == 0 || nameCard.Equals(null))
                 ViewData["msg"] = $"Please enter the name of the crad.";
             else if (cardNum == 0 || cardNum.Equals(null))
                 ViewData["msg"] = $"Please enter card number.";
             else if (expMonth.Length == 0 || expMonth.Equals(null))
                 ViewData["msg"] = $"Please provide expiry month.";
             else if (expYear.Length == 0 || expYear.Equals(null))
                 ViewData["msg"] = $"Please provide expiry year.";
             else if (cvv.Length < 3 || cvv.Equals(null))
                 ViewData["msg"] = $"Please enter a valid cvv number.";
             else {*/
                 //meaning all data has been provided.
                 //
                 ViewData["msg"] = $"The order has been placed.";
                 //update basket 
                 uName = User.Identity.Name;
                 List<basket> forTotal = _db.Basket.Where(b => b.userName.Equals(uName)).ToList();
                 foreach (var item in forTotal)
                 {
                     if (item.userName.Equals(uName)) {
                         _db.Basket.Remove(item);
                         _db.SaveChanges();
                        
                    }
                 }




           // ViewData["Confirmation"] = "The order has been placed";
            return Redirect("/basketPage");

            //address  nameCard  cardNum  expMonth  cvv  expYear 

        }

        }
    }
        

