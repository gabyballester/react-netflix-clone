import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import './Banner';

function Banner() {
  // array vacío por ahora
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        // Seteo película de forma aleatoria
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);

  return (
    <header
      className="banner"
      style={{
        // backgroundSize: "cover",
        backgroundImage: `url(
        "http://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        // backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1>
          {/* Muestra el título disponible en este orden de prioridad */}
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Reproducir</button>
          <button className="banner__button">Mi Lista</button>
        </div>

        <div className="banner__description">{movie?.overview}</div>
      </div>
    </header>
  );
}

export default Banner;
