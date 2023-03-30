const express = require('express')

const Router = express.Router()
const { authenticateUser, autorizedUser } = require('../middleware/authentication')
const {
    getAllInstractors,
    getSingleInstractor,
    updateInstractor,
    delateInstractor,
    updateinstractorPassword,
    currentInstractor
} = require('../controller/instructorController');

Router
    .route('/')
    .get(getAllInstractors)

Router
    .route('/updateInstractorPassword')
    .patch(authenticateUser, updateinstractorPassword)
Router
    .route('/showMe')
    .get(authenticateUser, currentInstractor)
Router.route('/updateInstractor')
    .patch(authenticateUser, updateInstractor);
Router
    .route('/:id')
    .get(getSingleInstractor)
    .delete(authenticateUser, delateInstractor)

module.exports = Router