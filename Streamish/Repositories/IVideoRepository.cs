using Streamish.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Streamish.Repositories
{
    public interface IVideoRepository
    {
        public void Delete(int id);
        public void Update(Video video);
        public void Add(Video video);
        public Video GetById(int id);
        public List<Video> GetAll();
        public List<Video> GetAllWithComments();
        public Video GetVideoByIdWithComments(int id);
    }
}
