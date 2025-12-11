const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');    
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const isUserExists = await userModel.findOne({ email });
        if (isUserExists) {
            return res.status(400).json({ message: 'User already exists' });
        }   
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            fullname,
            email,
            password: hashedPassword
        }); 

        await user.save();

        const token = jwt.sign({ userId: user._id }, 'aditya123', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        
        res.status(201).json({ message: 'User registered successfully', userId: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


//create login 

const loginUser = async (req, res) => {
    //login logic here
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, 'aditya123', { expiresIn: '1h' });
        res.cookie('token', token);
        res.status(200).json({ message: 'Login successful', userId: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

const registerFoodPartner = async (req, res) => {
    //registration logic for food partner
    const { name, email, password } = req.body;
    try {
        const isAccountExists = await foodPartnerModel.findOne({ email });
        if (isAccountExists) {
            return res.status(400).json({ message: 'Account already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const foodPartner = new foodPartnerModel({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ foodPartnerId: foodPartner._id }, 'aditya123', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        await foodPartner.save();

        res.status(201).json({ message: 'Food Partner registered successfully',user:{
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email
        } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const loginFoodPartner = async (req, res) => {
    //login logic for food partner
    const { email, password } = req.body;
    try {
        const foodPartner = await foodPartnerModel.findOne({ email });
        if (!foodPartner) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ foodPartnerId: foodPartner._id }, 'aditya123', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', user:{
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email
        } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
}

const logoutFoodPartner = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner };


    
