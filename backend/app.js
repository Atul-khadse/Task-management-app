const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./db/db");
const userRouter = require('./routers/user.router');
const profileRoutes = require("./routers/profile.router");
const taskRoutes = require("./routers/task.router");
const adminRoutes = require('./routers/admin.route');





app.use(express.json());
app.use(cors());


connectDatabase();


app.use("/api/auth", userRouter);
app.use("/api/profile", profileRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("hello jee");
});



module.exports = app;