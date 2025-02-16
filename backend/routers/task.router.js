const express = require("express");
const router = express.Router();
const { getTasks } = require("../controllers/task.controller");
const { authUser }  = require("../middlewares/auth.middleware");

router.get("/", authUser, getTasks);




module.exports = router;