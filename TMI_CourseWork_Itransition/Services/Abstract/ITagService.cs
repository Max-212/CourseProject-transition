using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities;
using TMI_CourseWork_Itransition.Models.Request;
using TMI_CourseWork_Itransition.Models.Response;

namespace TMI_CourseWork_Itransition.Services.Abstract
{
    public interface ITagService
    {
        public Task<ItemResponse> AddTags(TagRequest request, string userName);

        public Task<ItemResponse> DeleteTag(DeleteTagRequest request, string userName);

        public Task<List<ItemResponse>> GetItemsByTag(string tagName);

        public Task<List<Tag>> GetTags();

        public Task<List<Tag>> GetPopularTags();
    }
}
