const mongoose = require('mongoose');

// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/steamTracker';

mongoose.connect(mongoURI)
  .then(() => {
      console.log('MongoDB connected...');
  })
  .catch((err) => {
      console.error('MongoDB connection error:', err);
  });

// Handle connection errors globally
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = { mongoose };
