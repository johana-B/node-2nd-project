const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'course',
        required: true,
    },
    videoName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        // required: true,
    },
    video: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

const videoSchema = mongoose.model('video', VideoSchema);
module.exports = videoSchema;

