using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities;
using TMI_CourseWork_Itransition.Models.Request;
using TMI_CourseWork_Itransition.Models.Response;

namespace TMI_CourseWork_Itransition.Services.Abstract
{
    public interface IItemService
    {
        public Task<ItemResponse> AddItem(ItemRequest request, string userName);

        public Task<List<ItemResponse>> GetItems(int CollectionId);

        public Task<ItemResponse> GetOneItem(int itemId);

        public Task<ItemResponse> AddComment(CommentRequest request , string userName);

        public Task<ItemResponse> AddOrRemoveLike(int itemId, string username);

        public Task<string> DeleteItem(int itemId, string username);

        public Task<ItemResponse> UpdateItem(ItemRequest request, int itemId, string username);

        public Task<List<Comment>> GetCommentsByItem(int itemId);

        public Task<List<ItemResponse>> SearchItems(string querry);

        public Task<List<ItemResponse>> GetLastItems();

    }
}
