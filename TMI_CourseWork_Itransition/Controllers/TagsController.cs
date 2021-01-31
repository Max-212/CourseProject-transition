using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TMI_CourseWork_Itransition.Entities;
using TMI_CourseWork_Itransition.Models.Request;
using TMI_CourseWork_Itransition.Models.Response;
using TMI_CourseWork_Itransition.Services.Abstract;

namespace TMI_CourseWork_Itransition.Controllers
{
    [Route("api")]
    [ApiController]
    public class TagsController : DefaultController
    {
        private ITagService tagService;

        public TagsController(ITagService tagService)
        {
            this.tagService = tagService;
        }

        [Authorize]
        [HttpPost("items/tags")]
        public async Task<ActionResult<ItemResponse>> AddTags([FromBody] TagRequest request)
        {
            var userName = GetUserName(this.User.Identity as ClaimsIdentity);
            var response = await tagService.AddTags(request, userName);
            if (response == null) return NotFound();
            return Ok(response);
        }

        [Authorize]
        [HttpDelete("items/tags")]
        public async Task<ActionResult<ItemResponse>> DeleteTag([FromBody] DeleteTagRequest request)
        {
            var userName = GetUserName(this.User.Identity as ClaimsIdentity);
            var response = await tagService.DeleteTag(request, userName);
            if (response == null) return NotFound();
            return Ok(response);
        }

        [HttpGet("items/tags")]
        public async Task<ActionResult<List<ItemResponse>>> GetItemsByTag([FromQuery] string tag)
        {
            if (tag == null) return BadRequest("tag is required parameter");
            var response = await tagService.GetItemsByTag(tag);
            if (response == null) return NotFound();
            return Ok(response);
        }
        
        [HttpGet("tags")]
        public async Task<ActionResult<List<Tag>>> GetTags()
        {
            var response = await tagService.GetPopularTags();
            return Ok(response);
        }
    }
}