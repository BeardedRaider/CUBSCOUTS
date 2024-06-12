const express = require('express');
const router = express.Router();
const Badge = require('../models/Badge'); // Adjust the path as necessary

// Add or update badges

router.post('/', async (req, res) => {// Route to add or update badges
    try {// Try to add or update badges
        const { userId, title, completed } = req.body;// Extract user ID, badge title, and completion status from request body

        if (!userId || !title) {//  If user ID or badge title is not provided
            return res.status(400).json({ message: 'User ID and Badge Title are required.' });
        }

        let badge = await Badge.findOne({ userId, title });//   Find badge by user ID and title
        if (badge) {// If badge exists
            badge.completed = completed;// Update completion status
        } else {// If badge does not exist
            badge = new Badge({ userId, title, completed });
        }// Create a new badge

        await badge.save();// Save the badge
        res.status(200).json(badge);// Return the badge
    } catch (error) {// If there is an error
        console.error('Error in /api/badges:', error.message);// Log the error message
        res.status(500).json({ message: 'Internal server error.', error });// Return an error message
    }
});

// Fetch user badges
router.get('/:userId', async (req, res) => {
    try {
        const badges = await Badge.find({ userId: req.params.userId });
        if (!badges) {
            return res.status(404).json({ message: 'No badges found for this user' });
        }
        res.json(badges);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;