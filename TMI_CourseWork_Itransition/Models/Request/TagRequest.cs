using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMI_CourseWork_Itransition.Models.Request
{
    public class TagRequest
    {
        [Required]
        public int ItemId { get; set; }
        [Required]
        public List<string> Tags { get; set; }
    }
}
