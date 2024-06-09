const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
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
}, { collection: 'gallery' });

module.exports = mongoose.model('Gallery', gallerySchema);
