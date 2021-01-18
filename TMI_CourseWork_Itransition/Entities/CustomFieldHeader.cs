using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TMI_CourseWork_Itransition.Entities
{
    public class CustomFieldHeader : CustomField
    {
        public int CollectionID { get; set; }
        [JsonIgnore]
        public Collection Collection { get; set; }
    }
}
