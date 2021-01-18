using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TMI_CourseWork_Itransition.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DefaultController : ControllerBase
    {
        public string GetUserName(ClaimsIdentity claims)
        {
            string userName = claims.FindFirst(ClaimTypes.Name).Value;
            return userName;
        }
    }
}