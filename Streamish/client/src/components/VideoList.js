import React, { useEffect, useState } from "react";
import Video from './Video';
import AddVideo from './VideoForm';
import { getAllVideos, searchVideo } from "../modules/videoManager";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState([])

  const getVideos = () => {
    getAllVideos().then(videos => setVideos(videos));
  };

  const handleInputChange = (event) => {
    const newSearch = {...search}
    let selectedVal = event.target.value
    newSearch[event.target.id] = selectedVal
    setSearch(newSearch)
}
  const searchVideos = (event) => {
    event.preventDefault()
    console.log(search.searchparam)
    searchVideo(search.searchparam,true)
    .then(response => {
      setVideos(response)
    })
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="container">
     <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search Video</span>
        </label>
        <input
            type="text"
            id="searchparam"
            placeholder="Search Videos"
            name="s"
            onChange={handleInputChange}
        />
        <button type="submit" onClick={searchVideos}>Search</button>
    </form>
      <AddVideo getvids={getVideos}/>
      <div className="row justify-content-center">
        {videos.map((video) => (
          <Video video={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
