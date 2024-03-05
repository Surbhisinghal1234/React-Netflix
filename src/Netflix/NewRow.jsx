import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row(props) {
  const [originals, setOriginals] = useState([]);

  const baseURL = "https://api.themoviedb.org/3";
  const img_baseURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    axios.get(`${baseURL}${props.endpoint}`).then((response) => {
      setOriginals(response.data.results);
    });
  }, [props.endpoint]);

  // Reference to the currently playing YouTube player
  let player;

  return (
    <>
      <div className="movie-wrapper">
        <h2>{props.heading}</h2>
        <div className="movies">
          {originals.map((movie, index) => (
            <img
              onClick={() => props.onMovieClick(movie)} 
              key={index}
              src={img_baseURL + movie.poster_path}
              alt={movie.name}
            />
          ))}
        </div>
        {/* Remove YouTube component rendering */}
      </div>
    </>
  );
}

export default Row;
