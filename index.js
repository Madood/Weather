const express = require('express');
const functions = require('firebase-functions');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// static file
app.use(express.static(__dirname + '/Public'));
app.use('*/css', express.static('/Public/css'));
app.use('*/js', express.static('/Public/JS'));
app.use('*/Image', express.static('/Public/Image'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/Public/index.html'));
});

app.post("/", function (req, res) {
	const query = req.body.Cityname;
	const apiKey = 'b07b53609e5df5ceb5d7a934bc26e1d3'; // Replace with your own OpenWeatherMap API key
	const units = 'metric';
	const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + units;
	https.get(url, function (response) {
		console.log(response.statusCode);


		if (response.statusCode !== 200) {
			res.send('Error: Failed to retrieve weather data. Please try again later.');
			return;
		}

		response.on('data', function (data) {
			const weatherData = JSON.parse(data);
			const city = weatherData.name;
			const temp = weatherData.main.temp;
			const feels = weatherData.main.feels_like;
			const humidity = weatherData.main.humidity;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const URL = 'http://openweathermap.org/img/w/' + icon + '.png';

			res.write('<br><img src=' + URL + '>');
			res.write('<h1>The temperature in ' + city + ' is ' + temp + ' ° ' + ' Degree Celcius</h1>');
			res.write('There will be ' + description);

			res.send();
		});
	});
});

// const server = "3001"; // Note: Ensure this is a valid port number
// app.listen(server, function () {
// 	console.log('Server is running on port ' + server);
// });

exports.app = functions.https.onRequest(app);