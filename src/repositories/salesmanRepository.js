// Data Layer: Simulates a database by holding and accessing hard-coded data.

// Hard-coded data set for Assignment 1.
let salesmen = [
    { id: 1, name: 'Haya Bawati', sales: 25000 },
    { id: 2, name: 'Abdallah Al Qudah', sales: 40000 },
    { id: 3, name: 'AbdelRahman Aldwary', sales: 30000 }
];

let nextId = salesmen.length + 1; // Tracks the next available ID for new creations

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

// --- C: Create ---
function addSalesman(data) {
    const newSalesman = {
        id: nextId++,
        name: data.name,
        // Ensure sales is a number, default to 0 if not provided
        sales: typeof data.sales === 'number' ? data.sales : 0
    };
    salesmen.push(newSalesman);
    return newSalesman;
}

// --- U: Update ---
function updateSalesman(id, data) {
    const salesmanId = parseInt(id);
    const index = salesmen.findIndex(s => s.id === salesmanId);

    if (index === -1) {
        return null;
    }

    // Merge existing data with new data, ensuring ID is preserved
    salesmen[index] = {
        ...salesmen[index],
        ...data,
        id: salesmanId
    };

    return salesmen[index];
}

// --- D: Delete ---
function deleteSalesman(id) {
    const salesmanId = parseInt(id);
    const initialLength = salesmen.length;
    // Overwrite the array with a new array excluding the target ID
    salesmen = salesmen.filter(s => s.id !== salesmanId);
    // Return true if the length changed (i.e., a salesman was removed)
    return salesmen.length < initialLength;
}

module.exports = {
    findAll,
    findById,
    // Export new CRUD functions
    // NOTE: Assignment 1b requires adding save, update, and delete functions here.
    addSalesman,
    updateSalesman,
    deleteSalesman
};
