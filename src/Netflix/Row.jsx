import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row(props) {
  const [originals, setOriginals] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [opts, setOpts] = useState({
    height: "350",
    width: "400",
    playerVars: {
      autoplay: 1,
    },
  });
  const baseURL = "https://api.themoviedb.org/3";
  const img_baseURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    axios.get(`${baseURL}${props.endpoint}`).then((response) => {
      setOriginals(response.data.results);
    });
  }, [props.endpoint]);

  async function handleClick(movie) {
    const url = await movieTrailer(
      movie?.name || movie?.original_name || movie?.original_title,
      { apiKey: "59e27e00b6013f55ea24b194c30559bb" }
    );

    if (!url) {
      console.error("Empty ");
      return;
    }

    const videoId = new URL(url).searchParams.get("v");

    if (!videoId) {
      console.error("Invalid video ID extracted from the URL.");
      return;
    }

    setTrailerUrl(videoId);
  }

  return (
    <>
      <div className="movie-wrapper">
        <h2>{props.heading}</h2>
        <div className="movies">
          {originals.map((movie, index) => (
            <img
              onClick={() => handleClick(movie)}
              key={index}
              src={img_baseURL + movie.poster_path}
              alt={movie.name}
            />
          ))}
        </div>
        <div className="trailerShow-head">
          {trailerUrl ? (
            <div className="trailerShow">
              <span className="closeBtn" onClick={() => setTrailerUrl()}>
                &times;
              </span>
              <YouTube videoId={trailerUrl} opts={opts} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Row;
