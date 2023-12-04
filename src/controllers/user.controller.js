//import user model, utils, jwtProvider

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const jwtProvider = require('../config/jwtProvider');

//Create a async function for user creation with accepting userData in try catch block 

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    // Check if all fields are provided
    if (
        [firstName, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Please fill required fields")
    }

    //to check if the user already exists in the database
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
        throw new ApiError(409, "User with email already exists")
    }
    //create a new user
    const user = await User.create({ firstName, lastName, email, password });
    console.log("created user is: ", user);
    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

//add a method for get user by id

const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.body._id).select("-password");
    //if no user is found throw an error that user with this id is not found.
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(
        new ApiResponse(200, user, "Success")
    )
})

//add a method for get user by email

const getUserByEmail = asyncHandler(async (req, res) => {

    const user = await User.findOne({ email: req.body.email }).select("-password");
    //if no user is found throw an error that user with this email is not found.
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(
        new ApiResponse(200, user, "Success")
    )
})
const getUserProfileFromToken = asyncHandler(async (req, res) => {

    const jwt = req.headers.authorization.split(" ")[1];
    if (!jwt) {
        throw new ApiError(401, "Unauthorized! Token Not Found");
    }
    // const userId = await User.getUserIDFromToken(jwt);
    const userId = await jwtProvider.getUserIDFromToken(jwt);
    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(
        new ApiResponse(200, user, "Success")
    )

})
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    if (!users) {
        throw new ApiError(204, "No Users found");
    }
    return res.status(200).json(
        new ApiResponse(200, users, "Success")
    )
})

// export module with registerUser, getUserById, getUserByEmail and getUserProfileFromToken

module.exports = { registerUser, getUserById, getUserByEmail, getUserProfileFromToken, getAllUsers }