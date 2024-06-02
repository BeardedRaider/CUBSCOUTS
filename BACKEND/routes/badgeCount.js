const express = require('express');
const router = express.Router(); // Define the router variable
const Badge = require('../models/Badge');
const auth = require('../middleware/authMiddleware');

// Route to get the count of completed badges for the current user
router.get('/badges/count', auth, async (req, res) => {
    try {
        const count = await Badge.countDocuments({ userId: req.user.userId, completed: true });
        res.json({ count });
    } catch (error) {
        console.error('Error fetching badge count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router
module.exports = router;