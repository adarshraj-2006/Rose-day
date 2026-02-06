const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================
// Database
// ============================
connectDB();

// ============================
// MANUAL CORS (ULTIMATE FIX)
// ============================
app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Allow all origins for maximum reliability
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    next();
});

// ============================
// Middleware
// ============================
app.use(express.json());

// ============================
// Models
// ============================
const User = require('./models/User');
const Message = require('./models/Message');

// ============================
// Routes
// ============================

// Create / Login User
app.post('/api/users', async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        let user = await User.findOne({ username });
        if (!user) {
            user = new User({ username });
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send Message
app.post('/api/messages', async (req, res) => {
    try {
        const { sender, content, category, avatar } = req.body;

        if (!sender || !content || !category || !avatar) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newMessage = new Message({
            sender,
            content,
            category,
            avatar,
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health Check
app.get('/', (req, res) => {
    res.send('API is running...');
});

// ============================
// Global Error Handler
// ============================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// ============================
// Start Server
// ============================
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
