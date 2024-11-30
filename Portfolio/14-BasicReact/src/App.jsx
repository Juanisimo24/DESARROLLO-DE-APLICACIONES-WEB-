import React, { useState } from "react";
import TarjetaPelicula from "./TarjetaPelicula";
import DetallePelicula from "./DetallePelicula";
import peliculas from "./data/data";
import './detallepelicula.css';

function Aplicacion() {
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [comentarios, setComentarios] = useState({});

  const manejarSeleccionPelicula = (pelicula) => {
    setPeliculaSeleccionada(pelicula);
  };

  const manejarAgregarComentario = (nombrePelicula, comentario) => {
    setComentarios((anterior) => ({
      ...anterior,
      [nombrePelicula]: [...(anterior[nombrePelicula] || []), comentario],
    }));
  };

  return (
    <div className="app">
      <h1>Películas</h1>
      {peliculaSeleccionada && (
        <DetallePelicula
          pelicula={peliculaSeleccionada}
          alHacerClicAtras={() => { setPeliculaSeleccionada(null); }}
          comentarios={comentarios[peliculaSeleccionada.name] || []}
          alAgregarComentario={manejarAgregarComentario}
        />
      )}
      <div className="rejilla-peliculas">
        {peliculas.map((pelicula) => (
          <TarjetaPelicula
            pelicula={pelicula}
            alHacerClicEnMas={() => manejarSeleccionPelicula(pelicula)}
          />
        ))}
      </div>
      
    </div>
  );
}

export default Aplicacion;
