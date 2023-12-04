//import jwt provider from config
const jwtProvider = require('../config/jwtProvider');
const bcrypt = require('bcrypt');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const User = require('../models/user.model');

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    //if no user is found throw an error that user with this email is not found.
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Password");
    }

    const jwt = jwtProvider.generateToken(user);

    //generate a simple 6 digit otp and send it to the user

    //generate a random 6 digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    return res.status(200).json(
        new ApiResponse(200, { jwt, otp, user }, "Login Successful")
    )
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const jwt = req.headers.authorization.split(" ")[1];
    if (!jwt) {
        throw new ApiError(401, "Unauthorized! Token Not Found");
    }
    // const userId = await User.getUserIDFromToken(jwt);
    const userId = await jwtProvider.getUserIDFromToken(jwt);

    const user = await User.findById({ _id: userId });

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Password");
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, { user }, "Password changed successfully")
    )
})

//export module with register and login
module.exports = { login, changePassword }
