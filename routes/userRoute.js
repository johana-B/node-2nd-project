const express = require('express');
const Router = express.Router();

const {
    register,
    fetchAllUser,
    fetchCurrentId
} = require('../controller/userController');

Router.route('/addUser').post(register);

Router.route('/fetchAll').get(fetchAllUser);

Router.route('/fetchCurrent/:id').get(fetchCurrentId);

module.exports = Router