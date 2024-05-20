const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
        description: {
        type: String,
        required: true,
    },
        date: {
        type: Date,
        required: true,
    },
        time: {
        type: String,
        required: true,
    },
        location: {
        type: String,
        required: true,
    },
        image: {
        type: String,
        required: false, // Set required to false initially
    },
});

const Events = mongoose.model('Events', eventSchema);// Create a model called 'Events' from the eventSchema

module.exports = Events;// Export the Events model

