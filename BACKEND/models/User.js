const mongoose = require('mongoose');// Import the mongoose library
const Schema = mongoose.Schema;// Create a schema object

const BadgeSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true },
    badges: [BadgeSchema] // Add badges as an array
});

const User = mongoose.model('User', UserSchema, 'users');// Create the User model

module.exports = User;// Export the User model