const mongoose = require('mongoose');

// Define the Events schema and model
const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: String,
    location: String,
    image: String
});

const Events = mongoose.model('Events', eventSchema);// Create a model called 'Events' from the eventSchema

module.exports = Events;// Export the Events model

