import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Permission Denied. Forbidden",
      });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateUser;
