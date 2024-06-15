const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const connection = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

connection();

const apiKey = process.env.KEY;

app.get('/weather', async (req, res,next) => {
    const { location } = req.query;
    if (!location) {
        console.log('Location is required');
        return res.status(400).json({ error: 'Location is required' });
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    try {
        console.log(`Requesting weather data for location: ${location}`);
        const response = await axios.get(url);
        console.log('Weather data received:', response.data);
        res.json(response.data);
    }
    catch (error) {
        if (error.response) {
            console.error('Error response from weather service:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } 
        else if (error.request) {
            console.error('No response received from weather service');
            res.status(500).json({ error: 'No response received from weather service' });
        } 
        else {
            console.error('Error setting up request to weather service:', error.message);
            res.status(500).json({ error: error.message });
        }
        next(error)
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
