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
    public class CollectionService : ICollectionService
    {
        private ApplicationContext db;

        public CollectionService(ApplicationContext context)
        {
            db = context;
        }


        public async Task<CollectionResponse> AddCollection(CollectionRequest request, string userEmail)
        {
            Collection collection = new Collection();
            collection.Descriptions = request.Description;
            collection.Theme = request.Theme;
            collection.Title = request.Title;
            collection.ItemMask = request.ItemMask;
            collection.Image = request.Image;
            collection.User = db.Users.FirstOrDefault(u => u.Email == userEmail);
            db.Collections.Add(collection);
            db.SaveChanges();
            return new CollectionResponse(collection, collection.User);
        }

        public async Task<List<CollectionResponse>> GetAllCollections()
        {
            var collections = db.Collections.Include(u => u.User).ToList();
            List<CollectionResponse> response = new List<CollectionResponse>();
            foreach(var collection in collections)
            {
                CollectionResponse responseItem = new CollectionResponse(collection, collection.User);
                response.Add(responseItem);
            }
            return response;
        }
    }
}
