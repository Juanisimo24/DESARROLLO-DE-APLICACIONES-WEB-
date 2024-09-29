//Esto es de la página de index.js
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs",require("ejs").renderFile);  //11.5k (gzipped : 4.4k)
app.set("view engine","ejs");

app.route('/')
.get((req, res) => {
  var name ="Jonny"
  res.render("home",{name});
  //res.sendFile(__dirname + "/public/html/index.html"); 
})
.post((req, res) => {
    var w = req.body.weight;
    var height  = req.body.height;
    res.send("Your  BMI is: " + (w/ (height * height))); 
  });
  
app.get('/about', (req, res) => {
  res.send('<h1> I am Jonny</h1>'); // Estilo
});

app.get('/more', (req, res) => {
  res.send('Aqui va un mensaje extremadamente secreto...'); 
});

app.listen(5000, () => {
    console.log("Listening on port 5000"); // Para saber que nuestro server no va a crashear.
});