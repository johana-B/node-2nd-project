const express = require('express')

const Router = express.Router()

const { authenticateUser, autorizedUser } = require('../middleware/authentication')

const {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    delateCourse,
} = require('../controller/courseController');

Router
    .route('/')
    .get(getAllCourse)
    .post([authenticateUser, autorizedUser('admin', 'instractor', 'institution')], createCourse,)

Router
    .route('/:id')
    .get(getSingleCourse)
    .patch([authenticateUser, autorizedUser('admin', 'instractor', 'institution')], updateCourse)
    .delete([authenticateUser, autorizedUser('admin', 'instractor', 'institution')], delateCourse)

module.exports = Router