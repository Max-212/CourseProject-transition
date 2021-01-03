using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMI_CourseWork_Itransition.Models.Request
{
    public class CollectionRequest
    {
        [Required]
        public string Theme { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }

        public string Image { get; set; }
        [Required]
        public string ItemMask { get; set; }
    }
}
