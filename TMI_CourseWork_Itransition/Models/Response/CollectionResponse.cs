﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMI_CourseWork_Itransition.Entities;

namespace TMI_CourseWork_Itransition.Models.Response
{
    public class CollectionResponse
    {
        public string Theme { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string ItemMask { get; set; }
        public UserResponse User { get; set; }

        public CollectionResponse(Collection collection, User user)
        {
            this.Image = collection.Image;
            this.ItemMask = collection.ItemMask;
            this.Theme = collection.Theme;
            this.Title = collection.Title;
            this.Description = collection.Descriptions;
            this.User = new UserResponse(user);
        }
    }
}
