```markdown
# 🌐 Integration Architectures Sales API

This project implements a basic **RESTful API** for managing salesman data.  
Its primary goal is to demonstrate **fundamental JavaScript concepts** and the principles of a **modular, layered architecture** (Controller–Service–Repository) using **Node.js** and **Express.js**.

---

## 🚀 Key Features Demonstrated (Assignment 2.1-a)

- **Layered Architecture (C–S–R):**  
  Clear separation of concerns across Controller, Service, and Repository layers for maintainability.

- **Module System:**  
  Dedicated `bonusCalculator` module isolates business logic.

- **RESTful Endpoints:**  
  Basic `GET` routes for fetching salesman data, calculating bonuses, and aggregating totals.

- **Asynchronous Concepts:**  
  Foundation laid for Promises and `async/await` (to be extended in later stages).

- **Cookie Handling:**  
  Routes demonstrate cookie operations using the `cookie-parser` middleware.

---

## 🛠️ Technology Stack

| Component       | Role                 | Version / Notes               |
|-----------------|----------------------|-------------------------------|
| **Runtime**     | Node.js              | v22.21.0 or newer             |
| **Framework**   | Express.js           | API core                      |
| **Middleware**  | cookie-parser        | Cookie management             |
| **Testing**     | Postman              | For testing endpoints          |
| **Version Control** | Git / GitHub     | For versioning and tracking   |

---

## 📂 Project Structure

The project strictly follows the **Controller–Service–Repository (C–S–R)** pattern for modularity and clarity.



real-sales-api/
├── node_modules/       # Project dependencies
├── server.js           # Entry point (starts the HTTP listener)
├── app.js              # Express setup, middleware, and routes
└── src/
├── controllers/    # Handles HTTP requests/responses (e.g., salesmanController.js)
├── services/       # Business logic (bonus calculation, aggregation, etc.)
├── repositories/   # Data access (currently hard-coded)
└── utils/          # Optional helper modules

````

---

## ⚙️ Setup and Running the Application

### Prerequisites
- **Node.js:** LTS version or newer installed.  
- **npm:** Comes bundled with Node.js.

### Installation and Startup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Qudah03/Integration-Architectures-Sales-API.git
   cd Integration-Architectures-Sales-API
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the server**

   ```bash
   node server.js
   ```

The server will start on:

```
http://localhost:3000
```

Console output:

```
Server is running on port 3000
Application structure is C-S-R based.
```

---

## 🔌 ## 🔌 API Endpoints (Complete CRUD + Aggregation)

This table defines the contract for the Salesman REST API, demonstrating the full CRUD functionality implemented in the **Controller → Service → Repository (C-S-R)** structure.

| Method  | Endpoint         | Description                                                          | Request Body (JSON)                           | Success Response                         | Error Codes                            |
|---------|------------------|----------------------------------------------------------            |--------------------------------------------   |------------------------------------      |-----------------------------------     |
| GET     | `/salesmen`      | Retrieves a list of all salesmen, including calculated bonus.        | None                                          | `200 OK` – Array of Salesman Objects     | `500 Internal Error`                   |
| GET     | `/salesmen/{id}` | Retrieves a single salesman by their ID, including calculated bonus. | None                                          | `200 OK` – Single Salesman Object        | `404 Not Found`, `500 Internal Error`  |
| POST    | `/salesmen`      | CREATE a new salesman resource.                                      | ```json {"name": "string", "sales": 0} ```    | `201 Created` – New Salesman Object + ID | `400 Bad Request` (Validation Error)   |
| PUT     | `/salesmen/{id}` | UPDATE an existing salesman's details (e.g., update sales).          | ```json {"sales": 80000} ``` (Partial update) | `200 OK` – Updated Salesman Object       | `400 Bad Request`, `404 Not Found`     |
| DELETE  | `/salesmen/{id}` | DELETE the specified salesman resource.                              | None                                          | `204 No Content`                         | `404 Not Found`                        |
| GET     | `/totals`        | Calculates and returns aggregated total sales and total bonus.       | None                                          | `200 OK` – Totals Object                 | `500 Internal Error`                   |


---

## 🧩 Notes

* Future updates will include asynchronous data fetching, Promises, and database integration.
* The current version uses **in-memory data** for demonstration.
* Designed for **Integration Architectures coursework (Assignment 2.1)**.

---