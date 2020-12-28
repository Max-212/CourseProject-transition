using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TMI_CourseWork_Itransition.Models.Response
{
    public class LoginResponse
    {
        public string Email { get; set; }
        public string Token { get; set; }

        public LoginResponse(string email, string token)
        {
            Email = email;
            Token = token;
        }
    }
}
