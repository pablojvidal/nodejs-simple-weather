const { Router } = require("express");
const router = Router();
let request = require("request");

let apiKey = "b7ad0a2af85d321e39a73de43cf670ea";

//initial request
router.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

router.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No data, please enter the location.",
    });
  }
  let city = req.query.address;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      res.send({
        error: "No connection, please enter the location.",
      });
    } else {
      let weather = JSON.parse(body);
      //console.log(weather);
      if (weather.main == undefined) {
        res.send({
          error: "No address exists, please enter the location.",
        });
      } else {
        res.send({
          location: weather.name,
          temperature: weather.main.temp + " °C",
        });
        //let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        //res.send({ weather: weatherText, error: null });
      }
    }
  });
});

/*  #################################################################
  Response to weather request */

module.exports = router;
