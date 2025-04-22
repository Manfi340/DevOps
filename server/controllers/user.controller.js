const User = require('../models/user.model'); 
const Role = require('../models/role.model'); 
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
const { SetUpTokenToCookies } = require('../utilities/setUpTokenToCookies');
const ContactUs = require('../models/contact.model'); 
 
const SignUp = async (req, res) => {  
    try {
        const { fullName, email, password, phoneNumber } = req.body;

        if (!fullName || !email || !password || !phoneNumber) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists. Try to sign in!" });
        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.CRYPTO_KEY)); 

        const role = await Role.findOne({name: process.env.ENTREPRENEUR});

        const newUser = new User({
            email,
            password: hashedPassword,
            fullName,
            phoneNumber,
            rolesId: new mongoose.Types.ObjectId(role.id)
        });

        const result = await newUser.save(); 

        if (!result || !result._id) {
            throw new Error("User couldn't be created");
        }

        SetUpTokenToCookies(res, result._id);  

        res.status(201).json({
            success: true,
            message: "User is created successfully",
            user: { ...result._doc, password: undefined }
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const Login = async (req, res) =>{  
    try {
        const { email, password } = req.body;
    
        if(!email || !password){
            throw new Error("All fields are required!");
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success : false, message : `User was not found using this email : ${email}`}); 
        }
        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(404).json({success : false, message : "User password is incorrect"}); 
        }
        const role = await Role.findById(user.rolesId);

        SetUpTokenToCookies(res, user._id, role);

        res.status(200).json({success: true, message: "User is logged in successfully", user: {...user._doc, password: undefined}});

    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    }
};

const Contact = async (req, res) =>{  
    try { 
        const { message, subject} = req.body; 
    
        if(!message || !subject){
            throw new Error("All fields are required!");
        }

        const userId = req.params.id;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({success : false, message : "User was not found"}); 
        }
        const newContact = await ContactUs.create({
            userId,
            message,
            subject
        });  

        const result = await newContact.save();

        if(!result || !result._id){
            return res.status(400).json({success : false, message : "Message could not be created"}); 
        }

        res.status(201).json({success: true, messageId: result._id});

    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    }
};

module.exports = { SignUp, Login, Contact };