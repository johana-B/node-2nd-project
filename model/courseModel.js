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
    // lectures: {
    //     type: [String],
    //     default: ['lecture-1'],
    //     required: true,
    // },
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
    video: {
        type: String,
        default: '/uploads/pdf/picture-1.jpg'
    },
    pdf: {
        type: String,
        default: '/uploads/pdf/picture-1.jpg'
    },
}, { timestamps: true });

const courseSchema = mongoose.model('course', CourseSchema);
module.exports = courseSchema;