/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";

function Row(props) {
  const [originals, setOriginals] = useState([]);
  const baseURL = "https://api.themoviedb.org/3";
  const img_baseURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    axios
      .get(`${baseURL}${props.endpoint}`)
      .then((response) => {
        setOriginals(response.data.results);
      });
  }, []);

  return (
    <>
      <div className="movie-wrapper">
        <h2>{props.heading}</h2>
        <div className="movies">
          {originals.map((movie, index) => {
            return <img key={index} src={img_baseURL + movie.poster_path} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Row;
