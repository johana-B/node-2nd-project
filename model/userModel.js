const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name should be provided'],
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: [true, 'Last Name should be provided'],
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email should be provided'],
        validate: {
            validator: validator.isEmail,
            message: 'please provide valid email'
        },
    },
    password: {
        type: String,
        required: [true, 'password should be provided'],
        trim: true,
        validate: {
            validator: validator.isStrongPassword,
            message: 'please provide strong password'
        },
    },
    phoneNumber: {
        type: String,
        required: [true, 'email should be provided'],
    },
    // age: {
    //     type: Number,
    //     required: true,
    // },
    // gender: {
    //     type: String,
    //     enum: ['male', 'female'],
    //     required: true,
    // },
    role: {
        type: String,
        enum: ['admin', 'user', 'institution', 'instractor'],
        default: 'user'
    },
}, { timestamps: true });

UserSchema.methods.createJWT = (payload) => {
    // console.log(payload)
    const token = jwt.sign(payload, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME });
    return token;
};

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

const userSchema = mongoose.model('user', UserSchema);
module.exports = userSchema;