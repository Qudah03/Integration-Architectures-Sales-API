🌐 Integration Architectures Sales API
This project implements a basic RESTful API for managing salesman data, focusing on demonstrating fundamental JavaScript concepts and the principles of a modular, layered architecture (Controller-Service-Repository) using Node.js and Express.js.

🚀 Key Features Demonstrated (Assignment 2.1-a)
This application covers the core concepts required for the first part of the assignment:

RESTful Endpoints: Basic GET routes for fetching salesman data and aggregated totals.

Layered Architecture (C-S-R): Separation of concerns into dedicated layers (Controller, Service, Repository).

Module System: Implementation of a dedicated bonusCalculator module for business logic.

Asynchronous Concepts: The foundation is laid for handling asynchronous tasks, which will be expanded with Promises and async/await in future steps.

Cookie Handling: Routes for setting, reading, and deleting cookies using the cookie-parser middleware.

🛠️ Technology Stack
Component	    Role
Runtime	        Node.js (v22.21.0 or newer)
Framework	    Express.js
Middleware	    cookie-parser
Testing	        Postman (Recommended for testing endpoints)
Version Control	Git / GitHub

📂 Project Structure
The architecture strictly follows the Controller-Service-Repository (C-S-R) pattern to ensure high cohesion and low coupling.
real-sales-api/
├── node_modules/       # Project dependencies
├── server.js           # The application entry point (starts the server)
├── app.js              # Express application setup and middleware loading
└── src/
├── controllers/    # Handles HTTP requests/responses (e.g., salesmanController.js)
├── services/       # Contains ALL business logic (e.g., bonus calculation, aggregation)
├── repositories/   # Handles data access (currently hard-coded data)
└── ...             # Other configuration/utility files

⚙️ Setup and Running the Application
Prerequisites
Node.js: Ensure Node.js (LTS version recommended) is installed on your system.

npm: The Node Package Manager (comes with Node.js).

Installation and Start
1. Clone the Repository:
   git clone https://github.com/Qudah03/Integration-Architectures-Sales-API.git
   cd Integration-Architectures-Sales-API
2. Install Dependencies:
   npm install
3. Run the Server:
node server.js
The server will start on port 3000
Server is running on http://localhost:3000
Application structure is C-S-R based.

🔌 API Endpoints (GET)
Use a browser or Postman to test the following endpoints:
Method,Endpoint,Description
GET,/salesmen,"Retrieves all salesman records, including the calculated bonus (10% of sales) applied by the Service Layer."
GET,/salesmen/:id,"Retrieves a single salesman record by ID (e.g., /salesmen/2) with the calculated bonus."
GET,/totals,Calculates and returns the grand totalSales and totalBonus for all records. (Logs output to the server console).
GET,/set-cookie,Sets a session_id cookie in the client's browser.
GET,/get-cookies,Reads and returns the cookies sent by the client.
GET,/clear-cookie,Deletes the session_id cookie from the client's browser.