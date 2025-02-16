const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./db/db");
const userRouter = require('./routers/user.router');




app.use(express.json());
app.use(cors());


connectDatabase();


app.use("/api/auth", userRouter);


app.get("/", (req, res) => {
    res.send("hello jee");
});



module.exports = app;