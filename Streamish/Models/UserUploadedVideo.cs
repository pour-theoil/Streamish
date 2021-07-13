using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Streamish.Models
{
    public class UserUploadedVideo
    {
        public int VideoId { get; set; }

        public string FirebaseUserId { get; set; }

        public IFormFile ImageFile { get; set; }

        public int userid { get; set; }
    }
}