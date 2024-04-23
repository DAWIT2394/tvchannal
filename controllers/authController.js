const { StatusCodes } = require("http-status-codes");
const User = require("../models/user"); // Ensure you import the User model
const { attachCookiesToResponse, createTokenUser } = require("../utils");
const register = async (req, res) => {
  try {
    const { fullname, position, email, password, phone_number, role } =
      req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Email already exists" });
    }

    // // first registered user is an admin
    // const isFirstAccount = (await User.countDocuments({})) === 0;
    // const role = isFirstAccount ? "admin" : "user";

    const user = await User.create({
      fullname,
   
      email,
      password,phone_number,
      role,
    
    });
    const Users = await user.save(user);
    // const tokenUser = createTokenUser(user);
    // attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({Users})
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Incorrect password" });
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({ user: tokenUser });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports = {
  register,
  signin,
  logout,
};

// const usermodel = require("../model/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// // const attachCookie= require("../utils/attachCookie");
// const { attachCookiesToResponse, createTokenUser } = require("../utils");

// const registeruser = async (req, res) => {
//   try {
//     const { fullname, position, email, password, role,api_permission } = req.body;

//     if (!fullname || !position || !email || !password) {
//       return res.status(400).json({ error: "Please fill in all fields" });
//     }

//     let user = await usermodel.findOne({ email: email });

//     if (user) {
//       return res.status(422).json({ error: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const create = new usermodel({
//       fullname,
//       position,
//       email,
//       password: hashedPassword,
//       role,
//       api_permission,
//     });

//     await create.save();

//     res.status(200).json({ message: "Successful registration" });
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       const errors = Object.values(error.errors).map((e) => e.message);
//       return res.status(400).json({ error: errors });
//     }
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const signin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: "Please fill all the fields" });
//     }
//     const user = await usermodel.findOne({ email: email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }
//     const doMatch = await bcrypt.compare(password, user.password);
//     if (doMatch) {
//       const { _id, api_permission, role } = user;
//       const userinfo = { _id, api_permission, role };
//       // const token = jwt.sign(userinfo, process.env.JWT_SECRET);
//   const tokenUser = createTokenUser(userinfo);
//   attachCookiesToResponse({ res, user: tokenUser });

//       // Attach the token to the cookie
//       // attachCookie({ res, token });

//       res.status(200).json({
//         message: "Successful",
//         user: userinfo,
//         token: token,
//       });
//     } else {
//       res.status(400).json({ error: "Invalid email or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// const logout = async (req, res) => {
//   res.cookie("token", "logout", {
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000),
//   });
//   res.status(StatusCodes.OK).json({ msg: "user logged out!" });
// };

// module.exports = {
//   registeruser,
//   signin,
// logout
// };
