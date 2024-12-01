import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CustomError } from "../middlewares/error.js";

const registerController = async (req, res, next) => {
  try {
    const { password, email, username } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      throw new CustomError("user already exists", 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    let user;
    if (req.body.email) {
      user = await User.findOne({ email: req.body.email });
    } else {
      user = await User.findOne({ username: req.body.username });
    }
    if (!user) {
      throw new CustomError("user not found", 401);
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      throw new CustomError("invalid credentials", 401);
    }
    const { password, ...data } = user._doc;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });
    res.cookie("token", token).status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json("user loged out succfully");
  } catch (error) {
    next(error);
  }
};

const reFetchUserController = async (req, res, next) => {
  let token = req.cookies.token;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (error, data) => {
    if (error) {
      console.log(error);
      throw new CustomError("invalid token", 404);
    }
    try {
      const user = await User.findOne({ _id: data._id });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });
};

export {
  registerController,
  loginController,
  logoutController,
  reFetchUserController,
};
