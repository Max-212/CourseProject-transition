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


        public async Task<CollectionResponse> AddCollection(CollectionRequest request, string userName)
        {
            Collection collection = new Collection();
            collection.Descriptions = request.Description;
            collection.Theme = request.Theme;
            collection.Title = request.Title;
            collection.Fieds = request.Fields;
            collection.Image = request.Image;
            collection.User = db.Users.FirstOrDefault(u => u.UserName == userName);
            db.Collections.Add(collection);
            db.SaveChanges();
            return new CollectionResponse(collection, collection.User);
        }

        public async Task<List<CollectionResponse>> DeleteCollection(int collectionId, string userName)
        {
            
            var deleteCollection = db.Collections.Include(c => c.User).FirstOrDefault(c => c.Id == collectionId);
            if (deleteCollection.User.UserName != userName || deleteCollection == null) return null;
            db.Collections.Remove(deleteCollection);
            var collections = db.Collections.Include(u => u.User).Include(c => c.Fieds).ToList();
            db.SaveChanges();
            return GetCollectionResponseList(collections);
        }

        public async Task<List<CollectionResponse>> GetAllCollections()
        {
            var collections = db.Collections.Include(u => u.User).Include(c => c.Fieds).ToList();
            return GetCollectionResponseList(collections);
        }

        public async Task<List<CollectionResponse>> GetLargestCollections()
        {
            var collections = db.Collections.Include(c => c.User)
                .OrderByDescending(c => c.Items.Count).Take(6).ToList();
            return GetCollectionResponseList(collections);
        }

        public async Task<CollectionResponse> GetCollectionById(int collectionId)
        {
            var collection = db.Collections
                .Include(c => c.User)
                .Include(c => c.Fieds).FirstOrDefault(c => c.Id == collectionId);
            if (collection == null) return null;
            return new CollectionResponse(collection, collection.User);
        }

        public async Task<List<CollectionResponse>> GetCollectionsByUserName(string userName)
        {
            var collections = db.Collections
                .Include(u => u.User)
                .Include(c => c.Fieds).Where(c => c.User.UserName == userName).ToList();
            return GetCollectionResponseList(collections);
        }

        public async Task<CollectionResponse> UpdateCollection(CollectionRequest request, string userName, int collectionId)
        {
            var collection = db.Collections
                .Include(c => c.User)
                .Include(c => c.Fieds).FirstOrDefault(c => c.Id == collectionId);
            if (collection.User.UserName != userName || collection == null) return null;
            collection.Image = request.Image;
            collection.Theme = request.Theme;
            collection.Title = request.Title;
            collection.Descriptions = request.Description;
            collection.Fieds = request.Fields;
            db.Collections.Update(collection);
            db.SaveChanges();
            return new CollectionResponse(collection, collection.User);
        }

        private List<CollectionResponse> GetCollectionResponseList(List<Collection> collections)
        {
            List<CollectionResponse> response = new List<CollectionResponse>();
            foreach (var collection in collections)
            {
                CollectionResponse responseItem = new CollectionResponse(collection, collection.User);
                response.Add(responseItem);
            }
            return response;
        }
    }
}
