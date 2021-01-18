using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities.Context;
using TMI_CourseWork_Itransition.Models.Request;

namespace TMI_CourseWork_Itransition.Models.ValidationAtributes
{
    public class UniqueUserName : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var registerRequest = (RegisterRequest)validationContext.ObjectInstance;
            var db = (ApplicationContext)validationContext.GetService(typeof(ApplicationContext));         

            if (db.Users.FirstOrDefault(p => p.UserName == registerRequest.UserName) != null)
            {
                return new ValidationResult("This UserName already in use");
            }

            return ValidationResult.Success;
        }
    }
}
