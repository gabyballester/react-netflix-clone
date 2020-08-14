import React, { useState, useEffect } from "react";
import axios from "./axios";
function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  /** Una vez se cargue con use effect (DidMount),
   * hará la llamada axios para traer los datos*/

  useEffect(() => {
    //Esto se ejecutará cada vez que el contenido de [] cambie
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log('consoleo results');
      console.log(request.data.results);
      setMovies(request.data.results)
      return request;
    }
    fetchData();
    //Aquí incluyo variables que provienen de fuera del componente
  }, [fetchUrl]);
  console.log('consoleo movies');
  console.log(movies);

  return (
    <div>
      <h2>{title}</h2>

      {/* container -> posters */}
    </div>
  );
}

export default Row;
