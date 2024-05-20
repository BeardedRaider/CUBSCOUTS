const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: String,
    location: String,
    img: String,
});

const Event = mongoose.model('events', eventSchema);

module.exports = Event;

