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

// NOTE: Assignment 1b requires adding create, update, and delete handlers here.
