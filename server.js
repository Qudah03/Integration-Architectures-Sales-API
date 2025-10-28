// Entry Point: Starts the HTTP server.

const app = require('./app');

// Use environment variable for PORT in real life
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Application structure is C-S-R based.");
});