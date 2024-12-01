import User from "../models/User.js";
import { CustomError } from "../middlewares/error.js";

const getUserController = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) throw new CustomError("User not found", 404);
    const { password, ...data } = user;
    res.status(200).json(data._doc);
  } catch (error) {
    next(error);
  }
};
const updateUserController = async (req, res, next) => {
  const { userId } = req.params;
  const updateData = req.body;
  try {
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) throw new CustomError("User not found", 404);

    Object.assign(userToUpdate, updateData);

    await userToUpdate.save();
    res.status(200).json(userToUpdate);
  } catch (error) {
    next(error);
  }
};
const byuCredits = async (req, res, next) => {
  const { userId } = req.params;
  const updateCredit = req.body;
  try {
    const userToUpdateCredit = await User.findById(userId);

    if (!userToUpdateCredit) throw new CustomError("User not found", 404);
    if (updateCredit.hasOwnproperty("credits")) {
      userToUpdateCredit.credits = updateCredit.credits;
    }
    await userToUpdateCredit.save();
    res
      .status(200)
      .json({ message: "Credit updated successfully", userToUpdate });
  } catch (error) {
    next(error);
  }
};

export { getUserController, updateUserController, byuCredits };
