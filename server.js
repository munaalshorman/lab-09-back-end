'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const superagent = require('superagent')

const PORT = process.env.PORT || 3000;
const server = express();
server.use(cors());


// link with other  js page //

const location = require('./modules/location.js');
const weather = require('./modules/weather.js');
const events = require('./modules/events.js');
// const yelp = require('./modules/yelp.js');
const movies = require('./modules/movies.js');


//////  handler function 

server.get('/location', locationHandler);
server.get('/weather', weatherHandler);
server.get('/events', eventHandler);
// server.get('/yelp', yelpHandler);
server.get('/movies', moviesHandler);


// server is working
server.get('/', (request, response) => {
  response.status(200).send('Well done ');
});



/////// location handler
function locationHandler(request, response) {
  console.log('locationlocation locationlocationlocation: ', request.query.city);

  location(request.query.city)
    .then(locationData => response.status(200).json(locationData))
    // .catch((error) => errorHandler(error, request, response));

};


///// weather handler 
function weatherHandler(request, response) {
  weather(request.query)
    .then(weatherData => response.status(200).json(weatherData))
    // .catch((error) => errorHandler(error, request, response));

};


/////// event handler  
function eventHandler(request, response) {
  events(request.query)
    .then(eventData => response.status(200).json(eventData))
    .catch((error) => errorHandler(error, request, response));

};





/////// movies handler 
function moviesHandler(request, response) {
  const location = request.query;

  movies(location)
    .then(movieData => response.status(200).send(movieData))
    // .catch((error) => errorHandler(error, request, response));
};



/////// yelp handler 
// function yelpHandler(request, response) {
//   const location = request.query;
//   yelp(location)
//   .then(yelpData => response.status(200).send(yelpData))
// .catch((error) => errorHandler(error, request, response));


// }



// User Error 
server.use('*', (request, response) => {
  response.status(404).send('not found');
});


// function errorHandler(error, request, response) {
//   response.status(500).send('Error');
// };


server.listen(PORT, () => console.log(`App listening on ${PORT}`))





