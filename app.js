// Application Setup: Defines middleware and loads routes.

const express = require('express');
const cookieParser = require('cookie-parser');
const salesmanController = require('./src/controllers/salesmanController');
const app = express();

// Use Middleware
app.use(express.json()); // To read POST/PUT JSON bodies (for future parts)
app.use(cookieParser());

// --- Define API Routes ---

// Salesman Endpoints: Controller handles the requests
app.get('/salesmen', salesmanController.getAllSalesmen);
app.get('/salesmen/:id', salesmanController.getSingleSalesman);
app.get('/totals', salesmanController.getTotals);

// Cookie Endpoints (Keep these simple for now)
app.get('/set-cookie', (req, res) => { /* ... cookie logic here ... */ });
app.get('/get-cookies', (req, res) => { /* ... cookie logic here ... */ });
app.get('/clear-cookie', (req, res) => { /* ... cookie logic here ... */ });

// Cookie Endpoints (Keep these simple for now)
app.get('/set-cookie', (req, res) => {
    // You MUST provide a function body here
    res.cookie('session_id', 'user12345', { maxAge: 900000, httpOnly: true });
    res.send('Cookie set.');
});

app.get('/get-cookies', (req, res) => {
    // You MUST provide a function body here
    const sessionId = req.cookies.session_id;
    if (sessionId) {
        res.send(`Session ID found: ${sessionId}`);
    } else {
        res.send('No session cookie found.');
    }
});

app.get('/clear-cookie', (req, res) => {
    // You MUST provide a function body here
    res.clearCookie('session_id');
    res.send('Cookie cleared.');
});
// Export the configured application
module.exports = app;