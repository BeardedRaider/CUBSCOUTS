const mongoose = require('mongoose');

// Schema for the events
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String },
    moreInfo: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);