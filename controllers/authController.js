import User from "../models/Users.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      username: username,
      password: hash,
      email: email,
    });

    await user.save();
    res.status(200).send("user has been created");
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "user not found"));
    }

    const isPassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPassword) {
      return next(createError(404, "Wrong username or password"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY
    );
    console.log(token);
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
