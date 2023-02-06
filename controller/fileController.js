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
        pdfName: req.body.pdfName,
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

const getAllPdfs = async (req, res) => {
    const pdf = await Pdf.find({});
    if (!pdf) {
        throw new CustomError.NotFoundError('no pdf');
    }
    res.status(StatusCodes.OK).json({ pdf, msg: 'get all video' });
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
const updatePdf = async (req, res) => {
    const { id: pdfId } = req.params
    const pdf = await Pdf.findByIdAndUpdate({ _id: pdfId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!pdf) {
        throw new CustomError.NotFoundError(`no course with id ${pdfId}`);
    }
    res.status(StatusCodes.OK).json({ pdf, msg: 'course updated successfully' });
};
const deleteVideo = async (req, res) => {
    const { id: videoId } = req.params;
    const video = await Video.findOne({ _id: videoId });
    if (!video) {
        throw new CustomError.NotFoundError(`no video with id ${videoId}`)
    }
    await video.remove();
    res.status(StatusCodes.OK).json({ msg: 'video delated successfully ' });
};
const deletePdf = async (req, res) => {
    const { id: pdfId } = req.params;
    const pdf = await Pdf.findOne({ _id: pdfId });
    if (!pdf) {
        throw new CustomError.NotFoundError(`no pdf with id ${pdfId}`)
    }
    await pdf.remove();
    res.status(StatusCodes.OK).json({ msg: 'pdf delated successfully ' });
};

module.exports = {
    getAllVideos,
    getAllPdfs,
    createVideo,
    createpdf,
    updateVideo,
    updatePdf,
    deleteVideo,
    deletePdf
}
