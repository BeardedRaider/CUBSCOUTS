const mongoose = require('mongoose');

// Schema for the events
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },// Title of the event
    description: { type: String, required: true },// Description of the event
    date: { type: Date, required: true },// Date of the event
    time: { type: String, required: true },// Time of the event
    location: { type: String, required: true },// Location of the event
    image: { type: String },// Image of the event
    moreInfo: { type: String }// More information about the event    
});

module.exports = mongoose.model('Event', eventSchema);// Export Event model