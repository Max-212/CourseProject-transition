using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities;
using TMI_CourseWork_Itransition.Models.Request;
using TMI_CourseWork_Itransition.Models.Response;

namespace TMI_CourseWork_Itransition.Services.Abstract
{
    public interface IUserService
    {
        Task<User> AddUser(RegisterRequest request);
        Task<LoginResponse> Login(LoginRequest request);
    }
}
