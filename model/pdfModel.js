const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'course',
        required: true,
    },
    pdf: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

const pdfSchema = mongoose.model('pdf', PdfSchema);
module.exports = pdfSchema;

