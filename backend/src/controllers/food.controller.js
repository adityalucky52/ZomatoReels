const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const Like = require("../models/likes.model");
const saveModel = require("../models/save.model");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  console.log("Creating food item with foodpartner:", req.foodPartner);
  console.log("Received body:", req.body);
  console.log("Received file:", req.file);

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Video file is required",
      });
    }

    // Handle potential trailing spaces in field names
    const name = req.body.name || req.body['name '];
    const description = req.body.description || req.body['description '];

    if (!name) {
      return res.status(400).json({
        message: "Name field is required",
      });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );
    console.log("File uploaded to:", fileUploadResult);

    const foodItem = await foodModel.create({
      name: name,
      description: description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "food created successfully",
      food: foodItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error in creating food item",
      error: error.message,
    });
  }
};

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await Like.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await Like.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully",
            like: false
        })
    }

    const like = await Like.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like: true
    })

}


async function saveFood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSaveFood
};
