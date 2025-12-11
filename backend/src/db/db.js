const mongoose = require('mongoose');

function connectDB(uri) {
    mongoose.connect("mongodb://localhost:27017/mydatabase")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = connectDB;