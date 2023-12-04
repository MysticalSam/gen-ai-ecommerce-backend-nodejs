//require jwttoken
const jwt = require("jsonwebtoken");

//generate token with user

const generateToken = (user) => {
    const { _id, firstName, email } = user;
    const token = jwt.sign({ _id, firstName, email }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });
    return token;
}

//Get User ID from Token

const getUserIDFromToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded._id;
}

//export module with generateToken and getUserIDFromToken

module.exports = { generateToken, getUserIDFromToken }