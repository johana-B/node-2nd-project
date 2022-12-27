// const Course = require('../model/courseModel');
// const { StatusCodes } = require('http-status-codes')
// const CustomError = require('../errors')

const createCourse = async (req, res) => {
    res.send('create course');
};

const getAllCourse = async (req, res) => {
    res.send('all course');
};

const getSingleCourse = async (req, res) => {
    res.send('single course');
};

const updateCourse = async (req, res) => {
    res.send('update course');
};

const delateCourse = async (req, res) => {
    res.send('delete course');
};

module.exports = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    delateCourse
}