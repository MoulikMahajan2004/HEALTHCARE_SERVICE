const mongoose = require('mongoose');

const dbURI = "mongodb://test:test@ac-r0v95v9-shard-00-00.egzgrv8.mongodb.net:27017,ac-r0v95v9-shard-00-01.egzgrv8.mongodb.net:27017,ac-r0v95v9-shard-00-02.egzgrv8.mongodb.net:27017/?replicaSet=atlas-okz7cu-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
