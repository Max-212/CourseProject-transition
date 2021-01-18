using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TMI_CourseWork_Itransition.Entities
{
    public class CustomFieldValue : CustomField
    {
        public string Value { get; set; }

        public int ItemID { get; set; }

        [JsonIgnore]
        public Item Item { get; set; }
    }
}
