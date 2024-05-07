const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    location: String,
    img_one: String,
});

const Event = mongoose.model('events', eventSchema);

module.exports = Event;

