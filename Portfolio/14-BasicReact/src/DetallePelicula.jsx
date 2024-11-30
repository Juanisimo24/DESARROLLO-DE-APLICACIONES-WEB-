import React, { useState } from "react";
import { Card, Form, Button, ListGroup } from "react-bootstrap";
import "./detallepelicula.css";

function DetallePelicula({ pelicula, alHacerClicAtras, comentarios, alAgregarComentario }) {
  const [listaComentarios, setListaComentarios] = useState(comentarios);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");

  const manejarAgregarComentario = (e) => {
    e.preventDefault();
    if (nombre.trim() && comentario.trim()) {
      setListaComentarios([...listaComentarios, { nombre, comentario }]);
      alAgregarComentario({ nombre, comentario });
      setNombre("");
      setComentario("");
    }
  };

  return (
    <Card className="m-3">
      <Card.Img variant="top" src={`/images/${pelicula.best_character.image}`} />
      <Card.Body>
        <Card.Title>{pelicula.best_character.nombre}</Card.Title>
        <Card.Text>{pelicula.best_character.bio}</Card.Text>

        <Button variant="secondary" onClick={alHacerClicAtras} className="mb-3">
          Atrás
        </Button>

        <h5>Comentarios</h5>
        <Form onSubmit={manejarAgregarComentario} className="mb-3">
          <Form.Group className="mb-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Tu comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Agregar Comentario
          </Button>
        </Form>

        {listaComentarios.length > 0 && (
          <ListGroup>
            {listaComentarios.map((c, index) => (
              <ListGroup.Item key={index}>
                <strong>{c.nombre}:</strong> {c.comentario}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

export default DetallePelicula;
