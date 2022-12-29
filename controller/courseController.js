const Course = require('../model/courseModel');
const Instractor = require('../model/instructorModel');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path')

const createCourse = async (req, res) => {
    req.body.instractor = req.instractor.instractorId
    const course = await Course.create(req.body);
    res.status(StatusCodes.CREATED).json({ course })
};

const getAllCourse = async (req, res) => {
    const course = await Course.find({}).populate({
        path: 'instractor',
        select: 'firstName email'
    });
    res.status(StatusCodes.OK).json({ course });
};

const getSingleCourse = async (req, res) => {
    const { id: courseId } = req.params
    const course = await Course.findById({ _id: courseId }).populate({
        path: 'instractor',
        select: 'firstName email'
    });
    res.status(StatusCodes.OK).json({ course });
};

const updateCourse = async (req, res) => {
    const { id: courseId } = req.params
    const course = await Course.findByIdAndUpdate({ _id: courseId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!course) {
        throw new CustomError.NotFoundError(`no course with id ${courseId}`);
    }
    res.status(StatusCodes.OK).json({ course, msg: 'course updated successfully' });
};

const delateCourse = async (req, res) => {
    const { id: courseId } = req.params;
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
        throw new CustomError.NotFoundError(`no course with id ${courseId}`)
    }
    await course.remove();
    res.status(StatusCodes.OK).json({ msg: 'course delated successfully ' });
};

const uploadVideo = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequest('No File Uploaded');
    }
    const courseVideo = req.files.video;
    if (!courseVideo.mimetype.startsWith('video')) {
        throw new CustomError.BadRequest('Please Upload video');
    }
    const name = courseVideo.name
    const videoName = name.split(' ').join('_')
    const videoPath = path.join(
        __dirname,
        '../public/uploads/video/' + `${videoName}`
    );
    await courseVideo.mv(videoPath);
    res.status(StatusCodes.CREATED).json({ video: `/uploads/video/${videoName}` });
};
const uploadPdf = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequest('No File Uploaded');
    }
    const coursePdf = req.files.pdf;
    const name = coursePdf.name;
    const pdfName = name.split(' ').join('_')
    const pdfPath = path.join(
        __dirname,
        '../public/uploads/pdf/' + pdfName
    );
    await coursePdf.mv(pdfPath);
    res.status(StatusCodes.CREATED).json({ pdf: `/uploads/pdf/${pdfName}` });
};
module.exports = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    delateCourse,
    uploadVideo,
    uploadPdf,
}