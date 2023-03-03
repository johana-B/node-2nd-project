const express = require('express')

const Router = express.Router()

const { authenticateUser, autorizedUser } = require('../middleware/authentication')
const { uploadOptions } = require('../middleware/multer')
const {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    getInstractorCourse
} = require('../controller/courseController');

Router
    .route('/')
    .get(getAllCourse)
    .post([authenticateUser, autorizedUser('instractor')], uploadOptions.single("image"), createCourse,)

Router
    .route('/myCourse')
    .get([authenticateUser], getInstractorCourse)

Router
    .route('/:id')
    .get(getSingleCourse)
    .patch([authenticateUser, autorizedUser('admin', 'instractor')], updateCourse)
    .delete([authenticateUser, autorizedUser('admin', 'instractor')], deleteCourse)

module.exports = Router