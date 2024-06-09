import "dotenv/config";
import Transaction from "../model/Transaction.js";
const transactionController = {
  create: async (req, res, next) => {
    try {
      const { category, type, amount, description, date } = req.body;
      if (!date && !type && !amount) {
        throw new Error("Please provide the required fields");
      }
      // check the type is valid or not
      const validTypes = ["income", "expense"];
      if (!validTypes.includes(type.toLowerCase())) {
        throw new Error(
          `Provided type ${type} is invalid! Please provide the correct type`
        );
      }
      const transaction = await Transaction.create({
        category,
        user: req.user,
        date,
        type,
        amount,
        description,
      });

      res.status(200).json({
        success: true,
        message: "Created the transaction successfully",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  },
  lists: async (req, res, next) => {
    try {
      const { startDate, endDate, type, category } = req.query;
      let filter = {user : req.user};
      if(startDate){
        filter.date = {...filter, $gte : new Date(startDate)}
      }
      if(endDate){
        filter.date = {...filter, $lte : new Date(endDate)}
      }
     

      const transactions = await Transaction.find({
        user: req.user,
      });

      res.status(200).json({
        success: true,
        message: "Fetched all the transactions successfully",
        data: transactions,
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

export default transactionController;
