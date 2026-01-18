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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        
        res.status(201).json({ message: 'User registered successfully', user: {
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
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token);
        res.status(200).json({ message: 'Login successful', user: {
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
    const { name, contactName, phone, address, email, password } = req.body;
    try {
        const isAccountExists = await foodPartnerModel.findOne({ email });
        if (isAccountExists) {
            return res.status(400).json({ message: 'Account already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const foodPartner = new foodPartnerModel({
            name,
            contactName,
            phone,
            address,
            email,
            password: hashedPassword
        });

        await foodPartner.save();

        const token = jwt.sign({ foodPartnerId: foodPartner._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({ message: 'Food Partner registered successfully',user:{
            _id: foodPartner._id,
            name: foodPartner.name,
            contactName: foodPartner.contactName,
            phone: foodPartner.phone,
            address: foodPartner.address,
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
        const token = jwt.sign({ foodPartnerId: foodPartner._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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

const getMe = async (req, res) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if it's a user token
        if (decoded.userId) {
            const user = await userModel.findById(decoded.userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ 
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    userType: 'user'
                }
            });
        }

        // Check if it's a food partner token
        if (decoded.foodPartnerId) {
            const foodPartner = await foodPartnerModel.findById(decoded.foodPartnerId).select('-password');
            if (!foodPartner) {
                return res.status(404).json({ message: 'Food partner not found' });
            }
            return res.status(200).json({ 
                user: {
                    _id: foodPartner._id,
                    name: foodPartner.name,
                    email: foodPartner.email,
                    userType: 'foodpartner'
                }
            });
        }

        return res.status(401).json({ message: 'Invalid token' });
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
}

module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner, logoutUser,getMe };


    
