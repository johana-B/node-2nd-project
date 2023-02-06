const express = require('express')

const Router = express.Router()
const { authenticateUser, autorizedUser } = require('../middleware/authentication')
const { uploadOptions } = require('../middleware/multer')
const {
    createVideo,
    createpdf,
    getAllVideos,
    getAllPdfs,
    updateVideo,
    updatePdf,
    deleteVideo,
    deletePdf
} = require('../controller/fileController');

Router.route('/video')
    .get(getAllVideos)
    .post([authenticateUser, autorizedUser('admin', 'instractor')],
        uploadOptions.single("video"), createVideo);

Router.route('pdf')
    .get(getAllPdfs)
    .post([authenticateUser, autorizedUser('admin', 'instractor')],
        uploadOptions.single("pdf"), createpdf);

Router
    .route('video/:id')
    .patch([authenticateUser, autorizedUser('admin', 'instractor')], updateVideo)
    .delete([authenticateUser, autorizedUser('admin', 'instractor')], deleteVideo)

Router
    .route('pdf/:id')
    .patch([authenticateUser, autorizedUser('admin', 'instractor')], updatePdf)
    .delete([authenticateUser, autorizedUser('admin', 'instractor')], deletePdf)

module.exports = Router