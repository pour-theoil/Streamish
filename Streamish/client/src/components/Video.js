import { Link } from "react-router-dom";
import React from "react";
import { Card, CardBody } from "reactstrap";

const Video = ({ video }) => {
  return (
    <Card >
      <p className="text-left px-2">Posted by: <Link to={`/users/${video.userProfileId}`}>
         {video.userProfile.name}
        </Link></p>
      <CardBody>
        <iframe className="video"
          src={video.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />

        <p>
          <strong>{video.title}</strong>
        </p>
        <p>{video.description}</p>
        <p>comments:{video.comments?.map((message) => (
          <p key={message.Id}>{message.message}</p>))}</p>
        <Link to={`/videos/${video.id}`}>
          <strong>{video.title}</strong>
        </Link>
      </CardBody>
    </Card>
  );
};

export default Video;
