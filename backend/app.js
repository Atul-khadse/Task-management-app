const express = require("express");
const app = express();
const connectDatabase = require("./db/db");




app.use(express.json());


connectDatabase();


app.get("/", (req, res) => {
    res.send("hello jee");
});



module.exports = app;