const Instractor = require('../model/instructorModel');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser, chechPermissions } = require('../utils');
const fs = require('fs')
// instractor controllers by admin and it self
const getAllInstractors = async (req, res) => {
    const instractor = await Instractor.find({}).select('-password');
    res.status(StatusCodes.OK).json(instractor);
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
    res.status(StatusCodes.OK).json({ instractor: req.user });
}

const updateInstractor = async (req, res) => {
    const instractor = await Instractor.findByIdAndUpdate({ _id: req.user.userId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!instractor) {
        throw new CustomError.NotFoundError(`no instractor with id ${userId}`);
    }
    const tokeninstractor = createTokenUser(instractor);
    attachCookiesToResponse({ res, user: tokeninstractor });
    res.status(StatusCodes.CREATED).json({ instractor: tokeninstractor, msg: 'instractor updated successfully' });
};

const delateInstractor = async (req, res) => {
    const { id: userId } = req.params;
    const user = await Instractor.findOne({ _id: userId });
    if (!user) {
        throw new CustomError.NotFoundError(`no instractor with id ${userId}`)
    }
    // const imageResponse = user.image
    // console.log(imageResponse)
    // imageToDelete = imageResponse.replace('/uploads/', "public/uploads/");
    // console.log('leylgn eziga');
    // console.log(imageToDelete);
    // if (fs.existsSync(imageToDelete)) {
    //     console.log('gebtual')
    //     fs.unlinkSync(`${imageToDelete}`)
    //     console.log("delchewalew man");
    // }
    chechPermissions(req.user, user._id);
    await user.remove();
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