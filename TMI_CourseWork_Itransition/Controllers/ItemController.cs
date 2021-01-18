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
    [Route("api/items")]
    [ApiController]
    public class ItemController : DefaultController
    {
        private IItemService itemService;

        public ItemController(IItemService itemService)
        {
            this.itemService = itemService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ItemResponse>>> GetItems([FromQuery] int collectionId)
        {
            var response = await itemService.GetItems(collectionId);
            if(response == null)
                return NotFound();
            return Ok(response);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ItemResponse>> AddItem([FromBody] ItemRequest request)
        {
            string userName = GetUserName(this.User.Identity as ClaimsIdentity);
            var response = await itemService.AddItem(request, userName);
            if (response == null)
                return NotFound();
            return Ok(response);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ItemResponse>> GetItemById(int id)
        {
            var response = await itemService.GetOneItem(id);
            if (response == null) return NotFound();
            return Ok(response);
        }

        [Authorize]
        [HttpPost("comments")]
        public async Task<ActionResult<ItemResponse>> AddComment([FromBody] CommentRequest request)
        {
            string userName = GetUserName(this.User.Identity as ClaimsIdentity);
            var response = await itemService.AddComment(request, userName);
            if (response == null) return NotFound();
            return Ok(response);
        }

        [Authorize]
        [HttpPost("likes/{id:int}")]
        public async  Task<ActionResult<ItemResponse>> Likes(int id)
        {
            string userName = GetUserName(this.User.Identity as ClaimsIdentity);
            var response = await itemService.AddOrRemoveLike(id, userName);
            if (response == null)
                return NotFound();
            return Ok(response);
        }

    }
}