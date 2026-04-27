const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const posts = [
    {
        username: 'Aman',
        title: 'Post 1'
    },
    {
        username: 'Aryan',
        title: 'Post 2'
    },
    {
        username: 'Vikas',
        title: 'Post 3'
    }
];

const app = express();
app.use(express.json());

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) return res.sendStatus(401); // No token, unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token, forbidden
        req.user = user;
        next();
    });
}

// Protected Route
app.get('/posts', authenticateToken, (req, res) => {
    // Only shows posts of the logged in user
    const userposts = posts.filter(post => post.username === req.user.name);
    res.json(userposts);
});

// Login Route
app.post('/login', (req, res) => {
    // Authenticate User
    const username = req.body.username;
    if (!username) return res.status(400).send('Username is required');
    if (posts.includes(username)) return res.status(400).send('User already exists');

    // In real apps: validate from DB
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
});
app.listen(3000);