import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import "../styles/FinancialPage.css";

function YouTubeVideos({ videoType }) {
  const [videos, setVideos] = useState([]);
  const { authToken } = useContext(AuthContext);

  const loadVideos = async (keyword) => {
    const response = await fetch(`/api/api/videos/${keyword}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const json = await response.json();
    setVideos(json);
  };

  useEffect(() => {
    if (authToken && videoType) {
      loadVideos(videoType);
    }
  }, [authToken, videoType]);

  return (
    <div>
      <div>
        <div className="FEVideosContainer">
          {videos.map((video) => (
            <div className="FEVideoItem" key={video.id.videoId}>
              <iframe
                width="100%"
                height="225"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={decodeURI(video.snippet.title)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <h4>{decodeURIComponent(video.snippet.title)}</h4>
              <p>{decodeURIComponent(video.snippet.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YouTubeVideos;
