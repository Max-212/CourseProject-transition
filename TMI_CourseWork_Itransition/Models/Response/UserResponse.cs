using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities;

namespace TMI_CourseWork_Itransition.Models.Response
{
    public class UserResponse
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public UserResponse(User user)
        {
            this.Email = user.Email;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
        }
    }
}
