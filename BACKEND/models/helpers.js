const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    disclosureScotland: {
        type: Boolean,
        default: false
    },
    helperRegistered: {
        type: Boolean,
        default: false
    },
    helperTrained: {
        type: Boolean,
        default: false
    },
    availability: {
        monday: {
            type: Boolean,
            default: false
        },
        tuesday: {
            type: Boolean,
            default: false
        },
        wednesday: {
            type: Boolean,
            default: false
        },
        thursday: {
            type: Boolean,
            default: false
        },
        friday: {
            type: Boolean,
            default: false
        },
        saturday: {
            type: Boolean,
            default: false
        },
        sunday: {
            type: Boolean,
            default: false
        }
    }
});

// Define the model for helpers and specify the collection name as "users"
const User = mongoose.model('User', userSchema);

module.exports = User;