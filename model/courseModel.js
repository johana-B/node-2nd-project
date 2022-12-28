const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    instractor: {
        type: mongoose.Types.ObjectId,
        ref: 'instractor',
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        default: 'Beginner'
    },
    description: {
        type: String,
        required: true,
    },
    curriculum: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const courseSchema = mongoose.model('course', CourseSchema);
module.exports = courseSchema;