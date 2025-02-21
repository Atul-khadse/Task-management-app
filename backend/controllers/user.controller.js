const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.signup = async(req , res) => {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return res.status(400).json({ msg: "please fill all the field"})
        }

        if(typeof username !== "string" || typeof email !== "string" || typeof password !== "string"){
            return res.status(400).json({ msg :"please send string value only"});
        }

        if(password.length < 4){
            return res.status(400).json({ msg : "password lengthmust be atleast 4 characters"});

        }

       if(!userModel.validateEmail(email)){
        return res.status(400).json({ msg: "invalid email"});

       }

       const user = await userModel.findOne({ email});
       if(user){
        return res.status(400).json({ msg: "this email is already registered"});
       }

       const hashedPassword = await userModel.hashPassword(password);
       await userModel.create({username, email , password: hashedPassword});
       res.status(200).json({ msg :"acount has been created for you"});

    } catch (err) {
        console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
    }
}

exports.login = async(req ,res ) => {
    try {
        const {email , password}  = req.body;
        if(!email || !password){
            return res.status(400).json({ msg : "Please enter email and password"});
        }

        const user = await userModel.findOne({ email });

        if(!user){
            return res.status(400).json({ msg : "this email is not register"});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({ msg : "password incorect"});
        }

        const token = user.generateAuthToken();
        res.status(200).json({ token, user, msg: "login successfull."});

    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg : "internal server error"});
        
    }
}