const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");


module.exports.authUser = async (req ,res , next) => {
    const token = (req.cookies && req.cookies.token) || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ msg: "User not found" });
          }

        req.user = user;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({msg: "Internal Server Error" });
    }

}