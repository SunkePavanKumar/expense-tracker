import "dotenv/config";
import Category from "../model/Category.js";

const categoryController = {
  create: async (req, res, next) => {
    try {
      const { name, type } = req.body;
      if (!name || !type) {
        throw new Error("Name and type are required for the category");
      }
      const normalizedName = name.toLowerCase();
      // check the type is valid or not
      const validTypes = ["income", "expense"];
      if (!validTypes.includes(type.toLowerCase())) {
        throw new Error(
          `Provided type ${type} is invalid! Please provide the correct type`
        );
      }

      // check if the category already exists by the user who is logged in.

      const categoryExists = await Category.findOne({
        name: normalizedName,
        user: req.user,
      });

      if (categoryExists) {
        throw new Error(
          `The category already Exists with the name ${categoryExists.name}`
        );
      }

      // create the category

      const category = await Category.create({
        name: normalizedName,
        type,
        user: req.user,
      });

      res.status(200).json({
        success: true,
        message: "Successfully created the category",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  },
  lists: async (req, res, next) => {
    try {
      const categories = await Category.find({
        user: req.user,
      });
      if (!categories) {
        throw new Error("No categories exists with the user");
      }
      res.status(200).json({
        success: true,
        message: "Fetched all the categories",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};

export default categoryController;
