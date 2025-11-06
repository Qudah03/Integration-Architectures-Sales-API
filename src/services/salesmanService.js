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

// NOTE: calculateBonus is exported primarily for use in the single-ID controller.
module.exports = {
    getAllSalesmenWithBonus,
    getSalesTotals,
    calculateBonus
};
