const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getDashboard(req, res) {
    try {
        const foodPartnerId = req.foodPartner._id;
        
        // Get food partner details
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        
        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        // Get all food items by this partner
        const foodItems = await foodModel.find({ foodPartner: foodPartnerId })
            .sort({ createdAt: -1 })
            .limit(6); // Get recent 6 videos

        // Calculate stats
        const totalMeals = await foodModel.countDocuments({ foodPartner: foodPartnerId });
        const allFoodItems = await foodModel.find({ foodPartner: foodPartnerId });
        
        const totalLikes = allFoodItems.reduce((sum, item) => sum + (item.likeCount || 0), 0);
        const totalViews = allFoodItems.reduce((sum, item) => sum + (item.viewCount || 0), 0);

        res.status(200).json({
            totalMeals,
            totalLikes,
            totalViews,
            recentVideos: foodItems
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ message: "Error fetching dashboard data" });
    }
}

async function getFoodPartnerById(req, res) {
    try {
        const foodPartnerId = req.params.id;

        if (!foodPartnerId || foodPartnerId === 'undefined') {
            return res.status(400).json({ message: "Invalid food partner ID" });
        }

        const foodPartner = await foodPartnerModel.findById(foodPartnerId)
        const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId })

        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }

        });
    } catch (error) {
        console.error('Error fetching food partner:', error);
        res.status(500).json({ message: "Error fetching food partner" });
    }
}

module.exports = {
    getDashboard,
    getFoodPartnerById
};