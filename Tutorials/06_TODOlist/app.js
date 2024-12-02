const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require('./date');

const app = express();


// Configuración de EJS
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Esquema y modelo para tareas
const itemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemSchema);

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const List = mongoose.model('List', listSchema);

// Rutas principales
app.get('/', async (req, res) => {
    const day = date.getDate();

    // Obtener las tareas de la lista "Today"
    const todayTasks = await Item.find({});

    // Obtener todas las listas disponibles
    const allLists = await List.find({}).select('name -_id');
 
    res.render('list', { 
        listTitle: day, 
        tasks: todayTasks, 
        otherLists: allLists.map(list => list.name) 
    });
});

// POST para añadir una tarea
app.post('/', async (req, res) => {
    const taskName = req.body.task;
    const listName = req.body.list; // Nombre de la lista actual

    const newTask = new Item({ name: taskName });

    if (listName === date.getDate()) {
        // Añadir la tarea a la lista "Today"
        await newTask.save();
        res.redirect('/');
    } else {
        // Añadir la tarea a una lista personalizada
        const list = await List.findOne({ name: listName });
        list.items.push(newTask);
        await list.save();
        res.redirect('/' + listName);
    }
});

// POST para eliminar una tarea
app.post('/delete', async (req, res) => {
    const taskId = req.body.taskId;// ID único de la tarea
    const listName = req.body.listName; // Nombre de la lista a la que pertenece la tarea

    if (listName === date.getDate()) {
      // Eliminar la tarea de la lista "Today"
      await await Item.findByIdAndDelete(taskId);      ;
      res.redirect('/');
  } else {
      // Eliminar la tarea de una lista personalizada
      const list = await List.findOne({ name: listName });
      list.items = list.items.filter(item => item._id.toString() !== taskId);
      await list.save();
      res.redirect('/' + listName);
  }
});

app.get('/:listName', async (req, res) => {
    const listName = req.params.listName;
    const list = await List.findOne({ name: listName });

    if (!list) {
        const newList = new List({
            name: listName,
            items: []
        });
        await newList.save();
        res.redirect('/' + listName);
    } else {
        res.render('list', { listTitle: list.name, tasks: list.items,otherLists: await List.find({}).select('name -_id')});
    }
});

app.post('/:listName', async (req, res) => {
    const taskName = req.body.task;
    const listName = req.params.listName;
    const list = await List.findOne({ name: listName });

    const newTask = new Item({ name: taskName });
    list.items.push(newTask);
    await list.save();
    res.redirect('/' + listName);
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
