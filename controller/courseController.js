const Course = require('../model/courseModel');
const Category = require('../model/categoryModel');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const fs = require('fs')

const createCourse = async (req, res) => {
    const category = await Category.findById(req.body.category);
    console.log(req.body.category);
    if (!category) {
        throw new CustomError.NotFoundError(`no category with id ${req.body.category}`);
    }
    const fileName = req.file.filename;

    const course = await Course.create({
        instractor: req.user.userId,
        courseName: req.body.courseName,
        category: req.body.category,
        level: req.body.level,
        description: req.body.description,
        curriculum: req.body.curriculum,
        image: `/uploads/${fileName}`,
    });
    res.status(StatusCodes.CREATED).json({ course, msg: 'course created successfully' })
}

const getAllCourse = async (req, res) => {
    const course = await Course.find({}).populate({
        path: 'instractor',
        select: 'firstName lastName email'
    }).populate({
        path: 'category',
        select: 'name'
    }).sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json(course);
};

const getSingleCourse = async (req, res) => {
    const { id: courseId } = req.params
    console.log(courseId);
    const course = await Course.findById({ _id: courseId }).populate({
        path: 'instractor',
        select: 'firstName lastName email'
    }).populate({
        path: 'category',
        select: 'name'
    });
    res.status(StatusCodes.OK).json(course);
};

const getInstractorCourse = async (req, res) => {
    const course = await Course.find({ instractor: req.user.userId }).populate({
        path: 'category',
        select: 'name'
    });
    res.status(StatusCodes.OK).json(course);

}

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
    const imageResponse = course.image
    // console.log(imageResponse)
    imageToDelete = imageResponse.replace('/uploads/', "public/uploads/");
    // console.log('leylgn eziga');
    console.log(imageToDelete);
    if (fs.existsSync(imageToDelete)) {
        // console.log('gebtual')
        fs.unlinkSync(`${imageToDelete}`)
        // console.log("delchewalew man");
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
    getInstractorCourse
}