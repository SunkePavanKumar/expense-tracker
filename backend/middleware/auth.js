import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    req.user = decoded.userId;
    next();
  } catch (error) {
    throw new Error(error);
  }
};

export default authenticateUser;
