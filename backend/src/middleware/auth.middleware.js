const foodPartnerModel = require('../models/foodpartner.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authFoodPartnerMiddleware = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'No token provided. Please login first.' });
    }

    try {
        const decoded = jwt.verify(token, 'aditya123');
        const foodPartner = await foodPartnerModel.findById(decoded.foodPartnerId);
        if (!foodPartner) {
            return res.status(401).json({ message: 'Unauthorized - Food partner not found' });
        }
        req.foodPartner = foodPartner;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
}

const  authUserMiddleware = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, 'aditya123')

        const user = await userModel.findById(decoded.userId);

        req.user = user 

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}
module.exports = { authFoodPartnerMiddleware, authUserMiddleware };