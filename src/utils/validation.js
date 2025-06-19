const validator = require('validator');

const isUpdate = (data) => {
    const ALLOWED_UPDATE = ['firstName', 'lastName', 'email', 'password', 'age', 'gender', 'skills']
    return Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k))
}

const validateSignUpData = (req) => {
    const data = req.body
    console.log((isUpdate(data)))
    if (!isUpdate(data)) {
        throw new Error("Enter valid fields");
    }
    if (!data?.firstName || !data?.lastName) {
        throw new Error("Name is not valid")
    }
    else if (!validator.isEmail(data?.email)) {
        throw new Error("Email is not valid")
    }
    else if (!validator.isStrongPassword(data?.password)) {
        throw new Error("password is not strong")
    }
}

module.exports = {
    validateSignUpData,
    isUpdate
}