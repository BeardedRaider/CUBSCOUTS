const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET route to fetch helper users and their availability
router.get('/api/helpers', async (req, res) => {
    try {
        // Find all users where helperRegistered is true
        const helperUsers = await User.find({ helperRegistered: true });

        // Map the users data to include only the necessary fields for display
        const usersData = helperUsers.map(user => ({
            _id: user._id,// Add the user ID
            name: user.name,
            email: user.email,
            disclosureScotland: user.disclosureScotland,//  Add the Disclosure Scotland status
            helperRegistered: user.helperRegistered,
            helperTrained: user.helperTrained,// Add the helper training status
            availability: {
                monday: user.monday,
                tuesday: user.tuesday,// Add the availability status for each day
                wednesday: user.wednesday,
                thursday: user.thursday,
                friday: user.friday,
                saturday: user.saturday,
                sunday: user.sunday
            }
        }));

        res.json(usersData);
    } catch (error) {
        console.error('Error fetching helper users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
