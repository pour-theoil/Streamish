using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Streamish.Models
{
    public class Video
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string Url { get; set; }

        public DateTime DateCreated { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

        public List<Comment> Comments { get; set; }
        public int videoPlayerId { get; set; }

        public VideoPlayer VideoPlayer { get; set; }

      
    }
}