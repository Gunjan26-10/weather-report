const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req, res){

  res.sendFile(__dirname + "/indeex.html");

});

app.post("/", function(req , res){

      const query = req.body.cityName;
      const apiKey = "2b3e6e406021851fd2d9ae40e4e6b50e";
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;
      https.get(url, function(response){

          response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<h1>The temperature in " + query +" is " +temp+ "kelvin</h1>");
            res.write("<p> The weather is currently " + weatherDes + " <p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
          });
      });

    });
    app.listen(3000,function(){
      console.log("Running on port 3000");
    })
