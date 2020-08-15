import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  /** Una vez se cargue con use effect (DidMount),
   * hará la llamada axios para traer los datos*/

  useEffect(() => {
    //Esto se ejecutará cada vez que el contenido de [] cambie
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log("consoleo results");
      console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    //Aquí incluyo variables que provienen de fuera del componente
  }, [fetchUrl]);
  console.log("consoleo movies");
  console.table(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/* Recorro el array de varios row_poster */}
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
