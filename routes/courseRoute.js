const express = require('express')

const Router = express.Router()

const {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    delateCourse,
    uploadVideo,
    uploadPdf
} = require('../controller/courseController');

Router
    .route('/')
    .get(getAllCourse)
    .post(createCourse)
Router
    .route('/uploadVideo')
    .post(uploadVideo)

Router
    .route('/uploadPdf')
    .post(uploadPdf)
Router
    .route('/:id')
    .get(getSingleCourse)
    .patch(updateCourse)
    .delete(delateCourse)

module.exports = Router