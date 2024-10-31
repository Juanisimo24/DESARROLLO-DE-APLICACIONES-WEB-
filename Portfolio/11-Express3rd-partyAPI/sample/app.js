// app.js
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const apiKey = "38d98bdfeecff8a294c831d0fe1144c4";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../")));

// Ruta para el formulario HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Ruta para manejar la solicitud POST y consultar la API de OpenWeatherMap
app.post("/", (req, res) => {
  const cityName = encodeURIComponent(req.body.cityName); // Asegúrate de codificar el nombre de la ciudad
  const units = "metric"; // Para obtener la temperatura en °C
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp.toFixed(2); // Limitar a 2 decimales
        const weatherDescription = weatherData.weather[0].description;
        const weatherIcon = weatherData.weather[0].icon;

        res.write(`<h1>The temperature in ${cityName} is ${temperature}°C</h1>`);
        res.write(`<p>Weather description: ${weatherDescription}</p>`);
        res.write(`<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="Weather Icon">`);
        res.write('<a href="/">Back to Home</a>');
        res.send();
      });
    } else {
      res.send("<h1>Error: City not found</h1><a href='/'>Back to Home</a>");
    }
  }).on("error", (e) => {
    res.send(`<h1>Error: ${e.message}</h1><a href="/">Back to Home</a>`);
  });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
