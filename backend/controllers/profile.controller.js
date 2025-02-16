const userModel = require('../models/user.model');


exports.getProfile = async (req , res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        res.status(200).json({user, msg:"profile found successfully"});

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg :"Internal server error"});
    }
}