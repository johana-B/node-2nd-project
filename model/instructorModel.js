const mongoose = require('mongoose')

const InstractorSchema = mongoose.Schema({
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
        required: true,
    },
    educationStatus: {
        type: String,
        enum: ['BSC', 'MS', 'PHD'],
        required: true,
    },
    CourseToOffer: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Experience: {
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

const instractorSchema = mongoose.model('instractor', InstractorSchema);
module.exports = instractorSchema;