const fs = require('fs');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getVideo = async (req, res) => {
    const range = req.headers.range;
    if (!range) {
        throw new CustomError.BadRequest('requires range header');
    }

    const videoPath = "public/uploads/video/video.mp4"
    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 5;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
}

module.exports = {
    getVideo
}