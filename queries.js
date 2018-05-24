"use strict";

const https = require('https');
const url = require('url');

/* 

*** Google Image Search API Documentation ***
https://developers.google.com/custom-search/json-api/v1/reference/cse/list#parameters

*** API URL, path, and options ***
https://www.googleapis.com/customsearch/v1
q = string to search on
num = number of items to return
searchType = image
start = number in list of 1st item to return
cx = stored in environment config
key = stored in environment config

*** Example API call ***
https://www.googleapis.com/customsearch/v1?q=lolcats%20funny&num=10&start=11&searchType=image&cx=xxxx&key=xxxx

*/

// GET request to Google CSE image search
exports.get = function(searchTerm, offset, callback) {
  let limit = 10; // items to return per page
  let imageStart = (limit * (offset - 1)) + 1; // i.e 10 items per page and offset of 2 starts at item 11 (page 2)
  // options for request URL
  let options = url.format({
    protocol: 'https',
    hostname: 'www.googleapis.com',
    pathname: '/customsearch/v1',
    query: {
      q: searchTerm,
      num: limit,
      start: imageStart,
      searchType: 'image',
      cx: process.env.GOOGLE_CSE_ID,
      key: process.env.GOOGLE_API_KEY
    }
  });
  let apiUrl = url.parse(options).href; // returns URL for GET request only
  console.log(apiUrl);
  https.get(apiUrl, function(res){
    let rawData = '';
    res.on('data', function(chunk){
      rawData += chunk;
    });
    res.on('end', () => {
      callback(null, rawData);
    });
    res.on('error', function(err){
      console.log("Got error: " + err.message);
      callback(err, null);
    });
  });
};