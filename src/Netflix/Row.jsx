// /* eslint-disable react/prop-types */
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer";

// function Row(props) {
//   const [originals, setOriginals] = useState([]);
//   const baseURL = "https://api.themoviedb.org/3";
//   const img_baseURL = "https://image.tmdb.org/t/p/original";

//   const [trailerUrl, setTrailerUrl] = useState("");

//   useEffect(() => {
//     axios.get(`${baseURL}${props.endpoint}`).then((response) => {
//       setOriginals(response.data.results);
//     });
//   }, []);

//   function handleClick(movie){
//     const opts = {
//       height: "390",
//       width: "640",
//       playerVars: {
//         autoplay:1
//       },
//     };
//     movieTrailer(
//       movie?.name || movie?.original_name || movie?.original_title,
//       {apiKey: "59e27e00b6013f55ea24b194c30559bb", id:true

//       },
//       (error, response)=>{
//         console.log(response);
//         return(
//           <YouTube videoId="2g811Eo7KBU" opts={opts} onReady={this._onReady} />
//         );
//       }

//     )
//   }

//   return (
//     <>
//       <div className="movie-wrapper">
//         <h2>{props.heading}</h2>
//         <div className="movies">
//           {originals.map((movie, index) => {
//             return (
//               <img
//                 onClick={() => handleClick(movie)}
//                 key={index}
//                 src={img_baseURL + movie.poster_path}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Row;

/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer";

// function Row(props) {
//   const [originals, setOriginals] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState("");
//   const [opts, setOpts] = useState({
//     height: "390",
//     width: "640",
//     playerVars: {
//       autoplay: 1,
//     },
//   });
//   const baseURL = "https://api.themoviedb.org/3";
//   const img_baseURL = "https://image.tmdb.org/t/p/original";

//   useEffect(() => {
//     axios.get(`${baseURL}${props.endpoint}`).then((response) => {
//       setOriginals(response.data.results);
//     });
//   }, [props.endpoint]);

//   async function handleClick(movie) {
//     // Using try-catch to handle errors
//     try {
//       // Using async/await to handle asynchronous movieTrailer function
//       const url = await new Promise((resolve, reject) => {
//         movieTrailer(
//           movie?.name || movie?.original_name || movie?.original_title,
//           { apiKey: "59e27e00b6013f55ea24b194c30559bb" },
//           (error, response) => {
//             if (error) {
//               console.error("Error fetching trailer:", error);
//               reject(error);
//             } else {
//               // Log the fetched URL
//               console.log("Fetched URL:", response);
//               resolve(response);
//             }
//           }
//         );
//       });

//       // Check if the URL is not empty or undefined
//       if (!url) {
//         console.error("Empty or undefined URL received from movieTrailer.");
//         return;
//       }

//       // Extracting video ID from the URL
//       const videoId = new URL(url).searchParams.get("v");

//       // Check if the extracted videoId is not empty
//       if (!videoId) {
//         console.error("Invalid video ID extracted from the URL.");
//         return;
//       }

//       // Set the trailerUrl state with the extracted video ID
//       setTrailerUrl(videoId);
//     } catch (error) {
//       console.error("Error handling trailer:", error);
//       // Handle errors (e.g., show a message to the user)
//     }
//   }

//   return (
//     <>
//       <div className="movie-wrapper">
//         <h2>{props.heading}</h2>
//         <div className="movies">
//           {originals.map((movie, index) => (
//             <img
//               onClick={() => handleClick(movie)}
//               key={index}
//               src={img_baseURL + movie.poster_path}
//               alt={movie.name}
//             />
//           ))}
//         </div>
//         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//       </div>
//     </>
//   );
// }

// export default Row;

//......................................................
import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row(props) {
  const [originals, setOriginals] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [opts, setOpts] = useState({
    height: "390",
    width: "640",
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

  // Reference to the currently playing YouTube player
  let player;

  const handleClick = async (movie) => {
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
              // Log the fetched URL
              console.log("Fetched URL:", response);
              resolve(response);
            }
          }
        );
      });

      // Check if the URL is not empty or undefined
      if (!url) {
        console.error("Empty or undefined URL received from movieTrailer.");

        // Play a default or random video
        setTrailerUrl("6amIq_mP4xM");
        return;
      }

      // Extracting video ID from the URL
      const videoId = new URL(url).searchParams.get("v");

      // Check if the extracted videoId is not empty
      if (!videoId) {
        console.error("Invalid video ID extracted from the URL.");

        // Play a default or random video
        setTrailerUrl("6amIq_mP4xM");
        return;
      }

      // Set the trailerUrl state with the extracted video ID
      setTrailerUrl(videoId);
    } catch (error) {
      console.error("Error handling trailer:", error);
      // Handle errors (e.g., show a message to the user)
    }
  };

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
        {trailerUrl && (
          <YouTube
            videoId={trailerUrl}
            opts={opts}
            onReady={(event) => (player = event.target)}
          />
        )}
      </div>
    </>
  );
}

export default Row;
