const Category = require('../model/categoryModel')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');

const getAllCategory = async (req, res) => {

    const catagory = await Category.find()
    if (!catagory) {
        throw new CustomError.NotFoundError(`there is no category `);
    }
    res.status(StatusCodes.OK).json({ catagory, nbHits: catagory.length })

}

const getSingleCategory = async (req, res) => {
    const { id: categoryID } = req.params
    const category = await Category.findById({ _id: categoryID });
    if (!category) {
        throw new CustomError.NotFoundError(`no category with id${categoryID}`);
    }
    res.status(201).json({ category })
}

const createCategory = async (req, res) => {
    const category = await Category.create({ name: req.body.name })
    if (!category) {
        throw new CustomError.BadRequest('Category cannot be created')
    }
    res.status(StatusCodes.OK).json({ category, msg: 'Category is created successfully' })
}

const updateCategory = async (req, res) => {

    const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name, })
    if (!category)
        throw new CustomError.NotFoundError('Category cannot be updated');
    res.status(StatusCodes.OK).json({ category, msg: 'Category is updated successfully' })

}

const deleteCategory = async (req, res) => {
    const { id: categoryID } = req.params
    const category = await Category.findById({ _id: categoryID })
    if (!category) {
        throw new CustomError.NotFoundError({ msg: `there is no category with id${categoryID}` });
    }
    await category.remove();
    res.status(StatusCodes.OK).json({ category, msg: 'Category is deleted successfully' });
}


module.exports = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
};