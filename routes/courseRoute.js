const express = require('express')

const Router = express.Router()

const { authenticateUser, autorizedUser } = require('../middleware/authentication')

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
    .post([authenticateUser, autorizedUser('admin', 'instractor')], createCourse)
Router
    .route('/uploadVideo')
    .post([authenticateUser, autorizedUser('admin', 'instractor')], uploadVideo)

Router
    .route('/uploadPdf')
    .post([authenticateUser, autorizedUser('admin', 'instractor')], uploadPdf)
Router
    .route('/:id')
    .get(getSingleCourse)
    .patch([authenticateUser, autorizedUser('admin', 'instractor')], updateCourse)
    .delete([authenticateUser, autorizedUser('admin', 'instractor')], delateCourse)

module.exports = Router