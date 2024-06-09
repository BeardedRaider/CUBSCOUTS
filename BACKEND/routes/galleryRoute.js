const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Gallery = require('../models/gallery'); // Adjust path as needed

// DELETE /api/gallery/:id
router.delete('/:id', async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);
        if (!image) {
            return res.status(404).send({ message: 'Image not found' });
        }

        // Delete the image file from local storage
        const filePath = path.join(__dirname, '..', image.image);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Failed to delete image file', err);
                return res.status(500).send({ message: 'Failed to delete image file' });
            }
        });

        // Delete the image record from the database
        await Gallery.findByIdAndDelete(req.params.id);

        res.send({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Failed to delete image', error);
        res.status(500).send({ message: 'Failed to delete image' });
    }
});

module.exports = router;