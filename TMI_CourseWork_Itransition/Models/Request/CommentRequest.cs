using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TMI_CourseWork_Itransition.Models.Request
{
    public class CommentRequest
    {
        [Required]
        public int ItemId { get; set; }
        [Required]
        public string Comment { get; set; }
    }
}
