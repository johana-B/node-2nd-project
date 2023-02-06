const express = require('express')

const Router = express.Router()
const { uploadOptions } = require('../middleware/multer')
const {
    createVideo,
    createpdf,
    getAllVideos,
    getSingleVideo,
    updateVideo,
    deleteVideo
} = require('../controller/fileController');

Router.post('/video', uploadOptions.single("video"), createVideo)
Router.post('/pdf', uploadOptions.single("pdf"), createpdf)
module.exports = Router