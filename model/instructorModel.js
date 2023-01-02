const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const InstractorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'first name should be provided'],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: [true, 'last name should be provided'],
        trim: true,
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
        minlength: 6,
    },
    image: {
        type: String,
        required: true
    },
    educationStatus: {
        type: String,
        enum: ['BSC', 'MS', 'PHD'],
        required: true,
    },
    courseToOffer: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    role: {
        type: String,
        enum: ['instractor'],
        default: 'instractor'
    },
}, { timestamps: true });

InstractorSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

InstractorSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

const instractorSchema = mongoose.model('instractor', InstractorSchema);
module.exports = instractorSchema;