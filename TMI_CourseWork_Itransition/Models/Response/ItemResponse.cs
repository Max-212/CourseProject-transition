using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities;

namespace TMI_CourseWork_Itransition.Models.Response
{
    public class ItemResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<CustomFieldValue> Fields { get; set; }
        public int CollectionID { get; set; }
        public int LikesCount { get; set; }
        public DateTime CreatedDate { get; set; }

        public ICollection<Tag> Tags { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Like> Likes { get; set; }

        public ItemResponse(Item item)
        {
            this.Id = item.Id;
            this.Title = item.Title;
            this.Fields = item.Fields;
            this.CollectionID = item.CollectionID;
            this.Tags = item.Tags;
            this.Comments = item.Comments;
            this.Likes = item.Likes;
            if (Likes == null)
                this.LikesCount = 0;
            else
                this.LikesCount = item.Likes.Count;
            this.CreatedDate = item.CreatedDate;
        }
    }
}
