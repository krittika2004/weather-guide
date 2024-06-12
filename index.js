import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;

const APIKey1 = "a9756d311f499a7d1892ce927bb4fde8";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/get-weather", async (req,res)=>{
try{
    //getting city name from user
    const city = req.body.cityName;
    //getting latitude and longitude from city name using geo coder api 
    const geoCodeResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},IND&limit=1&appid=${APIKey1}`);
    const geoCodeResult = geoCodeResponse.data;
    console.log(geoCodeResult);
    const latitude = geoCodeResult[0].lat;
    const longitude = geoCodeResult[0].lon;
    console.log(latitude,longitude);
    //pass longitude and latitude to get weather details
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey1}`)
    const weatherResult = weatherResponse.data;
    console.log(weatherResult);
   
    res.render("result.ejs",{
        city : city,
        temperature : weatherResult.main.temp,
        maxTemperature: weatherResult.main.temp_max,
        minTemperature: weatherResult.main.temp_min,
        description: weatherResult. weather[0].description
    });
}
catch(error){
    res.render("result.ejs",{data: error.data});
    console.log(error.data);
}
});

app.listen(port,()=>{
    console.log(`Server listening at port ${3000}`);
});