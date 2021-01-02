using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMI_CourseWork_Itransition.Config
{
    public class JwtOptions
    {
        public const string Issuer = "Collections.API";
        public const string Audience = "Collections.Front"; 
        const string key = "SuperSecretKey!1465_qwxc";

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
        }
    }
}
