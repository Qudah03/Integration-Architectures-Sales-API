// Data Layer: Simulates a database by holding and accessing hard-coded data.

// Hard-coded data set for Assignment 1.
const salesmen = [
    { id: 1, name: 'Haya Bawati', sales: 25000 },
    { id: 2, name: 'Abdallah Al Qudah', sales: 40000 },
    { id: 3, name: 'AbdelRahman Aldwary', sales: 30000 }
];

/**
 * Retrieves all salesmen from the data source.
 * @returns {Array} List of salesman objects.
 */
function findAll() {
    // In Assignment 1b, this will be updated to handle Create/Update/Delete locally.
    // In a real project, this would be a MongoDB query (e.g., db.find()).
    return salesmen;
}

/**
 * Retrieves a single salesman by ID.
 * @param {string|number} id - The salesman ID.
 * @returns {Object|undefined} The matching salesman or undefined.
 */
function findById(id) {
    const salesmanId = parseInt(id);
    return salesmen.find(s => s.id === salesmanId);
}

module.exports = {
    findAll,
    findById
    // NOTE: Assignment 1b requires adding save, update, and delete functions here.
};
