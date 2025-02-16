const express = require("express");
const router = express.Router();
const {getProfile} = require("../controllers/profile.controller");
const {authUser} = require("../middlewares/auth.middleware");


router.get("/", authUser, getProfile);

module.exports = router;
