// import React, { useState } from "react";
// import YouTube from "react-youtube";

// const Trailer = () => {
//   //   const [videoId, setVideoId] = useState("");

//   const opts = {
//     height: "600",
//     width: "1000",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   const newVideoId = "https://youtu.be/_J8tYxYB_YU?si=h7cxpYOpH9o1OZml";

//   //   const newVideoId = "https://youtu.be/6amIq_mP4xM?si=eyDDbdK78VO4223v";

//   //   const extractedVideoId = newVideoId.split("/").pop().split("?")[0];

//   //   const newVideoId = "https://youtu.be/6amIq_mP4xM?si=eyDDbdK78VO4223v";

//   const extractedVideoId = new URL(newVideoId).pathname.slice(1);
//   console.log(extractedVideoId)

//   return (
//     <>
//       <div className="trailer">
//         <YouTube videoId={extractedVideoId} opts={opts} />
//       </div>
//     </>
//   );
// };

// export default Trailer;

// function handleClick (movie){
//     movieTrailer(
//         movie?.name || movie?.original_name || movie?.original_title,
//         { apiKey: "8125db8f67d23", id:true},
//         (error, response)=>{
//             console.log(response)
//         }
//     )
// }

//.........................


