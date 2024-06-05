import express from "express";
import userRouter from "./routes/user.router.js";
import mongoose from "mongoose";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
app.use(express.json());
app.use("/api/v1", userRouter);

(async function () {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("app is  connected to the database");
  } catch (error) {
    console.error(`Error while connecting to the database ${error}`);
  }
})();

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`App is listening to http://localhost:${PORT}`);
});