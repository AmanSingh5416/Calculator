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

const refreshTokens = [];

const app = express();
app.use(express.json());

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({name: user.name}); // because user object has more properties like iat, exp etc. we only want name
        res.json({ accessToken });
    });
});

// Login Route
app.post('/login', (req, res) => {
    // Authenticate User
    const username = req.body.username;
    if (!username) return res.status(400).send('Username is required');
    if (posts.includes(username)) return res.status(400).send('User already exists');

    // In real apps: validate from DB
    const user = { name: username };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
});

app.listen(4000);