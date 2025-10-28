// The Business Logic Tier (Service)
// The service layer contains the complex logic, separate from HTTP handling or data storage. Move your bonus calculation and aggregation logic here.

// Import the data access layer
const salesmanRepository = require('../repositories/salesmanRepository');

// --- Helper Functions (Business Logic) ---

function calculateBonus(salesAmount) {
    const bonusRate = 0.10;
    return salesAmount * bonusRate;
}

function calculateGrandTotals(salesmenArray) {
    return salesmenArray.reduce((acc, s) => {
        acc.totalSales += s.sales;
        acc.totalBonus += s.bonus;
        return acc;
    }, { totalSales: 0, totalBonus: 0 });
}

// --- Main Service Functions ---

// Get all salesmen and enrich them with bonus data
function getAllSalesmenWithBonus() {
    const allSalesmen = salesmanRepository.findAll();

    // Apply business logic (bonus calculation)
    const salesmenWithBonus = allSalesmen.map(s => {
        const bonus = calculateBonus(s.sales);
        return { ...s, bonus };
    });

    return salesmenWithBonus;
}

// Get grand totals
function getSalesTotals() {
    // Re-use the data enrichment function
    const salesmenWithBonus = getAllSalesmenWithBonus();
    return calculateGrandTotals(salesmenWithBonus);
}

module.exports = {
    getAllSalesmenWithBonus,
    getSalesTotals
    // Add other CRUD/logic functions here (create, update, delete)
};