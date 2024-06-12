const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({// Creating gallery schema
    title: { 
        type: String, 
        required: true, 
    },
    image: { 
        type: String, 
        required: true, 
    },
    userUploaded: {
        type: String,
        required: true,
    }
}, { collection: 'gallery' });// Defining collection name if no collection name is defined, mongoose will create a collection with the plural of the model name

module.exports = mongoose.model('Gallery', gallerySchema);
