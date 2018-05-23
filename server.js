'use strict';

const express = require('express');
const app = express();
const https = require('https');
const port = process.env.PORT;
const datastore = require('./datastore.js'); // mongodb datastore

var mongoResults = function(err, res) {
  console.log(res);
  let results = res;
  return results;
}

/* 
Google Image Search API
https://developers.google.com/custom-search/json-api/v1/reference/cse/list#parameters

https://www.googleapis.com/customsearch/v1?
q=lol%20cats
num=10
searchType=image
start=0
cx=011081963948109566827:-rx_xpboj3e
key=AIzaSyDW6bo_oMpW8ShElmRaBK4fNfYsSejXQhs

https://www.googleapis.com/customsearch/v1?q=lol%20cats&num=10&searchType=image&cx=011081963948109566827:-rx_xpboj3e&key=AIzaSyDW6bo_oMpW8ShElmRaBK4fNfYsSejXQh
*/

app.use('/public', express.static(process.cwd() + '/public'));

// serves static file by default containing instructions to use this microservice
app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// retrieve 10 most recent image searches
app.route('api/imagesearch/latest/')
  .get(function(req, res) {
    let qty = 10;
    // redirects to stored url if it exists
    datastore.get(qty, function(err, doc) {
      if (err) throw err;
      if (!doc) {
        res.status(404);
        res.type('txt').send('No record found for that shortened URL');
      } else {
      // let redirectToUrl = doc.urlTarget;
      // res.redirect(redirectToUrl);
        res.json();
      }
    });
  });


// retrieve data related to submitted search term
// store search in database
// need to account for offset parameter "?offset=x"
app.route('/api/imagesearch/*')
  .get(function(req, res) {
    let searchTerm = req.params[0].split('?offset=')[0];
    let page = req.params[0].split('?offset=')[1] ? req.params[0].split('?offset=')[1] : null;
    let imagesPerPage = 10;
    // let imageStart = (page * imagesPerPage) - 1;
    let imageStart = 1;
    console.log(req.params);  
    console.log(searchTerm);
    console.log(page);
    var pathOptions = {
      q: searchTerm,
      num: imagesPerPage,
      start: imageStart,
      cx: process.env.GOOGLE_CSE_ID,
      key: process.env.GOOGLE_API_KEY
    };
    var path = '/customsearch/v1?q=' + pathOptions.q + '&num=' + pathOptions.num + '&start=' + pathOptions.start + '&searchType=image&cx=' + pathOptions.cx + '&key=' + pathOptions.key;
    var options = {
      host: 'www.googleapis.com',
      method: 'GET',
      path: encodeURIComponent(path)
    };
    https.get(options, function(res){
      let rawData = '';
      res.on('data', function(chunk){
        rawData += chunk;
      });
      res.on('error', function(err){
        console.log("Got error: " + err.message);
      });
      res.on('end', () => {
        try {
          // const parsedData = JSON.parse(rawData);
          // console.log(parsedData);
          console.log(rawData);
        } catch (e) {
          console.error(e.message);
        }
      });
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

