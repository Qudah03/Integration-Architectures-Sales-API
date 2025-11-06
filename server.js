// This file is the primary entry point for the Node.js application.
// It imports the application defined in app.js and starts the server listener.

// Import the configured Express application module
const app = require('./app');

const PORT = 3000;

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the API at http://localhost:${PORT}`);
    console.log('API running with full CRUD (POST/PUT/DELETE) support via C-S-R architecture.');
});