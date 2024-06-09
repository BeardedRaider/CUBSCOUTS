// routes/galleryCount.js
const express = require('express');
const router = express.Router();
const Gallery = require('../models/gallery'); // Import the Gallery model

// Route to get the gallery image count
router.get('/count', async (req, res) => {
  try {
    const count = await Gallery.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;