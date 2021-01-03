using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TMI_CourseWork_Itransition.Models.Request;
using TMI_CourseWork_Itransition.Models.Response;
using TMI_CourseWork_Itransition.Services.Abstract;

namespace TMI_CourseWork_Itransition.Controllers
{
    [Route("api/collections")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private ICollectionService collectionService;

        public CollectionController(ICollectionService collectionService)
        {
            this.collectionService = collectionService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CollectionResponse>>> GetAllCollections()
        {
            var response = await collectionService.GetAllCollections();
            return Ok(response);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<CollectionResponse>> AddCollection([FromBody] CollectionRequest request)
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userEmail = claimsIdentity.FindFirst(ClaimTypes.Name).Value;
            var response = await collectionService.AddCollection(request, userEmail);
            return Ok(response);
        }
    }
}