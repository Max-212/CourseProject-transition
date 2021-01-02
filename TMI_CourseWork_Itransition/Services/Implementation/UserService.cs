using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Config;
using TMI_CourseWork_Itransition.Entities;
using TMI_CourseWork_Itransition.Entities.Context;
using TMI_CourseWork_Itransition.Models.Request;
using TMI_CourseWork_Itransition.Models.Response;
using TMI_CourseWork_Itransition.Services.Abstract;
using BC = BCrypt.Net.BCrypt;

namespace TMI_CourseWork_Itransition.Services.Implementation
{
    public class UserService : IUserService
    {
        private ApplicationContext db;

        public UserService(ApplicationContext context)
        {
            db = context;
        }

        public async Task<User> AddUser(RegisterRequest request)
        {
            User user = new User();
            user.Email = request.Email;
            user.Password = BC.HashPassword(request.Password);
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Role = db.Roles.FirstOrDefault(p => p.Id == 2);
            db.Users.Add(user);
            db.SaveChanges();

            return user;
        }

        public async Task<LoginResponse> Login(LoginRequest request)
        {
            var identity = await GetIdentity(request);
            if (identity == null)
            {
                return null;
            }
            var key = JwtOptions.GetSymmetricSecurityKey();
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: JwtOptions.Issuer,
                    audience: JwtOptions.Audience,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: DateTime.Now.AddDays(30),
                    signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return new LoginResponse(request.Email, encodedJwt);
        }

        private async Task<ClaimsIdentity> GetIdentity(LoginRequest request)
        {
            var user = db.Users.Include(u => u.Role).FirstOrDefault(u => u.Email == request.Email);
            if (user == null || !BC.Verify(request.Password,user.Password))
            {
                return null;
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.Name)
            };
            ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
}
