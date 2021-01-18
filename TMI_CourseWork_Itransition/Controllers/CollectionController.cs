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
    public class CollectionController : DefaultController
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

        [HttpGet("user")]
        public async Task<ActionResult<List<CollectionResponse>>> GetCollectionsByUserName([FromQuery]string username)
        {
            var response = await collectionService.GetCollectionsByUserName(username);
            return Ok(response);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<CollectionResponse>> AddCollection([FromBody] CollectionRequest request)
        {
            var userName = GetUserName(this.User.Identity as ClaimsIdentity);
            var response = await collectionService.AddCollection(request, userName);
            return Ok(response);
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<CollectionResponse>> DeleteCollections(int id)
        {
            var userName = GetUserName(this.User.Identity as ClaimsIdentity);
            var response = await collectionService.DeleteCollection(id, userName);
            if (response == null) return NotFound();
            return Ok(response);
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<ActionResult<CollectionResponse>> UpdateCollection(int id, [FromBody] CollectionRequest request)
        {
            var userName = GetUserName(this.User.Identity as ClaimsIdentity);
            var response = await collectionService.UpdateCollection(request, userName, id);
            if (response == null) return NotFound();
            return Ok(response);
        }
    }
}