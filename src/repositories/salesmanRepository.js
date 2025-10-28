// The Data Tier (Repository)
// The repository only deals with the data source. For now, it holds your static array and mimics data access functions.

// Hard-coded data (mimics a database connection)
const salesmen = [
    { id: 1, name: 'Haya Bawati', sales: 25000 },
    { id: 2, name: 'Abdallah Al Qudah', sales: 40000 },
    { id: 3, name: 'AbdelRahman Aldwary', sales: 30000 }
];

// Function to simulate fetching all records
function findAll() {
    // In a real app, this would be: return db.collection('salesmen').find({});
    return salesmen;
}

// Function to simulate finding a single record
function findById(id) {
    // In a real app, this would be: return db.collection('salesmen').findOne({ id });
    const salesmanId = parseInt(id);
    return salesmen.find(s => s.id === salesmanId);
}

module.exports = {
    findAll,
    findById
};