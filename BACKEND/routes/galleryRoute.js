const express = require('express');
const router = express.Router();
const Gallery = require('../models/gallery');
const fs = require('fs');
const path = require('path');

// PUT /api/gallery/:id for updating gallery
router.put('/gallery/:id', async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);
        if (!gallery) {
            return res.status(404).send({ message: 'Gallery not found' });
        }

        gallery.title = req.body.title || gallery.title;
        
        await gallery.save();
        res.send(gallery);
    } catch (error) {
        console.error('Error updating gallery:', error);
        res.status(500).send({ message: 'Error updating gallery' });
    }
});

// DELETE /api/gallery/:id for deleting gallery
router.delete('/gallery/:id', async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);
        if (!gallery) {
            return res.status(404).send({ message: 'Gallery not found' });
        }

        // Define the correct path to the image in the BACKEND/gallery directory
        const imagePath = path.join(__dirname, '..', 'gallery', path.basename(gallery.image));

        // Check if the file exists and delete it
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await gallery.deleteOne();
        res.send({ message: 'Gallery image deleted successfully' });
    } catch (error) {
        console.error('Error deleting gallery image:', error);
        res.status(500).send({ message: 'Error deleting gallery image' });
    }
});

// POST /api/upload for image upload
router.post('/upload', async (req, res) => {
    try {
        const { title, image, userUploaded } = req.body; // Use userUploaded
        
        // Create a new image document
        const newImage = new Gallery({
            title,
            image,
            userUploaded, // Use userUploaded
        });
    
        // Save the new image document to the database
        await newImage.save();
    
        // Respond with the newly created image document
        res.status(201).json(newImage);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

module.exports = router;