const mongoose = require('mongoose');// Import the mongoose library

const userSchema = new mongoose.Schema({// Create the user schema
    name: String,
    email: {type: String, required: true},
    password: String,
    dob: Date,
    address: String,
    role: String,
});

const User = mongoose.model('User', userSchema, 'users');// Create the User model

module.exports = User;// Export the User model