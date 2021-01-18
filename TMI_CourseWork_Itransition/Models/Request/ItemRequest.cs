using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities;

namespace TMI_CourseWork_Itransition.Models.Request
{
    public class ItemRequest
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public int CollectionID { get; set; }
        public List<CustomFieldValue> Fields { get; set; }
    }
}
