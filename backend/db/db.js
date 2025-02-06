
const mongoose = require("mongoose");
 
require("dotenv").config();

function connectDatabase() {
    mongoose.connect(process.env.DATABSE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(console.log("database connect successfully"))
    .catch((error) => {
        console.log("Database connection issue");
    })
};

module.exports = connectDatabase;