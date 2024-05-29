// This file is the configuration to create the connection to the mongodb server and to create the schema for the database
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');// Import the multer package
const path = require('path');// Import the path package
const fs = require('fs');
const bcrypt = require('bcryptjs');// Import the bcryptjs package
const jwt = require('jsonwebtoken');// Import the jsonwebtoken package
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


const Event = require('./models/Events');// Import the Event model
const User = require('./models/User');// Import the User model
const Image = require('./models/image');// Import the Image model This model now uses the 'gallery' collection

const app = express();// Create the express app
const PORT = process.env.PORT || 5000;// Define the port to listen to
const upload = multer({ dest: 'uploads/' }); // Configuring multer


app.use(cors());// Use the cors middleware
app.use(express.json());// Use the json parser
app.use(express.urlencoded({ extended: true }));// Use the urlencoded parser

// Connect to the mongodb server
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//event listener for when the connection is open
mongoose.connection.on('connected', () => {
    console.log(' Connected to MongoDB');
});


const corsOptions = {
    origin: 'http://localhost:3000', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

//---------- Configure the multer storage ----------------
// Multer storage configuration for events
const eventStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/events'); // Store in events directory
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Keep the original file name
    }
});

// Multer storage configuration for gallery
const galleryStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'gallery'); // Store in gallery directory
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Keep the original file name
    }
});

// Ensure gallery directory exists
    const galleryDir = path.join(__dirname, 'gallery');
    if (!fs.existsSync(galleryDir)){
        fs.mkdirSync(galleryDir);
    }

// Multer upload instance for events
const uploadEvent = multer({
    storage: eventStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB    
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

// Multer upload instance for gallery
const uploadGallery = multer({
    storage: galleryStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB 
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});



// --------------register the user by saving the user data to the database
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, name, dob, address, role } = req.body;// Extract the email and password etc from the request body

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user and save it to the users collection
        const user = new User({
            name,
            email,
            password: hashedPassword,
            dob,
            address,
            role,
        });

        // Save the user to the database
        await user.save();

        res.json({ message: 'User created successfully' });// Return a success message
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//------------------------fetching the user data for single user
app.get('/api/users', async (req, res) => {
    try {
        // Extract the token from the request headers
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        // Verify the token
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }

            // find the user by the id
            const user = await User.findById(decoded.userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Return data only for the authenticated user
            const formattedUser = {
                _id: user._id,
                name: user.name,
                email: user.email,
                dob: user.dob,
                address: user.address,
                is_admin: user.role,
            };

            res.json(formattedUser);// Return the user data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//-----------------------handle the user login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;// Extract the email and password from the request body

        // Find the user by email
        const user = await User.findOne({ email });// Find the user by email

        // If the user is not found
        if (!user) {
            return res.status(401).json({ error: 'User details not found' });// Return an error
        };

        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password); // Compare the hashed password

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid User Details' });// Return an error
        }

        // Create a token jwt
        const tokenPayload = {
            userId: user._id,
        };
        // Sign the token
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h',
        });// token expires in 1 hour
        res.json({ token, role: user.role });// Return the token and the user role

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// -----------------fetch all users
app.get('/api/allusers', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//number of users on the database
app.get('/api/users/count', async (req, res) => {
    const count = await User.countDocuments();
    res.json({ count });
});

//------------------------------------------------------------------------
// User self-update route
app.put('/api/users/self', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        const { name, email, dob, address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            decoded.userId,
            { name, email, dob, address },
            { new: true }
        );
        res.json(updatedUser);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const { body, validationResult } = require('express-validator');

// -----------------Admin update users
app.put('/api/users/:id', 
    [
        body('name').trim().escape().notEmpty().withMessage('Name is required'),// Validate the name
        body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),// Validate the email
        body('dob').isDate().withMessage('Invalid date of birth'),// Validate the date of birth
        body('address').trim().escape().notEmpty().withMessage('Address is required'),// Validate the address
        body('role').isIn(['admin', 'parent', 'child']).withMessage('Invalid role'),// Validate the role
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.dob = req.body.dob;
        user.address = req.body.address;
        user.role = req.body.role;
        await user.save();

        res.json(user);
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

  // DELETE /api/users/:id
    app.delete('/api/users/:id', async (req, res) => {
        try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    });

// -------------CREATRION OF EVENTS ADMIN ----------------

app.post('/api/events', upload.single('image'), async (req, res) => {
    try {
        const { title, description, date, time, location, moreInfo} = req.body;
        const newEvent = new Event({
            title,
            description,
            date,
            time,
            location,
            image: req.file ? req.file.path : undefined,
            moreInfo
        });
        const savedEvent = await newEvent.save();
        res.json(savedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// -----------------Make the uploaded images accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -----------------fetch all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// --------- ADMIN UPDATING/DELETING THE CURRENT EVENTS
app.put('/api/events/:id', upload.single('image'), async (req, res) => {
    try {
        const { title, description, date, time, location, moreInfo } = req.body;
        let updateFields = { title, description, date, time, location, moreInfo };

            // Update image field only if a new image is uploaded
            if (req.file) {
                updateFields.image = req.file.path;
            }

            const event = await Event.findByIdAndUpdate(
                req.params.id, 
                updateFields, 
                { new: true }
            );
            res.json(event);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
// --------------Delete events
    app.delete('/api/events/:id', async (req, res) => {
        try {
            await Event.findByIdAndDelete(req.params.id);
            res.json({ message: 'Event deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.use('/uploads/events', express.static(path.join(__dirname, 'uploads/events')));

//----------number of events on the database
    app.get('/api/events/count', async (req, res) => {
        const count = await Event.countDocuments();
        res.json({ count });
    });


// -----------------CREATRION OF GALLERY IMAGES ----------------


    app.post('/api/gallery', uploadGallery.single('image'), async (req, res) => {
        try {
            const { title } = req.body;
            if (!title) {
                return res.status(400).json({ error: 'Title is required' });
            }
            if (!req.file) {
            return res.status(400).json({ error: 'Valid Image file is required' });
        }
    
        const newImage = new Image({
            title,
            image: req.file.path,
        });

        const savedImage = await newImage.save();
        res.json(savedImage);
        } catch (error) {
            console.error('Error in /api/gallery:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/api/gallery', async (req, res) => {
        try {
            const images = await Image.find({});
            res.json(images);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch gallery' });
        }
    });

// Serve uploaded gallery images
app.use('/gallery', express.static(path.join(__dirname, 'gallery')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

