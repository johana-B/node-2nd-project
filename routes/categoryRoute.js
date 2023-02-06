const express = require('express')

const Router = express.Router()

const { authenticateUser, autorizedUser } = require('../middleware/authentication')

const {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
} = require('../controller/categoryController');

Router
    .route('/')
    .get(getAllCategory)
    .post([authenticateUser, autorizedUser('admin')], createCategory);

Router
    .route('/:id')
    .get(getSingleCategory)
    .patch([authenticateUser, autorizedUser('admin')], updateCategory)
    .delete([authenticateUser, autorizedUser('admin')], deleteCategory)

module.exports = Router