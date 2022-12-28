const express = require('express')

const Router = express.Router()

const {
    createInstractor,
    getAllInstractors,
    getSingleInstractor,
    updateInstractor,
    delateInstractor,
} = require('../controller/instructorController');

Router
    .route('/')
    .get(getAllInstractors)
    .post(createInstractor)

Router
    .route('/:id')
    .get(getSingleInstractor)
    .patch(updateInstractor)
    .delete(delateInstractor)

module.exports = Router