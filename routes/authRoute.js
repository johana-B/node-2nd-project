const express = require('express');
const Router = express.Router();
const { uploadOptions } = require('../middleware/multer')

const {
    register,
    createInstractor,
    login,
    instractorLogin,
} = require('../controller/authController');
const { authenticateUser, autorizedUser } = require('../middleware/authentication');

Router
    .route('/register')
    .post(register);
Router
    .route('/createInstractor')
    .post([authenticateUser, autorizedUser('admin')], uploadOptions.single("image"), createInstractor);
Router
    .route('/login')
    .post(login);
Router
    .route('/instractorLogin')
    .post(instractorLogin);

module.exports = Router