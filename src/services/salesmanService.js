// Service Layer: Contains all business logic (calculations, transformations, validation).

const salesmanRepository = require('../repositories/salesmanRepository');

// --- Private Helper Functions (Internal Business Logic) ---

/**
 * Calculates the standard 10% bonus for a sales amount.
 */
function calculateBonus(salesAmount) {
    if (typeof salesAmount !== 'number' || salesAmount < 0) {
        throw new Error("Invalid sales amount for bonus calculation.");
    }
    const bonusRate = 0.10;
    return salesAmount * bonusRate;
}

/**
 * Aggregates total sales and total bonus from an enriched array of salesmen.
 */
function calculateGrandTotals(salesmenArray) {
    return salesmenArray.reduce((acc, s) => {
        const sales = typeof s.sales === 'number' ? s.sales : 0;
        const bonus = typeof s.bonus === 'number' ? s.bonus : 0;

        acc.totalSales += sales;
        acc.totalBonus += bonus;
        return acc;

    }, { totalSales: 0, totalBonus: 0 });
}

// --- Public Service Functions (Used by Controllers) ---

/**
 * Fetches all salesmen and enriches the data with the calculated bonus.
 */
function getAllSalesmenWithBonus() {
    // 1. Get raw data from the repository (the data source)
    const allSalesmen = salesmanRepository.findAll();

    // 2. Apply business logic (calculate and map the bonus)
    return allSalesmen.map(s => {
        try {
            const bonus = calculateBonus(s.sales);
            return {...s, bonus};
        } catch (e) {
            return {...s, bonus: 0, error: "Bonus calculation failed"};
        }
    });
}

/**
 * Calculates and returns the grand totals for all salesmen.
 */
function getSalesTotals() {
    // Re-uses the main data function
    const salesmenWithBonus = getAllSalesmenWithBonus();
    return calculateGrandTotals(salesmenWithBonus);
}

// --- New C: Create Service Logic ---
function createSalesman(data) {
    // Business Validation: Name is mandatory
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
        throw new Error("Salesman name is required.");
    }
    // Business Validation: Sales must be a non-negative number if provided
    if (data.sales !== undefined && (typeof data.sales !== 'number' || data.sales < 0)) {
        throw new Error("Sales must be a non-negative number.");
    }
    return salesmanRepository.addSalesman(data);
}

// --- New U: Update Service Logic ---
function updateSalesman(id, data) {
    // Business Validation: Prevent updating sales to a negative value
    if (data.sales !== undefined && (typeof data.sales !== 'number' || data.sales < 0)) {
        throw new Error("Cannot update sales to a negative amount.");
    }
    // Note: The repository handles the 'not found' check
    return salesmanRepository.updateSalesman(id, data);
}

// --- New D: Delete Service Logic ---
function deleteSalesman(id) {
    return salesmanRepository.deleteSalesman(id);
}


module.exports = {
    getAllSalesmenWithBonus,
    getSalesTotals,
    calculateBonus,
    // Export new CRUD functions
    createSalesman,
    updateSalesman,
    deleteSalesman
};
