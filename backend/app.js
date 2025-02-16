const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./db/db");
const userRouter = require('./routers/user.router');
const profileRoutes = require("./routers/profile.router");





app.use(express.json());
app.use(cors());


connectDatabase();


app.use("/api/auth", userRouter);
app.use("/api/profile", profileRoutes);


app.get("/", (req, res) => {
    res.send("hello jee");
});



module.exports = app;