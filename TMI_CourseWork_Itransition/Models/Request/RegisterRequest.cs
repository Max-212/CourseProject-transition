using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Models.ValidationAtributes;

namespace TMI_CourseWork_Itransition.Models.Request
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "UserName is required field")]
        [UniqueUserName]
        public string UserName { get; set; }
        [Required(ErrorMessage ="Password is required field")]
        [StringLength(maximumLength:20, MinimumLength = 8)]
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
