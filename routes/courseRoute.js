const express = require('express')

const Router = express.Router()

const { authenticateInstractor, autorizedInstractor } = require('../middleware/authentication')

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
    .post([authenticateInstractor, autorizedInstractor('admin', 'Instractor')], createCourse)
Router
    .route('/uploadVideo')
    .post([authenticateInstractor, autorizedInstractor('admin', 'Instractor')], uploadVideo)

Router
    .route('/uploadPdf')
    .post([authenticateInstractor, autorizedInstractor('admin', 'Instractor')], uploadPdf)
Router
    .route('/:id')
    .get(getSingleCourse)
    .patch([authenticateInstractor, autorizedInstractor('admin', 'Instractor')], updateCourse)
    .delete([authenticateInstractor, autorizedInstractor('admin', 'Instractor')], delateCourse)

module.exports = Router