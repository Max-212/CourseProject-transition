using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities;
using TMI_CourseWork_Itransition.Models.Request;
using TMI_CourseWork_Itransition.Models.Response;

namespace TMI_CourseWork_Itransition.Services.Abstract
{
    public interface ICollectionService
    {
        Task<CollectionResponse> AddCollection(CollectionRequest request, string userName);

        Task<List<CollectionResponse>> GetAllCollections();

        Task<List<CollectionResponse>> GetCollectionsByUserName(string userName);

        Task<CollectionResponse> UpdateCollection(CollectionRequest request, string userName, int collectionId);

        Task<List<CollectionResponse>> DeleteCollection(int collectionId, string userName);

        Task<CollectionResponse> GetCollectionById(int collectionId);
    }
}
