const mongoose = require('mongoose');

// Make sure the connection string is correct
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 })
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));
