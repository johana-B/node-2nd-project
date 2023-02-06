const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

const categorySchema = mongoose.model('category', CategorySchema);
module.exports = categorySchema