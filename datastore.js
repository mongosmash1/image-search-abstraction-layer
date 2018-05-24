"use strict";

const mongo = require('mongodb').MongoClient;
// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;

/*
collection = image-searches
schema = {
  searchTerm, (string)
  searchTime (javascript time format)
}
*/

// retrieve most recent 10 searches
exports.get = function (qty, callback) {
  mongo.connect(MONGODB_URI, function(err, client) {
    if (err) throw err;
    const db = client.db(process.env.DB);
    const images = db.collection(process.env.COLLECTION);
    images.find().project({ _id: 0, searchTerm: 1, searchTime: 1 }).sort({ searchTime: -1} ).limit(qty).toArray(function (err, docs){
      if (err) {
        client.close;
        callback(err);
      } else {
        callback(null, docs);
        client.close;
      }
    });
  });
}

// create new document with search term used and current date/time
exports.put = function (searchTerm) {
  mongo.connect(MONGODB_URI, function(err, client) {
    if (err) throw err;
    const db = client.db(process.env.DB);
    const images = db.collection(process.env.COLLECTION);
    // create document only
    var searchTime = Date.now()
    var doc = { searchTerm: searchTerm, searchTime: searchTime };
    images.insert(doc, function(err, doc) {
      if (err) throw err;
      client.close();
    });
  });
}