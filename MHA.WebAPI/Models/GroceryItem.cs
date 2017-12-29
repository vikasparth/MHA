using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MHA.WebAPI.Models
{
    public class GroceryItem
    {
        public int Id { get; set; }

        [MaxLength(11,ErrorMessage ="You exceeded max length of 11")]
        [MinLength(5,ErrorMessage ="You need to enter at least 5 characters")]
        [Required]
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string MoreInfo { get; set; }
        
        // Below property is to mention if a product is measured by weight or count Or Volumne and so on.
        public string MeasuredBy { get; set; }

        // If a product is measured by Weight, below can be used to mention unit like Kg, Gram, Pound, Litre
        public string WeightUnit { get; set; }

        // Below Category is to have information like, Food, Cleaning
        public string Category { get; set; }
        // Below property provides selection if an item is regular purchase item or not
        public bool RegularItem { get; set; }
        // If an item is regular, below property can help select frequency of item in days
        public int FrequencyInDays { get; set; }
        public string Brand { get; set; }
        public string Image { get; set; }
        public string PreferredStore { get; set; }

    }
}