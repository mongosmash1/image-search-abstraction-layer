'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT;

const datastore = require('./datastore.js'); // mongodb datastore
const queries = require('./queries.js'); // queries to external APIs

app.use('/public', express.static(process.cwd() + '/public'));

// serves static file by default, containing instructions to use this microservice
app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// retrieve 10 most recent image searches
app.route('/api/latest/imagesearch/')
  .get(function(req, res) {
    let qty = 10;
    // fetches 10 most recent stored mongodb searches
    datastore.get(qty, function(err, data) {
      if (err) throw err;
      if (!data) {
        res.status(404);
        res.type('txt').send('Something went wrong');
      } else {
        // converts stored unix time to JSON time
        for (var i = 0; i < data.length; i++) {
          let unixTime = new Date(data[i].searchTime);
          data[i].searchTime = unixTime;
        }
        res.json(data); // responds with requested data in json format
      }
    });
  });


// retrieve data related to submitted search term
// store search in database
// need to account for offset parameter "?offset=x"
app.route('/api/imagesearch/*')
  .get(function(req, res) {
    let searchTerm = req.params[0];
    let offset = req.query.offset ? req.query.offset : 1; // offset equals page of search results to retrieve i.e. 2 = 2nd page of results, defaults to 1
    // fetches Google CSE API call with callback for async handling
    queries.get(searchTerm, offset, function(err, data) {
      if (err) throw err;
      if (!data) {
        res.status(404);
        res.type('txt').send('No results returned for ' + searchTerm);
      } else {
        var jsonData = JSON.parse(data); // parse data as JSON object
        let resultsArray = jsonData.items; // filters only the actual image result keys
        let results = [];
        for (var i = 0; i < resultsArray.length; i++) {
          // selects only the relevant image information
          results.push({
            imageUrl: resultsArray[i].link,
            altText: resultsArray[i].snippet,
            pageUrl: resultsArray[i].image.contextLink
          });
        }
        datastore.put(searchTerm); // stores search query in mongodb
        res.json(results); // responds with requested data in json format
      }
    });
});

// respond not found for all invalid routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
  });

// error handling for middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
  });

app.listen(port, function () {
  console.log('Node.js listening ...');
  });

