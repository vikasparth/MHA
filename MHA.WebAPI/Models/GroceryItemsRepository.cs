using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using Newtonsoft.Json;

namespace MHA.WebAPI.Models
{
    public class GroceryItemsRepository
    {

        internal GroceryItem Create()
        {
            GroceryItem groceryItem = new GroceryItem { RegularItem = true, PreferredStore = "Amazon" };
            return groceryItem;
        }

        /// <summary>
        /// Creates a new Grocery Item with default values
        /// </summary>
        /// <returns></returns>
        internal GroceryItem Save(GroceryItem item)
        {
            List<GroceryItem> gorceryItems = this.Retrieve();
            int maxId = gorceryItems.Max<GroceryItem>(i => i.Id);
            item.Id = maxId + 1;
            gorceryItems.Add(item);
            WriteData(gorceryItems);
            return item;
        }

        internal GroceryItem Save(int id,GroceryItem item)
        {
            List<GroceryItem> gorceryItems = this.Retrieve();
            var itemIndex = gorceryItems.FindIndex(i => i.Id == id);
            if (itemIndex > 0)
            {
                gorceryItems[itemIndex] = item;
            }
            else
            {
                return null;
            }
            WriteData(gorceryItems);
            return (item);
        }

        internal List<GroceryItem> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/GroceryItems.json");

            var json = System.IO.File.ReadAllText(filePath);

            var groceryItems = JsonConvert.DeserializeObject<List<GroceryItem>>(json);

            return groceryItems;
        }

        internal GroceryItem Retrieve(int id)
        {
            try
            {
                var filePath = HostingEnvironment.MapPath(@"~/App_Data/GroceryItemDetails.json");

                var json = System.IO.File.ReadAllText(filePath);

                var groceryItems = JsonConvert.DeserializeObject<List<GroceryItem>>(json);

                return groceryItems.Where(g => g.Id == id).First();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        internal bool WriteData(List<GroceryItem> gcItems)
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/GroceryItems.json");
            var serializedItems = JsonConvert.SerializeObject(gcItems,Formatting.Indented);
            System.IO.File.WriteAllText(filePath, serializedItems);
            var filePathDetails = HostingEnvironment.MapPath(@"~/App_Data/GroceryItemDetails.json");
            var serializedItemsDetails = JsonConvert.SerializeObject(gcItems, Formatting.Indented);
            System.IO.File.WriteAllText(filePathDetails, serializedItemsDetails);
            return true;
        }
    }
}