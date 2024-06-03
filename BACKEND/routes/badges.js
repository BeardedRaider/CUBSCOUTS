
const express = require('express');
const router = express.Router();
const Badge = require('../models/Badge'); // Adjust the path as necessary

router.post('/', async (req, res) => {
    try {
        const { userId, title, completed } = req.body;

        if (!userId || !title) {
            return res.status(400).json({ message: 'User ID and Badge Title are required.' });
        }

        let badge = await Badge.findOne({ userId, title });
        if (badge) {
            badge.completed = completed;
        } else {
            badge = new Badge({ userId, title, completed });
        }

        await badge.save();
        res.status(200).json(badge);
    } catch (error) {
        console.error('Error in /badges:', error.message);
        res.status(500).json({ message: 'Internal server error.', error });
    }
});

// Fetch user badges
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        // Find all badges for the user
        const badges = await Badge.find({ userId });

        res.json(badges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
