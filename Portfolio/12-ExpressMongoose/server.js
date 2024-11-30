// Importar módulos y configurar Express
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("fast-csv");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Configuración de MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/f1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir esquemas
const Schema = mongoose.Schema;
const teamSchema = new Schema(
  {
    id: Number,
    name: String,
    nationality: String,
    url: String,
  },
  { strictQuery: true }
);
const driverSchema = new Schema(
  {
    num: Number,
    code: String,
    forename: String,
    surname: String,
    dob: Date,
    nationality: String,
    url: String,
    team: teamSchema,
  },
  { strictQuery: true }
);

// Modelos de Mongoose
const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

// Datos iniciales
const countries = [
  { code: "ENG", label: "British" },
  { code: "SPA", label: "Spanish" },
  { code: "GER", label: "German" },
  { code: "MEX", label: "Mexican" },
  { code: "ITA", label: "Italian" },
  { code: "USA", label: "American" },
  // Otros países...
];

// Funciones auxiliares
const loadCSVData = async (filePath, schemaModel, processRow) => {
  const rows = [];
  await schemaModel.deleteMany({});
  const readable = fs
    .createReadStream(filePath)
    .pipe(csv.parse({ skipRows: 1 }));

  readable.on("data", (row) => rows.push(processRow(row)));
  return new Promise((resolve) => {
    readable.on("end", async () => {
      await schemaModel.insertMany(rows);
      resolve();
    });
  });
};

const saveTeams = () =>
  loadCSVData(
    `${__dirname}/public/data/f1_2023.csv`,
    Team,
    (row) => ({
      id: Number(row[0]),
      name: row[1],
      nationality: row[2],
      url: row[3],
    })
  );

const saveDrivers = async () => {
  const rows = [];
  await Driver.deleteMany({});
  const readable = fs
    .createReadStream(`${__dirname}/public/data/f1_2023.csv`)
    .pipe(csv.parse({ skipRows: 1 }));

  for await (const row of readable) {
    const team = await Team.findOne({ name: row[row.length - 1] });
    rows.push({
      num: Number(row[0]),
      code: row[1],
      forename: row[2],
      surname: row[3],
      dob: new Date(row[4]),
      nationality: row[5],
      url: row[6],
      team,
    });
  }
  await Driver.insertMany(rows);
};

// Middleware de inicialización
let entriesInitialized = false;

const initializeEntries = async (req, res, next) => {
  if (!entriesInitialized) {
    try {
      await saveTeams();
      await saveDrivers();
      entriesInitialized = true;
    } catch (error) {
      console.error("Error al inicializar datos:", error);
    }
  }
  next();
};

app.use(initializeEntries);

// Rutas
app.get("/", async (req, res) => {
  const drivers = await Driver.find({});
  const teams = await Team.find({});
  res.render("index", { drivers, countries, teams });
});

app.get("/edit/:code", (req, res) => {
  const { code } = req.params;
  res.render("edit", { code });
});

app.post("/updateDriver/:id", async (req, res) => {
  const { id } = req.params;
  const { code, forename, surname, dob, nationality, url, teamId } = req.body;
  const team = await Team.findOne({ id: teamId });

  await Driver.findOneAndUpdate(
    { num: id },
    { code, forename, surname, dob: new Date(dob), nationality, url, team }
  );
  res.redirect("/");
});

app.post("/updateTeam/:id", async (req, res) => {
  const { id } = req.params;
  const { name, nationality, url } = req.body;

  await Team.findOneAndUpdate({ id }, { name, nationality, url });
  res.redirect("/");
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));