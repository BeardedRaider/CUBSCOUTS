const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Badge', badgeSchema);
