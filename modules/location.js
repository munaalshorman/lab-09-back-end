'use strict';

const superagent = require('superagent');
module.exports = getLocation;


function getLocation(city) {
  // console.log('city',city)
  const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json&limit=1`;
  console.log('urlloction location',url)
  return superagent.get(url)
    .then(data => {
      // console.log(' data : ', data);
      // console.log('data.body : ', data.body[0]);
      return new Location(city, data.body[0]);
    })
    .catch(error => {
      errorHandler(error, request, response);
    })

}

// Location Constructor Function 
function Location(city, data) {
  this.search_query = city;
  this.formatted_query = data.display_name;
  this.latitude = data.lat;
  this.longitude = data.lon;
}

// Server Error 
function errorHandler(error, request, response) {
  response.status(500).send(error);
}

