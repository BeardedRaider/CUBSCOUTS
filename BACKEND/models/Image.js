const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to the User model
        required: true,
    }
}, { collection: 'gallery' }); // This is the name of the collection in the database if there is not one, it will set one up.


const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
