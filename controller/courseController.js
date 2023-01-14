const Course = require('../model/courseModel');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path')

const createCourse = async (req, res) => {
    // started video upload
    if (!req.files) {
        throw new CustomError.BadRequest('No File Uploaded');
    }
    const ext = path.extname(req.files.video.name);
    const courseVideo = req.files.video;
    if (!courseVideo.mimetype.startsWith('video')) {
        throw new CustomError.BadRequest('Please Upload video');
    }
    const videoName = req.body.courseName + ext
    const videoPath = path.join(
        __dirname,
        '../public/uploads/video/' + `${videoName}`
    );
    await courseVideo.mv(videoPath);
    //end video upload
    //start pdf upload
    const pExt = path.extname(req.files.pdf.name);
    const coursePdf = req.files.pdf;
    const pdfName = req.body.courseName + pExt;
    const pdfPath = path.join(
        __dirname,
        '../public/uploads/pdf/' + pdfName
    );
    await coursePdf.mv(pdfPath);
    // end pdf upload

    const { courseName, duration, level, description, curriculum, } = req.body;
    const course = await Course.create({
        instractor: req.user.userId,
        courseName,
        duration,
        level,
        description,
        curriculum,
        video: `${videoName}`,
        pdf: `${pdfName}`
    });
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

module.exports = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    delateCourse,
}