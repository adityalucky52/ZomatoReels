const mongoose = require('mongoose');

function connectDB() {
    const mongoUri = process.env.MONGODB_URI ;
    
    mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        ;
    });
}

module.exports = connectDB;