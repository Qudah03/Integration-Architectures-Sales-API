// The API Tier (Controller)
// The controller handles all HTTP traffic. Its job is to call the service, receive the results, and send the HTTP response. It never interacts with the data directly.

// src/controllers/salesmanController.js

// ... imports ...

// Handler for GET /salesmen
exports.getAllSalesmen = (req, res) => {
    // ... logic ...
};

// Handler for GET /salesmen/:id
exports.getSingleSalesman = (req, res) => {
    // ... logic ...
};

// Handler for GET /totals
exports.getTotals = (req, res) => {
    // ... logic ...
};