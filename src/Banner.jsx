import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";

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
    <header>
      {" "}
      {/* imagen de fondo para header */}
      {/* title */}
      {/* Div con 2 botones */}
      {/* Descripción */}
    </header>
  );
}

export default Banner;
