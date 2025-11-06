// Controller Layer: Handles incoming HTTP requests and formats the outgoing HTTP responses.

const salesmanService = require('../services/salesmanService');
const salesmanRepository = require('../repositories/salesmanRepository');

/**
 * GET /salesmen: Responds with a list of all salesmen, enriched with bonuses.
 */
exports.getAllSalesmen = (req, res) => {
    try {
        // Call Service Layer to handle data retrieval and logic
        const data = salesmanService.getAllSalesmenWithBonus();
        res.status(200).json(data);
    } catch (error) {
        // In a real app, this should be detailed logging
        console.error("Error in getAllSalesmen:", error.message);
        res.status(500).send({ message: "Internal server error fetching salesmen." });
    }
};

/**
 * GET /salesmen/:id: Responds with a single salesman, enriched with bonus.
 */
exports.getSingleSalesman = (req, res) => {
    try {
        const id = req.params.id;

        // 1. Get raw data from Repository
        const salesman = salesmanRepository.findById(id);

        if (!salesman) {
            return res.status(404).send({ message: "Salesman not found" });
        }

        // 2. Apply business logic from Service
        const bonus = salesmanService.calculateBonus(salesman.sales);

        // 3. Send successful response
        res.status(200).json({ ...salesman, bonus });

    } catch (error) {
        console.error(`Error fetching salesman ID ${req.params.id}:`, error.message);
        res.status(500).send({ message: "Internal server error fetching salesman." });
    }
};

/**
 * GET /totals: Responds with the total sales and total bonus aggregated data.
 */
exports.getTotals = (req, res) => {
    try {
        // Call Service Layer to perform aggregation logic
        const totals = salesmanService.getSalesTotals();

        // Log to console (as requested for server side monitoring)
        console.log("Calculated Grand Totals:", totals);

        res.status(200).json(totals);
    } catch (error) {
        console.error("Error calculating totals:", error.message);
        res.status(500).send({ message: "Internal server error calculating totals." });
    }
};

// --- New POST/PUT/DELETE Handlers (Assignment 2.1 b) ---

/**
 * POST /salesmen: Creates a new salesman.
 */
exports.createSalesman = (req, res) => {
    try {
        // C: Call service to create new salesman. req.body is required.
        const newSalesman = salesmanService.createSalesman(req.body);
        // Use 201 Created for resource creation
        res.status(201).json(newSalesman);
    } catch (error) {
        // Use 400 Bad Request for client-side input errors (e.g., failed validation)
        console.error("Error creating salesman:", error.message);
        res.status(400).json({ message: error.message });
    }
};

/**
 * PUT /salesmen/:id: Updates an existing salesman.
 */
exports.updateSalesman = (req, res) => {
    try {
        const id = req.params.id;
        // U: Call service to update the salesman.
        const updatedSalesman = salesmanService.updateSalesman(id, req.body);

        if (updatedSalesman) {
            // Use 200 OK for successful update
            res.status(200).json(updatedSalesman);
        } else {
            // Use 404 Not Found if the resource ID is invalid
            res.status(404).json({ message: `Salesman ID ${id} not found.` });
        }
    } catch (error) {
        // Use 400 Bad Request for client-side errors (e.g., negative sales)
        console.error(`Error updating salesman ID ${req.params.id}:`, error.message);
        res.status(400).json({ message: error.message });
    }
};

/**
 * DELETE /salesmen/:id: Deletes a salesman.
 */
exports.deleteSalesman = (req, res) => {
    try {
        const id = req.params.id;
        // D: Call service to delete the salesman.
        const wasDeleted = salesmanService.deleteSalesman(id);

        if (wasDeleted) {
            // Use 204 No Content for successful deletion (no Body returned)
            res.status(204).send();
        } else {
            // Use 404 Not Found if the resource ID does not exist
            res.status(404).json({message: `Salesman ID ${id} not found for deletion.`});
        }
    } catch (error) {
        console.error(`Error deleting salesman ID ${req.params.id}:`, error.message);
        res.status(500).json({message: "Internal server error during deletion."});
    }
}
// NOTE: Assignment 1b requires adding create, update, and delete handlers here.
