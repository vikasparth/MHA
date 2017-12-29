using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;
using System.Web.Http.OData.Query;
using MHA.WebAPI.Models;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace MHA.WebAPI.Controllers
{
    [EnableCorsAttribute("http://localhost:41414", "*", "*")]
    public class GroceryItemsController : ApiController
    {
        // GET: api/GroceryItems
        //[EnableQuery(AllowedQueryOptions = AllowedQueryOptions.Skip)]
        [EnableQuery]
        [ResponseType(typeof(GroceryItem))]
        //public IQueryable<GroceryItem> Get()
        public IHttpActionResult Get()
        {
            GroceryItemsRepository grcRepository = new GroceryItemsRepository();
            List<GroceryItem> groceryItems = grcRepository.Retrieve();
            return Ok(groceryItems.AsQueryable());            
        }

        // GET: api/GroceryItems/5
        [EnableQuery]
        [ResponseType(typeof(GroceryItem))]
        //public GroceryItem Get(int id)
        public IHttpActionResult Get(int id)
        {
            GroceryItemsRepository grcRepository = new GroceryItemsRepository();
            GroceryItem groceryItem = new GroceryItem();
            if (id > 0)
            {
                groceryItem = grcRepository.Retrieve(id);
                /* Returned Object is being converted to a Queryable list, as on Client side we are using
                   $resource.query method which expects an array to be returned and not an object 
                   Below code needs to be changed along with client side change*/
                //List<GroceryItem> groceryItemsList = new List<GroceryItem>();
                //groceryItemsList.Add(groceryItem);
                //return groceryItemsList.AsQueryable();
                if (groceryItem == null)
                {
                    return NotFound();
                }
            }
            else
            {   
                groceryItem = grcRepository.Create();
            }
            return Ok(groceryItem);
        }

        // POST: api/GroceryItems
        //Providing [FromBody] below so that method knows that, it needs to read data from body and not from url
        //public void Post([FromBody] GroceryItem gcItem)
        [ResponseType(typeof(GroceryItem))]
        public IHttpActionResult Post([FromBody] GroceryItem gcItem)
        {
            if (gcItem == null)
            {
                return BadRequest("Grocery Item can not be null");
            }
            GroceryItemsRepository gcItemRepository = new GroceryItemsRepository();
            GroceryItem newgcItem = gcItemRepository.Save(gcItem);
            if (newgcItem == null)
            {
                return Conflict();
            }
            return Created<GroceryItem>(Request.RequestUri+newgcItem.Id.ToString(),newgcItem);
        }

        // PUT: api/GroceryItems/5
        //Providing [FromBody] below so that method knows that, it needs to read data from body and not from url

        [ResponseType(typeof(GroceryItem))]
        public IHttpActionResult Put(int id, [FromBody]GroceryItem gcItem)
        {
            if (gcItem == null)
            {
                return BadRequest("Grocery item can not be null");
            }
            GroceryItemsRepository gcItemRepository = new GroceryItemsRepository();
            GroceryItem updatedGcItem = gcItemRepository.Save(id, gcItem);
            if (updatedGcItem == null)
            {
                return NotFound();
            }
            return Ok();
        }

        // DELETE: api/GroceryItems/5
        public void Delete(int id)
        {
        }
    }
}
