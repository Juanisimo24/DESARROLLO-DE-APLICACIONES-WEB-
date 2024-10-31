const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Configurar EJS como motor de plantillas
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let names = [];
let tasks = [];

// Ruta principal - Muestra la página index.ejs
app.get('/', (req, res) => {
  res.render('index', { names, tasks, error: null });
});

// Ruta /greet - Recibe el nombre y lo agrega a la lista de nombres
app.get('/greet', (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    next(new Error('Name is required!'));
  } else {
    names.push(name);
    res.redirect('/');
  }
});

// Ruta /greet/:index - Muestra la página wazzup.ejs con el nombre
app.get('/greet/:index', (req, res, next) => {
  const index = parseInt(req.params.index, 10);
  if (isNaN(index) || index < 0 || index >= names.length) {
    next(new Error('Invalid name index!'));
  } else {
    res.render('wazzup', { name: names[index] });
  }
});

// Ruta /task - POST para agregar tareas
app.post('/task', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
  }
  res.redirect('/');
});

// Ruta /task - GET para devolver todas las tareas en formato JSON
app.get('/task', (req, res) => {
  res.json(tasks);
});

// Ruta /task/:index - DELETE para eliminar una tarea específica
app.post('/task/:index/delete', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (!isNaN(index) && index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
  res.redirect('/');
});

// Ruta /greet/:name - PUT para agregar un nombre (solo vía Postman)
app.put('/greet/:name', (req, res) => {
  const { name } = req.params;
  names.push(name);
  res.json(names);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  res.status(500).render('index', { names, tasks, error: err.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
