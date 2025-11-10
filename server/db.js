const mongoose = require('mongoose');
const mongoURI =  "mongodb://root:yBP6y4ehkWlciNRksTNRo7UO@172.21.103.221:27017";

const connectToMongo = () => {
    console.log("✅ MongoDB disabled for production demo — using in-memory data.");
  };
  
  module.exports = connectToMongo;
  

module.exports = connectToMongo;