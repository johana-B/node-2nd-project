const express = require('express')

const Router = express.Router()

const {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    delateCourse
} = require('../controller/courseController');

Router
    .route('/')
    .get(getAllCourse)
    .post(createCourse)

Router
    .route('/:id')
    .get(getSingleCourse)
    .patch(updateCourse)
    .delete(delateCourse)

module.exports = Router