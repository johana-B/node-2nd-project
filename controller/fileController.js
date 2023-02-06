const Video = require('../model/videoModel');
const Pdf = require('../model/pdfModel');
const Course = require('../model/courseModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { getVideoDurationInSeconds } = require('get-video-duration');

const createVideo = async (req, res) => {
    const course = await Course.findById(req.body.course);
    if (!course) {
        throw new CustomError.BadRequest('invalid course');
    }
    const filename = req.file.filename;
    const fileName = filename.split(" ").join("-");
    getVideoDurationInSeconds(`public/uploads/${fileName}`).then(async (duration) => {
        let videoLength = duration / 60;
        const video = new Video({
            videoName: req.body.videoName,
            course: req.body.course,
            video: `/uploads/${fileName}`,
            duration: videoLength,
        })
        await video.save()
        res.status(StatusCodes.CREATED).json({ video });
    })
}

const createpdf = async (req, res) => {
    const course = await Course.findById(req.body.course);
    if (!course) {
        throw new CustomError.BadRequest('invalid course');
    }
    const filename = req.file.filename;
    const fileName = filename.split(" ").join("-");
    const pdf = new Pdf({
        course: req.body.course,
        pdf: `/uploads/${fileName}`,
    })
    await pdf.save()
    res.status(StatusCodes.CREATED).json({ pdf });
}

const getAllVideos = async (req, res) => {
    const videos = await Video.find({});
    if (!videos) {
        throw new CustomError.NotFoundError('no videos');
    }
    res.status(StatusCodes.OK).json({ videos, msg: 'get all video' });
};

const getSingleVideo = async (req, res) => {
    const { id: videoId } = req.params;
    const video = await Video.findById({ _id: videoId })
    res.status(StatusCodes.OK).json({ video, msg: 'get single video' });
};

const updateVideo = async (req, res) => {
    const { id: videoId } = req.params
    const video = await Video.findByIdAndUpdate({ _id: videoId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!video) {
        throw new CustomError.NotFoundError(`no course with id ${videoId}`);
    }
    res.status(StatusCodes.OK).json({ video, msg: 'course updated successfully' });
};

const deleteVideo = async (req, res) => {
    res.status(StatusCodes.OK).json('get all video');
};

module.exports = {
    getAllVideos,
    createVideo,
    createpdf,
    getSingleVideo,
    updateVideo,
    deleteVideo
}
