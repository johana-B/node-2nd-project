const Instractor = require('../model/instructorModel');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils');

// instractor controllers by admin and it self
const getAllInstractors = async (req, res) => {
    const instractor = await Instractor.find({}).select('-password');
    res.status(StatusCodes.OK).json({ instractor, count: instractor.length });
};

const getSingleInstractor = async (req, res) => {
    const { id: instractorId } = req.params;
    const instractor = await Instractor.findById({ _id: instractorId }).select('-password');
    if (!instractor) {
        throw new CustomError.NotFoundError(`no instractor with id ${instractorId}`)
    }
    res.status(StatusCodes.OK).json(instractor);
};

const currentInstractor = async (req, res) => {
    console.log(req.user)
    res.status(StatusCodes.OK).json({ instractor: req.user });
}

const updateInstractor = async (req, res) => {
    const { id: instractorId } = req.params
    const instractor = await Instractor.findByIdAndUpdate({ _id: instractorId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!instractor) {
        throw new CustomError.NotFoundError(`no instractor with id ${instractorId}`);
    }
    const tokeninstractor = createTokenUser(instractor);
    attachCookiesToResponse({ res, user: tokeninstractor });
    res.status(StatusCodes.CREATED).json({ instractor: tokeninstractor, msg: 'instractor updated successfully' });
};

const delateInstractor = async (req, res) => {
    const { id: instractorId } = req.params;
    const instractor = await Instractor.findOne({ _id: instractorId });
    if (!instractor) {
        throw new CustomError.NotFoundError(`no instractor with id ${instractorId}`)
    }
    await instractor.remove();
    res.status(StatusCodes.OK).json({ msg: 'Instractor delated successfully ' });
};

const updateinstractorPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequest('passwords can not be empty');
    };
    const user = await Instractor.findOne({ _id: req.user.userId });
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError.NotFoundError('invalid credential');
    }
    user.password = newPassword
    await user.save();
    res.status(StatusCodes.CREATED).json({ msg: 'password changed successfully' });
};

module.exports = {
    getAllInstractors,
    getSingleInstractor,
    updateInstractor,
    delateInstractor,
    updateinstractorPassword,
    currentInstractor,
}