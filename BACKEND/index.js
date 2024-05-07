// This file is the configuration to create the connection to the mongodb server
// and to create the schema for the database
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();// Create the express app
const PORT = process.env.PORT || 5000;// Define the port to listen to

app.use(express.json());// Use the json parser
app.use(cors());// Use the cors middleware

// Connect to the mongodb server
const MONGO_URI = 'mongodb+srv://shanecummingsuk:9VyP0eqHbVs1P4RG@cubscouts.nrz1yvh.mongodb.net/CubScouts?retryWrites=true&w=majority&appName=CubScouts';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//event listener for when the connection is open
mongoose.connection.on('connected...', () => {
    console.log('Mongoose is connected to the database');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});