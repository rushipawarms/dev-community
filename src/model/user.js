const mongoose = require('mongoose')

const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            minlength: [2, 'First name must be at least 2 characters'],
            maxlength: [50, 'First name must be less than 50 characters'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            minlength: [2, 'Last name must be at least 2 characters'],
            maxlength: [50, 'Last name must be less than 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            // match: [
            //     /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            //     'Please fill a valid email address'
            // ],
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email id is invalide")
                }
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            maxlength: [100, 'Password must be less than 100 characters'],
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Password is not strong")
                }
            }
        },
        age: {
            type: String,
            min: 18
        },
        gender: {
            type: String,
            validate(value) {
                if (!(value.toLowerCase() === 'male' || value.toLowerCase() === 'female' || value.toLowerCase() === 'other')) {
                    throw new Error("Gender is not valid")
                }
            }
        },
        skills: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)
