import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  /** Una vez se cargue con use effect (DidMount),
   * hará la llamada axios para traer los datos*/

  useEffect(() => {
    //Esto se ejecutará cada vez que el contenido de [] cambie
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    //Aquí incluyo variables que provienen de fuera del componente
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    // console.log('Consoleo movie');
    // console.log(movie);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.name || "")
        .then((url) => {
          // console.log('Consoleo url');
          // console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          // console.log('Consoleo urlParams');
          // console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
          // console.log('Consoleo trilerUrl');
          // console.log(trailerUrl);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/* Recorro el array de varios row_poster */}
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* Si existe url muestro el vídeo */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
