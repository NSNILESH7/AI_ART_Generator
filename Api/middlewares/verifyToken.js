import jwt from "jsonwebtoken";
import { CustomError } from "./error.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new CustomError("you are not authenticate!", 401);
  }

  jwt.verify(token, Ai_Image_Generater, async (error, data) => {
    if (error) {
      throw new CustomError("invalid token", 403);
    }
    req.userId = data._id;
    next();
  });
};
export { verifyToken };
