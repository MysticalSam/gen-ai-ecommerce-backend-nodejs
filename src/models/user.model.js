//import mongoose
const validator = require('validator');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

//import bcrypt for password hashing
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS || 10);

//import jwt for token generation
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password must not contain word password')
            }
        },
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        },
        required: true
    },
    role:
    {
        type: String,
        required: true,
        default: "customer"
    },
    mobile: {
        type: String
    },
    //create schema for addresses which is an array and store mongoose schema object id with reference of addresses
    addresses:
        [{
            addressId: {
                type: ObjectId,
                ref: 'Address'
            }
        }],
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            firstName: this.firstName
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_REFRESH_SECRET_KEY,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.getUserIDFromToken = function (token) {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return decoded._Id;
}

//create user schema
const User = mongoose.model('User', userSchema);
//export module
module.exports = User;