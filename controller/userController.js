const user = require('../model/userModel');

// const { StatusCodes } = require('http-status-codes');
// const CustomError = require('../errors');

const register = async (req, res) => {
    console.log('gebtual')
    const newUSer = user({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName
    });
    await newUSer.save();
    return res.status(StatusCodes.CREATED).json(newUSer)
}

const fetchAllUser = async (req, res) => {
    const fetched = await user.find();
    return res.json({
        "users": fetched
    });
}
const fetchCurrentId = async (req, res) => {
    const result = await user.findOne({ uid: req.params.id });
    if (!result) {
        throw new CustomError.NotFoundError('No user by the specified id')
    }
    else {
        return res.status(StatusCodes.OK).json({ result })
    }
};

module.exports = {
    register,
    fetchAllUser,
    fetchCurrentId
}