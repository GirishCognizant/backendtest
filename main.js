const express = require('express');
const app = express();
const { poolPromise } = require('./db'); // Make sure this is correctly implemented
const session = require('express-session');
// const cors = require('cors');
// Use a persistent store in production, e.g., connect-mongo, connect-redis


// CORS middleware configuration
// app.use(cors({
//     origin: 'https://logincorscheck.netlify.app',
//     // origin: 'http://127.0.0.1:5500',
//     credentials: true // Allow credentials such as cookies
// }));

app.use(express.json())
// Session middleware
app.use(session({
    secret: 'girishsecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "none",
        maxAge: 30000, // 30 seconds
        secure: true, // Set to true if using HTTPS
    },
}));

app.use((req, res, next) => {
    console.log("Session ID:", req.sessionID);
    // console.log("Session Data:", req.session);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const comparePassword = "kumar";

app.get("/", function (req, res) {
    return res.status(200).json({
        message: 'whats app dude you are connect with backend',
    });
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (password === comparePassword) {
        req.session.username = username; // Store username in session
        // console.log(req.sessionID);
        return res.status(200).json({
            message: 'Login successful',
        });
    } else {
        return res.status(401).json({
            message: 'Invalid username or password',
        });
    }
});

app.get('/check-role', (req, res) => {
    // console.log("this is the received session data", req.session);
    // console.log(req.sessionID)
    if (req.session && req.session.username) {
        return res.json({ username: req.session.username });
    } else {
        return res.status(401).json({ message: 'Not authenticated or username missing' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
