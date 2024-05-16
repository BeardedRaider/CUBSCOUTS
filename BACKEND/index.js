// This file is the configuration to create the connection to the mongodb server and to create the schema for the database
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('./models/User');// Import the User model
require('./models/Events');// Import the Event model

const app = express();// Create the express app
const PORT = process.env.PORT || 5000;// Define the port to listen to

app.use(express.json());// Use the json parser
app.use(cors());// Use the cors middleware

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

// --------------register the user
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
        jwt.verify(token, 'your-secret-key', async (err, decoded) => {
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
        const token = jwt.sign(tokenPayload, 'your-secret-key', { expiresIn: '1h',
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

const { body, validationResult } = require('express-validator');


// -----------------update user
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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

