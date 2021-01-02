using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TMI_CourseWork_Itransition.Entities
{
    public class Collection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Theme { get; set; }
        public string Title { get; set; }
        public string Descriptions { get; set; }
        public string Image { get; set; }
        public string ItemMask { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Item> Items { get; set; }

    }
}
