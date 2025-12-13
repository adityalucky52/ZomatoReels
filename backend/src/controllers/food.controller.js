const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
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

module.exports = {
  createFood,
};
