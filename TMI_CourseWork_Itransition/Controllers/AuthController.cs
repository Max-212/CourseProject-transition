using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TMI_CourseWork_Itransition.Entities;
using TMI_CourseWork_Itransition.Models.Request;
using TMI_CourseWork_Itransition.Models.Response;
using TMI_CourseWork_Itransition.Services.Abstract;

namespace TMI_CourseWork_Itransition.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserService userService;

        public AuthController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody]RegisterRequest request)
        {
            var user = await userService.AddUser(request);
            if(user == null)
            {
                return BadRequest();
            }
            return Ok(user);
        }

        [HttpPost("token")]
        public async Task<ActionResult<LoginResponse>> GetToken([FromBody]LoginRequest request)
        {
            var response = await userService.Login(request);
            if(response == null)
            {
                return BadRequest();
            }
            return Ok(response);
        }
    }
}