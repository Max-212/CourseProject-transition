using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities;

namespace TMI_CourseWork_Itransition.Models.Response
{
    public class LoginResponse
    {
        public UserResponse User { get; set; }
        public string Token { get; set; }

        public LoginResponse(User user, string token)
        {
            User = new UserResponse(user);
            Token = token;
        }
    }
}
