const express = require('express')

const Router = express.Router()
const { authenticateInstractor, autorizedInstractor } = require('../middleware/authentication')
const {
    // auth
    createInstractor,
    login,
    logout,
    // controller
    getAllInstractors,
    getSingleInstractor,
    updateInstractor,
    delateInstractor,
    currentInstractor
} = require('../controller/instructorController');

Router
    .route('/')
    .get([authenticateInstractor, autorizedInstractor('admin')], getAllInstractors)
    .post([authenticateInstractor, autorizedInstractor('admin')], createInstractor)

Router
    .route('/login')
    .post(login)

Router
    .route('/logout')
    .get(logout)

Router
    .route('/showMe')
    .get(authenticateInstractor, currentInstractor)

Router
    .route('/:id')
    .get([authenticateInstractor, autorizedInstractor('admin')], getSingleInstractor)
    .delete([authenticateInstractor, autorizedInstractor('admin')], delateInstractor)
    .patch(authenticateInstractor, updateInstractor)

module.exports = Router