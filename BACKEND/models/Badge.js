const mongoose = require('mongoose');// Importing mongoose

const badgeSchema = new mongoose.Schema({// Creating badge schema
    userId: { // User ID of the user who earned the badge
        type: mongoose.Schema.Types.ObjectId, // Data type of user ID
        ref: 'User', // Reference to User model
        required: true // Required field
    },// User ID of the user who earned the badge
    title: {// Title of the badge
        type: String,// Data type of title
        required: true,// Required field
    },
    completed: {// Completion status of the badge
        type: Boolean,// Data type of completion status
        default: false,// Default value of completion status
    },
});

module.exports = mongoose.model('Badge', badgeSchema);// Export Badge model
