import React, { useEffect, useState } from "react";
import axios from "axios";
import NewRow from "./NewRow";
import endpoints from "./endpoints";
import "./Netflix.css";
import Header from "./Header";
import Banner from "./Banner";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function NewMain() {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [opts, setOpts] = useState({
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  });

  const baseURL = "https://api.themoviedb.org/3";


  useEffect(() => {
    // Additional logic or useEffect for fetching initial data in NewMain if needed
  }, []);

  const url = "https://youtu.be/YsuFgqKl9Lo?feature=shared";

  // Handle movie click in NewMain component
  const handleMovieClick = async (movie) => {
    try {
      // Destroy the currently playing player
      if (player) {
        player.destroy();
      }

      const url = await new Promise((resolve, reject) => {
        movieTrailer(
          movie?.name || movie?.original_name || movie?.original_title,
          { apiKey: "59e27e00b6013f55ea24b194c30559bb" },
          (error, response) => {
            if (error) {
              console.error("Error fetching trailer:", error);
              reject(error);
            } else {
              console.log("Fetched URL:", response);
              resolve(response);
            }
          }
        );
      });

      if (!url) {
        console.error("Empty or undefined URL received from movieTrailer.");
        setTrailerUrl("6amIq_mP4xM"); // Play a default or random video
        return;
      }

      const videoId = new URL(url).searchParams.get("v");

      if (!videoId) {
        console.error("Invalid video ID extracted from the URL.");
        setTrailerUrl("6amIq_mP4xM"); // Play a default or random video
        return;
      }

      setTrailerUrl(videoId);
    } catch (error) {
      console.error("Error handling trailer:", error);
      // Handle errors (e.g., show a message to the user)
    }
  };

  let player;

  return (
    <>
      <section id="originals">
        <Header />
        <Banner />

        {/* Pass handleMovieClick as a prop to NewRow component */}
        <NewRow
          endpoint={endpoints.fetchNetflixOriginals}
          heading="Netflix Originals"
          onMovieClick={handleMovieClick}
        />
        <NewRow
          endpoint={endpoints.fetchTrending}
          heading="Trending Now"
          onMovieClick={handleMovieClick}
        />
        <NewRow
          endpoint={endpoints.fetchTopRated}
          heading="Top Rated"
          onMovieClick={handleMovieClick}
        />

        <NewRow
          endpoint={endpoints.fetchComedyMovies}
          heading="Comedy Movies"
          onMovieClick={handleMovieClick}
        />
        <NewRow
          endpoint={endpoints.fetchHorrorMovies}
          heading="Horror Movies"
          onMovieClick={handleMovieClick}
        />

        <NewRow
          endpoint={endpoints.fetchRomanceMovies}
          heading="Romance Movies"
          onMovieClick={handleMovieClick}
        />

        <NewRow
          endpoint={endpoints.fetchDocumentaries}
          heading="Documentaries"
          onMovieClick={handleMovieClick}
        />
      </section>
      {/* ... (other NewRow components with their respective endpoints and headings) */}

      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={opts}
          onReady={(event) => (player = event.target)}
        />
      )}
    </>
  );
}

export default NewMain;

//....................................................
