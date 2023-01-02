const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
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
    phoneNumber: {
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
        enum: ['admin', 'user'],
        default: 'user'
    },
}, { timestamps: true });

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