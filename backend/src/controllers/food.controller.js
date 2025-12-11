const foodModel = require('../models/food.model');


const createFood = async (req, res) => {

    console.log("Creating food item with foodpartner:", req.foodPartner);
    res.send("Food item created successfully");
}


module.exports = {
    createFood
};