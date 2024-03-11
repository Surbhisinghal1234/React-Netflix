import React, { useState, useEffect } from "react";
import axios from "axios";
import endpoints from "./endpoints";

function Banner() {
  const [scrollBot, setScrollBot] = useState(false);

  window.onscroll = () => {
    if (window.scrollY > 150) setScrollBot(true);
    else setScrollBot(false);
  };

  const [bannerImg, setBannerImg] = useState({});

  const img_baseURL = "https://image.tmdb.org/t/p/original/";
  const API_KEY = "59e27e00b6013f55ea24b194c30559bb";
  const baseURL = "https://api.themoviedb.org/3";

  useEffect(() => {
    axios
      .get(
        // `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`
        baseURL + endpoints.fetchNetflixOriginals
      )
      .then((response) => {
        console.log(response.data.results);
        setBannerImg(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length)
          ]
        );
      });
  }, []);

  return (
    <>
      <div
        className="ban"
        style={{
          backgroundImage: `url(${img_baseURL}${bannerImg.backdrop_path})`,
        }}
      >
        <nav className={scrollBot ? "colorChange" : ""}>
          <div className="left-logo">
            <img src="./netflix/left-img.png" alt="" />
          </div>
          <div className="right-logo">
            <img src="netflix/right-img.jpeg" alt="" />
          </div>
        </nav>
        <section id="text-head">
          <h1>{bannerImg.original_name}</h1>
          <div className="text">
            <a href="">Play</a>
            <a href="">My List</a>
            <p>{bannerImg.overview}</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Banner;
