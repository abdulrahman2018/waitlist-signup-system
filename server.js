// server.js

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// Database setup
const db = new sqlite3.Database('./emails.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Database connected');
        // Create table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS waitlist (email TEXT)`);
    }
});

// API endpoint to handle email sign-up
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Insert email into the database
    const stmt = db.prepare('INSERT INTO waitlist (email) VALUES (?)');
    stmt.run(email, function (err) {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ message: 'There was an issue signing up. Please try again.' });
        }
        return res.status(200).json({ message: 'You have successfully joined the waitlist!' });
    });
    stmt.finalize();
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
