const { response } = require('express');
const path = require('path');

const express=require('express');
const app=express();
const https=require('https');
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index',{weatherData: null, error: null});
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/API/views/index.ejs');
})

app.post('/',(req,res)=>{
    const query=req.body.city
    const apiKey="ba26fbf691f710242bad21c384f79555"
    const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units=mertic';
    https.get(url,(response)=>{
        response.on('data',(data)=>{
        const weatherData = JSON.parse(data);
        const temp=weatherData.main.temp;
        // res.send("<h1>The temperature in  " + query + "is"+ temp +"celsius</h1>")
        let weatherText = `It's ${temp} degrees in ${weatherData.name}!`;

        res.render('index', {weatherData: weatherText, error: null});

        })
    })
})

    















// app.get('/',(req,res)=>{
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=Khurai&appid=ba26fbf691f710242bad21c384f79555&units=metric`;
//     https.get(url,(response)=>{
//         response.on('data',(data)=>{
//             const weatherData=JSON.parse(data);
//         const temp=weatherData.main.temp;
//         res.send("the temperature in khurai is "+temp+'degree celsius')
//         })
//     })
// })
app.listen(3000,()=> console.log("the server is running at port 3000"))