using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using TMI_CourseWork_Itransition.Config;
using TMI_CourseWork_Itransition.Entities.Context;
using TMI_CourseWork_Itransition.Models.ValidationAtributes;
using TMI_CourseWork_Itransition.Services.Abstract;
using TMI_CourseWork_Itransition.Services.Implementation;

namespace TMI_CourseWork_Itransition
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connection = "Server=tcp:tmi-coursework-itransition.database.windows.net,1433;Initial Catalog=CourseWork_Itransition;Persist Security Info=False;User ID=tmi;Password={password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connection));
            services.AddCors(options =>
            {
                options.AddPolicy("TestPolicy", builder => builder
                       .AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .SetIsOriginAllowedToAllowWildcardSubdomains());
            });
            services.AddControllers();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICollectionService, CollectionService>();
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<ITagService, TagService>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidIssuer = JwtOptions.Issuer,
                            ValidateAudience = true,
                            ValidAudience = JwtOptions.Audience,
                            ValidateLifetime = true,
                            IssuerSigningKey = JwtOptions.GetSymmetricSecurityKey(),
                            ValidateIssuerSigningKey = true,
                        };
                    });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors("TestPolicy");
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
