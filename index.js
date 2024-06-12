import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/get-weather", async (req,res)=>{
    const city = req.body.cityName;
    let geoCodeResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`);
});

app.listen(port,()=>{
    console.log(`Server listening at port ${3000}`);
});