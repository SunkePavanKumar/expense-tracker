import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const JWT_SECRET = process.env.JWT_SECRET;
const userController = {
  // register
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      if (!username && !email && !password) {
        return res.status(400).send({
          success: false,
          message: "Please provide the valid inputs",
        });
      }
      // check if the user already exists in the database.

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "email already exists" });
      }

      const user = new User({ username, email, password });
      await user.save();
      res.status(201).json({
        success: true,
        message: "User Created Successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      }); // 1 hour expiry

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      next(error);
    }
  },
  // get the profile details
  profile: async (req, res) => {
    try {
      const userId = req.user;
      if (!userId) {
        throw new Error("User Id not found");
      }
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      res.status(200).json({
        success: true,
        message: "fetched the user profile details successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
