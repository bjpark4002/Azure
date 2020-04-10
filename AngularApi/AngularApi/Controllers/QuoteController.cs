using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularDB;
using System.Web.Http.Cors;
using WebApi.OutputCache.V2;

namespace AngularApi.Controllers
{

    //[EnableCors(origins: "https://localhost:4200/", headers: "*", methods: "*")]

    //[Authorize]

    //strathweb.Cacheoutput.webapi2
    //[CacheOutput(ClientTimeSpan = 10)]
    [CacheOutput(ServerTimeSpan = 20)]

    public class QuoteController : ApiController
    {
        public IEnumerable<procQuote_Result> Get()
        {                  //<Qoute>
            using (AngularApiEntities entities = new AngularApiEntities())
            {
                entities.Database.Connection.Open();
                //return entities.Quotes.ToList();
                return entities.procQuote().ToList();
            }
        }

        [HttpGet]
        public HttpResponseMessage LoadQuoteById(int id)
        {
            using (AngularApiEntities entities = new AngularApiEntities())
            {
                entities.Database.Connection.Open();

                var entity = entities.Quotes.FirstOrDefault(e => e.QuoteID == id);
                if (entity != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User with id = " + id.ToString() + " Not Found");
                }
            }
        }

        public HttpResponseMessage Post([FromBody]Quote Quote)
        {
            try
            {
                using (AngularApiEntities entities = new AngularApiEntities())
                {
                    entities.Database.Connection.Open();

                    entities.Quotes.Add(Quote);
                    entities.SaveChanges();

                    var message = Request.CreateResponse(HttpStatusCode.Created, Quote);
                    message.Headers.Location = new Uri(Request.RequestUri + Quote.QuoteID.ToString());
                    return message;
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (AngularApiEntities entities = new AngularApiEntities())
                {
                    entities.Database.Connection.Open();

                    var entity = entities.Quotes.FirstOrDefault(x => x.QuoteID == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User with ID = " + id.ToString() + " Not Found To Delete");
                    }
                    else
                    {
                        entities.Quotes.Remove(entity);
                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK);
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage put(int id, [FromBody]Quote user)
        {
            try
            {
                using (AngularApiEntities entities = new AngularApiEntities())
                {
                    entities.Database.Connection.Open();

                    var entity = entities.Quotes.FirstOrDefault(x => x.QuoteID == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User with ID = " + id.ToString() + " Not Found To Update");
                    }
                    else
                    {
                        //entity.QuoteID = user.QuoteID;
                        entity.QuoteType = user.QuoteType;
                        entity.Contact = user.Contact;
                        entity.Task = user.Task;
                        entity.DueDate = user.DueDate;
                        entity.TaskType = user.TaskType;
                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK);
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }



    }
}
