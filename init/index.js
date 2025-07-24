const mongoose = require('mongoose');
const Listing = require('../models/listing');
const initData = require('./data');

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/wanderlust', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
}

main();

// Initialize the database with data
const initDB = async () => {
    try {
        // Deleting existing listings
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({...obj, owner: "6759e8c5540230582e9b291d"}))
        // Inserting new listings
        await Listing.insertMany(initData.data);
        console.log("Data was saved");
    } catch (err) {
        console.log("Error inserting data:", err);
    }
};

initDB();