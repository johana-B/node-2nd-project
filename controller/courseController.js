const Course = require('../model/courseModel');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path');

const createCourse = async (req, res) => {
    const { courseName, level, description, curriculum, category } = req.body;
    const course = await Course.create({
        instractor: req.user.userId,
        courseName,
        category,
        level,
        description,
        curriculum,
    });
    res.status(StatusCodes.CREATED).json({ course })
}

const getAllCourse = async (req, res) => {
    const course = await Course.find({}).populate({
        path: 'instractor',
        select: 'firstName email'
    }).populate({
        path: 'category',
        select: 'name'
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

const deleteCourse = async (req, res) => {
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
    deleteCourse,
}