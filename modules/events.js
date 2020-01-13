// 'use strict';

// const superagent = require('superagent');
// module.exports = getEvent;

// function getEvent(query) {
//   // console.log('query : ', query);
//   const url = `http://api.eventful.com/json/events/search?app_key=${process.env.EVENTFUL_API_KEY}&location=${query.formatted_query}`
//   // console.log('url event', url );
//   // console.log('superagent url' ,superagent.get(url));
//   return superagent.get(url)
//     .then(data => {
//       // console.log('dataevent: ', data );   
//       const eventful = JSON.parse(data.text);
//       // console.log('eventful ', eventful);
//       return eventful.events.event.map((eventday) => {
//         // console.log('eventday : ', eventday);
//         return new Eventful(eventday);
//       })
//     })
//     .catch(error => {
//       errorHandler(error, req, res);
//     })
// }

// function Eventful(day) {
//   this.link = day.url;
//   this.name = day.title;
//   this.event_date = day.start_time;
//   this.summary = day.description;

// }

// // Server Error
// function errorHandler(error, request, response) {
//   response.status(500).send(error);
// }


'use strict';

const superagent = require('superagent');

module.exports = getEvent;

function getEvent(query) {
      // console.log('query', query);

    const url = `http://api.eventful.com/json/events/search?app_key=${process.env.EVENTFUL_API_KEY}&location=${query.search_query}`
    // console.log('urlevent', url );
    // console.log('supeagent eventurl' ,superagent.get(url));
    return superagent.get(url)
      .then(data => {
        // console.log('data 2 : ', data );   
        const eventful = JSON.parse(data.text);
        // console.log('eventful ', eventful);
        return eventful.events.event.map((eventday) => {
          // console.log('eventday : ', eventday);
          return new Eventful(eventday);
        })
      })
      .catch(error => {
        errorHandler(error,request,response);
      })
  }
  
  function Eventful(day) {
    this.link = day.url;
    this.name = day.title;
    this.event_date = day.start_time;
    this.summary = day.description;
  
  } 

// Server Error 
function errorHandler(error,request,response) {
  response.status(500).send(error);
}

