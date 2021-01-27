﻿using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities.Context;
using TMI_CourseWork_Itransition.Models.Request;
using TMI_CourseWork_Itransition.Models.Response;
using TMI_CourseWork_Itransition.Services.Abstract;
using TMI_CourseWork_Itransition.Entities;

namespace TMI_CourseWork_Itransition.Services.Implementation
{
    public class ItemService : IItemService
    {
        private ApplicationContext db;

        public ItemService(ApplicationContext context)
        {
            db = context;
        }

        public async Task<ItemResponse> AddComment(CommentRequest request, string userName)
        {
            User user = db.Users.FirstOrDefault(u => u.UserName == userName);
            Item item = db.Items.Include(i => i.Comments).FirstOrDefault(i => i.Id == request.ItemId);
            if (item == null) return null;

            var comment = new Comment();
            comment.Author = user.FirstName + " " + user.LastName;
            comment.CreatedDate = DateTime.UtcNow;
            comment.ItemID = request.ItemId;
            comment.Text = request.Comment;
            item.Comments.Add(comment);
            db.SaveChanges();
            return new ItemResponse(item);
        }

        public async Task<ItemResponse> AddItem(ItemRequest request, string userName)
        {
            User user = db.Users.Include(u => u.Collections)
                .ThenInclude(c => c.Items)
                .ThenInclude(i => i.Fields).FirstOrDefault(u => u.UserName == userName);
            var collection = user.Collections.FirstOrDefault(c => c.Id == request.CollectionID);
            if (collection == null)
                return null;

            var item = new Item();
            item.Title = request.Title;
            item.Fields = request.Fields;
            item.CollectionID = request.CollectionID;
            item.CreatedDate = DateTime.UtcNow;
            collection.Items.Add(item);
            db.SaveChanges();
            return new ItemResponse(item);
        }

        public async Task<ItemResponse> AddOrRemoveLike(int itemId, string username)
        {
            var item = db.Items.Include(i => i.Likes).FirstOrDefault(i => i.Id == itemId);
            if (item == null) return null;
            var like = item.Likes.FirstOrDefault(l => l.Username == username);
            if(like == null)
            {
                like = new Like();
                like.Username = username;
                like.Item = item;
                item.Likes.Add(like);
            }
            else
            {
                item.Likes.Remove(like);
            }
            db.SaveChanges();
            return new ItemResponse(item);
        }

        public async Task<List<ItemResponse>> GetItems(int collectionId)
        {
            List<ItemResponse> response = new List<ItemResponse>();
            var items = db.Items.Include(i => i.Tags)
                .Include(i => i.Fields)
                .Include(i => i.Likes)
                .Where(i => i.CollectionID == collectionId);
            if (items == null)
                return null;
            foreach(var item in items)
            {
                ItemResponse responseItem = new ItemResponse(item);
                response.Add(responseItem);
            }
            return response;
        }

        public async Task<ItemResponse> GetOneItem(int itemId)
        {
            var item = db.Items.Include(i => i.Tags)
                .Include(i => i.Comments)
                .Include(i => i.Likes)
                .Include(i => i.Fields).FirstOrDefault(i => i.Id == itemId);
            if (item == null)
                return null;
            var response = new ItemResponse(item);
            return response;
        }
    }
}
