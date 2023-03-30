const Video = require('../model/videoModel');
const Pdf = require('../model/pdfModel');
const Course = require('../model/courseModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { getVideoDurationInSeconds } = require('get-video-duration');

const createVideo = async (req, res) => {
    const course = await Course.findById(req.body.course);
    if (!course) {
        throw new CustomError.NotFoundError(`no course with id ${req.body.course}`);
    };
    const filename = req.file.filename;
    const fileName = filename.split(" ").join("-");
    getVideoDurationInSeconds(`public/uploads/${fileName}`).then(async (duration) => {
        let videoLength = duration / 60;
        const video = new Video({
            videoName: req.body.videoName,
            course: req.body.course,
            duration: parseFloat(videoLength).toFixed(2),
            video: `/uploads/${fileName}`,

        });
        await video.save()
        res.status(StatusCodes.CREATED).json({ video });
    })
}

const createpdf = async (req, res) => {
    const course = await Course.findById(req.body.course);
    if (!course) {
        throw new CustomError.NotFoundError(`no course with id ${req.body.course}`);
    }
    const filename = req.file.filename;
    const fileName = filename.split(" ").join("-");
    const pdf = new Pdf({
        course: req.body.course,
        pdfName: req.body.pdfName,
        pdf: `/uploads/${fileName}`,
    })
    await pdf.save()
    res.status(StatusCodes.CREATED).json({ pdf });
}

const getAllVideos = async (req, res) => {
    const videos = await Video.find({}).populate({
        path: 'course',
        select: 'courseName'
    });
    if (!videos) {
        throw new CustomError.NotFoundError('no videos');
    }
    res.status(StatusCodes.OK).json(videos);
};

const getAllPdfs = async (req, res) => {
    const pdf = await Pdf.find({}).populate({
        path: 'course',
        select: 'courseName'
    });
    if (!pdf) {
        throw new CustomError.NotFoundError('no pdf');
    }
    res.status(StatusCodes.OK).json(pdf);
};

const updateVideo = async (req, res) => {
    const { id: videoId } = req.params
    const video = await Video.findByIdAndUpdate({ _id: videoId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!video) {
        throw new CustomError.NotFoundError(`no video with id ${videoId}`);
    }
    res.status(StatusCodes.OK).json({ video, msg: 'video updated successfully' });
};
const updatePdf = async (req, res) => {
    const { id: pdfId } = req.params
    const pdf = await Pdf.findByIdAndUpdate({ _id: pdfId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!pdf) {
        throw new CustomError.NotFoundError(`no pdf with id ${pdfId}`);
    }
    res.status(StatusCodes.OK).json({ pdf, msg: 'pdf updated successfully' });
};
const deleteVideo = async (req, res) => {
    const { id: videoId } = req.params;
    const videos = await Video.findOne({ _id: videoId });
    if (!videos) {
        throw new CustomError.NotFoundError(`no video with id ${videoId}`)
    }
    const videoResponse = videos.video
    // console.log(videoResponse)
    videoToDelete = videoResponse.replace('/uploads/', "public/uploads/");
    // console.log('leylgn eziga');
    console.log(videoToDelete);
    if (fs.existsSync(videoToDelete)) {
        // console.log('gebtual')
        fs.unlinkSync(`${videoToDelete}`)
        // console.log("delchewalew man");
    }
    await videos.remove();
    res.status(StatusCodes.OK).json({ msg: 'video delated successfully ' });
};
const deletePdf = async (req, res) => {
    const { id: pdfId } = req.params;
    const pdfs = await Pdf.findOne({ _id: pdfId });
    if (!pdfs) {
        throw new CustomError.NotFoundError(`no pdf with id ${pdfId}`)
    }
    const pdfResponse = pdfs.pdf
    // console.log(pdfResponse)
    pdfToDelete = pdfResponse.replace('/uploads/', "public/uploads/");
    // console.log('leylgn eziga');
    console.log(pdfToDelete);
    if (fs.existsSync(pdfToDelete)) {
        // console.log('gebtual')
        fs.unlinkSync(`${pdfToDelete}`)
        // console.log("delchewalew man");
    }
    await pdfs.remove();
    res.status(StatusCodes.OK).json({ msg: 'pdf delated successfully ' });
};

module.exports = {
    getAllVideos,
    getAllPdfs,
    createVideo,
    createpdf,
    updateVideo,
    updatePdf,
    deleteVideo,
    deletePdf
}
