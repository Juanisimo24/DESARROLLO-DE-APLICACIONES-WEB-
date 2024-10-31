// Importar las dependencias necesarias
const express = require("express");
const mongoose = require("mongoose");
const csvParser = require("csv-parser");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

// Conexión a MongoDB
const mongoUrl = "mongodb://127.0.0.1:27017/f1"; // Asegúrate que MongoDB esté corriendo
mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

// Esquemas de Mongoose
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

// Lista de países para el formulario
const countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

// Middleware para cargar los datos desde el archivo CSV a la base de datos
const loadDataFromCSV = async (req, res, next) => {
  try {
    const drivers = [];
    fs.createReadStream("public/data/f1_2023.csv")
      .pipe(csvParser())
      .on("data", (data) => {
        drivers.push({
          num: data.number,
          code: data.code,
          forename: data.forename,
          surname: data.surname,
          dob: new Date(data.dob),
          nationality: data.nationality,
          url: data.url,
          team: { name: data.current_team },
        });
      })
      .on("end", async () => {
        await Driver.deleteMany({});
        await Driver.insertMany(drivers);
        console.log("Datos cargados desde el archivo CSV a la base de datos");
        next();
      });
  } catch (err) {
    console.error("Error al cargar datos desde el CSV:", err);
    res.status(500).send("Error al cargar datos");
  }
};

// Rutas
app.get("/", loadDataFromCSV, async (req, res) => {
  try {
    const drivers = await Driver.find();
    const teams = await Team.find();
    res.render("index", { drivers, teams, countries });
  } catch (err) {
    console.error("Error al recuperar datos:", err);
    res.status(500).send("Error al cargar la página");
  }
});

app.post("/driver", async (req, res) => {
  const { num, code, forename, surname, dob, nationality, url, team } = req.body;

  try {
    const newDriver = new Driver({ num, code, forename, surname, dob, nationality, url, team });
    await newDriver.save();
    res.redirect("/");
  } catch (err) {
    console.error("Error al guardar el conductor:", err);
    res.status(500).send("Error al guardar el conductor");
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.error("Error al iniciar el servidor:", err);
  } else {
    console.log("Listening on port 3000");
  }
});
