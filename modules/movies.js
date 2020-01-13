'use strict';

const superagent = require('superagent');
module.exports = getMovie;

function getMovie(query) {
  // console.log('query movies:', query);
  let location = query.search_query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}`;
  // console.log('url', url);
  return superagent.get(url)
    .then(data => {
      // console.log('datamovies', data.body);
      return data.body.results.map(movie => {
        return new Movies(movie);
      })
    })
    .catch(error => {
      errorHandler(error, request, response);
    })

}
//
/////////////constractor function
function Movies(data) {
  this.title = data.title;
  this.overview = data.overview;
  this.average_votes = data.vote_average;
  this.popularity = data.popularity;
  this.released_date = data.release_date;
  this.image_url = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

}

// Server Error 
function errorHandler(error, request, response) {
  response.status(500).send(error);
}
