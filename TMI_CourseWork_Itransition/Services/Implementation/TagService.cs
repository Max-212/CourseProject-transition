using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities;
using TMI_CourseWork_Itransition.Entities.Context;
using TMI_CourseWork_Itransition.Models.Request;
using TMI_CourseWork_Itransition.Models.Response;
using TMI_CourseWork_Itransition.Services.Abstract;

namespace TMI_CourseWork_Itransition.Services.Implementation
{
    public class TagService : ITagService
    {
        private ApplicationContext db;

        public TagService(ApplicationContext context)
        {
            db = context;
        }

        public async Task<ItemResponse> AddTags(TagRequest request, string userName)
        {
            Item item = db.Items.Include(i => i.Collection)
                .ThenInclude(c => c.User)
                .Include(i => i.Tags).FirstOrDefault(i => i.Id == request.ItemId);

            if (item.Collection.User.UserName != userName || item == null)
                return null;

            var Tags = db.Tags.ToList();
            foreach (var title in request.Tags)
            {
                var tag = Tags.FirstOrDefault(t => t.Title == title);
                if (tag == null)
                {
                    tag = new Tag();
                    tag.Title = title;
                }
                if (!item.Tags.Contains(tag))
                    item.Tags.Add(tag);
            }
            db.SaveChanges();
            return new ItemResponse(item);
        }

        public async Task<ItemResponse> DeleteTag(DeleteTagRequest request, string userName)
        {
            Item item = db.Items.Include(i => i.Collection)
                .ThenInclude(c => c.User)
                .Include(i => i.Tags).FirstOrDefault(i => i.Id == request.ItemId);
            Tag tag = item.Tags.FirstOrDefault(t => t.Id == request.TagId);
            if (item.Collection.User.UserName != userName || item == null || tag == null)
                return null;
            item.Tags.Remove(tag);
            db.SaveChanges();
            return new ItemResponse(item);
        }

        public async Task<List<ItemResponse>> GetItemsByTag(string tagName)
        {
            List<ItemResponse> response = new List<ItemResponse>();
            List<Item> items = db.Tags.Include(t => t.Items)
                .ThenInclude(i => i.Fields).FirstOrDefault(t => t.Title == tagName).Items.ToList();
            if (items == null)
                return null;
            foreach (var item in items)
            {
                ItemResponse responseItem = new ItemResponse(item);
                response.Add(responseItem);
            }
            return response;
        }

        public async Task<List<Tag>> GetTags()
        {
            var tags = db.Tags.ToList();
            return tags;
        }
    }
}
