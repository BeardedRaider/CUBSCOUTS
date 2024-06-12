const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({// Creating user schema
    name: {// Name of the user
        type: String,
        required: true
    },
    email: {// Email of the user
        type: String,
        required: true
    },
    disclosureScotland: {// Disclosure Scotland status of the user
        type: Boolean,
        default: false
    },
    helperRegistered: {// Helper registration status of the user
        type: Boolean,// Data type of helper registration status
        default: false// Default value of helper registration status
    },
    helperTrained: {// Helper training status of the user
        type: Boolean,
        default: false
    },
    availability: {// Availability of the user
        monday: {
            type: Boolean,
            default: false
        },
        tuesday: {// Availability of the user
            type: Boolean,
            default: false
        },
        wednesday: {// Availability of the user
            type: Boolean,
            default: false
        },
        thursday: {// Availability of the user
            type: Boolean,
            default: false
        },
        friday: {// Availability of the user
            type: Boolean,
            default: false
        },
        saturday: {// Availability of the user
            type: Boolean,
            default: false
        },
        sunday: {// Availability of the user
            type: Boolean,
            default: false
        }
    }
});

// Define the model for helpers and specify the collection name as "users"
const User = mongoose.model('User', userSchema);

module.exports = User;