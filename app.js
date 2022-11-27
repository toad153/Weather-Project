const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "b3b36ef17e5685f7800cb08d6722c011";
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desp = weatherData.weather[0].main
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            // console.log(temp);
            // console.log(desp);

            res.write("<h1>The Temperature in " + query + " is " + temp + " Degree Celcius</h1>");
            res.write("<p>The weather is currently " + desp + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send()
        })

    })



})






app.listen(3000, function () {
    console.log("Server is running on port 3000.")
})