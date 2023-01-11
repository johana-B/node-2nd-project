const express = require('express')

const Router = express.Router()

const { authenticateUser, autorizedUser } = require('../middleware/authentication')

const {
    getVideo
} = require('../controller/videoStrem');

Router.route('/').get(getVideo)

module.exports = Router;