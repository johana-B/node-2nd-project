const Course = require('../model/courseModel');
const Instractor = require('../model/instructorModel');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createCourse = async (req, res) => {
    const { instractor: instractorId } = req.body;
    const isValidinstractor = await Instractor.findOne({ _id: instractorId });
    if (!isValidinstractor) {
        throw new CustomError.NotFoundError(`no instractor with id${instractorId}`);
    }
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
    const course = await course.findOne({ _id: courseId });
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
    delateCourse
}