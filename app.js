// Application Setup: Defines middleware and loads routes.

const express = require('express');
const cookieParser = require('cookie-parser');
const salesmanController = require('./src/controllers/salesmanController');
const app = express();

// Use Middleware
app.use(express.json()); // To read POST/PUT JSON bodies (for CRUD)
app.use(cookieParser());

// --- Define API Routes ---

// NEW: Root Route for a friendly welcome page (fixes "Cannot GET /" error)
app.get('/', (req, res) => {
    res.status(200).send({
        message: "Welcome to the Salesman REST API. Use Postman for full CRUD operations.",
        availableEndpoints: [
            "GET /salesmen - List all salesmen with bonuses",
            "GET /salesmen/:id - Get a single salesman",
            "GET /totals - Get aggregated sales and bonus totals",
            "POST /salesmen - Create a new salesman (requires {name, sales})",
            "PUT /salesmen/:id - Update salesman data",
            "DELETE /salesmen/:id - Delete a salesman"
        ]
    });
});

// Salesman Endpoints: Controller handles the requests
app.get('/salesmen', salesmanController.getAllSalesmen);
app.get('/salesmen/:id', salesmanController.getSingleSalesman);
app.get('/totals', salesmanController.getTotals);

// --- New CRUD Endpoints for Assignment 2.1 b ---
// POST (Create)
app.post('/salesmen', salesmanController.createSalesman);
// PUT (Update)
app.put('/salesmen/:id',salesmanController.updateSalesman);
// DELETE (Delete)
app.delete('/salesmen/:id',salesmanController.deleteSalesman);


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