import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import './detallepelicula.css'; 

function TarjetaPelicula({ pelicula, alHacerClicEnMas }) {
  const [meGusta, setMeGusta] = useState(0);
  const [encima, setEncima] = useState(true);

  const manejarMeGusta = () => setMeGusta(meGusta + 1);
  const manejarNoMeGusta = () => setMeGusta(meGusta - 1);

  return (
    <Card
      className="tarjeta-pelicula shadow-lg m-3"
      style={{
        width: "18rem",
        border: encima
          ? "3px solid black"
          : `3px solid ${
              (pelicula.best_character.afilliation === "sith" || 
               pelicula.best_character.afilliation === "empire") 
              ? "red" 
              : "blue"
            }`,
        transition: "border-color 0.3s, transform 0.3s",
        transform: encima ? "scale(1)" : "scale(1.05)",
      }}
      onMouseEnter={() => setEncima(false)}
      onMouseLeave={() => setEncima(true)}
    >
      <Card.Img
        variant="top"
        src={
          encima 
            ? `/images/${pelicula.poster}` 
            : `/images/${pelicula.best_character.affiliation}.png`
        }
        className="imagen-pelicula"
      />
      <Card.Body className="text-center">
        <Card.Title>{pelicula.title}</Card.Title>
        <Card.Text className="descripcion-pelicula">
          { "Episodio: " + pelicula.episode }
        </Card.Text>
        <Card.Text className="descripcion-pelicula">
          { "año:"+pelicula.year }
        </Card.Text>
        <Button variant="primary" onClick={alHacerClicEnMas}>
          Más...
        </Button>
        <Row className="mt-3">
          <Col>
            <Button variant="success" size="sm" onClick={manejarMeGusta}>
              Me gusta
            </Button>
          </Col>
          <Col>
            <Button variant="danger" size="sm" onClick={manejarNoMeGusta}>
            No me gusta
            </Button>
          </Col>
          <Col className="text-muted">{meGusta}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TarjetaPelicula;
