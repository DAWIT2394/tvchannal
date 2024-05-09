const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  try {
    const { fullname, position, email, password, phone_number, role } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Email already exists" });
    }

    const user = await User.create({
      fullname,
      email,
      password,
      phone_number,
      position,
      role,
    });

    const tokenUser = createTokenUser(user);
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Incorrect password" });
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({ user: tokenUser });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: "User logged out!" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

module.exports = {
  register,
  signin,
  logout,
};
