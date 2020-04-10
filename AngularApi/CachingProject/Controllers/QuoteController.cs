using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using AngularDB;

namespace CachingProject.Controllers
{
    public class QuoteController : Controller
    {
        // GET: Quote

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Main()
        {

            IEnumerable<Quote> quotes = null;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://10.211.55.7:7777/api/");

                //HTTP GET
                var responseTask = client.GetAsync("quote");
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<Quote>>();
                    readTask.Wait();
                    quotes = readTask.Result;
                }
                else//web api sent error response 
                {
                    //long response status here..

                    quotes = Enumerable.Empty<Quote>();
                    ModelState.AddModelError(string.Empty, "Server Error. Please contact Administrator");
                }
                ViewBag.quote = quotes;

            }

            return View(quotes);
        }
    }
}