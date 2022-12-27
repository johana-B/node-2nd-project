const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    Gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
}, { timestamps: true });

const userSchema = mongoose.model('user', UserSchema);
module.exports = userSchema;